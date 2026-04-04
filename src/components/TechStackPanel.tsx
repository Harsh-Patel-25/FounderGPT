import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Cpu, Database, Cloud, Package, Wrench, Shield, Activity, TrendingUp } from "lucide-react";
import type { TechStackData } from "@/types";

interface TechStackPanelProps {
  data: TechStackData;
}

const TechStackPanel = ({ data }: TechStackPanelProps) => {
  const techCategories = [
    { label: "Frontend", icon: Code2, techs: data.techStack?.frontend, glass: "glass-blue" },
    { label: "Backend", icon: Cpu, techs: data.techStack?.backend, glass: "glass-purple" },
    { label: "Database", icon: Database, techs: data.techStack?.database, glass: "glass-green" },
    { label: "Infrastructure", icon: Cloud, techs: data.techStack?.infrastructure, glass: "glass-orange" },
    { label: "3rd Party Services", icon: Package, techs: data.techStack?.thirdPartyServices, glass: "glass-pink" },
    { label: "Dev Tools", icon: Wrench, techs: data.techStack?.developmentTools, glass: "glass-purple" },
  ];

  return (
    <div className="space-y-6">
      <Card className="glass">
        <CardHeader className="border-b border-border/50 pb-6">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Cpu className="w-6 h-6 text-primary" />
            Tech Stack & Architecture
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-8 space-y-10">
          {/* Tech Stack Categories */}
          <section>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-primary rounded-full" />
              Core Infrastructure
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {techCategories.map((cat) => {
                const Icon = cat.icon;
                const techList = Array.isArray(cat.techs)
                  ? cat.techs
                  : typeof cat.techs === "string"
                  ? (cat.techs as string).split(",")
                  : [];

                return (
                  <div key={cat.label} className={`rounded-xl border p-5 transition-all hover:scale-[1.02] ${cat.glass}`}>
                    <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-3">
                      <Icon className="w-5 h-5 opacity-80" />
                      <h4 className="font-bold text-lg">{cat.label}</h4>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {techList.length > 0 ? (
                        techList.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none py-1">
                            {tech.trim()}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm opacity-60 italic">
                          No technologies listed
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Development Phases & Scopes */}
          <section>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-accent rounded-full" />
              Development Roadmap
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { key: "phase1MVP", label: "Phase 1: MVP", color: "border-primary/30" },
                { key: "phase2Growth", label: "Phase 2: Growth", color: "border-accent/30" },
                { key: "phase3Scale", label: "Phase 3: Scale", color: "border-purple-500/30" },
              ].map((phase) => {
                const phaseData = data?.scopes?.[phase.key as keyof typeof data.scopes];

                if (!phaseData) return null;

                return (
                  <Card key={phase.key} className={`border-t-4 ${phase.color} glass`}>
                    <CardHeader>
                      <CardTitle className="text-lg font-bold">{phase.label}</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="bg-secondary/30 p-3 rounded-lg border border-border/50">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Timeline</p>
                        <p className="font-bold text-primary">
                          {phaseData.estimatedDevelopmentTime || "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Focus & Scope</p>
                        <p className="text-sm leading-relaxed">{phaseData.scope || "N/A"}</p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-2">Key Tech</p>

                        <div className="flex flex-wrap gap-1.5">
                          {Array.isArray(phaseData.technologies) &&
                          phaseData.technologies.length > 0 ? (
                            phaseData.technologies.map((tech, i) => (
                              <Badge key={i} variant="outline" className="text-[10px] border-primary/20 bg-primary/5">
                                {tech}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-xs text-muted-foreground italic">
                              No tech specified
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Infrastructure Needs */}
          <section>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
              Infrastructure Requirements
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Hosting", value: data?.infrastructureNeeds?.hosting, icon: Cloud },
                { label: "Scalability", value: data?.infrastructureNeeds?.scalability, icon: TrendingUp },
                { label: "Security", value: data?.infrastructureNeeds?.security, icon: Shield },
                { label: "Monitoring", value: data?.infrastructureNeeds?.monitoring, icon: Activity },
              ].map((item) => (
                <div key={item.label} className="bg-secondary/20 border border-border/50 rounded-xl p-5 group hover:bg-secondary/40 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                      {item.icon && <item.icon className="w-4 h-4" />}
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{item.label}</p>
                  </div>
                  <p className="text-sm font-medium leading-relaxed">
                    {item.value || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechStackPanel;