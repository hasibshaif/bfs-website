# BFS Website

Baruch Full Stack's official website - a modern, responsive web application built with Next.js 15, featuring a dynamic gallery system powered by AWS S3.

## Features

- **Dynamic Gallery**: Automatically discovers and displays images from AWS S3 buckets
- **Event Management**: Easy-to-manage event system with chronological sorting
- **Modern UI**: Built with Tailwind CSS and custom design system
- **Performance Optimized**: Next.js 15 with Turbopack for fast development
- **Responsive Design**: Mobile-first approach with beautiful animations

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React, React Icons
- **TypeScript**: Full type safety
- **Image Storage**: AWS S3 with public access

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bfs_website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Gallery System

The gallery automatically discovers images from your AWS S3 bucket. To add new events:

1. Create an event folder: `app/data/gallery/[semester]/[event_name]/`
2. Add `event-info.json` with event metadata
3. Upload images to the corresponding S3 folder
4. Images will appear automatically!

See `app/data/gallery/HOW_TO_ADD_IMAGES.md` for detailed instructions.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── data/              # Static data and configurations
│   ├── gallery/           # Gallery page
│   └── ...
├── components/            # Reusable React components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/                # Static assets
└── types/                 # TypeScript type definitions
```

## Design System

This project uses a comprehensive design system with:
- Consistent color palette and typography
- Reusable component patterns
- Responsive breakpoints
- Animation utilities

See `components/DESIGN_SYSTEM.md` for full documentation.

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/new):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is private and proprietary to Baruch Full Stack.