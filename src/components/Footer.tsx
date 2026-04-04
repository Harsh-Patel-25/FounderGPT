import { Rocket, Twitter, Linkedin, Github, Youtube, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Validation", href: "/dashboard" },
      { name: "Market Analysis", href: "/dashboard" },
      { name: "Pitch Deck", href: "/dashboard" },
      { name: "About FounderGPT", href: "/about" },
    ],
    company: [
      { name: "Our Mission", href: "/about" },
      { name: "Partner Program", href: "/" },
      { name: "Contact Support", href: "/" },
      { name: "Venture Partners", href: "/" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/" },
      { name: "Terms of Service", href: "/" },
      { name: "Cookie Settings", href: "/" },
    ],
  };

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
    { name: "GitHub", icon: Github, href: "https://github.com/Harsh-Patel-25/FounderGPT" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
  ];

  return (
    <footer className="relative border-t border-border/40 mt-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 bg-card/30 backdrop-blur-md" />
      <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold gradient-text">FounderGPT</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The premier AI-powered startup validation platform. We help founders move from "idea" to "execution" with enterprise-grade data and strategic intelligence.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full glass border border-border/40 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all duration-300 transform hover:-translate-y-1"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-foreground mb-6 uppercase text-xs tracking-widest">Analysis Suite</h4>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                    {link.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-6 uppercase text-xs tracking-widest">Ecosystem</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground mb-2 uppercase text-xs tracking-widest">Stay Updated</h4>
            <p className="text-xs text-muted-foreground">Get the latest on AI startup trends and platform updates.</p>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="email"
                placeholder="founder@startup.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/30 border border-border/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all text-sm backdrop-blur-sm"
              />
            </div>
            <Button className="w-full h-11 rounded-xl glow-primary font-medium hover:scale-[1.02] transition-transform">
              Join Newsletter
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-xs text-muted-foreground opacity-60">
              © {currentYear} FounderGPT. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 font-bold">
                Produced by
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-black gradient-text group-hover:glow-primary transition-all">
                CodeTitans
              </span>
            </div>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <a key={link.name} href={link.href} className="text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors font-medium">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold italic">
              AI Powered Analysis Engine Live
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
