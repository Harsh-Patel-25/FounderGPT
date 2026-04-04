import { useState, Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IdeaInput from "@/components/IdeaInput";
import DashboardGrid from "@/components/DashboardGrid";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import MarketPotentialCard from "@/components/MarketPotentialCard";
import TechStackPanel from "@/components/TechStackPanel";
import FundingBreakdown from "@/components/FundingBreakdown";
import RiskAssessmentPanel from "@/components/RiskAssessmentPanel";
import GTMStrategyPanel from "@/components/GTMStrategyPanel";
import { getDashboard, getMarketPotential, getTechStack, getFunding, getRiskAssessment, getGTMStrategy, getResearchAnalysis } from "@/services/api";
import type { DashboardData, MarketPotential, TechStackData, FundingData, RiskAssessmentData, GTMStrategy, StartupIdea, ResearchData } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

// Lazy load heavy components
const StartupScoreChart = lazy(() => import("@/components/StartupScoreChart"));
const CompetitorTable = lazy(() => import("@/components/CompetitorTable"));
const InvestorPitchPanel = lazy(() => import("@/components/InvestorPitchPanel"));
const ResearchPanel = lazy(() => import("@/components/ResearchPanel"));

// Loading component for lazy-loaded components
const ComponentLoader = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="h-6 w-6 animate-spin" />
  </div>
);

