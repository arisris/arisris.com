import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import NextNProgress from 'nextjs-progressbar';
import { useRouter } from 'next/router';
import { StickyWaLink } from './StickyWaLink';
import { useTheme } from 'next-themes';
import {
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaFacebook,
  FaGithub,
  FaLinkedin
} from 'react-icons/fa';

function NavLink({
  href,
  className,
  children,
  withoutActiveLink,
  ...attributes
}) {
  const { asPath } = useRouter();
  return (
    <Link href={href}>
      <a
        className={clsx(
          'block px-3 py-2 mx-1 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md',
          {
            'bg-gray-50 dark:bg-gray-900':
              !withoutActiveLink && asPath == href
          },
          className
        )}
        {...attributes}
      >
        {children}
      </a>
    </Link>
  );
}
function FooterLink({ href, className, children, ...attributes }) {
  return (
    <Link href={href}>
      <a
        className={clsx(
          'text-gray-900 hover:text-gray-800 dark:text-gray-50 dark:hover:text-gray-100 p-2 text-md',
          className
        )}
        {...attributes}
      >
        {children}
      </a>
    </Link>
  );
}
const defaultMeta = {
  title: 'Arisris Dev | Arisris.com',
  description:
    "Hello. My name is Aris Riswanto. I'am Jamstack web developer from indonesia. I love web programing since 2009. If you want to hire me as your web developer lt contact me. :D",
  keywords:
    'Jamstack, React, Next.js, Node.js, PHP, Vercel, Netlify Web Developer, Indonesia',
  image: 'https://arisris.com/documents/banner.png',
  date: null,
  type: 'website'
};
function Layout({ children, withHero, ...customMeta }) {
  const router = useRouter();
  const [toggled, toggle] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const meta = { ...defaultMeta, ...customMeta };
  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
        />
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta content={meta.keywords} name="keywords" />
        <meta
          property="og:url"
          content={`https://arisris.com${router.asPath}`}
        />
        <link rel="canonical" href={`https://arisris.com${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Arisris.com" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@arisris" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <NextNProgress height={2} color="#209cee" />
      <section className="font-mono font-medium absolute flex flex-col w-full h-full">
<<<<<<< HEAD
        <header className="dark:bg-gradient-to-b dark:from-gray-900 dark:to-black dark:text-white text-purple-700">
=======
        <header className="dark:bg-gradient-to-b dark:from-gray-800 dark:to-black dark:text-white text-gray-900">
>>>>>>> a50c677242ce10265389254a2a29d01b85cf3ca6
          <nav className="flex flex-col sm:flex-row justify-between sm:max-w-screen-lg m-auto px-2 py-6 border-b border-gray-100 dark:border-none">
            <div className="flex justify-between items-center">
              <NavLink
                href="/"
                className="font-bold text-xl sm:text-sm"
                withoutActiveLink
              >
                Arisris.com
              </NavLink>
              <div className="inline-flex">
                <div
                  className="block p-2 font-bold hover:bg-gray-100 dark:hover:bg-gray-900 select-none mx-2 rounded-full"
                  onClick={() =>
                    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
                  }
                  role="button"
                  aria-label="Toggle Dark Mode"
                >
                  {mounted &&
                    (resolvedTheme === 'dark' ? (
                      <FaSun className="w-6 h-6" />
                    ) : (
                      <FaMoon className="w-6 h-6" />
                    ))}
                </div>
                <div
                  className="block sm:hidden p-2 font-bold hover:bg-gray-50 dark:hover:bg-gray-900 select-none rounded-full"
                  onClick={() => toggle(!toggled)}
                  role="button"
                  aria-label="Toggle Menu"
                >
                  {toggled ? (
                    <FaTimes className="w-6 h-6" />
                  ) : (
                    <FaBars className="w-6 h-6" />
                  )}
                </div>
              </div>
            </div>
            <div
              className={clsx(
                {
                  'animate__animated animate__fadeIn sm:flex': toggled,
                  'hidden': !toggled
                },
                'sm:flex flex-col sm:flex-row mt-2 sm:mt-0'
              )}
            >
              <NavLink href={`/posts`}>Posts</NavLink>
              <NavLink href={`/projects`}>Projects</NavLink>
              <NavLink href={`/about-me`}>About Me</NavLink>
              <NavLink href={`/guestbook`}>Guestbook</NavLink>
            </div>
          </nav>
          {withHero ? (
            <div className="prose dark:prose-dark text-center m-auto py-8">
              <h1>{withHero.title}</h1>
              <div className="text-center text-sm">{withHero.subtitle}</div>
            </div>
          ) : (
            ''
          )}
        </header>
        <main className="flex-auto">
          <div className="sm:max-w-screen-lg p-4 m-auto">{children}</div>
        </main>
        <footer className="w-full sm:max-w-screen-lg p-4 mr-auto sm:m-auto grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-32 md:gap-48">
          <div className="flex flex-col mt-auto">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/about-me">About Me</FooterLink>
            <FooterLink href="/guestbook">Guestbook</FooterLink>
          </div>
          <div className="mt-auto">
            <FooterLink
              target="__blank"
              href="https://github.com/arisris"
              className="flex items-center gap-2"
            >
              <span>Github</span>
            </FooterLink>
            <FooterLink
              target="__blank"
              href="https://linkedin.com/in/arisris"
              className="flex items-center gap-2"
            >
              <span>LinkedIn</span>
            </FooterLink>
            <FooterLink
              target="__blank"
              href="https://fb.me/arisfungratis"
              className="flex items-center gap-2"
            >
              <span>Facebook</span>
            </FooterLink>
          </div>
          <div className="flex flex-col mt-auto">
            <FooterLink target="__blank" href="https://vercel.com">
              Vercel
            </FooterLink>
            <FooterLink target="__blank" href="https://nextjs.org">
              NextJs
            </FooterLink>
            <FooterLink target="__blank" href="https://tailwindcss.com">
              Tailwindcss
            </FooterLink>
          </div>
        </footer>
        <div className="w-full sm:max-w-screen-lg m-auto px-5 py-4 text-sm">
          <span>&copy; {new Date().getFullYear()}</span>
          <FooterLink href="/"> Aris Riswanto</FooterLink>
        </div>
      </section>
      <StickyWaLink />
    </>
  );
}
export default Layout;
