import Link from "next/link";

export default function Sidebar() {
  return (
    <nav className="flex flex-col space-y-2">
      <Link
        href="#"
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
        prefetch={false}
      >
        Home
      </Link>
      <Link
        href="#"
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
        prefetch={false}
      >
        Writing
      </Link>
      <Link
        href="#"
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
        prefetch={false}
      >
        Categories
      </Link>
      <Link
        href="#"
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
        prefetch={false}
      >
        Authors
      </Link>
      <Link
        href="#"
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
        prefetch={false}
      >
        Settings
      </Link>
    </nav>
  );
}
