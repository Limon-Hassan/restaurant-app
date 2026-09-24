'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Fraunces, Instrument_Sans } from 'next/font/google';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal'],
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

type Card = {
  id: string;
  name: string;
  area: string;
  rating: number;
  reviews: number;
  image: string;
  badge: string;
};

const nearYou: Card[] = [
  {
    id: 'n1',
    name: 'Dhanmondi Kacchi Bari',
    area: 'Dhanmondi, Dhaka',
    rating: 5.0,
    reviews: 128,
    image: '/resturents/1.jpg',
    badge: '0.6 km',
  },
  {
    id: 'n2',
    name: 'Gulshan Green Bowls',
    area: 'Gulshan, Dhaka',
    rating: 4.8,
    reviews: 73,
    image: '/resturents/2.jpg',
    badge: '0.9 km',
  },
  {
    id: 'n3',
    name: 'Farmgate Cha Adda',
    area: 'Farmgate, Dhaka',
    rating: 4.7,
    reviews: 54,
    image: '/resturents/3.jpg',
    badge: '1.2 km',
  },
  {
    id: 'n4',
    name: 'Banani Grill House',
    area: 'Banani, Dhaka',
    rating: 4.9,
    reviews: 91,
    image: '/resturents/4.jpg',
    badge: '1.4 km',
  },
  {
    id: 'n5',
    name: 'Mohammadpur Bhorta Ghor',
    area: 'Mohammadpur, Dhaka',
    rating: 4.6,
    reviews: 38,
    image: '/resturents/5.jpg',
    badge: '1.8 km',
  },
  {
    id: 'n6',
    name: 'Tejgaon Pizzeria',
    area: 'Tejgaon, Dhaka',
    rating: 4.5,
    reviews: 47,
    image: '/resturents/6.jpg',
    badge: '2.1 km',
  },
];

type PastOrder = Card & { lastOrder: string; lastOrderedAgo: string };

const orderAgain: PastOrder[] = [
  {
    id: 'o1',
    name: 'Ramu Bhaat Ghor',
    area: "Ramu, Cox's Bazar",
    rating: 4.7,
    reviews: 41,
    image: '/resturents/3.jpg',
    badge: '',
    lastOrder: 'Ilish Bhaja, rice',
    lastOrderedAgo: '3 days ago',
  },
  {
    id: 'o2',
    name: 'Rangpur Chullah',
    area: 'Rangpur Sadar, Rangpur',
    rating: 4.7,
    reviews: 37,
    image: '/resturents/4.jpg',
    badge: '',
    lastOrder: 'Beef Bhuna, paratha',
    lastOrderedAgo: 'Last week',
  },
  {
    id: 'o3',
    name: 'Sylhet Cha Adda',
    area: 'Sylhet Sadar, Sylhet',
    rating: 4.9,
    reviews: 64,
    image: '/resturents/2.jpg',
    badge: '',
    lastOrder: 'Malai cha, shingara ×2',
    lastOrderedAgo: '2 weeks ago',
  },
  {
    id: 'o4',
    name: 'Chattogram Shutki Bari',
    area: 'Panchlaish, Chattogram',
    rating: 4.8,
    reviews: 52,
    image: '/resturents/5.jpg',
    badge: '',
    lastOrder: 'Shutki bhorta, khichuri',
    lastOrderedAgo: 'Last month',
  },
];


function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-3 w-3 ${filled ? 'fill-[#E0A526]' : 'fill-white/15'}`}
    >
      <path d="M10 1.5l2.47 5.24 5.78.55-4.36 3.9 1.3 5.66L10 13.9l-5.19 2.95 1.3-5.66-4.36-3.9 5.78-.55z" />
    </svg>
  );
}

function Row({ items, ctaLabel }: { items: Card[]; ctaLabel: string }) {
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
    el.scrollBy({
      left: el.clientWidth * 0.85 * (dir === 'left' ? -1 : 1),
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="row-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
      >
        {items.map(r => (
          <article
            key={r.id}
            className="w-60 shrink-0 snap-start overflow-hidden rounded-2xl border border-white/8 bg-[#141311] transition-transform duration-300 hover:-translate-y-1 hover:border-white/15"
          >
            <div className="relative h-28">
              <Image
                src={r.image}
                alt={r.name}
                fill
                className="object-cover"
                sizes="240px"
              />
              <span className="absolute left-2.5 top-2.5 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-[#F5EFE6] backdrop-blur">
                {r.badge}
              </span>
            </div>

            <div className="p-4">
              <h4 className="truncate text-[14px] font-medium text-[#F5EFE6]">
                {r.name}
              </h4>
              <p className="mt-0.5 truncate text-[12px] text-[#8A8580]">
                {r.area}
              </p>

              <div className="mt-2 flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} filled={i < Math.round(r.rating)} />
                  ))}
                </div>
                <span className="text-[12px] font-medium text-[#F5EFE6]">
                  {r.rating.toFixed(1)}
                </span>
                <span className="text-[11px] text-[#8A8580]">
                  ({r.reviews})
                </span>
              </div>

              <button
                type="button"
                className="mt-3 w-full rounded-xl bg-[#E8573E] py-2 text-[13px] font-semibold text-[#14100E] transition-colors duration-200 hover:bg-[#F16B4E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5EFE6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0E0D]"
              >
                {ctaLabel}
              </button>
            </div>
          </article>
        ))}
      </div>

      <div
        className={`pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-[#0E0E0D] to-transparent transition-opacity duration-200 ${atStart ? 'opacity-0' : 'opacity-100'}`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-[#0E0E0D] to-transparent transition-opacity duration-200 ${atEnd ? 'opacity-0' : 'opacity-100'}`}
      />

      <button
        type="button"
        onClick={() => slide('left')}
        disabled={atStart}
        aria-label="Scroll left"
        className="absolute left-0 top-1/2 -ml-4 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#141311]/90 text-[#F5EFE6] shadow-lg backdrop-blur transition-opacity hover:bg-[#1c1b18] disabled:opacity-0 sm:flex"
      >
        <svg
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.6]"
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
        aria-label="Scroll right"
        className="absolute right-0 top-1/2 -mr-4 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#141311]/90 text-[#F5EFE6] shadow-lg backdrop-blur transition-opacity hover:bg-[#1c1b18] disabled:opacity-0 sm:flex"
      >
        <svg
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.6]"
        >
          <path d="M8 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

