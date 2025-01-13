import Link from "next/link";
import Github from "./GitHub";

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full px-2 mt-5 border-b-2 pb-7 sm:px-4">
      <Link href="/" className="flex space-x-3">
        <img
          alt="header text"
          src="/translate.png"
          className="w-8 h-8 sm:w-9 sm:h-9"
        />
        <h1 className="ml-2 text-2xl font-bold tracking-tight sm:text-3xl">
          wordswap.ai
        </h1>
      </Link>
      <a
        className="flex items-center justify-center px-4 py-2 space-x-2 text-sm text-gray-600 transition-colors bg-white border border-gray-300 rounded-full shadow-md max-w-fit hover:bg-gray-100"
        href="https://github.com/arpesh28/wordswap.ai"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github />
        <p>Star on GitHub</p>
      </a>
    </header>
  );
}
