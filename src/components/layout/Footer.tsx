export const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Terra Forte Bau Kft. Minden jog
          fenntartva.
        </p>
        <nav className="flex gap-4">
          {/* Ide jönnek majd a jogi linkek */}
          <p className="text-sm text-muted-foreground">(Adatvédelem)</p>
          <p className="text-sm text-muted-foreground">(Impresszum)</p>
        </nav>
      </div>
    </footer>
  );
};
