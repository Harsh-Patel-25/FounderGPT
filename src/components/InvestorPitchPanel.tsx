import { FileText, ArrowRight } from "lucide-react";
import type { PitchDeck } from "@/types";

interface InvestorPitchPanelProps {
  pitch: PitchDeck;
  onGenerate?: () => void;
  loading?: boolean;
}

const InvestorPitchPanel = ({ pitch, onGenerate, loading }: InvestorPitchPanelProps) => {
  return (
    <section className="py-12">
      <div className="container max-w-5xl">
        <div className="glass rounded-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <FileText className="h-5 w-5" />
            </div>
            <h2 className="font-heading text-2xl font-bold">{pitch.title}</h2>
          </div>

          <div className="space-y-6">
            {pitch.sections.map((section) => (
              <div key={section.heading} className="bg-secondary/30 rounded-lg p-5 border border-border/20">
                <h3 className="text-sm font-bold text-accent mb-2 uppercase tracking-wider">{section.heading}</h3>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{section.content}</p>
              </div>
            ))}
          </div>

          {onGenerate && (
            <button
              onClick={onGenerate}
              disabled={loading}
              className="mt-8 inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-accent text-accent-foreground font-semibold text-sm transition-all hover:opacity-90 glow-accent disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="animate-spin h-4 w-4 border-2 border-accent-foreground border-t-transparent rounded-full" />
              ) : (
                <>
                  Regenerate Pitch
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default InvestorPitchPanel;
