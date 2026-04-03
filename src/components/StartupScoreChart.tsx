import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

const labels = ["Market Demand", "Competition Level", "Revenue Potential", "Technical Difficulty"];
const scores = [8.2, 6.5, 7.8, 5.4];
const overallScore = 7.6;

const chartData = {
  labels,
  datasets: [
    {
      label: "Score",
      data: scores,
      backgroundColor: "hsla(160,84%,50%,0.15)",
      borderColor: "hsl(160,84%,50%)",
      borderWidth: 2,
      pointBackgroundColor: "hsl(160,84%,50%)",
      pointBorderColor: "hsl(160,84%,50%)",
      pointRadius: 4,
    },
  ],
};

const chartOptions: ChartOptions<"radar"> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      beginAtZero: true,
      max: 10,
      ticks: { stepSize: 2, color: "hsl(215,12%,50%)", backdropColor: "transparent", font: { size: 10 } },
      grid: { color: "hsla(220,14%,30%,0.4)" },
      angleLines: { color: "hsla(220,14%,30%,0.4)" },
      pointLabels: { color: "hsl(210,20%,85%)", font: { size: 11, family: "Inter" } },
    },
  },
  plugins: { tooltip: { enabled: true } },
  animation: { duration: 1200, easing: "easeOutQuart" },
};

const StartupScoreChart = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-12" ref={ref}>
      <div className="container max-w-5xl">
        <div className="glass rounded-xl p-8">
          <h2 className="font-heading text-2xl font-bold mb-8 text-center">Startup Success Score</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Score badge */}
            <div className="flex flex-col items-center justify-center min-w-[160px]">
              <div className="relative flex items-center justify-center h-32 w-32 rounded-full border-4 border-primary/30 glow-primary">
                <span className="font-heading text-4xl font-bold gradient-text">
                  {visible ? overallScore : "—"}
                </span>
              </div>
              <span className="text-sm text-muted-foreground mt-3">out of 10</span>
            </div>

            {/* Radar chart */}
            <div className="flex-1 w-full h-[280px]">
              {visible && <Radar data={chartData} options={chartOptions} />}
            </div>
          </div>

          {/* Metric pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {labels.map((l, i) => (
              <span key={l} className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground font-medium">
                {l}: <span className="text-primary font-semibold">{scores[i]}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartupScoreChart;
