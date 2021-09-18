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
      <header className="block bg-purple-800 dark:bg-gray-800 text-white shadow-sm">
        <nav className="flex flex-col sm:flex-row justify-between sm:max-w-screen-lg m-auto px-2 py-6">
          <div className="flex justify-between items-center">
            <NavLink href="/" className="font-bold text-xl sm:text-sm">arisris</NavLink>
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
            <NavLink href={`/about-me`}>AboutMe</NavLink>
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
        <div className="prose dark:prose-dark sm:max-w-screen-lg p-2 m-auto">
          {children}
        </div>
      </main>
      <footer className="text-center p-2 mt-4">
        <div className="italic text-md">
          <div className="flex justify-center">
            <a
              title="Github"
              className="flex items-center p-2 text-purple-900 dark:text-blue-300"
              href="https://github.com/arisris"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              title="Facebook"
              className="flex items-center p-2 text-purple-900 dark:text-blue-300"
              href="https://facebook.com/arisfungratis"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
            <a
              title="LinkedIn"
              className="flex items-center p-2 text-purple-900 dark:text-blue-300"
              href="https://linkedin.com/in/sksnetid"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
          </div>
          <div className="ml-1">
            Starter project based on{' '}
            <a
              href="https://github.com/arisris/wapblog"
              target="__blank"
              className="text-purple-900 dark:text-blue-300"
            >
              WapBlog
            </a>
          </div>
          <div className="ml-1">
            Build With{' '}
            <a
              href="https://nextjs.org"
              target="__blank"
              className="text-purple-900 dark:text-blue-300"
            >
              Next
            </a>{' '}
            &amp;{' '}
            <a
              href="https://tailwindcss.com"
              target="__blank"
              className="text-purple-900 dark:text-blue-300"
            >
              Tailwind
            </a>{' '}
            &amp;{' Hosted By '}
            <a
              href="https://vercel.com"
              target="__blank"
              className="text-purple-900 dark:text-blue-300"
            >
              Vercel
            </a>
          </div>
          <span>&copy; {new Date().getFullYear()}</span>
          <Link href="https://github.com/arisris">
            <a className="ml-1 text-purple-900 dark:text-blue-300">
              Aris Riswanto
            </a>
          </Link>
        </div>
      </footer>
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
