
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter, Poppins } from 'next/font/google';
import { Header } from '@/components/header';
import { Bot } from 'lucide-react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'PitchCraft AI',
  description: 'Transform your startup idea into a complete business package with AI-powered pitch generation and professional website code.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <head>
      </head>
      <body className="font-body antialiased bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider
            defaultTheme="system"
            storageKey="vite-ui-theme"
        >
        <FirebaseClientProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-grow">
              {children}
            </main>

            <footer className="py-8 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 dark:text-slate-400">
                <div className="flex justify-center items-center gap-2 mb-4">
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                </div>
                <p className="font-headline text-lg font-bold text-slate-800 dark:text-slate-200">PitchCraft AI</p>
                <p className="mt-2 text-sm">Built with Firebase and Genkit</p>
                <p className="mt-1 text-sm max-w-md mx-auto">Transform your innovative ideas into compelling startup pitches with the power of artificial intelligence.</p>
                <div className="mt-4 flex justify-center gap-4 text-sm font-semibold">
                  <span>AI-Powered</span>
                  <span>Real-time</span>
                  <span>Secure</span>
                </div>
              </div>
            </footer>
          </div>
          <Toaster />
        </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
