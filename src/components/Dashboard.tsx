import {
  BarChart3,
  Users,
  Briefcase,
  Map,
  Presentation,
  Trophy,
} from "lucide-react";
import AnalysisCard from "./AnalysisCard";

const features = [
  {
    title: "Startup Analysis",
    description: "Deep-dive analysis of your idea's market potential and viability.",
    icon: BarChart3,
  },
  {
    title: "Competitor Insights",
    description: "Identify key competitors and understand their strengths.",
    icon: Users,
  },
  {
    title: "Business Model",
    description: "AI-generated revenue models and monetization strategies.",
    icon: Briefcase,
  },
  {
    title: "Product Roadmap",
    description: "Strategic roadmap from MVP to scale with milestones.",
    icon: Map,
  },
  {
    title: "Investor Pitch",
    description: "Generate a compelling pitch deck ready for investors.",
    icon: Presentation,
  },
  {
    title: "Startup Score",
    description: "Get a data-driven score across key success dimensions.",
    icon: Trophy,
  },
];

const Dashboard = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
            What You'll Get
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Comprehensive AI-powered tools to validate and launch your startup.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {features.map((feature) => (
            <AnalysisCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
