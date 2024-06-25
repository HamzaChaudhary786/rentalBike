import { Metadata } from 'next';
import { ASSETS } from '../../constants';
import UnauthWrapper from '../../commonComponents/unauthWrapper';

const baseURL = 'https://asimbilal.com';
const pageUrl = `${baseURL}/sign-up`;
const pageImage = ASSETS.logo;
const title = `Sign up | Your Custom Link to Infinite Horizons |`;
const description = 'Sign up | Your Custom Link to Infinite Horizons |';

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    url: pageUrl,
    siteName: pageUrl,
    images: [
      {
        url: pageImage,
        secureUrl: pageImage,
        alt: 'Asim Bilal Logo',
      },
    ],
  },
  twitter: {
    title: title,
    description: description,
    card: 'summary_large_image',
    images: [
      {
        url: pageImage,
        secureUrl: pageImage,
        alt: 'Asim Bilal Logo',
      },
    ],
  },
};
export default function ChildLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