interface FullAnalysisData {
  dashboard: DashboardData | null;
  market: { marketPotential: MarketPotential } | null;
  tech: TechStackData | null;
  funding: FundingData | null;
  risk: RiskAssessmentData | null;
  gtm: { gtmStrategy: GTMStrategy } | null;
  research: ResearchData | null;
}

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [currentIdea, setCurrentIdea] = useState<StartupIdea | null>(null);
  const [analysisData, setAnalysisData] = useState<FullAnalysisData>({
    dashboard: null,
    market: null,
    tech: null,
    funding: null,
    risk: null,
    gtm: null,
    research: null,
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [loadingModule, setLoadingModule] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async (ideaText: string) => {
    setLoading(true);
    setLoadingModule("dashboard");
    setAnalysisData({
      dashboard: null,
      market: null,
      tech: null,
      funding: null,
      risk: null,
      gtm: null,
      research: null,
    });
    setCurrentIdea({ idea: ideaText });

    try {
      const response = await getDashboard({ idea: ideaText });
      if (response.data.status === "success" && response.data.data) {
        setAnalysisData((prev) => ({ ...prev, dashboard: response.data.data }));
        setActiveTab("overview");
      } else {
        throw new Error(response.data.message || "Failed to analyze idea");
      }
    } catch (error: any) {
      console.error("Analysis failed:", error);
      toast({
        title: "Analysis Failed",
        description:
          error.response?.data?.message ||
          error.message ||
          "Could not connect to the AI backend. Check if it's running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setLoadingModule(null);
    }
  };

  const loadAnalysisModule = async (module: string) => {
    if (!currentIdea) return;
    
    setLoadingModule(module);
    try {
      switch (module) {
        case "market":
          const marketRes = await getMarketPotential(currentIdea);
          if (marketRes.data.status === "success") {
            setAnalysisData((prev) => ({ ...prev, market: marketRes.data.data }));
          }
          break;
        case "tech":
          const techRes = await getTechStack(currentIdea);
          if (techRes.data.status === "success") {
            setAnalysisData((prev) => ({ ...prev, tech: techRes.data.data }));
          }
          break;
        case "funding":
          const fundingRes = await getFunding(currentIdea);
          if (fundingRes.data.status === "success") {
            setAnalysisData((prev) => ({ ...prev, funding: fundingRes.data.data }));
          }
          break;
        case "risk":
          const riskRes = await getRiskAssessment(currentIdea);
          if (riskRes.data.status === "success") {
            setAnalysisData((prev) => ({ ...prev, risk: riskRes.data.data }));
          }
          break;
        case "gtm":
          const gtmRes = await getGTMStrategy(currentIdea);
          if (gtmRes.data.status === "success") {
            setAnalysisData((prev) => ({ ...prev, gtm: gtmRes.data.data }));
          }
          break;
        case "research":
          const researchRes = await getResearchAnalysis(currentIdea);
          if (researchRes.data.status === "success") {
            setAnalysisData((prev) => ({ ...prev, research: researchRes.data.data }));
          }
          break;
      }
    } catch (error: any) {
      console.error(`Failed to load ${module} analysis:`, error);
      toast({
        title: `${module.toUpperCase()} Analysis Failed`,
        description: error.response?.data?.message || "Could not load analysis module",
        variant: "destructive",
      });
    } finally {
      setLoadingModule(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <IdeaInput onAnalyze={handleAnalyze} loading={loading} />

      {loading && (
        <div className="container max-w-6xl py-12">
          <LoadingSkeleton />
        </div>
      )}

      {analysisData.dashboard && (
        <div className="container max-w-6xl py-8 animate-slide-up">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 lg:grid-cols-7 gap-1 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="market">Market</TabsTrigger>
              <TabsTrigger value="tech">Tech Stack</TabsTrigger>
              <TabsTrigger value="funding">Funding</TabsTrigger>
              <TabsTrigger value="risk">Risk</TabsTrigger>
              <TabsTrigger value="gtm">GTM</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid gap-8">
                <DashboardGrid data={analysisData.dashboard.analysis.analysis} />
                <Suspense fallback={<ComponentLoader />}>
                  <StartupScoreChart score={analysisData.dashboard.score.score} />
                </Suspense>
                <Suspense fallback={<ComponentLoader />}>
                  <CompetitorTable competitors={analysisData.dashboard.competitors.competitors} />
                </Suspense>
                <Suspense fallback={<ComponentLoader />}>
                  <InvestorPitchPanel
                    pitch={{
                      title: analysisData.dashboard.businessModel.businessModel.type || "Startup Strategy",
                      sections: [
                        {
                          heading: "Business Model",
                          content: analysisData.dashboard.businessModel.businessModel.description,
                        },
                        {
                          heading: "Revenue Streams",
                          content: analysisData.dashboard.businessModel.businessModel.revenueStreams.join(", "),
                        },
                        ...(analysisData.dashboard.businessModel.businessModel.pricingStrategy
                          ? [
                              {
                                heading: "Pricing Strategy",
                                content: analysisData.dashboard.businessModel.businessModel.pricingStrategy,
                              },
                            ]
                          : []),
                        ...(analysisData.dashboard.businessModel.businessModel.unitEconomics
                          ? [
                              {
                                heading: "Unit Economics",
                                content: analysisData.dashboard.businessModel.businessModel.unitEconomics,
                              },
                            ]
                          : []),
                      ],
                    }}
                  />
                </Suspense>
              </div>

              {/* Load Additional Modules Button */}
              <div className="border-t pt-8">
                <p className="text-sm text-muted-foreground mb-4">
                  Load detailed analysis for more insights:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2">
                  {[
                    { id: "research", label: "Research Intelligence" },
                    { id: "market", label: "Market Analysis" },
                    { id: "tech", label: "Tech Stack" },
                    { id: "funding", label: "Funding Plan" },
                    { id: "risk", label: "Risk Assessment" },
                    { id: "gtm", label: "GTM Strategy" },
                  ].map((mod) => (
                    <Button
                      key={mod.id}
                      onClick={() => {
                        loadAnalysisModule(mod.id);
                        setActiveTab(mod.id);
                      }}
                      disabled={loadingModule === mod.id}
                      variant={
                        analysisData[mod.id as keyof typeof analysisData]
                          ? "secondary"
                          : "outline"
                      }
                      className="w-full"
                    >
                      {loadingModule === mod.id ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        mod.label
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Research Tab */}
            <TabsContent value="research">
              {analysisData.research ? (
                <Suspense fallback={<ComponentLoader />}>
                  <ResearchPanel data={analysisData.research} />
                </Suspense>
              ) : (
                <div className="rounded-lg border-2 border-dashed p-8 text-center">
                  <p className="text-muted-foreground mb-4">Research intelligence not loaded yet</p>
                  <Button onClick={() => loadAnalysisModule("research")} disabled={loadingModule === "research"}>
                    {loadingModule === "research" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load Research Intelligence"
                    )}
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Market Potential Tab */}
            <TabsContent value="market">
              {analysisData.market ? (
                <MarketPotentialCard data={analysisData.market.marketPotential} />
              ) : (
                <div className="rounded-lg border-2 border-dashed p-8 text-center">
                  <p className="text-muted-foreground mb-4">Market analysis not loaded yet</p>
                  <Button onClick={() => loadAnalysisModule("market")} disabled={loadingModule === "market"}>
                    {loadingModule === "market" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load Market Analysis"
                    )}
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Tech Stack Tab */}
            <TabsContent value="tech">
              {analysisData.tech ? (
                <TechStackPanel data={analysisData.tech} />
              ) : (
                <div className="rounded-lg border-2 border-dashed p-8 text-center">
                  <p className="text-muted-foreground mb-4">Tech stack not loaded yet</p>
                  <Button onClick={() => loadAnalysisModule("tech")} disabled={loadingModule === "tech"}>
                    {loadingModule === "tech" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load Tech Stack"
                    )}
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Funding Tab */}
            <TabsContent value="funding">
              {analysisData.funding ? (
                <FundingBreakdown data={analysisData.funding} />
              ) : (
                <div className="rounded-lg border-2 border-dashed p-8 text-center">
                  <p className="text-muted-foreground mb-4">Funding analysis not loaded yet</p>
                  <Button onClick={() => loadAnalysisModule("funding")} disabled={loadingModule === "funding"}>
                    {loadingModule === "funding" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load Funding Analysis"
                    )}
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Risk Tab */}
            <TabsContent value="risk">
              {analysisData.risk ? (
                <RiskAssessmentPanel data={analysisData.risk} />
              ) : (
                <div className="rounded-lg border-2 border-dashed p-8 text-center">
                  <p className="text-muted-foreground mb-4">Risk assessment not loaded yet</p>
                  <Button onClick={() => loadAnalysisModule("risk")} disabled={loadingModule === "risk"}>
                    {loadingModule === "risk" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load Risk Assessment"
                    )}
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* GTM Tab */}
            <TabsContent value="gtm">
              {analysisData.gtm ? (
                <GTMStrategyPanel data={analysisData.gtm.gtmStrategy} />
              ) : (
                <div className="rounded-lg border-2 border-dashed p-8 text-center">
                  <p className="text-muted-foreground mb-4">GTM strategy not loaded yet</p>
                  <Button onClick={() => loadAnalysisModule("gtm")} disabled={loadingModule === "gtm"}>
                    {loadingModule === "gtm" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load GTM Strategy"
                    )}
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Index;
