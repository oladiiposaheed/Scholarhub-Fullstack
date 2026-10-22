// ==========================================
// Home Page — Lists all chapters
// ==========================================

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Next.js + TypeScript Course</h1>
      <p className="text-gray-600 mb-8">
        Zero to Hero — All chapters and projects
      </p>

      <h2 className="text-xl font-bold mb-4">Chapters</h2>

      <ul className="space-y-2">
        <li>
          <Link href="/chapter-01" className="text-blue-600 hover:underline">
            📘 Chapter 1 — TeamHub
          </Link>
        </li>
      </ul>
    </div>
  );
}