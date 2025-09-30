import Link from 'next/link';

const posts = [
  {
    title: "My childhood bedroom at 24",
    slug: "childhood-bedroom-24",
    date: "Sep 30th, 2025"
  },
  {
    title: "I graduated college and wasted a year of my life",
    slug: "wasting12months",
    date: "May 16th, 2025"
  }
];

export default function WritingPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-12">Writing</h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.slug} className="flex justify-between items-baseline">
            <Link
              href={`/${post.slug}`}
              className="text-white hover:underline underline-offset-4 decoration-gray-400"
            >
              {post.title}
            </Link>
            <span className="text-gray-400 text-sm ml-8 shrink-0">
              {post.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}