# Event Data Structure

This directory contains event metadata for the gallery. Each event is organized by semester and event name.

## Structure

```
app/data/gallery/
├── spring_2025/
│   ├── club_showcase/
│   │   └── event-info.json
│   ├── gim/
│   │   └── event-info.json
│   ├── intro_to_react/
│   │   └── event-info.json
│   └── fireside_chat_with_naman_pujari/
│       └── event-info.json
└── fall_2025/
    └── club_fair/
        └── event-info.json
```

## event-info.json Format

Each event folder must contain an `event-info.json` file with the following structure:

```json
{
  "eventName": "Event Name",
  "date": "YYYY-MM-DD",
  "description": "Event description",
  "s3Path": "semester/event_name"
}
```

## S3 Integration

- Set `s3Path` to the S3 folder path (e.g., "spring_2025/club_showcase")
- Images are stored in the `bfs-website-gallery-images` S3 bucket
- Supported formats: jpg, jpeg, png, gif, webp, heic, mp4, mov, avi, mkv, webm
- Images are served directly from S3 with public read access
- Events are automatically sorted by date in reverse chronological order

## Adding New Events

1. Create a new folder: `app/data/gallery/[semester]/[event_name]/`
2. Add `event-info.json` with event metadata and S3 path
3. Upload media files to the corresponding S3 folder: `bfs-website-gallery-images/[semester]/[event_name]/`
4. **Images are discovered automatically** - no manual configuration needed!

### Example:
```json
// In app/data/gallery/fall_2025/hackathon_2025/event-info.json
{
  "eventName": "Hackathon 2025",
  "date": "2025-10-15",
  "description": "Our first hackathon event!",
  "s3Path": "fall_2025/hackathon_2025"
}
```

**That's it!** The gallery will automatically discover and display all images from the S3 folder.

## S3 Bucket Structure

```
bfs-website-gallery-images/
├── fall_2025/
│   └── club_fair/
│       ├── image1.jpg
│       ├── image2.jpg
│       └── image3.jpg
└── spring_2025/
    ├── club_showcase/
    │   ├── image1.jpg
    │   ├── image2.png
    │   └── image3.png
    ├── gim/
    │   ├── image1.jpg
    │   ├── image2.jpg
    │   └── image3.jpg
    ├── intro_to_react/
    │   ├── image1.png
    │   ├── image2.png
    │   ├── image3.jpg
    │   └── image4.png
    └── fireside_chat_with_naman_pujari/
        ├── image1.png
        ├── image2.jpg
        └── image3.jpg
```

## Benefits of This Structure

- ✅ No dependency on Google Drive API or refresh tokens
- ✅ Direct S3 access with public read permissions
- ✅ Clean separation of metadata from static assets
- ✅ Easy to add new events and semesters
- ✅ Scalable and maintainable
- ✅ Future-proof for database integration
- ✅ Automatic chronological sorting by event date
