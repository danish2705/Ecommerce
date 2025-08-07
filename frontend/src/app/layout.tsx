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
  description: 'This is an e-commerce platform where you can buy or sell your used books',
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => (
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

export default RootLayout;
