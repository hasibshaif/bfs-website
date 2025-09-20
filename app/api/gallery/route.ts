import { NextResponse } from 'next/server';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { EventInfo, EventFolder } from '@/types/gallery';

// Extend EventInfo to include s3Path
interface ExtendedEventInfo extends EventInfo {
  s3Path: string;
}

const S3_BASE_URL = 'https://bfs-website-gallery-images.s3.us-east-2.amazonaws.com';

// Cache for discovered images to avoid repeated API calls
const imageCache = new Map<string, string[]>();

// Helper function to automatically discover all images in an S3 folder
async function discoverS3Images(s3Path: string): Promise<string[]> {
  try {
    // Use S3 ListObjectsV2 API to get all objects in the folder
    const response = await fetch(`https://bfs-website-gallery-images.s3.us-east-2.amazonaws.com/?list-type=2&prefix=${s3Path}/`);
    
    if (!response.ok) {
      console.error(`Failed to fetch S3 objects for ${s3Path}:`, response.status);
      return [];
    }
    
    const xmlText = await response.text();
    
    // Parse XML response to extract object keys
    const keyRegex = /<Key>(.*?)<\/Key>/g;
    const keys: string[] = [];
    let match;
    
    while ((match = keyRegex.exec(xmlText)) !== null) {
      const key = match[1];
      // Only include media files, not folders, and exclude the folder itself
      if (key && key.includes('.') && !key.endsWith('/') && key !== s3Path + '/') {
        // Extract just the filename from the full path
        let filename = key.split('/').pop();
        if (filename) {
          // Decode HTML entities in the filename
          filename = filename
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");
          
          // Filter out HEIC files as Next.js can't handle them
          const isHeic = /\.(heic|HEIC)$/i.test(filename);
          if (!isHeic) {
            keys.push(filename);
          }
        }
      }
    }
    
    return keys;
  } catch (error) {
    console.error(`Error discovering images for ${s3Path}:`, error);
    return [];
  }
}

// Helper function to get images for an event (with caching)
async function getEventImages(s3Path: string): Promise<string[]> {
  // Check cache first
  if (imageCache.has(s3Path)) {
    return imageCache.get(s3Path)!;
  }
  
  // Discover images from S3
  const images = await discoverS3Images(s3Path);
  
  // Cache the result
  imageCache.set(s3Path, images);
  
  return images;
}

export async function GET() {
  try {
    const eventsPath = join(process.cwd(), 'app/data/gallery');

    // Recursively find all event-info.json files
    async function findEvents(dirPath: string, currentPath: string = '') {
      const items = await readdir(dirPath, { withFileTypes: true });
      const events: EventFolder[] = [];
      
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
            const eventInfo: ExtendedEventInfo = JSON.parse(eventInfoContent);

            let mediaFiles: string[] = [];
            let mediaUrls: string[] = [];
            let videoThumbnailUrls: string[] = [];

            // Get images from S3 automatically
            if (eventInfo.s3Path) {
              try {
                mediaFiles = await getEventImages(eventInfo.s3Path);
                
              // Generate S3 URLs for each media file
              mediaUrls = mediaFiles.map(fileName => {
                const isVideo = /\.(mp4|mov|avi|mkv|webm)$/i.test(fileName);
                // Properly encode the filename for URL
                const encodedFileName = encodeURIComponent(fileName);
                if (isVideo) {
                  // For videos, we'll use the same URL but mark it as video
                  return `${S3_BASE_URL}/${eventInfo.s3Path}/${encodedFileName}`;
                } else {
                  // For images, use direct S3 URL
                  return `${S3_BASE_URL}/${eventInfo.s3Path}/${encodedFileName}`;
                }
              });

              // Generate thumbnail URLs for videos (using first frame or placeholder)
              videoThumbnailUrls = mediaFiles.map(fileName => {
                const isVideo = /\.(mp4|mov|avi|mkv|webm)$/i.test(fileName);
                if (isVideo) {
                  // For videos, you might want to generate thumbnails or use a placeholder
                  // For now, we'll use the same URL but this should be replaced with actual thumbnails
                  const encodedFileName = encodeURIComponent(fileName);
                  return `${S3_BASE_URL}/${eventInfo.s3Path}/${encodedFileName}`;
                }
                return '';
              }).filter(url => url !== '');
              } catch (error) {
                console.error(`Error fetching images for ${eventInfo.s3Path}:`, error);
                mediaFiles = [];
                mediaUrls = [];
                videoThumbnailUrls = [];
              }
            }

            events.push({
              name: eventInfo.eventName,
              eventInfo,
              mediaFiles,
              mediaUrls,
              videoThumbnailUrls,
              path: relativePath
            });
          } catch {
            // Not an event directory, continue searching
            const subEvents = await findEvents(fullPath, relativePath);
            events.push(...subEvents);
          }
        }
      }
      
      return events;
    }

    const events = await findEvents(eventsPath);
    
    // Sort events by date in reverse chronological order (most recent first)
    events.sort((a, b) => {
      const dateA = new Date(a.eventInfo.date);
      const dateB = new Date(b.eventInfo.date);
      return dateB.getTime() - dateA.getTime();
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery data' },
      { status: 500 }
    );
  }
}