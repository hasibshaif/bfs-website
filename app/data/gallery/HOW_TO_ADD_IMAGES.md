# How to Add Images to Your Gallery

## Quick Guide

To add images to your gallery, you need to:

1. **Upload images to S3** in the correct folder
2. **Create/update event-info.json** for the event
3. **Images appear automatically** - no manual configuration needed!

## Step-by-Step Instructions

### 1. Upload Images to S3

Upload your images to the appropriate S3 folder:
- `bfs-website-gallery-images/fall_2025/club_fair/` - for Fall 2025 Club Fair
- `bfs-website-gallery-images/spring_2025/fireside_chat_with_naman_pujari/` - for Fireside Chat
- `bfs-website-gallery-images/spring_2025/intro_to_react/` - for Intro to React
- `bfs-website-gallery-images/spring_2025/gim/` - for GIM
- `bfs-website-gallery-images/spring_2025/club_showcase/` - for Club Showcase

### 2. Create Event Info File

For each event, create an `event-info.json` file in the appropriate directory:

**File location**: `app/data/gallery/[semester]/[event_name]/event-info.json`

**Example for Fall 2025 Club Fair**:
```json
{
  "eventName": "Club Fair - Fall 2025",
  "date": "2025-09-18",
  "description": "Our first club fair as an official club!",
  "s3Path": "fall_2025/club_fair"
}
```

**Example for Spring 2025 Fireside Chat**:
```json
{
  "eventName": "Fireside Chat with Naman Pujari - Spring 2025",
  "date": "2025-03-27",
  "description": "Our first speaker event, with Naman Pujari, a software engineer at Bloomberg.",
  "s3Path": "spring_2025/fireside_chat_with_naman_pujari"
}
```

### 3. Images Appear Automatically!

Once you've uploaded images to S3 and created the event-info.json file:
1. **Images are discovered automatically** from your S3 bucket
2. **No manual configuration needed** - just upload and go!
3. **Refresh your gallery page** at `http://localhost:3000/gallery`
4. **Your images will appear** in reverse chronological order by event date

## Important Notes

- **Any naming convention works** - `IMG_0622.jpeg`, `photo_001.jpg`, `my_awesome_image.png`, etc.
- **Supported formats**: jpg, jpeg, png, gif, webp, mp4, mov, avi, mkv, webm
- **HEIC files are automatically filtered out** (not supported by Next.js)
- **Images are automatically sorted** by event date (most recent first)
- **No need to restart the server** - just save and refresh the page
- **Special characters in filenames** are handled automatically (URL encoding/decoding)

## Example: Adding a New Event

Let's say you want to add a new "Hackathon 2025" event:

### 1. Create the directory structure:
```
app/data/gallery/fall_2025/hackathon_2025/
└── event-info.json
```

### 2. Create the event-info.json:
```json
{
  "eventName": "Hackathon 2025",
  "date": "2025-10-15",
  "description": "Our first hackathon event!",
  "s3Path": "fall_2025/hackathon_2025"
}
```

### 3. Upload images to S3:
Upload your images to: `bfs-website-gallery-images/fall_2025/hackathon_2025/`

### 4. Done!
The images will automatically appear in your gallery, sorted by date.

## Troubleshooting

- **Images not showing?** 
  - Check that your S3 bucket policy allows public read access
  - Verify the `s3Path` in event-info.json matches your S3 folder structure
  - Make sure images are uploaded to the correct S3 folder

- **Wrong order?** 
  - Events are automatically sorted by date - check the `date` field in your `event-info.json` files
  - Use YYYY-MM-DD format for dates

- **403 errors?** 
  - Ensure your S3 bucket policy includes both `s3:GetObject` and `s3:ListBucket` permissions

- **HEIC files not showing?** 
  - HEIC files are automatically filtered out as they're not supported by Next.js Image component
  - Convert HEIC files to JPG/PNG format

## S3 Bucket Policy

Make sure your S3 bucket has the correct permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::bfs-website-gallery-images/*"
    },
    {
      "Sid": "PublicReadListBucket",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::bfs-website-gallery-images"
    }
  ]
}
```