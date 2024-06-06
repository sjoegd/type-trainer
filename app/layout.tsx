import '@/styles/globals.css';

import { inter } from '@/lib/fonts';
import { cn } from '@/lib/cn';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Type Trainer',
  description: 'Train your typing skills.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-inter antialiased',
          inter.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
