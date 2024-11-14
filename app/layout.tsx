import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner";
import { MainNav } from "@/components/main-nav";
import { AuthProvider } from "@/components/auth-provider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KnowPC - Computer Systems Servicing',
  description: 'Master computer systems servicing through structured, self-paced learning.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <MainNav />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}