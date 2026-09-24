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

const gradients = [
  'from-[#7A1F3D] via-[#4A1228] to-[#1a0a12]',
  'from-[#9C6B1F] via-[#5E3E14] to-[#1a1108]',
  'from-[#1F5E43] via-[#123B2A] to-[#0d1c15]',
];

type Dish = { name: string; emoji: string };

const rows: Dish[][] = [
  [
    { name: 'Kacchi Biryani', emoji: '🍛' },
    { name: 'Shutki Bhorta', emoji: '🌶️' },
    { name: 'Bhuna Khichuri', emoji: '🍚' },
    { name: 'Hilsa Curry', emoji: '🐟' },
    { name: 'Fuchka', emoji: '🧆' },
    { name: 'Chotpoti', emoji: '🥣' },
  ],
  [
    { name: 'Haleem', emoji: '🍲' },
    { name: 'Morog Polao', emoji: '🍗' },
    { name: 'Beef Tehari', emoji: '🍖' },
    { name: 'Chicken Roast', emoji: '🍗' },
    { name: 'Pizza', emoji: '🍕' },
    { name: 'Ramen', emoji: '🍜' },
  ],
  [
    { name: 'Sushi', emoji: '🍣' },
    { name: 'Tacos', emoji: '🌮' },
    { name: 'Butter Chicken', emoji: '🍛' },
    { name: 'Pad Thai', emoji: '🍤' },
    { name: 'Shawarma', emoji: '🌯' },
    { name: 'Pho', emoji: '🍥' },
  ],
];

// row direction + speed, matched to the arrows: row 1 left, row 2 right, row 3 left
const rowConfig = [
  { reverse: false, duration: '42s' },
  { reverse: true, duration: '48s' },
  { reverse: false, duration: '45s' },
];

const steps = [
  {
    title: 'Tell us the craving',
    points: [
      'Tap a dish, or type a mood in one line',
      'Spicy, comforting, quick — whatever fits',
    ],
  },
  {
    title: 'We line up the kitchens',
    points: [
      'Matched by area, rating, and readiness',
      'Only places open and taking orders now',
    ],
  },
  {
    title: 'Order, or just show up',
    points: [
      'Delivery, pickup, or a table — your call',
      'Rate it after, so the next match gets sharper',
    ],
  },
];

export default function MoodPicker() {
  return (
    <section
      className={`${instrumentSans.className} bg-[#0E0E0D] px-6 py-20 sm:px-10`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2
            className={`${fraunces.className} text-3xl font-medium text-[#F5EFE6] sm:text-4xl`}
          >
            What are you in the mood for?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-[#B9B4A9]">
            Tap a craving and we&rsquo;ll line up the kitchens making it right
            now.
          </p>

          <div className="relative mx-auto mt-9 max-w-6xl">
            <div className="flex flex-col gap-3">
              {rows.map((row, rowIndex) => {
                const config = rowConfig[rowIndex];
                const isLastRow = rowIndex === rows.length - 1;
                const looped = [...row, ...row];

                return (
                  <div
                    key={rowIndex}
                    className="relative overflow-x-clip overflow-y-visible"
                  >
                    <div
                      className="marquee-track relative z-0 flex gap-3 whitespace-nowrap"
                      style={{
                        animationDuration: config.duration,
                        animationDirection: config.reverse
                          ? 'reverse'
                          : 'normal',
                      }}
                    >
                      {looped.map((dish, i) => (
                        // <div
                        //   key={`${dish.name}-${i}`}
                        //   className="dish-item relative inline-flex"
                        // >
                        //   <button
                        //     type="button"
                        //     className="mood-btn rounded-full bg-[#E8573E] px-5 py-2.5 text-sm font-semibold text-[#14100E] transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5EFE6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0E0D] cursor-pointer z-20"
                        //   >
                        //     {dish.name}
                        //   </button>

                        //   <div className="dish-popup pointer-events-none absolute left-1/2 top-13.5 w-36 -translate-x-1/2 translate-y-1 scale-95 opacity-0 z-99999">
                        //     <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#141311] shadow-xl shadow-black/40 z-99999">
                        //       <div
                        //         className={`relative flex h-20 items-center justify-center bg-linear-to-br ${
                        //           gradients[i % gradients.length]
                        //         }`}
                        //       >
                        //         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.18),transparent_55%)]" />
                        //         <span className="relative text-3xl">
                        //           {dish.emoji}
                        //         </span>
                        //       </div>
                        //       <p className="truncate px-2.5 py-2 text-center text-[11px] font-medium text-[#F5EFE6]">
                        //         {dish.name}
                        //       </p>
                        //     </div>
                        //   </div>
                        // </div>

                        <div
                          key={`${dish.name}-${i}`}
                          className="dish-item relative inline-flex overflow-visible"
                        >
                          <button
                            type="button"
                            className="relative z-20 m-0 rounded-full bg-[#E8573E] px-5 py-2.5 text-sm font-semibold text-[#14100E] transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5EFE6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0E0D] cursor-pointer"
                          >
                            {dish.name}
                          </button>

                          <div
                            className="  dish-popup
    pointer-events-none
    absolute
    left-1/2
    bottom-[calc(100%+10px)]
    z-99999
    w-36
    -translate-x-1/2
    translate-y-1
    scale-95
    opacity-0"
                          >
                            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#141311] shadow-xl shadow-black/40">
                              <div
                                className={`relative flex h-20 items-center justify-center bg-linear-to-br ${
                                  gradients[i % gradients.length]
                                }`}
                              >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.18),transparent_55%)]" />

                                <span className="relative text-3xl">
                                  {dish.emoji}
                                </span>
                              </div>

                              <p className="truncate px-2.5 py-2 text-center text-[11px] font-medium text-[#F5EFE6]">
                                {dish.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}

                      {isLastRow && (
                        <div className="inline-flex shrink-0 items-center">
                          <button
                            type="button"
                            className="rounded-full border border-dashed border-[#E8573E]/70 px-5 py-2.5 text-sm font-semibold text-[#E8573E] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#E8573E]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5EFE6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0E0D]"
                          >
                            Surprise me
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Edge fade + blur, so rows feel like they drift in and out of view */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-16 bg-linear-to-r from-[#0E0E0D] to-transparent backdrop-blur-[2px] sm:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-16 bg-linear-to-l from-[#0E0E0D] to-transparent backdrop-blur-[2px] sm:w-24" />
          </div>

          <p className="mt-3 text-xs text-[#5C5852]">
            Hover a dish to peek at it. Hover pauses the row.
          </p>
        </div>

        {/* How it works */}
        <div className="mt-24">
          <h2
            className={`${fraunces.className} text-2xl font-medium text-[#F5EFE6] sm:text-3xl`}
          >
            How it works
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/8 bg-[#141311] p-6 hover:scale-105 hover:shadow-xl hover:shadow-black/40 transition-all duration-200 ease-out"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8573E] text-sm font-semibold text-[#14100E]">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-[16px] font-medium text-[#F5EFE6]">
                  {step.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {step.points.map(point => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-[14px] leading-relaxed text-[#B9B4A9]"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#E8573E]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
