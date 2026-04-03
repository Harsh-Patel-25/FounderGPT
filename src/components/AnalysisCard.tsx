import { LucideIcon } from "lucide-react";

interface AnalysisCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  status?: "ready" | "coming-soon";
}

const AnalysisCard = ({ title, description, icon: Icon, status = "coming-soon" }: AnalysisCardProps) => {
  return (
    <div className="group glass rounded-xl p-6 transition-all hover:border-primary/30 hover:glow-primary">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-heading text-base font-semibold text-foreground">
              {title}
            </h3>
            {status === "coming-soon" && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                Soon
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisCard;
