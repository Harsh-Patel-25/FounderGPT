import { useState } from "react";
import Navbar from "@/components/Navbar";
import IdeaInput from "@/components/IdeaInput";
import DashboardGrid from "@/components/DashboardGrid";
import StartupScoreChart from "@/components/StartupScoreChart";
import CompetitorTable from "@/components/CompetitorTable";
import InvestorPitchPanel from "@/components/InvestorPitchPanel";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);
    setAnalyzed(false);
    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <IdeaInput onAnalyze={handleAnalyze} loading={loading} />

      {loading && (
        <div className="container max-w-5xl py-12">
          <LoadingSkeleton />
        </div>
      )}

      {analyzed && (
        <div className="animate-slide-up">
          <DashboardGrid />
          <StartupScoreChart />
          <CompetitorTable />
          <InvestorPitchPanel />
        </div>
      )}

      <footer className="border-t border-border/40 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © 2026 FounderGPT. Built for founders, by AI.
        </div>
      </footer>
    </div>
  );
};

export default Index;
