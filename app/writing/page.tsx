import Link from 'next/link';

const posts = [
  {
    title: 'My childhood bedroom at 24',
    slug: 'childhood-bedroom-24',
    date: 'Sep 30th, 2025',
  },
  {
    title: 'I graduated college and wasted a year of my life',
    slug: 'wasting12months',
    date: 'May 16th, 2025',
  },
];

export default function WritingPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-neutral-900 mb-6">Writing</h1>

      <div className="space-y-1">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${post.slug}`}
            className="group flex justify-between items-baseline gap-4 -mx-3 px-3 py-2 rounded-lg transition-all duration-[220ms] ease-out hover:bg-neutral-100 hover:-translate-y-0.5"
          >
            <span className="text-neutral-900 group-hover:text-neutral-700 transition-colors duration-200">
              {post.title}
            </span>
            <span className="text-neutral-400 text-sm shrink-0 group-hover:text-neutral-500 transition-colors duration-200">
              {post.date}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}