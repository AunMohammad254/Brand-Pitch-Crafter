
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Bot, LayoutGrid, Menu, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { AuthButtons } from '@/components/auth-buttons';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>PitchCraft AI</title>
        <meta name="description" content="Transform your startup idea into a complete business package with AI-powered pitch generation and professional website code." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider
            defaultTheme="system"
            storageKey="vite-ui-theme"
        >
        <FirebaseClientProvider>
          <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-slate-200 dark:bg-slate-900/80 dark:border-slate-800">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2">
                      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg">
                        <Bot className="h-6 w-6 text-white" />
                      </div>
                      <span className="font-headline text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">PitchCraft AI</span>
                    </Link>
                  </div>
                  <nav className="hidden md:flex items-center gap-2">
                    <Link href="/">
                      <Button variant="ghost" size="sm">
                        <Pencil className="mr-2 h-4 w-4" />
                        Generate Pitch
                      </Button>
                    </Link>
                    <Link href="/my-pitches">
                      <Button variant="ghost" size="sm">
                        <LayoutGrid className="mr-2 h-4 w-4" />
                        My Pitches
                      </Button>
                    </Link>
                    <AuthButtons />
                    <ThemeToggle />
                  </nav>
                  <div className="md:hidden flex items-center gap-2">
                    <ThemeToggle />
                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Menu className="h-5 w-5"/>
                          <span className="sr-only">Open Menu</span>
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>
                            <VisuallyHidden>Mobile Menu</VisuallyHidden>
                          </SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col gap-4 mt-8">
                            <Link href="/" onClick={handleLinkClick}>
                              <Button variant="ghost" className="w-full justify-start">
                                <Pencil className="mr-2 h-4 w-4" />
                                Generate Pitch
                              </Button>
                            </Link>
                            <Link href="/my-pitches" onClick={handleLinkClick}>
                              <Button variant="ghost" className="w-full justify-start">
                                <LayoutGrid className="mr-2 h-4 w-4" />
                                My Pitches
                              </Button>
                            </Link>
                            <div className="border-t pt-4">
                                <AuthButtons />
                            </div>
                        </nav>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </div>
            </header>
            
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

// Remove the default metadata export
// export const metadata: Metadata = { ... }