function OrderAgainRow({ items }: { items: PastOrder[] }) {
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
    el.scrollBy({
      left: el.clientWidth * 0.85 * (dir === 'left' ? -1 : 1),
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="row-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
      >
        {items.map(r => (
          <article
            key={r.id}
            className="order-card w-64 shrink-0 snap-start overflow-hidden rounded-2xl border border-white/8 bg-[#141311] transition-transform duration-300 hover:-translate-y-1 hover:border-[#E8573E]/40"
          >
            <div className="relative h-28">
              <Image
                src={r.image}
                alt={r.name}
                fill
                className="object-cover"
                sizes="256px"
              />
              <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-[#F5EFE6] backdrop-blur">
                <svg
                  viewBox="0 0 20 20"
                  className="h-3 w-3 fill-none stroke-current stroke-[1.6]"
                >
                  <circle cx="10" cy="10" r="7.25" />
                  <path
                    d="M10 6v4l2.6 1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {r.lastOrderedAgo}
              </span>
            </div>

            <div className="p-4">
              <h4 className="truncate text-[14px] font-medium text-[#F5EFE6]">
                {r.name}
              </h4>
              <p className="mt-0.5 truncate text-[12px] text-[#8A8580]">
                {r.area}
              </p>

              <p className="mt-2 truncate rounded-lg bg-white/4 px-2.5 py-1.5 text-[12px] text-[#D8D3C8]">
                <span className="text-[#8A8580]">Last time: </span>
                {r.lastOrder}
              </p>

              <div className="mt-2.5 flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} filled={i < Math.round(r.rating)} />
                  ))}
                </div>
                <span className="text-[12px] font-medium text-[#F5EFE6]">
                  {r.rating.toFixed(1)}
                </span>
                <span className="text-[11px] text-[#8A8580]">
                  ({r.reviews})
                </span>
              </div>

              <button
                type="button"
                className="reorder-btn mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#E8573E] py-2 text-[13px] font-semibold text-[#14100E] transition-colors duration-200 hover:bg-[#F16B4E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5EFE6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0E0D]"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="reorder-icon h-3.5 w-3.5 fill-none stroke-current stroke-[1.8]"
                >
                  <path
                    d="M4 10a6 6 0 0 1 10.2-4.2M16 10a6 6 0 0 1-10.2 4.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14.2 3.4v2.6h-2.6M5.8 16.6V14h2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Reorder
              </button>
            </div>
          </article>
        ))}
      </div>

      <div
        className={`pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-[#0E0E0D] to-transparent transition-opacity duration-200 ${atStart ? 'opacity-0' : 'opacity-100'}`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-[#0E0E0D] to-transparent transition-opacity duration-200 ${atEnd ? 'opacity-0' : 'opacity-100'}`}
      />

      <button
        type="button"
        onClick={() => slide('left')}
        disabled={atStart}
        aria-label="Scroll left"
        className="absolute left-0 top-1/2 -ml-4 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#141311]/90 text-[#F5EFE6] shadow-lg backdrop-blur transition-opacity hover:bg-[#1c1b18] disabled:opacity-0 sm:flex"
      >
        <svg
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.6]"
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
        aria-label="Scroll right"
        className="absolute right-0 top-1/2 -mr-4 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#141311]/90 text-[#F5EFE6] shadow-lg backdrop-blur transition-opacity hover:bg-[#1c1b18] disabled:opacity-0 sm:flex"
      >
        <svg
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.6]"
        >
          <path d="M8 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

export default function ForYouSection() {
  return (
    <section
      className={`${instrumentSans.className} bg-[#0E0E0D] px-6 py-20 sm:px-10`}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          className={`${fraunces.className} text-3xl font-medium text-[#F5EFE6] sm:text-4xl`}
        >
          Made for you
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#B9B4A9]">
          Fewer taps, faster dinner. What&rsquo;s close by, what you&rsquo;ll
          probably want again, and every craving as its own shortcut.
        </p>

        {/* Near you */}
        <div className="mt-14">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h3 className="text-lg font-medium text-[#F5EFE6]">Near you</h3>
            <a
              href="#"
              className="text-sm font-medium text-[#E8573E] transition-colors hover:text-[#F16B4E]"
            >
              See all nearby →
            </a>
          </div>
          <Row items={nearYou} ctaLabel="View menu" />
        </div>

        {/* Order again */}
        <div className="mt-14">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-[#F5EFE6]">
                Order again
              </h3>
              <p className="mt-0.5 text-[13px] text-[#8A8580]">
                Pick up right where you left off.
              </p>
            </div>
            <a
              href="#"
              className="whitespace-nowrap text-sm font-medium text-[#E8573E] transition-colors hover:text-[#F16B4E]"
            >
              Order history →
            </a>
          </div>
          <OrderAgainRow items={orderAgain} />
        </div>
      </div>


    </section>
  );
}
