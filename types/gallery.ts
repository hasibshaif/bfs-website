export interface EventInfo {
  eventName: string;
  date: string;
  description: string;
}

export interface EventFolder {
  name: string;
  path: string;
  mediaFiles: string[];
  eventInfo: EventInfo;
  mediaUrls?: string[];
  videoThumbnailUrls?: string[];
}

export interface ModalImage {
  src: string;
  alt: string;
  eventName: string;
  date: string;
  description: string;
}
