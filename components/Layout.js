import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaFacebook,
  FaGithub,
  FaLinkedin
} from 'react-icons/fa';
import { useTheme } from 'next-themes';

function NavLink({ href, className, children, ...attributes }) {
  const { asPath } = useRouter();
  return (
    <Link href={href}>
      <a
        className={clsx(
          'block px-3 py-2 mx-1 hover:bg-purple-900 dark:hover:bg-gray-900 rounded-md',
          {
            'bg-purple-900 dark:bg-gray-900': asPath == href
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
          'text-purple-600 hover:text-purple-700 dark:text-blue-500 dark:hover:text-blue-600 py-1 text-md',
          className
        )}
        {...attributes}
      >
        {children}
      </a>
    </Link>
  );
}

function Layout({ children, withHero }) {
  const [toggled, toggle] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);
  return (
    <section className="font-mono absolute flex flex-col w-full h-full">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
        />
        <title>No Title</title>
      </Head>
      <header className="bg-gradient-to-b from-purple-900 to-purple-500 dark:from-gray-800 dark:to-black text-white">
        <nav className="flex flex-col sm:flex-row justify-between sm:max-w-screen-lg m-auto px-2 py-6">
          <div className="flex justify-between items-center">
            <NavLink href="/" className="font-bold text-xl sm:text-sm">
              arisris
            </NavLink>
            <div className="inline-flex">
              <div
                className="block p-2 font-bold hover:bg-purple-900 dark:hover:bg-gray-900 select-none mx-2 rounded-full"
                onClick={() =>
                  setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
                }
                role="button"
              >
                {mounted &&
                  (resolvedTheme === 'dark' ? (
                    <FaSun className="w-6 h-6" />
                  ) : (
                    <FaMoon className="w-6 h-6" />
                  ))}
              </div>
              <div
                className="block sm:hidden p-2 font-bold hover:bg-purple-900 dark:hover:bg-gray-900 select-none"
                onClick={() => toggle(!toggled)}
                role="button"
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
                'sm:flex': toggled,
                hidden: !toggled
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
          <div className="flex items-center justify-center px-2 py-4 sm:py-5">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl">{withHero.title}</h1>
              <p className="text-md">{withHero.subtitle}</p>
            </div>
          </div>
        ) : (
          ''
        )}
      </header>
      <main className="flex-auto">
        <div className="sm:max-w-screen-lg p-2 m-auto">{children}</div>
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
            <FaGithub className="w-4 h-4" /> <span>Github</span>
          </FooterLink>
          <FooterLink
            target="__blank"
            href="https://linkedin.com/in/sksnetid"
            className="flex items-center gap-2"
          >
            <FaLinkedin className="w-4 h-4" /> <span>LinkedIn</span>
          </FooterLink>
          <FooterLink
            target="__blank"
            href="https://fb.me/arisfungratis"
            className="flex items-center gap-2"
          >
            <FaFacebook className="w-4 h-4" /> <span>Facebook</span>
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
      <div className="mt-6 text-center">
        <span>&copy;{new Date().getFullYear()}</span>
        <FooterLink href="/"> Aris Riswanto</FooterLink>
      </div>
    </section>
  );
}

Layout.propTypes = {
  withHero: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string
  })
};

export default Layout;
