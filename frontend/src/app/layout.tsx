import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ReactQueryProvider from './providers/ReactQueryProvider';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Book Kart',
  description: 'This is e-commerce platform where you can buy or sell your used books',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>
        <ReactQueryProvider>
          <Header />
          {children}
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
