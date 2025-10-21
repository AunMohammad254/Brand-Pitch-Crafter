import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Sparkles, LayoutGrid, LogOut, ArrowLeft, Pencil, Bot, FileCheck, Save, ChevronRight, FileText, Code, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-slate-50 text-slate-800">
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-slate-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-headline text-2xl font-extrabold text-slate-900 tracking-tight">PitchCraft AI</span>
                  </div>
                </div>
                <nav className="hidden md:flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Pencil className="mr-2 h-4 w-4" />
                    Generate Pitch
                  </Button>
                  <Button variant="ghost" size="sm">
                    <LayoutGrid className="mr-2 h-4 w-4" />
                    My Pitches
                  </Button>
                  <Button variant="ghost" size="sm">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </nav>
                <Button variant="ghost" className="md:hidden">
                  <Settings className="h-5 w-5"/>
                </Button>
              </div>
            </div>
          </header>
          
          <main className="flex-grow">
            {children}
          </main>

          <footer className="py-8 bg-white border-t border-slate-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500">
              <div className="flex justify-center items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg">
                  <Bot className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="font-headline text-lg font-bold text-slate-800">PitchCraft AI</p>
              <p className="mt-2 text-sm">Built with ❤️ by Aun Abbas using React + Supabase + Gemini</p>
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
      </body>
    </html>
  );
}
