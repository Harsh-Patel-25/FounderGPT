import { Target, TrendingUp, Users, Briefcase } from "lucide-react";
import type { AnalysisResult } from "@/types";

interface DashboardGridProps {
  data: AnalysisResult[];
}

const iconMap: Record<string, typeof Target> = {
  "Problem & Target Audience": Target,
  "Market Opportunity": TrendingUp,
  "Competitor Insights": Users,
  "Business Model": Briefcase,
  "Unique Value Proposition": Target,
  "Business Model Viability": Briefcase,
};

const DashboardGrid = ({ data }: DashboardGridProps) => (
  <section className="py-12">
    <div className="container max-w-5xl">
      <h2 className="font-heading text-2xl font-bold mb-6">AI Analysis Results</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {data.map(({ title, description }) => {
          const Icon = iconMap[title] || Target;
          return (
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
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default DashboardGrid;
