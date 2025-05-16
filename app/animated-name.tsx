import { Link } from 'next-view-transitions';

export function AnimatedName() {
  return (
    <Link
      href="/"
      className="flex mt-2 mb-8 font-bold text-neutral-200 text-xl animate-fade-in cursor-pointer transition-colors duration-200 hover:underline hover:text-white"
      aria-label="Go to homepage"
    >
      Wilson Lim Setiawan
    </Link>
  );
}
