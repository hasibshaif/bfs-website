# Event Data Structure

This directory contains event metadata for the gallery. Each event is organized by semester and event name.

## Structure

```
app/data/gallery/
├── spring_2025/
│   ├── club_showcase/
│   │   └── event-info.json
│   └── gim/
│       └── event-info.json
└── fall_2024/
    └── [future events]/
        └── event-info.json
```

## event-info.json Format

Each event folder must contain an `event-info.json` file with the following structure:

```json
{
  "eventName": "Event Name",
  "date": "YYYY-MM-DD",
  "description": "Event description",
  "googleDriveFolderId": "your_google_drive_folder_id"
}
```

## Google Drive Integration

- Set `googleDriveFolderId` to your Google Drive folder ID
- The folder should contain all media files (images, videos) for the event
- Supported formats: jpg, jpeg, png, gif, webp, heic, mp4, mov, avi, mkv, webm
- If no `googleDriveFolderId` is provided, the system will look for local files (not recommended)

## Adding New Events

1. Create a new folder: `app/data/gallery/[semester]/[event_name]/`
2. Add `event-info.json` with event metadata
3. Set up a Google Drive folder and add the folder ID
4. Upload media files to the Google Drive folder

## Benefits of This Structure

- ✅ Clean separation of metadata from static assets
- ✅ Easy to add new events and semesters
- ✅ No need to store actual media files locally
- ✅ Scalable and maintainable
- ✅ Future-proof for database integration
