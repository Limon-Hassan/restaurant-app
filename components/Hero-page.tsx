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

// Design tokens for this section only.
// ink        #0E0E0D  base black, echoes the photo's tabletop
// cream      #F5EFE6  primary text on dark
// clay       #C1442D  accent, pulled from the tomato sauce — used once, on focus/hover
// stone      #B9B4A9  secondary text / labels
export default function Hero() {
  return (
    <section
      className={`${instrumentSans.className} relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0E0E0D]`}
    >
      <Image
        src="/hero-page.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[68%_50%]"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/45 to-black/55" />
      {/* <div className="absolute inset-0 bg-black/15" /> */}

      <div className="relative z-10 w-full max-w-4xl px-6 py-24 text-center">
        <h1
          className={`${fraunces.className} hero-fade text-4xl font-medium leading-[1.1] text-[#F5EFE6] sm:text-5xl md:text-6xl`}
          style={{ animationDelay: '0ms' }}
        >
          What will you eat today?
        </h1>

        <p
          className="hero-fade mx-auto mt-5 max-w-xl text-base text-[#D8D3C8] sm:text-lg"
          style={{ animationDelay: '120ms' }}
        >
          Find a restaurant near you — delivered, picked up, or a table booked.
          One account for all of it.
        </p>

        <div
          className="hero-fade mt-10 flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/40 p-2 backdrop-blur-md sm:flex-row sm:items-stretch"
          style={{ animationDelay: '240ms' }}
        >
          <input
            type="text"
            placeholder="e.g. kacchi delivery in Dhanmondi"
            className="w-full flex-1 rounded-xl bg-transparent px-4 py-3 text-sm text-[#F5EFE6] placeholder:text-[#8A8A85] outline-none focus-visible:ring-2 focus-visible:ring-[#C1442D]"
          />
          <input
            type="text"
            placeholder="Nasirabad, Chattogram."
            className="w-full flex-1 rounded-xl bg-transparent px-4 py-3 text-sm text-[#F5EFE6] placeholder:text-[#8A8A85] outline-none focus-visible:ring-2 focus-visible:ring-[#C1442D] sm:border-l sm:border-white/10"
          />
          <select
            defaultValue="any"
            className="rounded-xl bg-transparent px-4 py-3 text-sm text-[#F5EFE6] outline-none focus-visible:ring-2 focus-visible:ring-[#C1442D] sm:border-l sm:border-white/10"
          >
            <option value="any" className="bg-[#141414]">
              Any food
            </option>
            <option value="kacchi" className="bg-[#141414]">
              Kacchi
            </option>
            <option value="biryani" className="bg-[#141414]">
              Biryani
            </option>
            <option value="street-food" className="bg-[#141414]">
              Street food
            </option>
          </select>
          <button
            type="button"
            className="shrink-0 rounded-xl bg-[#F5EFE6] px-6 py-3 text-sm font-medium text-[#141414] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1442D] focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer"
          >
            Search
          </button>
        </div>

        <div
          className="hero-fade mt-5 flex flex-wrap items-end justify-center gap-6"
          style={{ animationDelay: '340ms' }}
        >
          <label className="flex flex-col items-start text-left">
            <span className="mb-1.5 text-xs text-[#B9B4A9]">How</span>
            <select className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-[#F5EFE6] outline-none focus-visible:ring-2 focus-visible:ring-[#C1442D]">
              <option className="bg-[#141414]">Any way</option>
              <option className="bg-[#141414]">Delivery</option>
              <option className="bg-[#141414]">Pickup</option>
              <option className="bg-[#141414]">Dine-in</option>
            </select>
          </label>

          <label className="flex flex-col items-start text-left">
            <span className="mb-1.5 text-xs text-[#B9B4A9]">When</span>
            <select className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-[#F5EFE6] outline-none focus-visible:ring-2 focus-visible:ring-[#C1442D]">
              <option className="bg-[#141414]">Any time</option>
              <option className="bg-[#141414]">Now</option>
              <option className="bg-[#141414]">Schedule</option>
            </select>
          </label>

          <label className="flex flex-col items-start text-left">
            <span className="mb-1.5 text-xs text-[#B9B4A9]">People</span>
            <input
              type="number"
              min={1}
              placeholder="2"
              className="w-20 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-[#F5EFE6] placeholder:text-[#8A8A85] outline-none focus-visible:ring-2 focus-visible:ring-[#C1442D]"
            />
          </label>
        </div>

        {/* CTA cards */}
        <div
          className="hero-fade mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
          style={{ animationDelay: '460ms' }}
        >
          <button
            type="button"
            className="rounded-2xl border border-white/10 bg-white/6 p-5 text-left backdrop-blur-md transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1442D]"
          >
            <span className="block text-base font-medium text-[#F5EFE6]">
              Order food
            </span>
            <span className="mt-1 block text-sm text-[#B9B4A9]">
              Delivery or pickup
            </span>
          </button>
          <button
            type="button"
            className="rounded-2xl border border-white/10 bg-white/6 p-5 text-left backdrop-blur-md transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1442D]"
          >
            <span className="block text-base font-medium text-[#F5EFE6]">
              Book a table
            </span>
            <span className="mt-1 block text-sm text-[#B9B4A9]">
              Date, time, party
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
