# Lumina Learning Frontend

This is the frontend for the **High-Concurrency Video Learning Engine (POC)**. It is built using **Remix** and **TypeScript**, providing a highly polished, enterprise-grade user experience for a modern Learning Management System (LMS).

## 🚀 Tech Stack

*   **Framework:** [Remix](https://remix.run/) (React)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
*   **Icons:** [Lucide React](https://lucide.dev/) & [Bootstrap Icons](https://icons.getbootstrap.com/)
*   **Video Player:** [Video.js](https://videojs.com/) with HLS support
*   **Animation:** [Tailwind Animate](https://github.com/jamiebuilds/tailwindcss-animate) & [Animate.css](https://animate.style/)
*   **Legacy Integration:** Includes a set of premium UI assets (JQuery, Bootstrap, Owl Carousel) located in `/public/lumina-assets/`.

## 🛠️ Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn

### Installation

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Development

Start the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173` (or the port specified by Vite).

### Build

To build the application for production:
```bash
npm run build
```

To start the production server:
```bash
npm run start
```

## 📂 Project Structure

*   `app/routes/`: Contains the page components and routing logic.
    *   `_index.tsx`: Landing page with hero section and categories.
    *   `courses.tsx`: Course listing page.
    *   `course.$id.tsx`: Interactive course player and lesson details.
    *   `auth.tsx`: Login and registration page.
*   `app/components/`: Reusable UI components.
    *   `VideoPlayer.tsx`: HLS-compatible video player wrapper.
    *   `LessonList.tsx`: Interactive sidebar for course navigation.
    *   `lumina/`: Core layout components (Navbar, Footer).
*   `public/lumina-assets/`: Static assets including CSS, JS plugins (JQuery), images, and fonts used for the "Enterprise-dark" aesthetic.

## 🔗 Backend Integration

The frontend is designed to interact with a Go backend. Key integration points include:
*   **Authentication:** JWT-based login/register.
*   **Video Streaming:** Serving `.m3u8` playlists for adaptive bitrate streaming.
*   **Real-time Progress:** WebSocket connection for synchronizing video timestamps (currently in prototype mode).
*   **Document Downloads:** Targeted endpoint for watermarked PDF/DOCX files.

## 🎨 Design Philosophy

The project follows a **"SaaS-clean"** aesthetic with:
*   Dark mode default for the video player environment.
*   High-contrast typography (Geist Variable).
*   Glassmorphism elements and smooth micro-animations.
*   Responsive layouts for all device sizes.
