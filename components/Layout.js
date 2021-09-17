import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import { useTheme } from 'next-themes';

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
            <Link href="/">
              <a className="flex flex-row p-2 font-bold text-white hover:bg-purple-900 dark:hover:bg-gray-900">
                arisris
              </a>
            </Link>
            <div className="inline-flex">
              <div
                className="block p-2 font-bold hover:bg-purple-900 dark:hover:bg-gray-900 select-none mx-2"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                role="button"
              >
                {mounted && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    {resolvedTheme === 'dark' ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    )}
                  </svg>
                )}
              </div>
              <div
                className="block sm:hidden p-2 font-bold hover:bg-purple-900 dark:hover:bg-gray-900 select-none"
                onClick={() => toggle(!toggled)}
                role="button"
              >
                {toggled ? (
                  <XIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
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
            <Link href="/posts">
              <a className="block p-2 mr-2 hover:bg-purple-900 dark:hover:bg-gray-900">
                Blog Posts
              </a>
            </Link>
            <Link href="/projects">
              <a className="block p-2 mr-2 hover:bg-purple-900 dark:hover:bg-gray-900">
                My Projects
              </a>
            </Link>
            <Link href="/about-me">
              <a className="block p-2 mr-2 hover:bg-purple-900 dark:hover:bg-gray-900">
                About Me
              </a>
            </Link>
            <Link href="/contact">
              <a className="block p-2 mr-2 hover:bg-purple-900 dark:hover:bg-gray-900">
                Contact
              </a>
            </Link>
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
              <Image
                alt="Github"
                src="https://icongr.am/devicon/github-original.svg"
                width="24"
                height="24"
              />
            </a>
            <a
              title="Facebook"
              className="flex items-center p-2 text-purple-900 dark:text-blue-300"
              href="https://facebook.com/arisfungratis"
            >
              <Image
                alt="Facebook"
                src="https://icongr.am/devicon/facebook-original.svg"
                width="24"
                height="24"
              />
            </a>
            <a
              title="LinkedIn"
              className="flex items-center p-2 text-purple-900 dark:text-blue-300"
              href="https://linkedin.com/in/sksnetid"
            >
              <Image
                alt="LinkedIn"
                src="https://icongr.am/devicon/linkedin-original.svg"
                width="24"
                height="24"
              />
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
            </a>
            {' '} &amp;{' Hosted By '}
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
