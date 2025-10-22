
# PitchCraft AI 🚀

Transform your startup idea into a complete business package with AI-powered pitch generation and a professional website.

![PitchCraft AI Screenshot](https://images.unsplash.com/photo-1760888549280-4aef010720bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxhcHAlMjBpbnRlcmZhY2V8ZW58MHx8fHwxNzYxMTA0MzI3fDA&ixlib=rb-4.1.0&q=80&w=1080)

## ✨ Features

-   **AI-Powered Idea Generation**: Describe your vision, and our AI generates a unique startup name, compelling taglines, and a full brand identity.
-   **Comprehensive Brand Assets**: Receive a complete suite of branding materials, including target audience analysis, detailed landing page copy, and creative logo suggestions.
-   **Instant Landing Page**: Generate a complete, ready-to-deploy HTML landing page based on your startup's assets, with just one click.
-   **Interactive Previews**: Instantly preview your generated landing page and branding within the app.
-   **Save & Manage Pitches**: Authenticated users can save, view, and manage all their generated startup pitches in one place.
-   **Modern & Responsive UI**: A sleek, modern interface built with Next.js, Tailwind CSS, and ShadCN UI, fully responsive for all devices.
-   **Light & Dark Mode**: A beautiful and consistent user experience in both light and dark themes.

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Genkit](https://img.shields.io/badge/Genkit-6D28D9?style=for-the-badge&logo=google-cloud&logoColor=white)

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **UI Library**: [React](https://reactjs.org/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
-   **Backend & Auth**: [Firebase](https://firebase.google.com/) (Authentication, Firestore)
-   **AI**: [Genkit](https://firebase.google.com/docs/genkit) with Google's Gemini models

## 🚀 Getting Started

This project is built to run seamlessly within Firebase Studio.

1.  **Open in Firebase Studio**: Launch this project in your Firebase Studio environment.
2.  **Run the Development Server**: The project is configured to run automatically. The main application will be available at its designated port (e.g., `http://localhost:9002`).
3.  **Start Generating**: Navigate to the home page (`src/app/page.tsx`) to begin generating your first startup pitch!

### Local Development (Outside Firebase Studio)

To run this project locally, you'll need to set up your environment:

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd <your-repo-name>
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Firebase**:
    - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - Add a new Web App to your project to get your Firebase config.
    - Update the `src/firebase/config.ts` file with your project's configuration.
    - Set up Firebase Authentication (Email/Password) and Firestore.

4.  **Set up Genkit**:
    - You will need a `.env` file with your `GEMINI_API_KEY`.
    - Follow the [Genkit documentation](https://firebase.google.com/docs/genkit/get-started) to configure your environment.

5.  **Run the app**:
    ```bash
    npm run dev
    ```

## ☁️ Deployment

This application is optimized for deployment on **Firebase App Hosting**.

-   The `apphosting.yaml` file contains the basic configuration for App Hosting.
-   The `package.json` `build` and `start` scripts are configured for a standard Next.js deployment.
-   Deployment can be managed through the Firebase CLI or the Firebase Console.

## 📚 Learn More

To learn more about the technologies used in this project, check out the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [React Documentation](https://reactjs.org/docs/getting-started.html) - learn about React.
-   [Firebase Documentation](https://firebase.google.com/docs) - learn about Firebase services.
-   [Genkit Documentation](https://firebase.google.com/docs/genkit) - learn about building with Genkit.
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS.
