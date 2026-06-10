import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/providers/Providers';

export const metadata: Metadata = {
  title: 'APJ TRUE LIFE — Doctor Dashboard',
  description: 'Clinical management dashboard for APJ TRUE LIFE Ayurvedic Medical Centre',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
