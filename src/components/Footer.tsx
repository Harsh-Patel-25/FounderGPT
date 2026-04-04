import { Rocket, Github, Mail, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/40 mt-32 overflow-hidden bg-card/30 backdrop-blur-md">
      {/* Top Accent Gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
      
      <div className="container max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-16">
          {/* Brand Identity */}
          <div className="md:col-span-5 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 transform group-hover:rotate-12">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-foreground">FounderGPT</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              The premier AI-powered startup validation platform. We empower founders with high-velocity strategic intelligence to move from idea to execution.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Harsh-Patel-25/FounderGPT"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/40 hover:border-primary/50 text-xs font-bold text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <Github className="w-4 h-4" />
                Open Source
              </a>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/5 border border-primary/10 text-xs font-bold text-primary">
                <ShieldCheck className="w-4 h-4" />
                Enterprise Validated
              </div>
            </div>
          </div>

          {/* Navigation Grid */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/60">Platform</h4>
              <ul className="space-y-4">
                <li><Link to="/dashboard" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block transform">Dashboard</Link></li>
                <li><Link to="/about" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block transform">About Mission</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/60">Account</h4>
              <ul className="space-y-4">
                <li><Link to="/profile" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block transform">Profile Settings</Link></li>
                <li><Link to="/login" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block transform">Secure Access</Link></li>
              </ul>
            </div>

            <div className="space-y-6 col-span-2 sm:col-span-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/60">Connect</h4>
              <a 
                href="mailto:support@foundergpt.com" 
                className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/50 border border-border/40 hover:border-primary/30 transition-all group"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-foreground">Write to Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Global Footer Bottom */}
        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 order-2 md:order-1">
            <p className="text-[11px] font-medium text-muted-foreground/60 italic">
              © {currentYear} FounderGPT Platform. Optimized for Modern Web Standards.
            </p>
            <div className="h-4 w-px bg-border/40 hidden md:block" />
            <div className="flex items-center gap-3 px-4 py-2 rounded-full glass border border-border/40 group">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 font-bold">
                Produced by
              </span>
              <span className="text-[11px] uppercase tracking-[0.3em] font-black gradient-text group-hover:scale-110 transition-transform">
                CodeTitans
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 order-1 md:order-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-foreground">
              Core Analysis Engine V2.0 Live
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

