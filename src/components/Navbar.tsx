import { Rocket, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/40">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 glow-primary transition-all group-hover:bg-primary/20">
            <Rocket className="h-5 w-5 text-primary" />
          </div>
          <span className="font-heading text-xl font-bold gradient-text">
            FounderGPT
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">
            CodeTitans
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground">
            <User className="h-4 w-4" />
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/40 glass animate-slide-up">
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground py-2 hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
