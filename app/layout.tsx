import '@/styles/globals.css';

import { inter } from '@/lib/fonts';
import { cn } from '@/lib/cn';
import { ThemeProvider } from '@/components/theme/theme-provider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Type Trainer',
  description:
    'A tool created using Next.js to help you improve your typing speed.',
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
          'h-screen bg-background font-inter antialiased',
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
