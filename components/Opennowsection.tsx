'use client';

import { useEffect, useRef, useState } from 'react';
import { Fraunces, Instrument_Sans } from 'next/font/google';
import Image from 'next/image';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

type Restaurant = {
  id: string;
  name: string;
  area: string;
  cuisines: string[];
  rating: number;
  reviews: number;
  services: ('delivery' | 'pickup' | 'tables')[];
  image: string;
};

const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Dhanmondi Kacchi Bari',
    area: 'Dhanmondi, Dhaka',
    cuisines: ['Bengali', 'Mughlai'],
    rating: 5.0,
    reviews: 128,
    services: ['delivery', 'pickup'],
    image: '/resturents/1.jpg',
  },
  {
    id: '2',
    name: 'Sylhet Cha Adda',
    area: 'Sylhet Sadar, Sylhet',
    cuisines: ['Café', 'Snacks'],
    rating: 4.9,
    reviews: 64,
    services: ['delivery', 'pickup', 'tables'],
    image: '/resturents/2.jpg',
  },
  {
    id: '3',
    name: 'Ramu Bhaat Ghor',
    area: "Ramu, Cox's Bazar",
    cuisines: ['Bengali', 'Seafood'],
    rating: 4.7,
    reviews: 41,
    services: ['delivery', 'pickup', 'tables'],
    image: '/resturents/3.jpg',
  },
  {
    id: '4',
    name: 'Rangpur Chullah',
    area: 'Rangpur Sadar, Rangpur',
    cuisines: ['Bengali', 'Homestyle'],
    rating: 4.7,
    reviews: 37,
    services: ['delivery', 'pickup', 'tables'],
    image: '/resturents/4.jpg',
  },
  {
    id: '5',
    name: 'Chattogram Shutki Bari',
    area: 'Panchlaish, Chattogram',
    cuisines: ['Bengali', 'Seafood'],
    rating: 4.8,
    reviews: 52,
    services: ['delivery', 'tables'],
    image: '/resturents/5.jpg',
  },
  {
    id: '6',
    name: 'Gazipur Bhorta Ghor',
    area: 'Gazipur Sadar, Gazipur',
    cuisines: ['Bengali', 'Vegetarian'],
    rating: 4.6,
    reviews: 29,
    services: ['delivery', 'pickup'],
    image: '/resturents/6.jpg',
  },
  {
    id: '7',
    name: 'Gazipur Bhorta Ghor',
    area: 'Gazipur Sadar, Gazipur',
    cuisines: ['Bengali', 'Vegetarian'],
    rating: 4.6,
    reviews: 29,
    services: ['delivery', 'pickup'],
    image: '/resturents/1.jpg',
  },
];

const serviceMeta = {
  delivery: {
    label: 'Delivery',
    icon: <path d="M3 7h9v7H3zM12 10h4l3 3v1h-7z" />,
  },
  pickup: {
    label: 'Pickup',
    icon: <path d="M4 8h12l-1 9H5zM8 8V6a2 2 0 1 1 4 0v2" />,
  },
  tables: {
    label: 'Tables',
    icon: <path d="M3 9h14M6 9v7M14 9v7M9 4h2v3H9z" />,
  },
} as const;

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-3.5 w-3.5 ${filled ? 'fill-[#E0A526]' : 'fill-white/15'}`}
    >
      <path d="M10 1.5l2.47 5.24 5.78.55-4.36 3.9 1.3 5.66L10 13.9l-5.19 2.95 1.3-5.66-4.36-3.9 5.78-.55z" />
    </svg>
  );
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-3 w-3 stroke-[#B9B4A9] stroke-[1.4] fill-none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export default function OpenNowSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);
    return () => {
      el.removeEventListener('scroll', updateEdges);
      window.removeEventListener('resize', updateEdges);
    };
  }, []);

  const slide = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85 * (dir === 'left' ? -1 : 1);
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section
      className={`${instrumentSans.className} bg-[#0E0E0D] px-6 py-16 sm:px-10`}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4FAE7D] opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4FAE7D]" />
              </span>
              <span className="text-xs font-medium tracking-wide text-[#4FAE7D]">
                Live right now
              </span>
            </div>

            <h2
              className={`${fraunces.className} mt-3 text-3xl font-medium leading-tight text-[#F5EFE6] sm:text-4xl`}
            >
              Open now
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#B9B4A9]">
              Kitchens are firing and tables are turning across the country.
              Here&rsquo;s who&rsquo;s ready to feed you this minute, from
              roadside dhabas to family bhaat ghors.
            </p>
          </div>

          <a
            href="#"
            className="whitespace-nowrap text-sm font-medium text-[#4FAE7D] transition-colors hover:text-[#6FC495]"
          >
            Everything open now →
          </a>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={trackRef}
            className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
          >
            {restaurants.map(r => (
              <article
                key={r.id}
                className="group w-65 shrink-0 snap-start overflow-hidden rounded-2xl border border-white/8 bg-[#141311] transition-transform duration-300 hover:-translate-y-1 hover:border-white/15 cursor-pointer"
              >
                <div className="relative h-32">
                  <Image
                    src={r.image}
                    alt={r.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                </div>

                <div className="p-4">
                  <h3 className="truncate text-[15px] font-medium text-[#F5EFE6]">
                    {r.name}
                  </h3>
                  <p className="mt-0.5 text-[13px] text-[#8A8580]">{r.area}</p>

                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {r.cuisines.map(c => (
                      <span
                        key={c}
                        className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-[#B9B4A9]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} filled={i < Math.round(r.rating)} />
                      ))}
                    </div>
                    <span className="text-[13px] font-medium text-[#F5EFE6]">
                      {r.rating.toFixed(1)}
                    </span>
                    <span className="text-[12px] text-[#8A8580]">
                      ({r.reviews})
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-3 border-t border-white/8 pt-3">
                    {r.services.map(s => (
                      <span
                        key={s}
                        className="flex items-center gap-1 text-[11px] text-[#8A8580]"
                      >
                        <Icon>{serviceMeta[s].icon}</Icon>
                        {serviceMeta[s].label}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div
            className={`pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-[#0E0E0D] to-transparent transition-opacity duration-200 ${
              atStart ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-[#0E0E0D] to-transparent transition-opacity duration-200 ${
              atEnd ? 'opacity-0' : 'opacity-100'
            }`}
          />

          <button
            type="button"
            onClick={() => slide('left')}
            disabled={atStart}
            aria-label="Previous restaurants"
            className="absolute left-0 top-1/2 -ml-4 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#141311]/90 text-[#F5EFE6] shadow-lg backdrop-blur transition-opacity hover:bg-[#1c1b18] disabled:opacity-0 sm:flex cursor-pointer"
          >
            <svg
              viewBox="0 0 20 20"
              className="h-4 w-4 fill-none stroke-current stroke-[1.6]"
            >
              <path
                d="M12 4l-6 6 6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => slide('right')}
            disabled={atEnd}
            aria-label="Next restaurants"
            className="absolute right-0 top-1/2 -mr-4 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#141311]/90 text-[#F5EFE6] shadow-lg backdrop-blur transition-opacity hover:bg-[#1c1b18] disabled:opacity-0 sm:flex cursor-pointer"
          >
            <svg
              viewBox="0 0 20 20"
              className="h-4 w-4 fill-none stroke-current stroke-[1.6]"
            >
              <path
                d="M8 4l6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
