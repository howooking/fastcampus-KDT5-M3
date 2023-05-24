import './globals.css';
import { Roboto } from 'next/font/google';
import Sidebar from '@/components/sidebar';
import DarkmodeProvider from '@/context/DarkmodeProvider';
import { Metadata } from 'next';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Todo',
  description: 'Super Fast Campus Personal Todo Application Project',
  authors: { name: 'howoo', url: 'https://github.com/howooking' },
  creator: 'howoo',
  applicationName: 'Fast Campus Todo App',
  keywords: [
    'fast campus frontend boot camp',
    'todo',
    'react todo',
    'next13 todo',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} h-screen`}>
        <DarkmodeProvider>
          <div className="flex h-full">
            <Sidebar />
            {children}
          </div>
        </DarkmodeProvider>
      </body>
    </html>
  );
}
