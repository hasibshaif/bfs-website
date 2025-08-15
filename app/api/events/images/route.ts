import { NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

// Function to check if a file is an image
const isImageFile = (filename: string): boolean => {
  const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  return IMAGE_EXTENSIONS.includes(ext);
};

// Function to recursively get all images from a directory
const getImagesFromDirectory = async (dirPath: string): Promise<string[]> => {
  try {
    const items = await readdir(dirPath);
    const images: string[] = [];

    for (const item of items) {
      const fullPath = join(dirPath, item);
      const stats = await stat(fullPath);

      if (stats.isDirectory()) {
        // Recursively get images from subdirectories
        const subImages = await getImagesFromDirectory(fullPath);
        images.push(...subImages);
      } else if (stats.isFile() && isImageFile(item)) {
        // Convert file path to web-accessible URL
        const publicIndex = fullPath.indexOf('public');
        if (publicIndex !== -1) {
          const relativePath = fullPath.substring(publicIndex + 6); // +6 for "public"
          // Convert Windows backslashes to forward slashes for web URLs
          const webPath = relativePath.replace(/\\/g, '/');
          images.push(webPath);
        }
      }
    }

    return images.sort(); // Sort for consistent ordering
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
};

// Function to get all event images organized by event folder
const getAllEventImages = async (): Promise<{ [eventFolder: string]: string[] }> => {
  const eventsDir = join(process.cwd(), 'public', 'images', 'events');
  const result: { [eventFolder: string]: string[] } = {};

  try {
    // Get all semester directories
    const semesters = await readdir(eventsDir);
    
    for (const semester of semesters) {
      const semesterPath = join(eventsDir, semester);
      const semesterStats = await stat(semesterPath);
      
      if (!semesterStats.isDirectory()) continue;

      // Get all event directories within this semester
      const events = await readdir(semesterPath);
      
      for (const event of events) {
        const eventPath = join(semesterPath, event);
        const eventStats = await stat(eventPath);
        
        if (!eventStats.isDirectory()) continue;

        // Get all images from this event directory
        const images = await getImagesFromDirectory(eventPath);
        
        if (images.length > 0) {
          result[event] = images;
        }
      }
    }
  } catch (error) {
    console.error('Error scanning events directory:', error);
  }

  return result;
};

export async function GET() {
  try {
    const images = await getAllEventImages();
    
    return NextResponse.json({
      success: true,
      data: images
    });
  } catch (error) {
    console.error('Error in events images API:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to load event images'
    }, { status: 500 });
  }
}
