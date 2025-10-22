
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bot, LayoutGrid, Menu, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthButtons } from '@/components/auth-buttons';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
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
  );
}
