import { FileText, ArrowRight } from "lucide-react";
import { useState } from "react";

const pitchText = `FounderGPT helps entrepreneurs validate startup ideas instantly using AI-powered market research and strategic insights. Our platform reduces the time from idea to informed decision from weeks to minutes — saving founders $10K+ in consulting fees and dramatically increasing their odds of product-market fit.

We're targeting the 582M global entrepreneurs with a freemium SaaS model. Early traction shows 3x higher engagement than traditional business-plan tools.`;

const InvestorPitchPanel = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setVisible(false);
    setTimeout(() => {
      setLoading(false);
      setVisible(true);
    }, 1800);
  };

  return (
    <section className="py-12">
      <div className="container max-w-5xl">
        <div className="glass rounded-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <FileText className="h-5 w-5" />
            </div>
            <h2 className="font-heading text-2xl font-bold">AI-Generated Investor Pitch</h2>
          </div>

          {!visible && !loading && (
            <p className="text-muted-foreground text-sm mb-6">
              Click below to generate a compelling investor-ready pitch based on your startup analysis.
            </p>
          )}

          {loading && (
            <div className="space-y-3 mb-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-md bg-muted h-4" style={{ width: `${100 - i * 15}%` }} />
              ))}
            </div>
          )}

          {visible && (
            <div className="bg-secondary/50 rounded-lg p-5 mb-6 border border-border/40">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{pitchText}</p>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-accent text-accent-foreground font-semibold text-sm transition-all hover:opacity-90 glow-accent disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="animate-spin h-4 w-4 border-2 border-accent-foreground border-t-transparent rounded-full" />
            ) : (
              <>
                Generate Pitch
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default InvestorPitchPanel;
