import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  ArrowRight,
  CheckCircle,
  Rocket,
  Sparkles,
  FastForward,
  Lightbulb,
  PieChart,
  GitBranch,
  Server,
} from "lucide-react";

const Landing = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: BarChart3,
      title: "Market Analysis",
      description: "AI-powered market sizing with TAM/SAM/SOM, growth projections, and demographic targeting.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Users,
      title: "Competitor Intelligence",
      description: "Identify competitors, analyze strengths & weaknesses, and understand competitive positioning.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Briefcase,
      title: "Business Model",
      description: "AI-generated business models with revenue streams, pricing strategies, and unit economics.",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: Map,
      title: "Product Roadmap",
      description: "Strategic roadmap from MVP to scale with phased milestones and feature prioritization.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: Brain,
      title: "Startup Scoring",
      description: "Comprehensive scoring across market fit, innovation, feasibility, and scalability.",
      color: "from-teal-500 to-teal-600",
    },
    {
      icon: Zap,
      title: "Investor Pitch",
      description: "AI-generated investor pitch decks with data-driven narratives ready for fundraising.",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: Cpu,
      title: "Tech Stack Planning",
      description: "AI-recommended tech stacks with phased development scopes and infrastructure strategies.",
      color: "from-slate-500 to-slate-600",
    },
    {
      icon: DollarSign,
      title: "Funding Analysis",
      description: "Funding requirements, burn rate modeling, team costs, and financial forecasting.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: AlertTriangle,
      title: "Risk Assessment",
      description: "Risk matrix, SWOT analysis, and critical success factors identification.",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Target,
      title: "GTM Strategy",
      description: "Complete go-to-market playbook with market entry and 90-day action plans.",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  const benefits = [
    {
      icon: FastForward,
      title: "Lightning Fast",
      description: "Get comprehensive analysis in minutes, not weeks",
    },
    {
      icon: Brain,
      title: "AI-Powered",
      description: "Powered by state-of-the-art Google Gemini AI",
    },
    {
      icon: CheckCircle,
      title: "Comprehensive",
      description: "Cover every aspect from idea to execution",
    },
    {
      icon: TrendingUp,
      title: "Data-Driven",
      description: "Insights based on market research frameworks",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Describe Your Idea",
      description: "Enter your startup concept and target market details",
    },
    {
      number: "2",
      title: "AI Analysis",
      description: "Our AI analyzes across 10 critical dimensions",
    },
    {
      number: "3",
      title: "Get Insights",
      description: "Receive validated analysis and recommendations",
    },
    {
      number: "4",
      title: "Create Strategy",
      description: "Build your go-to-market and financial plans",
    },
    {
      number: "5",
      title: "Execute",
      description: "Use insights for investor pitches and planning",
    },
  ];

  const stats = [
    { value: "10+", label: "Analysis Modules" },
    { value: "60K+", label: "Founders Analyzed" },
    { value: "50%+", label: "Success Rate" },
    { value: "2 Min", label: "Analysis Time" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-40 right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-40 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center space-y-8 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">The Future of Startup Validation</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-heading font-bold gradient-text leading-tight">
              Validate Your Startup Idea in Minutes
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get AI-powered analysis, market insights, competitive intelligence, and investor-ready strategies—all in one platform. Transform your idea into a comprehensive business plan faster than ever.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                onClick={() => navigate("/register")}
                size="lg"
                className="text-base h-12 gap-2 glow-primary"
              >
                Start Free <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => navigate("/about")}
                size="lg"
                variant="outline"
                className="text-base h-12"
              >
                Learn More
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              ✨ No credit card required • ⚡ Get results in 2 minutes
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-lg bg-card/50 border border-border/50 backdrop-blur">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 border-t bg-secondary/20">
        <div className="container max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why FounderGPT?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <Card key={i} className="border-border/50">
                  <CardContent className="pt-6">
                    <Icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">10 Powerful Analysis Modules</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to validate, plan, and launch your startup
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card key={i} className="group hover:shadow-lg transition-all overflow-hidden">
                  <CardContent className="pt-6">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} mb-4 text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t bg-secondary/20">
        <div className="container max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>

          <div className="grid md:grid-cols-5 gap-4 md:gap-2">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-center mb-6">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[60%] w-[40%] h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Breakdown */}
      <section className="py-20 border-t">
        <div className="container max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Complete Feature Set</h2>

          <div className="space-y-8">
            {[
              {
                icon: Rocket,
                title: "Idea Validation",
                description:
                  "Get instant validation of your startup concept through market analysis, competitive landscape review, and comprehensive viability scoring.",
                features: ["Market Opportunity Analysis", "Problem Validation", "Target Audience Fit", "Viability Score"],
              },
              {
                icon: Lightbulb,
                title: "Strategy Generation",
                description:
                  "Move beyond validation to actionable strategies. Get AI-generated business models, revenue frameworks, and product roadmaps tailored to your idea.",
                features: ["Business Model Canvas", "Revenue Streams", "Pricing Strategies", "Product Roadmap"],
              },
              {
                icon: Target,
                title: "Market Execution",
                description:
                  "Detailed go-to-market strategy with customer acquisition channels, market entry planning, and a concrete 90-day playbook.",
                features: ["Market Entry Strategy", "Customer Acquisition", "Sales Channels", "90-Day Playbook"],
              },
              {
                icon: DollarSign,
                title: "Financial Planning",
                description:
                  "Understand funding needs, burn rate, runway, team composition costs, and break-even timeline for confident investor conversations.",
                features: ["Funding Requirements", "Burn Rate Modeling", "Team Costs", "Break-Even Timeline"],
              },
            ].map((section, i) => {
              const Icon = section.icon;
              return (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                        <p className="text-muted-foreground mb-4">{section.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {section.features.map((feature, j) => (
                            <div key={j} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 border-t bg-secondary/20">
        <div className="container max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Built with Cutting-Edge Tech</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Analysis",
                description: "Powered by Google Gemini, our AI provides intelligent, data-driven insights for comprehensive startup validation.",
              },
              {
                icon: Server,
                title: "Modern Backend",
                description: "Express.js API with enterprise-grade architecture, caching, and rate limiting for reliability and scale.",
              },
              {
                icon: GitBranch,
                title: "React Frontend",
                description: "Beautiful, responsive UI built with React, TypeScript, and Tailwind CSS for optimal user experience.",
              },
            ].map((tech, i) => {
              const Icon = tech.icon;
              return (
                <Card key={i}>
                  <CardContent className="pt-8">
                    <Icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{tech.title}</h3>
                    <p className="text-sm text-muted-foreground">{tech.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 border-t">
        <div className="container max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Perfect For</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "First-Time Founders",
                icon: Rocket,
                description: "Validate your idea and create a comprehensive strategy before investing time and money.",
              },
              {
                title: "Venture Founders",
                icon: TrendingUp,
                description: "Accelerate fundraising with data-driven analysis and investor-ready pitch materials.",
              },
              {
                title: "Product Managers",
                icon: PieChart,
                description: "Evaluate new product ideas with market potential and competitive positioning analysis.",
              },
              {
                title: "Business Strategists",
                icon: Lightbulb,
                description: "Get AI-powered insights to inform business planning and strategic direction decisions.",
              },
            ].map((useCase, i) => {
              const Icon = useCase.icon;
              return (
                <Card key={i} className="group hover:shadow-lg transition-all">
                  <CardContent className="pt-8">
                    <Icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{useCase.title}</h3>
                    <p className="text-sm text-muted-foreground">{useCase.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-40 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Idea?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of founders who are using FounderGPT to validate and launch their startups faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/register")}
              size="lg"
              className="text-base h-12 px-8 glow-primary"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              onClick={() => navigate("/login")}
              size="lg"
              variant="outline"
              className="text-base h-12"
            >
              Sign In
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            🎉 No credit card required • ⚡ Results in 2 minutes • 🚀 Start building today
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
