import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import type { MarketPotential } from "@/types";

interface MarketPotentialCardProps {
  data: MarketPotential;
}

const MarketPotentialCard = ({ data }: MarketPotentialCardProps) => {
  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Market Potential Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Market potential data is not available yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="glass overflow-hidden border-none shadow-2xl">
        <CardHeader className="border-b border-border/50 bg-secondary/20 pb-6">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold tracking-tight">
            <div className="p-2 rounded-lg bg-primary/20 text-primary">
              <TrendingUp className="w-6 h-6" />
            </div>
            Market Potential Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8 space-y-10">
          {/* TAM/SAM/SOM */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-blue rounded-2xl p-6 border border-blue-500/20 shadow-lg transition-all hover:scale-[1.02]">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-2">TAM</div>
              <div className="text-3xl font-black text-blue-900 dark:text-blue-50 leading-tight">
                {data.tamSamSom.tam}
              </div>
              <p className="text-[10px] text-blue-700/70 dark:text-blue-300/60 mt-4 leading-relaxed font-medium">Total Addressable Market</p>

            </div>
            <div className="glass-purple rounded-2xl p-6 border border-purple-500/20 shadow-lg transition-all hover:scale-[1.02]">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 mb-2">SAM</div>
              <div className="text-3xl font-black text-purple-900 dark:text-purple-50 leading-tight">
                {data.tamSamSom.sam}
              </div>
              <p className="text-[10px] text-purple-700/70 dark:text-purple-300/60 mt-4 leading-relaxed font-medium">Serviceable Available Market</p>

            </div>
            <div className="glass-green rounded-2xl p-6 border border-green-500/20 shadow-lg transition-all hover:scale-[1.02]">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-green-400 mb-2">SOM</div>
              <div className="text-3xl font-black text-green-900 dark:text-green-50 leading-tight">
                {data.tamSamSom.som}
              </div>
              <p className="text-[10px] text-green-700/70 dark:text-green-300/60 mt-4 leading-relaxed font-medium">Serviceable Obtainable Market</p>

            </div>
          </div>

          {/* Growth Rate */}
          <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-24 h-24" />
            </div>
            <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-3">Market Growth Rate</h4>
            <p className="text-2xl font-bold text-foreground leading-snug">
              {data.marketGrowthRate}
            </p>
          </div>

          {/* Trends */}
          <section>
            <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
              <div className="w-1 h-3 bg-accent rounded-full" />
              Strategic Market Trends
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.marketTrends.map((trend, i) => (
                <Badge key={i} variant="secondary" className="px-4 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors font-medium">
                  {trend}
                </Badge>
              ))}
            </div>
          </section>

          {/* Target Demographics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <div className="w-1 h-3 bg-blue-500 rounded-full" />
                Primary Demographics
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {data.targetDemographics.primary.map((demo, i) => (
                  <div key={i} className="flex items-center gap-3 bg-secondary/20 p-3 rounded-xl border border-border/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-sm font-medium text-foreground/90">{demo}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <div className="w-1 h-3 bg-purple-500 rounded-full" />
                Secondary Demographics
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {data.targetDemographics.secondary.map((demo, i) => (
                  <div key={i} className="flex items-center gap-3 bg-secondary/20 p-3 rounded-xl border border-border/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span className="text-sm font-medium text-foreground/90">{demo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Market Penetration */}
          <div className="glass-blue p-6 rounded-2xl border border-blue-500/20">
            <h4 className="text-sm font-black uppercase tracking-widest text-blue-400 mb-4">Market Penetration Strategy</h4>
            <p className="text-base leading-relaxed text-blue-900 dark:text-blue-50 font-medium">
              {data.marketPenetrationStrategy}
            </p>

          </div>

          {/* Risks & Opportunities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-red p-6 rounded-2xl border border-red-500/20">
              <h4 className="text-sm font-black uppercase tracking-widest text-red-400 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                Market Risks
              </h4>
              <ul className="space-y-3">
                {data.marketRisks?.map((risk, i) => (
                  <li key={i} className="text-sm flex items-start gap-3">
                    <span className="text-red-600/60 dark:text-red-400 dark:opacity-60 mt-1.5">•</span>
                    <span className="leading-tight text-red-900 dark:text-red-50 font-medium">{risk}</span>
                  </li>
                )) || <li className="text-sm opacity-50 italic">No risks identified</li>}
              </ul>
            </div>
            <div className="glass-green p-6 rounded-2xl border border-green-500/20">
              <h4 className="text-sm font-black uppercase tracking-widest text-green-400 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Key Opportunities
              </h4>
              <ul className="space-y-3">
                {data.opportunities?.map((opp, i) => (
                  <li key={i} className="text-sm flex items-start gap-3">
                    <span className="text-green-600/60 dark:text-green-400 dark:opacity-60 mt-1.5">•</span>
                    <span className="leading-tight text-green-900 dark:text-green-50 font-medium">{opp}</span>
                  </li>
                )) || <li className="text-sm opacity-50 italic">No opportunities identified</li>}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketPotentialCard;
