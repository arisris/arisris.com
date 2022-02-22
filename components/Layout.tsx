import { useState, useEffect, PropsWithChildren, ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { FaWhatsapp } from "react-icons/fa";
import { HiSun, HiMoon, HiX, HiMenu } from "react-icons/hi";
import { useTheme } from "next-themes";
import { defaultMeta } from "data/headers";

function StickyWaLink() {
  return (
    <a
      title="Chat with me"
      target="__blank"
      href="https://s.id/I5vIJ"
      className="fixed bottom-1 right-1 z-50 m-2 p-2 bg-gray-100 dark:bg-gray-900 rounded-full hover:scale-105 hover:shadow-md"
      style={{
        color: "#0C9715"
      }}
    >
      <FaWhatsapp className="w-10 h-10" />
    </a>
  );
}

function NavLink({
  href,
  className,
  children,
  withoutActiveLink,
  ...attributes
}: PropsWithChildren<
  { href: string; className?: string; withoutActiveLink?: boolean } & Record<
    any,
    any
  >
>) {
  const { asPath } = useRouter();
  return (
    <Link href={href}>
      <a
        className={clsx(
          "flex items-center px-3 py-2 mx-1 rounded-md text-lg",
          {
            "bg-gray-50 dark:bg-gray-900": !withoutActiveLink && asPath == href
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

function FooterLink({
  href,
  className,
  children,
  ...attributes
}: PropsWithChildren<{ href: string; className?: string } & Record<any, any>>) {
  return (
    <Link href={href}>
      <a
        className={clsx(
          "text-gray-800 hover:text-gray-700 dark:text-gray-50 dark:hover:text-gray-100 p-2 text-md",
          className
        )}
        {...attributes}
      >
        {children}
      </a>
    </Link>
  );
}

export type LayoutProps = PropsWithChildren<
  {
    withHero?: {
      title?: ReactNode;
      subtitle?: ReactNode;
    };
    className?: string;
    showFooterLinks?: boolean;
  } & Partial<typeof defaultMeta> &
    Record<any, any>
>;
function Layout({
  children,
  withHero,
  showFooterLinks = true,
  ...customMeta
}: LayoutProps) {
  const router = useRouter();
  const [toggled, toggle] = useState(false);
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const meta = { ...defaultMeta, ...customMeta };
  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);
  const defaultImage = `https://og-image.vercel.app/${encodeURIComponent(
    meta.title
  )}.png?theme=dark&md=1&fontSize=100px`;
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
        <meta property="og:image" content={meta.image || defaultImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@arisris" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image || defaultImage} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <section className="absolute flex flex-col w-full h-full">
        <header className="dark:text-white text-gray-900">
          <nav
            className="flex flex-col sm:flex-row justify-between sm:max-w-screen-md m-auto px-2 py-6"
            id="navbar"
          >
            <div className="flex justify-between items-center">
              <div
                className="block p-2 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 select-none mx-2"
                onClick={(e) => {
                  e.preventDefault();
                  theme.setTheme(
                    theme.resolvedTheme === "dark" ? "light" : "dark"
                  );
                }}
                role="button"
                aria-label="Toggle Dark Mode"
              >
                {mounted &&
                  (theme.resolvedTheme === "dark" ? (
                    <HiSun size={32} />
                  ) : (
                    <HiMoon size={32} />
                  ))}
              </div>
              <div
                className="block sm:hidden p-2 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 select-none"
                onClick={() => toggle(!toggled)}
                role="button"
                aria-label="Toggle Menu"
              >
                {toggled ? <HiX size={32} /> : <HiMenu size={32} />}
              </div>
            </div>
            <div
              className={clsx(
                {
                  "sm:flex": toggled,
                  hidden: !toggled
                },
                "sm:flex flex-col sm:flex-row mt-2 sm:mt-0"
              )}
            >
              <NavLink href={`/`}>Home</NavLink>
              <NavLink href={`/guestbook`}>Guestbook</NavLink>
              <NavLink href={`/code`}>Code Snipet</NavLink>
              <NavLink href={`/tools`}>Tools</NavLink>
            </div>
          </nav>
          {withHero ? (
            <div className="prose-indigo text-center m-auto py-8">
              <h1>{withHero.title}</h1>
              <div className="text-center text-sm">{withHero.subtitle}</div>
            </div>
          ) : (
            ""
          )}
        </header>
        <main className="flex-auto">
          <div className="sm:max-w-screen-md p-4 m-auto">{children}</div>
        </main>
        {showFooterLinks && (
          <footer className="w-full sm:max-w-screen-md p-4 mr-auto sm:m-auto grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-32 md:gap-48">
            <div className="flex flex-col mt-auto">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/code">Code Snipet</FooterLink>
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
        )}
        <div className="w-full sm:max-w-screen-md m-auto px-5 py-6 font-light">
          <span>&copy; {new Date().getFullYear()}</span>
          <FooterLink href="https://github.com/arisris/arisris.vercel.app">
            Aris Riswanto,
          </FooterLink>
          <span>Hosted at:</span>
          <FooterLink href="https://vercel.com">Vercel</FooterLink>
        </div>
      </section>
      <StickyWaLink />
    </>
  );
}
export default Layout;
