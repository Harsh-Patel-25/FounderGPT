import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, MapPin, Users, TrendingUp, Zap } from "lucide-react";
import type { GTMStrategy } from "@/types";

interface GTMStrategyPanelProps {
  data: GTMStrategy;
}

const GTMStrategyPanel = ({ data }: GTMStrategyPanelProps) => {
  return (
    <div className="space-y-6">
      <Card className="glass">
        <CardHeader className="border-b border-border/50 pb-6">
          <CardTitle className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <div className="p-2 rounded-lg bg-accent/20 text-accent">
              <Target className="w-6 h-6" />
            </div>
            Go-to-Market Strategy
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="entry" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto p-1 bg-muted/40 border border-border/50 rounded-xl mb-8">
              <TabsTrigger value="entry" className="py-2.5 rounded-lg data-[state=active]:bg-background transition-all text-sm font-bold">Entry</TabsTrigger>
              <TabsTrigger value="channels" className="py-2.5 rounded-lg data-[state=active]:bg-background transition-all text-sm font-bold">Channels</TabsTrigger>
              <TabsTrigger value="pricing" className="py-2.5 rounded-lg data-[state=active]:bg-background transition-all text-sm font-bold">Pricing</TabsTrigger>
              <TabsTrigger value="90days" className="py-2.5 rounded-lg data-[state=active]:bg-background transition-all text-sm font-bold">90 Days</TabsTrigger>
              <TabsTrigger value="metrics" className="py-2.5 rounded-lg data-[state=active]:bg-background transition-all text-sm font-bold">Metrics</TabsTrigger>
            </TabsList>

            {/* Market Entry */}
            <TabsContent value="entry" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass border-t-2 border-t-blue-500/30">
                  <CardHeader className="pb-3 flex flex-row items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <CardTitle className="text-base font-bold">Geographic Focus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black mb-2 px-1">Primary Market</p>
                    <div className="bg-secondary/30 p-4 rounded-xl border border-border/50">
                      <p className="font-bold text-xl leading-tight">{data.marketEntry.geographicFocus}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-t-2 border-t-accent/30">
                  <CardHeader className="pb-3 flex flex-row items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10 text-accent">
                      <Users className="w-4 h-4" />
                    </div>
                    <CardTitle className="text-base font-bold">Initial Segment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black mb-2 px-1">First Target Segment</p>
                    <div className="bg-secondary/30 p-4 rounded-xl border border-border/50">
                      <p className="font-bold text-xl leading-tight">{data.marketEntry.initialSegment}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="glass-blue p-6 rounded-2xl border border-blue-500/20 relative group">
                <div className="absolute -left-2 top-4 w-1 h-8 bg-blue-500 rounded-full" />
                <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-2">Strategy Rationale</p>
                <p className="text-base leading-relaxed text-blue-900 dark:text-blue-50 font-medium">
                   {data.marketEntry.rationale}
                </p>

              </div>

              <div className="glass-purple p-6 rounded-2xl border border-purple-500/20 relative group">
                <div className="absolute -left-2 top-4 w-1 h-8 bg-purple-500 rounded-full" />
                <p className="text-xs font-black uppercase tracking-widest text-purple-400 mb-2">Competitive Edge</p>
                <p className="text-base leading-relaxed text-purple-900 dark:text-purple-50 font-medium">
                  {data.competitivePositioning}
                </p>

              </div>
            </TabsContent>

            {/* Acquisition Channels */}
            <TabsContent value="channels" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.acquisitionChannels.map((channel, i) => (
                  <Card key={i} className="glass group hover:bg-primary/5 transition-all">
                    <CardHeader className="pb-3 border-b border-border/50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">{channel.channel}</CardTitle>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black uppercase">Phase {i + 1}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-2">Mechanism</p>
                        <p className="text-sm leading-relaxed opacity-90">{channel.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-secondary/30 p-3 rounded-lg border border-border/50">
                          <p className="text-[11px] uppercase tracking-tight text-muted-foreground font-bold mb-1">CAC Ratio</p>
                          <p className="font-bold text-primary">{channel.cadAssumption}</p>
                        </div>
                        <div className="bg-secondary/30 p-3 rounded-lg border border-border/50">
                          <p className="text-[11px] uppercase tracking-tight text-muted-foreground font-bold mb-1">Timeline</p>
                          <p className="font-bold">{channel.timeline}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Pricing Strategy */}
            <TabsContent value="pricing" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card className="glass-blue border-none shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                    Pricing Psychology & Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base leading-relaxed text-blue-900 dark:text-blue-50 font-medium">
                    {data.priceStrategy}
                  </p>

                </CardContent>
              </Card>

              {data.partnershipOpportunities.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground px-1">Network & Partnerships</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.partnershipOpportunities.map((partner, i) => (
                      <Badge key={i} className="px-6 py-2 rounded-full glass-purple border-purple-500/30 text-sm hover:bg-purple-500 animate-in zoom-in-50 duration-300">
                        {partner}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* First 90 Days */}
            <TabsContent value="90days" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card className="glass border-t-4 border-t-accent shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-accent/20 text-accent">
                      <Zap className="w-6 h-6" />
                    </div>
                    High-Velocity 90 Day Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {data.first90Days.map((action, i) => (
                      <div key={i} className="flex gap-5 group">
                        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-2xl bg-secondary/50 border border-border/50 text-sm font-black transition-all group-hover:bg-accent group-hover:text-accent-foreground group-hover:rotate-12">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <div className="py-2 border-b border-border/50 flex-1 group-last:border-none">
                          <p className="text-base leading-tight font-medium opacity-90 group-hover:opacity-100 transition-opacity">{action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Key Metrics */}
            <TabsContent value="metrics" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.metricsToTrack?.map((metric, i) => (
                  <div key={i} className="glass-blue group p-6 rounded-2xl border border-blue-500/20 hover:scale-[1.02] transition-all flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <p className="text-base font-bold">{metric}</p>
                  </div>
                )) || <p className="text-muted-foreground italic p-8 text-center col-span-full">No metrics identified</p>}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default GTMStrategyPanel;
