'use client';

import { useEffect, useRef, useState } from 'react';
import { Fraunces, Instrument_Sans } from 'next/font/google';
import Image from 'next/image';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal'],
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const places = [
  ['Uttara', 'Dhaka'],
  ['Gulshan', 'Dhaka'],
  ['Dhanmondi', 'Dhaka'],
  ['Banani', 'Dhaka'],
  ['Mirpur', 'Dhaka'],
  ['Mohammadpur', 'Dhaka'],
  ['Bashundhara', 'Dhaka'],
  ['Motijheel', 'Dhaka'],
  ['Jatrabari', 'Dhaka'],
  ['Rampura', 'Dhaka'],
  ['Khilgaon', 'Dhaka'],
  ['Badda', 'Dhaka'],
  ['Farmgate', 'Dhaka'],
  ['Shyamoli', 'Dhaka'],
  ['Tejgaon', 'Dhaka'],
  ['Panchlaish', 'Chattogram'],
  ['Agrabad', 'Chattogram'],
  ['Kotwali', 'Chattogram'],
  ['Sylhet Sadar', 'Sylhet'],
  ['Rangpur Sadar', 'Rangpur'],
  ["Cox's Bazar Sadar", "Cox's Bazar"],
  ['Barisal Sadar', 'Barisal'],
  ['Khulna Sadar', 'Khulna'],
  ['Boalia', 'Rajshahi'],
  ['Comilla Sadar', 'Comilla'],
  ['Bogura Sadar', 'Bogura'],
  ['Jessore Sadar', 'Jessore'],
  ['Narayanganj Sadar', 'Narayanganj'],
  ['Savar', 'Dhaka'],
  ['Gazipur Sadar', 'Gazipur'],
] as const;

const dish = [
  'Kacchi',
  'Bhorta',
  'Biryani',
  'Bhuna Khichuri',
  'Cha',
  'Shutki',
  'Haleem',
  'Polao',
  'Tehari',
  'Roast',
  'Pizza',
  'Ramen',
  'Sushi',
  'Taco',
  'Curry',
  'Pad Thai',
  'Shawarma',
  'Pho',
  'Noodle',
  'Kabab',
  'Grill',
  'Bowl',
  'Dessert',
  'Bakery',
  'Rooftop',
  'Diner',
  'Bistro',
  'Corner',
  'Kitchen',
  'Café',
] as const;

const type = [
  'House',
  'Ghor',
  'Adda',
  'Bari',
  'Corner',
  'Kitchen',
  'Bowls',
  'Pizzeria',
  'Bar',
  'Diner',
  'Café',
  'Rooftop',
  'Grill',
  'Bistro',
  'Eatery',
] as const;

const cuisineFor: Record<string, string> = {
  Kacchi: 'Bengali',
  Bhorta: 'Bengali',
  Biryani: 'Bengali',
  'Bhuna Khichuri': 'Bengali',
  Cha: 'Café',
  Shutki: 'Seafood',
  Haleem: 'Bengali',
  Polao: 'Bengali',
  Tehari: 'Bengali',
  Roast: 'Bengali',
  Pizza: 'Italian',
  Ramen: 'Japanese',
  Sushi: 'Japanese',
  Taco: 'Mexican',
  Curry: 'Indian',
  'Pad Thai': 'Thai',
  Shawarma: 'Middle Eastern',
  Pho: 'Vietnamese',
  Noodle: 'Asian',
  Kabab: 'BBQ',
  Grill: 'BBQ',
  Bowl: 'Healthy',
  Dessert: 'Desserts & Sweets',
  Bakery: 'Bakery & Café',
  Rooftop: 'Continental',
  Diner: 'Continental',
  Bistro: 'Continental',
  Corner: 'Fast food',
  Kitchen: 'Home style',
  Café: 'Café',
};

const serviceCombos = [
  ['delivery', 'pickup'],
  ['delivery', 'pickup', 'tables'],
  ['pickup', 'tables'],
  ['delivery', 'tables'],
] as const;

const gradients = [
  'from-[#7A1F3D] via-[#4A1228] to-[#1a0a12]',
  'from-[#9C6B1F] via-[#5E3E14] to-[#1a1108]',
  'from-[#1F5E43] via-[#123B2A] to-[#0d1c15]',
  'from-[#134E4A] via-[#0B3230] to-[#081b1a]',
  'from-[#4A1F5E] via-[#2B123B] to-[#150a1c]',
  'from-[#7A3B1F] via-[#4A2412] to-[#1f0f08]',
];
const images = [
  '/resturents/1.jpg',
  '/resturents/2.jpg',
  '/resturents/3.jpg',
  '/resturents/4.jpg',
  '/resturents/5.jpg',
  '/resturents/6.jpg',
];

