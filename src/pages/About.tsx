import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  Zap,
  Brain,
  Target,
  TrendingUp,
  Shield,
  Map,
  DollarSign,
  AlertTriangle,
  Cpu,
  Users,
  Briefcase,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Market Analysis",
    description: "AI-powered market sizing with TAM/SAM/SOM analysis, growth projections, demographic targeting, and market trend identification.",
  },
  {
    icon: Users,
    title: "Competitor Intelligence",
    description: "Identify real competitors, analyze their strengths & weaknesses, and understand competitive positioning.",
  },
  {
    icon: Briefcase,
    title: "Business Model Generation",
    description: "AI creates tailored business models with revenue streams, pricing strategies, and unit economics.",
  },
  {
    icon: Map,
    title: "Product Roadmap",
    description: "Strategic roadmap from MVP to scale with phased milestones, goals, and feature prioritization.",
  },
  {
    icon: Brain,
    title: "Startup Scoring",
    description: "Comprehensive scoring across market fit, innovation, feasibility, and scalability dimensions.",
  },
  {
    icon: Zap,
    title: "Investor Pitch Generation",
    description: "Generate compelling investor pitch decks with data-driven narratives ready for fundraising.",
  },
  {
    icon: Cpu,
    title: "Tech Stack Planning",
    description: "AI-recommended technology stack with phased development scopes and infrastructure strategies.",
  },
  {
    icon: DollarSign,
    title: "Funding Analysis",
    description: "Detailed funding requirements, burn rate modeling, team composition, and financial forecasting.",
  },
  {
    icon: AlertTriangle,
    title: "Risk Assessment",
    description: "Comprehensive risk matrix with SWOT analysis and critical success factors identification.",
  },
  {
    icon: Target,
    title: "Go-to-Market Strategy",
    description: "Complete GTM playbook with market entry strategy, acquisition channels, and 90-day action plans.",
  },
  {
    icon: TrendingUp,
    title: "Market Penetration",
    description: "Strategic market penetration approaches with customer segment targeting and pricing psychology.",
  },
  {
    icon: Shield,
    title: "Performance Metrics",
    description: "Key metrics to track success, from customer acquisition cost to runway and break-even timelines.",
  },
];

const About = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCTA = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-40 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="container max-w-6xl">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Welcome to</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold gradient-text">
              FounderGPT
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The AI-powered platform that validates startup ideas, generates comprehensive business strategies,
              and accelerates your path from concept to market with data-driven insights.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 border-t">
        <div className="container max-w-6xl">
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                FounderGPT combines advanced AI, market research frameworks, and startup best practices to transform
                your idea into a comprehensive business strategy—all in minutes, not weeks.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    Deep Idea Validation
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Get instant validation of your startup concept through market analysis, competitive landscape review,
                  and viability scoring. Understand the problems your solution solves and if there's real market demand.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Business Strategy Generation
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Go beyond validation. Get AI-generated business models, revenue strategies, pricing frameworks, and
                  comprehensive roadmaps tailored to your specific idea and market.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Go-to-Market Planning
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Develop a detailed market entry strategy with customer acquisition channels, pricing psychology,
                  partnership opportunities, and a concrete 90-day execution playbook.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Financial & Funding Guidance
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Understand your funding needs, burn rate, runway, team composition costs, and break-even timeline.
                  Get prepared for seed and Series A conversations with investors.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 border-t bg-secondary/20">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete AI Analysis Suite</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              12 comprehensive analysis modules powered by state-of-the-art AI to cover every aspect of startup planning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 border-t">
        <div className="container max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>

          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Describe Your Idea",
                description:
                  "Simply enter a description of your startup idea, target market, and industry. The more details you provide, the more tailored the analysis becomes.",
              },
              {
                step: "2",
                title: "AI Analysis Begins",
                description:
                  "Our advanced AI powered by Google Gemini analyzes your idea across 12 dimensions: market potential, competition, business viability, and more.",
              },
              {
                step: "3",
                title: "Get Comprehensive Insights",
                description:
                  "Instantly receive validated market analysis, competitor research, business model recommendations, funding requirements, and risk assessment.",
              },
              {
                step: "4",
                title: "Dive Deep Into Details",
                description:
                  "Explore detailed modules for tech stack recommendations, go-to-market strategies, 90-day playbooks, and financial projections.",
              },
              {
                step: "5",
                title: "Export & Share",
                description:
                  "Use your insights for investor pitches, team alignment, strategic planning, or market validation campaigns.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center font-bold text-primary flex-shrink-0">
                    {item.step}
                  </div>
                  {idx < 4 && <div className="w-1 h-16 bg-border mt-2" />}
                </div>
                <div className="pb-8">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Use FounderGPT */}
      <section className="py-16 border-t bg-secondary/20">
        <div className="container max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Use FounderGPT?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-bold text-green-600">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Lightning Fast</h3>
                  <p className="text-sm text-muted-foreground">Get comprehensive analysis in minutes, not weeks.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-bold text-green-600">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Data-Driven</h3>
                  <p className="text-sm text-muted-foreground">AI-powered insights based on market research frameworks and startup best practices.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-bold text-green-600">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Comprehensive</h3>
                  <p className="text-sm text-muted-foreground">Cover every aspect from idea validation to financial planning.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-bold text-green-600">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Actionable</h3>
                  <p className="text-sm text-muted-foreground">Not just analysis—get concrete strategies and 90-day playbooks you can execute immediately.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-bold text-blue-600">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Market Focused</h3>
                  <p className="text-sm text-muted-foreground">Deep market sizing, competitive analysis, and customer segment targeting.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-bold text-blue-600">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Investor Ready</h3>
                  <p className="text-sm text-muted-foreground">Generate pitch decks, financial models, and investor narratives.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-bold text-blue-600">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Risk Aware</h3>
                  <p className="text-sm text-muted-foreground">Understand and mitigate risks before you launch.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-bold text-blue-600">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Always Improving</h3>
                  <p className="text-sm text-muted-foreground">Powered by cutting-edge AI that continuously learns and improves.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Validate Your Startup Idea?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Transform your startup concept into a comprehensive, investor-ready business plan in minutes.
          </p>
          <Button onClick={handleCTA} size="lg" className="text-base h-12 gap-2">
            {isAuthenticated ? "Go to Dashboard" : "Get Started Now"}
            <Zap className="w-4 h-4" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
