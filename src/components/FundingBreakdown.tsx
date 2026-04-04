import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Users, TrendingDown, Target, TrendingUp } from "lucide-react";
import type { FundingData } from "@/types";

interface FundingBreakdownProps {
  data: FundingData;
}

const FundingBreakdown = ({ data }: FundingBreakdownProps) => {
  const expenseKeys = Object.entries(data.keyExpenses) as [string, string][];

  return (
    <div className="space-y-6">
      <Card className="glass">
        <CardHeader className="border-b border-border/50 pb-6">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <DollarSign className="w-6 h-6 text-green-500" />
            Funding & Financial Planning
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="funding" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-muted/40 border border-border/50 rounded-xl mb-8">
              <TabsTrigger value="funding" className="py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all text-sm font-bold">Funding</TabsTrigger>
              <TabsTrigger value="burn" className="py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all text-sm font-bold">Burn Rate</TabsTrigger>
              <TabsTrigger value="team" className="py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all text-sm font-bold">Team</TabsTrigger>
              <TabsTrigger value="expenses" className="py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all text-sm font-bold">Budget</TabsTrigger>
            </TabsList>

            {/* Funding Requirements */}
            <TabsContent value="funding" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-green border-t-4 border-t-green-500/50">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Seed Round</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                      <p className="text-[10px] uppercase tracking-widest opacity-70 font-bold mb-1">Target Amount</p>
                      <p className="text-3xl font-black text-green-400">
                        {data.fundingRequirements.seed.amount}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-white/10">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold">Timeline</p>
                        <p className="text-sm font-semibold">{data.fundingRequirements.seed.timeframe}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold mb-3">Allocation</p>
                      <ul className="space-y-2">
                        {data.fundingRequirements.seed.uses.map((use, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            <span className="leading-tight opacity-90">{use}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-blue border-t-4 border-t-blue-500/50">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Series A</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                      <p className="text-[10px] uppercase tracking-widest opacity-70 font-bold mb-1">Target Amount</p>
                      <p className="text-3xl font-black text-blue-400">
                        {data.fundingRequirements.seriesA.amount}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-white/10">
                        <TrendingUp className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold">Horizon</p>
                        <p className="text-sm font-semibold">{data.fundingRequirements.seriesA.timeframe}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold mb-3">Scaling Focus</p>
                      <ul className="space-y-2">
                        {data.fundingRequirements.seriesA.uses.map((use, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span className="leading-tight opacity-90">{use}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="glass-blue p-6 rounded-xl border border-blue-500/30 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <Target className="w-20 h-20" />
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  Strategic Funding Context
                </p>
                <p className="text-base leading-relaxed font-medium text-blue-900 dark:text-blue-50">
                  {data.fundingStrategy}
                </p>

              </div>
            </TabsContent>

            {/* Burn Rate */}
            <TabsContent value="burn" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="glass-red p-6 rounded-2xl border border-red-500/30 shadow-lg shadow-red-900/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-red-500/20 text-red-900 dark:text-red-100">
                      <TrendingDown className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest opacity-80 font-bold">Monthly Burn</p>
                      <p className="text-2xl font-black text-foreground">
                        {data.burnRate.monthlyBurn}
                      </p>
                    </div>

                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-[60%] shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  </div>
                </div>

                <div className="glass-orange p-6 rounded-2xl border border-orange-500/30 shadow-lg shadow-orange-900/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-900 dark:text-orange-100">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest opacity-80 font-bold">Estimated Runway</p>
                      <p className="text-2xl font-black text-foreground">
                        {data.burnRate.runway}
                      </p>
                    </div>

                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[40%] shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                  </div>
                </div>

                <div className="glass-green p-6 rounded-2xl border border-green-500/30 shadow-lg shadow-green-900/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-green-500/20 text-green-900 dark:text-green-100">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest opacity-80 font-bold">Break-Even</p>
                      <p className="text-2xl font-black text-foreground">
                        {data.burnRate.breakEvenTimeline}
                      </p>
                    </div>

                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[20%] shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Team Composition */}
            <TabsContent value="team" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="rounded-2xl border border-border/50 overflow-hidden glass shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-secondary/50 border-b border-border/50">
                      <tr>
                        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Key Role</th>
                        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Compensation Range</th>
                        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Hiring Timeline</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {data.teamComposition.map((member, i) => (
                        <tr key={i} className="hover:bg-primary/5 transition-colors group">
                          <td className="px-6 py-5 text-sm font-bold text-foreground flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                            {member.role}
                          </td>
                          <td className="px-6 py-5 text-sm font-medium text-primary">{member.salary}</td>
                          <td className="px-6 py-5">
                            <Badge variant="outline" className="text-[10px] bg-secondary/30 px-3 py-1 font-bold">
                              {member.timing}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Budget Breakdown */}
            <TabsContent value="expenses" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {expenseKeys.map(([key, value]) => (
                  <div key={key} className="glass group hover:bg-primary/5 transition-all p-6 rounded-2xl border border-border/50 hover:border-primary/30 shadow-lg relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                      <Target className="w-24 h-24" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    <p className="text-3xl font-black gradient-text group-hover:scale-105 transition-transform origin-left">{value}</p>
                    <div className="mt-4 w-full h-1 bg-muted rounded-full overflow-hidden">
                       <div className="h-full bg-primary/40 w-[var(--val,50%)] group-hover:w-[var(--val,70%)] transition-all duration-500" />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FundingBreakdown;
