import './styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import config from '@/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: config.site.name,
    template: `%s - ${config.site.name}`,
  },
  description: config.site.description,
  authors: config.site.authors,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
