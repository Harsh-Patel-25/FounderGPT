import { Target, TrendingUp, Users, Briefcase } from "lucide-react";

const analysisData = [
  {
    title: "Problem & Target Audience",
    icon: Target,
    content:
      "Your AI fitness coach targets health-conscious millennials (25–40) struggling with gym accessibility. The addressable audience is ~120M in North America alone.",
  },
  {
    title: "Market Opportunity",
    icon: TrendingUp,
    content:
      "The global fitness app market is projected to reach $15.96B by 2028, growing at 21.6% CAGR. AI-driven personalization is the fastest-growing sub-segment.",
  },
  {
    title: "Competitor Insights",
    icon: Users,
    content:
      "Key competitors include Peloton, Fitbod, and Apple Fitness+. None offer real-time AI coaching with computer-vision form correction — a clear gap.",
  },
  {
    title: "Business Model",
    icon: Briefcase,
    content:
      "Freemium model with $9.99/mo premium tier. Revenue streams: subscriptions, B2B corporate wellness licenses, and branded equipment partnerships.",
  },
];

const DashboardGrid = () => (
  <section className="py-12">
    <div className="container max-w-5xl">
      <h2 className="font-heading text-2xl font-bold mb-6">AI Analysis Results</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {analysisData.map(({ title, icon: Icon, content }) => (
          <div
            key={title}
            className="group glass rounded-xl p-6 transition-all duration-300 hover:border-primary/40 hover:glow-primary hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-heading text-sm font-semibold text-foreground">{title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DashboardGrid;
