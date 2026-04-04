import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Lightbulb, TrendingDown } from "lucide-react";
import type { RiskAssessmentData } from "@/types";

interface RiskAssessmentPanelProps {
  data: RiskAssessmentData;
}

const RiskAssessmentPanel = ({ data }: RiskAssessmentPanelProps) => {
  const { riskAssessment } = data;
  
  const getRiskColor = (probability: number, impact: number) => {
    const score = (probability + impact) / 2;
    if (score >= 7) return "glass-red shadow-lg shadow-red-900/20";
    if (score >= 5) return "glass-orange shadow-lg shadow-orange-900/20";
    return "glass-green shadow-lg shadow-green-900/20";
  };

  const getRiskLevel = (probability: number, impact: number) => {
    const score = (probability + impact) / 2;
    if (score >= 7) return "High Risk";
    if (score >= 5) return "Medium Risk";
    return "Low Risk";
  };

  return (
    <div className="space-y-6">
      <Card className="glass">
        <CardHeader className="border-b border-border/50 pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
              Risk Assessment & Analysis
            </CardTitle>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full border border-border/50">
                <span className="text-sm font-medium text-muted-foreground">Overall Risk Score:</span>
                <span className="text-xl font-bold gradient-text">{riskAssessment.overallRiskScore}/10</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest opacity-50 mr-2">Calculated Weighted Average</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-8 space-y-10">
          {/* Risk Matrix */}
          <section>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-primary rounded-full" />
              Identified Risks
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {riskAssessment.risks.map((risk, i) => (
                <div key={i} className={`rounded-xl border p-5 transition-all hover:scale-[1.02] ${getRiskColor(risk.probability, risk.impact)}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-white/10 text-white border-white/20 capitalize">{risk.category}</Badge>
                        <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">{getRiskLevel(risk.probability, risk.impact)}</Badge>
                      </div>
                      <p className="font-bold text-lg leading-tight">{risk.risk}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                      <span className="text-xs uppercase tracking-wider opacity-70">Probability</span>
                      <div className="font-bold text-xl mt-0.5">{risk.probability}/10</div>
                    </div>
                    <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                      <span className="text-xs uppercase tracking-wider opacity-70">Impact</span>
                      <div className="font-bold text-xl mt-0.5">{risk.impact}/10</div>
                    </div>
                  </div>

                  <div className="bg-white/10 dark:bg-black/40 rounded-lg p-4 border border-white/10">
                    <p className="text-sm leading-relaxed">
                      <span className="font-bold opacity-80 uppercase text-[10px] tracking-widest block mb-1">Mitigation Strategy</span>
                      {risk.mitigation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SWOT Analysis */}
          <section>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-accent rounded-full" />
              SWOT Analysis
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Strengths */}
              <Card className="glass-green">
                <CardHeader className="pb-3 border-b border-green-500/20">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3">
                    {riskAssessment.swot.strengths.map((item, i) => (
                      <li key={i} className="text-sm flex gap-2">
                        <span className="opacity-50">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Weaknesses */}
              <Card className="glass-red">
                <CardHeader className="pb-3 border-b border-red-500/20">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" />
                    Weaknesses
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3">
                    {riskAssessment.swot.weaknesses.map((item, i) => (
                      <li key={i} className="text-sm flex gap-2">
                        <span className="opacity-50">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Opportunities */}
              <Card className="glass-blue">
                <CardHeader className="pb-3 border-b border-blue-500/20">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3">
                    {riskAssessment.swot.opportunities.map((item, i) => (
                      <li key={i} className="text-sm flex gap-2">
                        <span className="opacity-50">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Threats */}
              <Card className="glass-orange">
                <CardHeader className="pb-3 border-b border-orange-500/20">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Threats
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3">
                    {riskAssessment.swot.threats.map((item, i) => (
                      <li key={i} className="text-sm flex gap-2">
                        <span className="opacity-50">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Critical Success Factors */}
          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-yellow-500 rounded-full" />
              Critical Success Factors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {riskAssessment.criticalSuccessFactors.map((factor, i) => (
                <div key={i} className="flex items-center gap-4 bg-secondary/30 border border-border/50 p-4 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium leading-snug">{factor}</span>
                </div>
              ))}
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessmentPanel;
