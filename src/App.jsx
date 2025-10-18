import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { writings } from "./writings";

const author = {
  name: "Your Name",
  tagline: "Writer • Storyteller • Observer",
  bio: "Write a short introduction about yourself — who you are, what you write about, and what this site is for.",
  year: new Date().getFullYear(),
};

function Home() {
  return (
    <Section title={`Welcome to ${author.name}'s Writing Portfolio`}>
      <p className="text-gray-600 leading-relaxed text-lg">{author.bio}</p>
    </Section>
  );
}

function ListPage({ category }) {
  const pieces = writings[category];
  return (
    <Section title={category.charAt(0).toUpperCase() + category.slice(1)}>
      {pieces.map((item) => (
        <Article key={item.id} title={item.title}>
          <Link to={`/${category}/${item.id}`} className="text-rose-600 hover:underline text-sm">
            Read more →
          </Link>
        </Article>
      ))}
    </Section>
  );
}

function ArticlePage() {
  const { category, id } = useParams();
  const piece = writings[category]?.find((p) => p.id === id);
  if (!piece) return <Section title="Not Found">This page does not exist.</Section>;

  return (
    <div className="space-y-6">
      <Breadcrumbs category={category} title={piece.title} />
      <Section title={piece.title}>
        <ReactMarkdown className="prose prose-neutral max-w-none">
          {piece.content}
        </ReactMarkdown>
        {piece.pdf && (
          <div className="mt-6">
            <a
              href={piece.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 hover:underline text-sm"
            >
              Download PDF
            </a>
          </div>
        )}
        <div className="mt-8">
          <Link to={`/${category}`} className="text-rose-600 hover:underline text-sm">
            ← Back to {category}
          </Link>
        </div>
      </Section>
    </div>
  );
}

function Breadcrumbs({ category, title }) {
  return (
    <nav className="text-sm text-gray-500 mb-4">
      <Link to="/" className="hover:text-gray-800">Home</Link>
      <span className="mx-2">›</span>
      <Link to={`/${category}`} className="hover:text-gray-800 capitalize">{category}</Link>
      <span className="mx-2">›</span>
      <span className="text-gray-700">{title}</span>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-neutral-50 text-gray-900 font-sans">
        <header className="flex flex-col items-center py-10">
          <h1 className="text-4xl font-light tracking-tight">{author.name}</h1>
          <p className="text-sm text-gray-500 mt-2">{author.tagline}</p>
        </header>

        <nav className="flex justify-center gap-6 border-y border-gray-200 py-4 text-sm uppercase tracking-wide">
          <NavLink to="/" label="Home" />
          <NavLink to="/essays" label="Essays" />
          <NavLink to="/stories" label="Stories" />
          <NavLink to="/poetry" label="Poetry" />
        </nav>

        <main className="flex-grow flex items-center justify-center px-6 py-16">
          <div className="max-w-2xl w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/essays" element={<ListPage category="essays" />} />
              <Route path="/stories" element={<ListPage category="stories" />} />
              <Route path="/poetry" element={<ListPage category="poetry" />} />
              <Route path=":category/:id" element={<ArticlePage />} />
            </Routes>
          </div>
        </main>

        <footer className="text-center py-8 text-xs text-gray-500 border-t border-gray-200">
          © {author.year} {author.name} — All Rights Reserved
        </footer>
      </div>
    </Router>
  );
}

function NavLink({ to, label }) {
  return (
    <Link to={to} className="text-gray-500 hover:text-gray-900 transition-colors">
      {label}
    </Link>
  );
}

function Section({ title, children }) {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-medium text-center text-gray-900 mb-4">{title}</h1>
      <div className="space-y-6 text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}

function Article({ title, children }) {
  return (
    <div className="border border-gray-100 p-5 rounded-lg bg-white hover:shadow-sm transition">
      <h2 className="text-lg font-semibold mb-2 text-gray-900">{title}</h2>
      <div className="text-sm text-gray-600 space-y-2">{children}</div>
    </div>
  );
}
