import { NextResponse } from 'next/server';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

interface EventInfo {
  eventName: string;
  date: string;
  description: string;
  googleDriveFolderId?: string; // Optional Google Drive folder ID
}

interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  webContentLink?: string;
}

interface EventFolder {
  name: string;
  path: string;
  mediaFiles: string[];
  eventInfo: EventInfo;
  mediaUrls?: string[]; // URLs for Google Drive media
  videoThumbnailUrls?: string[]; // Thumbnail URLs for videos
}

// Google Drive API helper functions
async function getGoogleDriveAccessToken() {
  // You'll need to set up Google Drive API credentials
  // This is a simplified example - you'll need to implement proper OAuth2 flow
  const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;
  
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Google Drive credentials not configured');
  }

  // Exchange refresh token for access token
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  const data = await response.json();
  return data.access_token;
}

async function getGoogleDriveFiles(folderId: string) {
  const accessToken = await getGoogleDriveAccessToken();
  
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id,name,mimeType,webContentLink)&key=${process.env.GOOGLE_DRIVE_API_KEY}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(`Google Drive API error: ${response.status}`);
  }
  
  return data.files || [];
}

export async function GET() {
  try {
    const eventsPath = join(process.cwd(), 'app', 'data', 'events');
    const events: EventFolder[] = [];

    // Recursively find all event-info.json files
    async function findEvents(dirPath: string, currentPath: string = '') {
      const items = await readdir(dirPath, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = join(dirPath, item.name);
        const relativePath = currentPath ? join(currentPath, item.name) : item.name;
        
        if (item.isDirectory()) {
          // Check if this directory contains an event-info.json
          try {
            const eventInfoPath = join(fullPath, 'event-info.json');
            await readFile(eventInfoPath, 'utf-8'); // Test if file exists
            
            // This is an event directory
            const eventInfoContent = await readFile(eventInfoPath, 'utf-8');
            const eventInfo: EventInfo = JSON.parse(eventInfoContent);

            let mediaFiles: string[] = [];
            let mediaUrls: string[] = [];
            let videoThumbnailUrls: string[] = [];

            // Check if this event uses Google Drive
            if (eventInfo.googleDriveFolderId) {
              try {
                // Fetch files from Google Drive
                const driveFiles = await getGoogleDriveFiles(eventInfo.googleDriveFolderId);
                
                // Filter for media files and create direct download URLs
                const mediaDriveFiles = driveFiles.filter((file: GoogleDriveFile) => 
                  /\.(jpg|jpeg|png|gif|webp|heic|mp4|mov|avi|mkv|webm)$/i.test(file.name) ||
                  file.mimeType.startsWith('image/') ||
                  file.mimeType.startsWith('video/')
                );

                mediaFiles = mediaDriveFiles.map((file: GoogleDriveFile) => file.name);
                mediaUrls = mediaDriveFiles.map((file: GoogleDriveFile) => {
                  let url: string;
                  
                  // For HEIC files, use thumbnail service
                  if (file.mimeType === 'image/heif' || /\.heic$/i.test(file.name)) {
                    url = `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`;
                  }
                  // For videos, use webContentLink or direct access
                  else if (file.mimeType.startsWith('video/') || /\.(mp4|mov|avi|mkv|webm)$/i.test(file.name)) {
                    url = file.webContentLink || `https://drive.google.com/file/d/${file.id}/view`;
                  }
                  // For other images, use the thumbnail service for better compatibility
                  else {
                    url = `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`;
                  }
                  
                  return url;
                });

                // Generate thumbnail URLs for videos
                videoThumbnailUrls = mediaDriveFiles.map((file: GoogleDriveFile) => {
                  if (file.mimeType.startsWith('video/') || /\.(mp4|mov|avi|mkv|webm)$/i.test(file.name)) {
                    return `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`;
                  }
                  return null;
                }).filter((url: string | null): url is string => url !== null);
              } catch {
                // Fall back to local files if Google Drive fails
              }
            }

            events.push({
              name: relativePath,
              path: `/events/${relativePath}`,
              mediaFiles,
              eventInfo,
              mediaUrls: mediaUrls.length > 0 ? mediaUrls : undefined,
              videoThumbnailUrls: videoThumbnailUrls.length > 0 ? videoThumbnailUrls : undefined
            });
          } catch {
            // This directory doesn't have an event-info.json, continue searching
            await findEvents(fullPath, relativePath);
          }
        }
      }
    }

    // Start the recursive search
    await findEvents(eventsPath);

    // Sort events by date (most recent first)
    const sortedEvents = events.sort((a, b) => 
      new Date(b.eventInfo.date).getTime() - new Date(a.eventInfo.date).getTime()
    );

    return NextResponse.json(sortedEvents);
  } catch {
    return NextResponse.json({ error: 'Failed to load gallery' }, { status: 500 });
  }
}
