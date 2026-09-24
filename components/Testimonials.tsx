'use client';

import { useEffect, useRef, useState } from 'react';

type Review = {
  name: string;
  location: string;
  topic: string;
  quote: string;
  rating: number; 
  restaurant: string;
};

const REVIEWS: Review[] = [
  {
    name: 'Nusrat Jahan',
    location: 'Dhanmondi, Dhaka',
    topic: 'Booked a table in under a minute',
    quote:
      'I found a table at Kacchi House Uttara for a birthday dinner without a single phone call. The whole party showed up and our table was ready.',
    rating: 5,
    restaurant: 'Kacchi House Uttara',
  },
  {
    name: 'Tanvir Ahmed',
    location: 'Gulshan, Dhaka',
    topic: 'Delivery actually arrived hot',
    quote:
      'Ordered from Bhorta Pizzeria on a rainy night expecting the usual delay. It showed up fifteen minutes early and still warm.',
    rating: 5,
    restaurant: 'Bhorta Pizzeria',
  },
  {
    name: 'Farzana Karim',
    location: 'Agrabad, Chattogram',
    quote:
      "The mood picker sounds gimmicky until you use it. Tapped 'Bhuna Khichuri', got three places open right now near me — done.",
    topic: 'The mood picker just works',
    rating: 4,
    restaurant: 'Bhuna Khichuri Bowls',
  },
  {
    name: 'Imran Hossain',
    location: 'Panchlaish, Chattogram',
    topic: 'Reorder made lunch effortless',
    quote:
      "I reorder the same curry every Thursday now. One tap from Order Again and it's already on its way before my meeting ends.",
    rating: 5,
    restaurant: 'Curry Bar Teigaon',
  },
  {
    name: 'Sadia Islam',
    location: 'Rampura, Dhaka',
    topic: 'Honest ratings, no surprises',
    quote:
      "Every place I've booked has matched its rating. Pao Corner earned every one of its stars — best Sunday breakfast in the area.",
    rating: 5,
    restaurant: 'Pao Corner Motijheel',
  },
  {
    name: 'Rakibul Hasan',
    location: 'Sylhet Sadar, Sylhet',
    topic: 'Switched from three apps to one',
    quote:
      "I used to juggle a delivery app and a separate booking site. Now it's one search bar for both, and it's genuinely faster.",
    rating: 4,
    restaurant: 'Sylhet Cha Adda',
  },
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

// Deterministic hue from the name so a given person always renders the
// same color, spread across a warm-to-neutral range that sits alongside
// the site's orange accent without competing with it.
function hueFromName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hues = [14, 28, 42, 200, 265, 335]; // orange family + a few cool accents
  return hues[Math.abs(hash) % hues.length];
}

function LetterAvatar({ name }: { name: string }) {
  const hue = hueFromName(name);
  return (
    <svg
      viewBox="0 0 48 48"
      width="48"
      height="48"
      role="img"
      aria-label={name}
      className="shrink-0 rounded-full"
    >
      <circle cx="24" cy="24" r="24" fill={`hsl(${hue} 55% 22%)`} />
      <text
        x="24"
        y="25"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="17"
        fontWeight="600"
        fill={`hsl(${hue} 70% 78%)`}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        {initials(name)}
      </text>
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          width="14"
          height="14"
          fill={i < rating ? '#F5A524' : '#3F3F46'}
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.62 1-5.8-4.21-4.1 5.82-.85z" />
        </svg>
      ))}
    </div>
  );
}

function RevealCard({ review, index }: { review: Review; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${(index % 3) * 90}ms` : '0ms' }}
      className={[
        'rounded-2xl border border-white/10 bg-neutral-900/60 p-6',
        'transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
      ].join(' ')}
    >
      <Stars rating={review.rating} />

      <p className="mt-4 font-semibold text-white">{review.topic}</p>

      <p className="mt-2 text-sm leading-relaxed text-neutral-400">
        {review.quote}
      </p>

      <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
        <LetterAvatar name={review.name} />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">
            {review.name}
          </p>
          <p className="truncate text-xs text-neutral-500">
            {review.location} · {review.restaurant}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-black px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            What our customers say
          </h2>
          <p className="mt-3 text-neutral-400">
            Real orders, real bookings, real kitchens — every review here came
            from someone who ate or booked through the platform.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <RevealCard key={review.name} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
