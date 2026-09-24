'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';



type NavChild = {
  label: string;
  href: string;
  description: string;
};

type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Discover',
    href: '/discover',
    children: [
      {
        label: 'Open now',
        href: '/#',
        description: 'Kitchens taking orders and tables right this minute',
      },
      {
        label: 'Near you',
        href: '/#',
        description: 'Ranked by distance from where you are',
      },
      {
        label: 'Top rated',
        href: '/#',
        description: 'The highest-reviewed spots on the platform',
      },
      {
        label: 'What are you in the mood for?',
        href: '/#',
        description: "Pick a craving and we'll match the kitchen",
      },
    ],
  },
  {
    label: 'Order food',
    href: '/#',
    children: [
      {
        label: 'Delivery',
        href: '/#',
        description: 'Get it brought straight to your door',
      },
      {
        label: 'Pickup',
        href: '/#',
        description: 'Skip the wait, grab it on your way',
      },
      {
        label: 'Order again',
        href: '/#',
        description: "Reorder something you've had before",
      },
    ],
  },
  {
    label: 'Book a table',
    href: '/#',
    children: [
      {
        label: 'Find a table',
        href: '/#',
        description: 'Search by date, time, and party size',
      },
      {
        label: 'My reservations',
        href: '/#',
        description: 'View, change, or cancel an upcoming booking',
      },
    ],
  },
  {
    label: 'For restaurants',
    href: '/#',
    children: [
      {
        label: 'Register your restaurant',
        href: '/#',
        description: 'List your kitchen and start taking orders',
      },
      {
        label: 'Counter and kitchen',
        href: '/#',
        description: 'Manage incoming orders and tables in real time',
      },
    ],
  },
  { label: 'Help', href: '/#' },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
    >
      <path d="M5 7.5l5 5 5-5" />
    </svg>
  );
}

function DesktopNavItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => setOpen(true)}
      onBlur={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        className="flex items-center gap-1 text-sm font-medium text-neutral-300 transition-colors hover:text-white"
      >
        {item.label}
        <ChevronIcon open={open} />
      </button>

      <div
        className={[
          'absolute left-1/2 top-full z-40 w-80 -translate-x-1/2 pt-3',
          'transition-all duration-200 ease-out',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2 opacity-0',
        ].join(' ')}
      >
        <div className="rounded-2xl border border-white/10 bg-neutral-900/95 p-3 shadow-xl shadow-black/40 backdrop-blur-sm">
          {item.children.map(child => (
            <Link
              key={child.label}
              href={child.href}
              className="group block rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5"
            >
              <p className="text-sm font-medium text-white transition-transform duration-200 group-hover:translate-x-0.5">
                {child.label}
              </p>
              <p className="mt-0.5 text-xs text-neutral-500">
                {child.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileNavItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="block py-3 text-sm font-medium text-neutral-200"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-white/5 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-3 text-sm font-medium text-neutral-200"
      >
        {item.label}
        <ChevronIcon open={open} />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open
            ? 'grid-rows-[1fr] pb-3 opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          {item.children.map(child => (
            <Link
              key={child.label}
              href={child.href}
              className="block rounded-lg px-3 py-2 text-sm text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b  bg-black/80 py-4 shadow-lg shadow-black/30 backdrop-blur-md  border-red-500'
          : 'border-b border-transparent bg-black py-5',
      ].join(' ')}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Citizen" width={120} height={120} />
          <span className="text-lg font-semibold text-emerald-400">
            Restaurant
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map(item => (
            <DesktopNavItem key={item.label} item={item} />
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/#"
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
          >
            Sign in
          </Link>
          <Link
            href="/#"
            className="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-red-400"
          >
            Get started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(v => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-white transition-transform duration-300 ${
              mobileOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-opacity duration-300 ${
              mobileOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-transform duration-300 ${
              mobileOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      <div
        className={`grid transition-all duration-300 ease-out lg:hidden ${
          mobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="mx-auto max-w-6xl border-t border-white/10 px-6 py-2 sm:px-10">
            {NAV_ITEMS.map(item => (
              <MobileNavItem key={item.label} item={item} />
            ))}
            <div className="flex flex-col gap-3 border-t border-white/5 py-4">
              <Link
                href="/#"
                className="text-sm font-medium text-neutral-200"
              >
                Sign in
              </Link>
              <Link
                href="/#"
                className="rounded-full bg-red-500 px-4 py-2.5 text-center text-sm font-medium text-white"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
