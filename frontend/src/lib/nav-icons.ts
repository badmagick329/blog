import type { StaticImageData } from 'next/image';

import EmailImage from '../../public/images/email.webp';
import HomeImage from '../../public/images/home-icon.webp';
import IDImage from '../../public/images/id-card.webp';
import LetterImage from '../../public/images/letter.webp';

export type NavLabel = 'Home' | 'Blog' | 'About' | 'Contact';

export type NavIconConfig = {
  href: string;
  label: NavLabel;
  image: StaticImageData;
  alt: string;
  mobileSizeClassName?: string;
};

export const navIconConfig: Record<NavLabel, NavIconConfig> = {
  Home: {
    href: '/',
    label: 'Home',
    image: HomeImage,
    alt: 'Home Icon',
    mobileSizeClassName: 'max-h-6 max-w-6',
  },
  About: {
    href: '/about',
    label: 'About',
    image: IDImage,
    alt: 'ID Card Icon',
    mobileSizeClassName: 'max-h-6 max-w-6',
  },
  Blog: {
    href: '/posts',
    label: 'Blog',
    image: LetterImage,
    alt: 'Blog Icon',
    mobileSizeClassName: 'max-h-[1.45rem] max-w-[1.45rem]',
  },
  Contact: {
    href: '/contact',
    label: 'Contact',
    image: EmailImage,
    alt: 'Email Icon',
    mobileSizeClassName: 'max-h-[1.35rem] max-w-[1.35rem]',
  },
};

export const homeQuickLinkLabels: NavLabel[] = ['About', 'Blog', 'Contact'];
