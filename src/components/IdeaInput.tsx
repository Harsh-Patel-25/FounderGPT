import { Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

const IdeaInput = () => {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;
    setLoading(true);
    // Future: call analyzeIdea service
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <section className="py-20">
      <div className="container max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6 animate-pulse-glow">
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered Startup Validation
        </div>

        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          Your AI{" "}
          <span className="gradient-text">Startup Co-Founder</span>
        </h1>

        <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
          Enter your startup idea and get instant analysis, competitor insights,
          business models, and an investor-ready pitch.
        </p>

        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your startup idea..."
            rows={4}
            className="w-full rounded-xl bg-card border border-border/60 px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none transition-all"
          />
          <button
            type="submit"
            disabled={!idea.trim() || loading}
            className="mt-4 inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-primary text-primary-foreground font-semibold transition-all hover:opacity-90 glow-primary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
            ) : (
              <>
                Analyze Idea
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default IdeaInput;
