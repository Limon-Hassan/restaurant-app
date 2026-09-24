import Link from 'next/link';
import Image from 'next/image';

const CUSTOMER_LINKS = [
  { label: 'Find a restaurant', href: '/restaurants' },
  { label: 'My orders', href: '/orders' },
  { label: 'My reservations', href: '/reservations' },
  { label: 'How I eat', href: '/how-i-eat' },
];

const RESTAURANT_LINKS = [
  { label: 'Register your restaurant', href: '/register' },
  { label: 'Counter and kitchen', href: '/counter' },
];

const LEGAL_LINKS = [
  { label: 'Terms of use', href: '/legal/terms' },
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Cancellation and refunds', href: '/legal/cancellation-refunds' },
  { label: 'Contact', href: '/contact' },
];

const CITIZEN_LINKS = [
  { label: 'Citizen.bd', href: 'https://citizen.bd' },
  { label: 'My Citizen profile', href: '/profile' },
  { label: 'Privacy and my data', href: '/legal/data' },
  { label: 'How this site looks', href: '/accessibility' },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <ul className="mt-4 space-y-3">
        {links.map(link => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="inline-block text-sm text-gray-400 transition-all duration-300 ease-in-out hover:translate-x-1 hover:font-semibold hover:text-red-500"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0b0f14] px-6 py-14 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Citizen" width={120} height={120} />
              <span className="text-lg font-semibold text-emerald-400">
                Restaurant
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
              Restaurants across Bangladesh with one Citizen account. In this
              phase you pay cash — at the counter or at the door.
            </p>
          </div>

          <FooterColumn title="For customers" links={CUSTOMER_LINKS} />
          <FooterColumn title="For restaurants" links={RESTAURANT_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="Citizen" links={CITIZEN_LINKS} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Citizen.bd · Restaurant</p>
          <p>restaurant.bd · Citizen.bd</p>
        </div>
      </div>
    </footer>
  );
}