type Restaurant = {
  id: string;
  name: string;
  area: string;
  city: string;
  cuisines: string[];
  rating: number;
  reviews: number;
  services: (typeof serviceCombos)[number];
  gradient: string;
  image: string;
};

const TOTAL = 60;
const PAGE_SIZE = 20;

function generateRestaurants(count: number): Restaurant[] {
  return Array.from({ length: count }, (_, i) => {
    const [area, city] = places[i % places.length];
    const dishWord = dish[i % dish.length];
    const typeWord = type[(i * 7) % type.length];
    const secondCuisine = dish[(i * 5) % dish.length];
    const rating = Math.round((4.3 + ((i * 13) % 8) / 10) * 10) / 10;
    const reviews = 12 + ((i * 17) % 180);

    return {
      id: `r-${i}`,
      name: `${dishWord} ${typeWord} ${area}`,
      area,
      city,
      cuisines: Array.from(
        new Set([cuisineFor[dishWord], cuisineFor[secondCuisine]]),
      ),
      rating,
      reviews,
      services: serviceCombos[i % serviceCombos.length],
      gradient: gradients[i % gradients.length],
      image: images[i % images.length],
    };
  });
}

const allRestaurants = generateRestaurants(TOTAL);

const serviceLabel: Record<string, string> = {
  delivery: 'Delivery',
  pickup: 'Pickup',
  tables: 'Tables',
};

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

export default function AllRestaurants() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadingRef = useRef(false);

  const hasMore = visibleCount < TOTAL;

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          loadingRef.current = true;
          setLoading(true);
          timeoutRef.current = setTimeout(() => {
            setVisibleCount(prev => Math.min(prev + PAGE_SIZE, TOTAL));
            setLoading(false);
            loadingRef.current = false;
          }, 900);
        }
      },
      { rootMargin: '0px', threshold: 0.1 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [hasMore]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const visible = allRestaurants.slice(0, visibleCount);

  return (
    <section
      className={`${instrumentSans.className} bg-[#0E0E0D] px-6 py-20 sm:px-10`}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          className={`${fraunces.className} text-3xl font-medium text-[#F5EFE6] sm:text-4xl`}
        >
          All restaurants
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#B9B4A9]">
          Every kitchen on the platform, in one list — from neighbourhood bhaat
          ghors to weekend pizzerias. Browse at your own pace; more load in as
          you scroll.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((r, i) => {
            const isNewestBatch = i >= visibleCount - PAGE_SIZE;
            return (
              <article
                key={r.id}
                className="restaurant-card flex flex-col overflow-hidden rounded-2xl border-2 border-[#B3402C]/60 bg-black transition-colors duration-200 hover:border-[#E8573E]"
                style={
                  isNewestBatch
                    ? { animationDelay: `${(i % PAGE_SIZE) * 35}ms` }
                    : undefined
                }
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

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-[15px] font-semibold text-white">
                    {r.name}
                  </h3>
                  <p className="mt-0.5 text-[13px] text-[#9A968F]">
                    {r.area}, {r.city}
                  </p>

                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {r.cuisines.map(c => (
                      <span
                        key={c}
                        className="rounded-full border border-white/15 px-2 py-0.5 text-[11px] text-[#D8D3C8]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} filled={s < Math.round(r.rating)} />
                      ))}
                    </div>
                    <span className="text-[13px] font-medium text-white">
                      {r.rating.toFixed(1)}
                    </span>
                    <span className="text-[12px] text-[#9A968F]">
                      ({r.reviews})
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-white/10 pt-3 text-[11px] text-[#9A968F]">
                    {r.services.map(s => (
                      <span key={s}>{serviceLabel[s]}</span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="mt-4 w-full rounded-xl bg-[#E8573E] py-2.5 text-sm font-semibold text-[#14100E] transition-colors duration-200 hover:bg-[#F16B4E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer"
                  >
                    View menu
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Loader / sentinel */}
        <div className="mt-10 flex justify-center">
          {hasMore ? (
            <div
              ref={sentinelRef}
              className="flex items-center gap-3 text-sm text-[#B9B4A9]"
            >
              <span className="spinner h-5 w-5 rounded-full border-2 border-white/15 border-t-[#E8573E]" />
              Loading more restaurants…
            </div>
          ) : (
            <button
              type="button"
              className="mt-4 w-50 rounded-xl bg-[#E8573E] py-2.5 text-sm font-semibold text-[#14100E] transition-colors duration-200 hover:bg-[#F16B4E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer"
            >
              See All Restaurants
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
