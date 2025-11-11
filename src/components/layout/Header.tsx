import Link from "next/link";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold sm:inline-block">Terra Forte Bau</span>
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6">
          {/* Ide jön majd a dinamikus menü */}
          <Link
            href="/termekek"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Termékek
          </Link>
          <Link
            href="/referenciak"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Referenciák
          </Link>
          <Link
            href="/rolunk"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Rólunk
          </Link>
          <Link
            href="/kapcsolat"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Kapcsolat
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {/* Ide jön majd a nyelvváltó és a CTA */}
          <p className="text-sm text-muted-foreground">(Nyelvváltó)</p>
        </div>
      </div>
    </header>
  );
};
