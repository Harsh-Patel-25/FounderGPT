"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Matter from "matter-js";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Star as LucideStar, Gift, Camera, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Bento4 = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full flex items-center justify-center bg-[#0a0a0a] py-12 px-4 md:px-8 border-b border-white/5"
      style={{ fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif' }}
    >
      {/* Bento Grid Container */}
      <div className="w-full max-w-[1200px] mx-auto relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 [grid-auto-rows:minmax(140px,auto)] xl:[grid-template-rows:160px_230px_220px_160px] gap-4 sm:gap-5 lg:gap-6 xl:gap-7 relative">
          {/* Card 1 - Main CTA */}
          <Card
            className="rounded-2xl border border-white/5 p-6 sm:p-8 flex flex-col justify-between min-h-[280px] sm:min-h-[330px] xl:min-h-0 xl:[grid-column:1/2] xl:[grid-row:1/3] cursor-pointer hover:border-primary/30 transition-colors"
            style={{
              background: `radial-gradient(120% 120% at 0% 100%, rgba(194, 153, 136, 0.2) 0%, rgba(207,122,88,0) 100%), #121212`,
              gridColumn: "span 1",
            }}
            onClick={() => navigate("/register")}
          >
            <CardHeader className="flex flex-col gap-4 px-0">
              <Icon />
              <CardTitle className="text-3xl sm:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-primary leading-tight">
                Validate Your Idea
              </CardTitle>
            </CardHeader>

            <CardFooter className="px-0 items-start flex-col bg-transparent border-none">
              <CardTitle className="text-lg font-bold text-[#E6E3FF]">
                Start your journey
              </CardTitle>
              <CardDescription className="text-md font-thin text-primary/80">
                AI platform for founders
              </CardDescription>
            </CardFooter>
          </Card>

          {/* Card 2 - Main Hero Text */}
          <Card className="hidden xl:block sm:col-span-2 xl:[grid-column:2/4] xl:[grid-row:1/3] bg-transparent border-0 ring-0 shadow-none p-0 gap-0 relative">
            <div className="w-full max-w-[590px] mx-auto aspect-[556/396] relative">
              <CardHeader className="absolute inset-0 z-10 flex flex-col gap-3 sm:gap-4 items-center mt-8 sm:mt-12 px-4">
                <div className="flex items-center justify-center gap-1">
                  <Icon2 className="w-6 h-6 sm:w-8 sm:h-8" />
                  <CardDescription className="text-lg sm:text-xl font-bold text-white">FounderGPT</CardDescription>
                </div>
                <CardTitle className="text-white text-[38px] sm:text-[60px] max-w-[16rem] sm:max-w-80 text-center font-medium leading-none">
                  Launch Your Startup.
                </CardTitle>
              </CardHeader>
              <MainCurvedCard />
            </div>
          </Card>

          {/* Card 3 - Toggle */}
          <Card
            className="rounded-2xl border border-white/10 bg-[#121212] flex items-center justify-center min-h-[150px] xl:[grid-column:4/5] xl:[grid-row:1/2]"
            style={{
              background: `radial-gradient(120% 120% at 0% 100%, rgba(194, 153, 136, 0.2) 0%, rgba(207,122,88,0) 100%), #121212`,
            }}
          >
            <CardContent className="p-0">
              <CardThreeToggle />
            </CardContent>
          </Card>

          {/* Card 4 - Stats */}
          <Card
            className="rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-2 sm:gap-3 min-h-[180px] xl:[grid-column:4/5] xl:[grid-row:2/3]"
            style={{
              background: `radial-gradient(120% 120% at 0% 100%, rgba(194, 153, 136, 0.2) 0%, rgba(207,122,88,0) 100%), #121212`,
            }}
          >
            <CardTitle className="text-[52px] sm:text-[70px] font-bold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#F5F1FF] to-primary">
              60K+
            </CardTitle>

            <CardDescription className="text-sm sm:text-lg font-thin text-primary px-4 sm:px-6 py-2 border-x border-primary bg-gradient-to-r from-primary/10 to-primary/30">
              Ideas validated
            </CardDescription>
          </Card>

          {/* Card 5 - Social Proof */}
          <Card
            className="rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col items-center justify-center gap-2 min-h-[220px] xl:[grid-column:1/2] xl:[grid-row:3/4]"
            style={{
              background: `radial-gradient(120% 120% at 0% 100%, rgba(194, 153, 136, 0.2) 0%, rgba(207,122,88,0) 100%), #121212`,
            }}
          >
            <CardHeader className="flex flex-col items-center justify-center px-0">
              <CardTitle className="text-[52px] sm:text-[70px] font-bold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-blue-600">
                98%
              </CardTitle>
              <CardDescription className="text-md font-thin text-primary/80 text-center">
                accuracy rate
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center px-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/80 rounded-full border-2 border-[#1a1a1a] relative overflow-hidden z-10">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Profile-1" className="w-full h-full object-cover" />
              </div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full border-2 border-[#1a1a1a] -ml-3 sm:-ml-4 flex items-center justify-center relative z-20">
                <Star className="mt-2 sm:mt-3" />
              </div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent rounded-full border-2 border-[#1a1a1a] -ml-3 sm:-ml-4 relative z-30 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Profile-2" className="w-full h-full object-cover" />
              </div>
            </CardContent>
          </Card>

          {/* Card 6 - Pathing */}
          <Card className="hidden xl:block relative sm:col-span-1 xl:[grid-column:2/3] xl:[grid-row:3/5] bg-transparent border-0 ring-0 shadow-none p-0 gap-0">
            <div className="relative w-full max-w-[264px] h-[360px] sm:h-[410px] mx-auto overflow-hidden">
              <div className="relative w-full h-full">
                <svg width="0" height="0" className="absolute">
                  <defs>
                    <clipPath id="cardClip" clipPathUnits="userSpaceOnUse">
                      <path d="M118.572 22.9996C116.289 10.2858 105.878 0 92.9611 0H24C10.7452 0 0 10.7452 0 24V388C0 401.255 10.7452 412 24 412H240C253.255 412 264 401.255 264 388V178.229C264 165.819 254.471 155.646 242.376 152.869C179.242 138.374 130.103 87.2133 118.572 22.9996Z" />
                    </clipPath>
                  </defs>
                </svg>
                <div className="relative w-full h-full" style={{ clipPath: "url(#cardClip)" }}>
                  <CurvedCard />
                  <Branch className="absolute top-0 left-0" />
                </div>
              </div>
              <Barrel
                className="absolute top-48 sm:top-55"
                iconClassName="bg-gradient-to-b from-primary/70 to-primary"
                icon={<Wire className="w-6 h-6" />}
              />
              <CardFooter className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end w-full h-full items-start px-6 sm:px-8 bg-transparent border-none">
                <CardTitle className="text-white font-semibold text-lg">Roadmap Paths</CardTitle>
                <CardDescription className="text-primary/80 text-sm leading-snug font-thin mt-1">
                  Discover multiple routes to launch.
                </CardDescription>
              </CardFooter>
            </div>
          </Card>

          {/* Card 7 - Booster */}
          <Card className="hidden xl:flex justify-center xl:justify-end sm:col-span-1 xl:[grid-column:3/4] xl:[grid-row:3/5] bg-transparent border-0 ring-0 shadow-none p-0 gap-0">
            <div className="relative w-full max-w-[264px] h-[360px] sm:h-[410px]">
              <div className="relative w-full h-full -scale-x-100">
                <div className="relative w-full h-full" style={{ clipPath: "url(#cardClip)" }}>
                  <CurvedCard />
                  <Branch className="absolute top-0 left-0" />
                </div>
              </div>
              <Barrel
                className="absolute top-48 sm:top-55"
                iconClassName="bg-white"
                icon={<MagicCapture className="w-8 h-8" />}
              />
              <CardFooter className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end w-full h-full items-start px-6 sm:px-8 bg-transparent border-none">
                <CardTitle className="text-white font-semibold text-lg">AI Accuracy</CardTitle>
                <CardDescription className="text-primary/80 text-sm leading-snug font-thin mt-1">
                  Refined analysis for precision.
                </CardDescription>
              </CardFooter>
            </div>
          </Card>

          {/* Card 8 - Gravity Stack */}
          <Card
            className="rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-hidden min-h-[260px] sm:min-h-[320px] xl:h-full sm:col-span-2 xl:[grid-column:4/5] xl:[grid-row:3/5]"
            style={{
              background: `radial-gradient(120% 120% at 0% 100%, rgba(194, 153, 136, 0.2) 0%, rgba(207,122,88,0) 100%), #121212`,
            }}
          >
            <CardHeader className="w-full flex flex-col px-0">
              <CardTitle className="text-xl font-semibold text-white">Analysis Modules</CardTitle>
              <CardDescription className="text-md font-thin text-primary/80 leading-[20px] mt-1">
                Market, Tech, Finance & more.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pt-0 flex-1 min-h-0">
              <GravityStack />
            </CardContent>
          </Card>

          {/* Card 9 - CTA Button */}
          <Card
            className="rounded-2xl border border-white/10 flex items-center justify-center relative min-h-[120px] sm:col-span-2 xl:[grid-column:1/2] xl:[grid-row:4/5]"
            style={{
              background: `radial-gradient(120% 120% at 0% 100%, rgba(194, 153, 136, 0.2) 0%, rgba(207,122,88,0) 100%), #121212`,
            }}
          >
            <CardContent className="p-0">
              <CardNineCTA />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Bento4;

// Helper Components Based on provided UI

const TinyStarIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.75L14.73 8.28L20.84 9.16L16.42 13.47L17.46 19.56L12 16.69L6.54 19.56L7.58 13.47L3.16 9.16L9.27 8.28L12 2.75Z" />
    </svg>
  );
};

const CardThreeToggle = () => {
  const [enabled, setEnabled] = React.useState(false);

  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={() => setEnabled((value) => !value)}
      className="w-36 h-16 border border-primary/45 rounded-full relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        transition={{ duration: 0.24, ease: [0.2, 0.7, 0.2, 1] }}
      />

      <motion.div
        className="w-14 h-14 rounded-full absolute top-1 left-1 flex items-center justify-center"
        animate={{
          x: enabled ? 72 : 0,
          boxShadow: enabled
            ? "0 0 0 1px rgba(20,250,180,0.2), inset 0 0 14px rgba(20,250,180,0.16)"
            : "0 0 0 0 rgba(0,0,0,0)",
          background: enabled
            ? "radial-gradient(circle at 40% 35%, #FFFFFF 0%, rgba(255,255,255,0.95) 60%, rgba(235,235,235,0.9) 100%)"
            : "radial-gradient(circle at 40% 35%, #10b981 0%, rgba(16,185,129,0.85) 70%, rgba(16,185,129,0.7) 100%)",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.8 }}
      >
        <motion.div
          key={enabled ? "star" : "magic"}
          initial={{ opacity: 0, scale: 0.7, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          {enabled ? (
            <TinyStarIcon className="w-8 h-8 text-primary" />
          ) : (
            <MagicStar />
          )}
        </motion.div>
      </motion.div>
    </button>
  );
};

const makeStarParticles = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    angle: Math.random() * Math.PI * 2,
    distance: 60 + Math.random() * 54,
    rotate: -180 + Math.random() * 360,
    size: 20 + Math.random() * 10,
    delay: Math.random() * 0.08,
    duration: 0.7 + Math.random() * 0.45,
  }));
};

const CardNineCTA = ({ compact = false }: { compact?: boolean }) => {
  const navigate = useNavigate();
  const [bursts, setBursts] = React.useState<any[]>([]);
  const lastTriggerAtRef = React.useRef(0);

  const triggerConfetti = () => {
    const now = Date.now();
    if (now - lastTriggerAtRef.current < 220) return;
    lastTriggerAtRef.current = now;

    const id = Date.now();
    setBursts([{ id, particles: makeStarParticles(compact ? 12 : 16) }]);

    setTimeout(() => {
      setBursts([]);
    }, 1600);
    
    setTimeout(() => navigate("/register"), 400);
  };

  return (
    <div className="relative isolate">
      <button
        type="button"
        onPointerDown={triggerConfetti}
        className={`relative z-20 w-fit flex items-center justify-center rounded-full gap-2 bg-gradient-to-r from-primary to-accent shadow-[0px_1px_1px_rgba(255,255,255,0.07),inset_0px_1px_3px_rgba(1,5,30,0.5)] ${
          compact ? "px-6 py-3" : "px-10 py-3"
        } hover:scale-105 transition-transform`}
      >
        <ArrowRight className="w-5 h-5 text-black" />
        <span className={`text-black ${compact ? "font-thin text-lg" : "font-bold text-xl"}`}>
          Start Free
        </span>
      </button>

      <div className="pointer-events-none absolute inset-0 z-30">
        {bursts.map((burst) =>
          burst.particles.map((particle: any) => {
            const x = Math.cos(particle.angle) * particle.distance;
            const y = Math.sin(particle.angle) * particle.distance;

            return (
              <motion.div
                key={`${burst.id}-${particle.id}`}
                className="absolute left-1/2 top-1/2"
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.35, rotate: 0 }}
                animate={{
                  x,
                  y,
                  opacity: [0, 1, 0],
                  scale: [0.35, 1, 0.45],
                  rotate: particle.rotate,
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
              >
                <Star className="text-primary drop-shadow-[0_0_8px_rgba(20,250,180,0.8)]" style={{ width: particle.size, height: particle.size }} />
              </motion.div>
            );
          }),
        )}
      </div>
    </div>
  );
};

const GravityStack = () => {
  const stackRef = useRef<HTMLDivElement>(null);
  const itemRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  useEffect(() => {
    const container = stackRef.current;
    if (!container) return;

    let animId = 0;
    const { Engine, Runner, Bodies, Body, Composite, World } = Matter;

    const W = container.clientWidth;
    const H = container.clientHeight;
    const engine = Engine.create({ gravity: { x: 0, y: 1.35 } });
    const runner = Runner.create();

    const ground = Bodies.rectangle(W / 2, H + 28, W * 2, 56, { isStatic: true, friction: 0.95 });
    const wallL = Bodies.rectangle(-25, H / 2, 50, H * 3, { isStatic: true });
    const wallR = Bodies.rectangle(W + 25, H / 2, 50, H * 3, { isStatic: true });
    Composite.add(engine.world, [ground, wallL, wallR]);

    const synced: any[] = [];
    itemRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const startX = W / 2 + (Math.random() - 0.5) * 40;
      const startY = -(50 + i * 62);
      const body = Bodies.rectangle(startX, startY, w, h, {
        restitution: 0.08, friction: 0.88, frictionAir: 0.018,
        chamfer: { radius: Math.min(18, h / 2) }
      });
      Composite.add(engine.world, body);
      synced.push({ body, el, w, h });
      el.style.position = "absolute";
      el.style.cursor = "grab";
    });

    Runner.run(runner, engine);
    const sync = () => {
      synced.forEach(({ body, el, w, h }) => {
        el.style.left = `${body.position.x - w / 2}px`;
        el.style.top = `${body.position.y - h / 2}px`;
        el.style.transform = `rotate(${body.angle}rad)`;
      });
      animId = requestAnimationFrame(sync);
    };
    sync();

    return () => {
      Runner.stop(runner);
      cancelAnimationFrame(animId);
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div ref={stackRef} className="w-full h-44 sm:h-52 lg:h-56 xl:h-full pt-4 relative overflow-hidden select-none">
      <div ref={itemRefs[0]} className="w-fit whitespace-nowrap px-6 py-2 rounded-full border-2 border-primary bg-primary/20 text-white font-semibold text-sm shadow-lg">Market Analysis</div>
      <div ref={itemRefs[1]} className="border border-white/5 bg-accent/20 px-6 py-2 w-fit rounded-full flex items-center justify-center gap-2 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <p className="text-white font-medium text-sm">Roadmaps</p>
      </div>
      <div ref={itemRefs[2]} className="w-10 h-10 rounded-full border border-white/20 bg-gradient-to-b from-primary to-accent flex items-center justify-center shadow-lg"><Gift className="w-5 h-5 text-black" /></div>
      <div ref={itemRefs[3]} className="border border-white/5 bg-primary/10 px-4 py-2 w-fit rounded-full flex items-center justify-center gap-2 shadow-lg">
        <p className="text-white font-medium text-sm">Investor Ready</p>
      </div>
      <div ref={itemRefs[4]} className="w-10 h-10 rounded-full border border-white/20 bg-gradient-to-b from-accent to-blue-600 flex items-center justify-center shadow-lg"><Camera className="w-5 h-5 text-white" /></div>
    </div>
  );
};

const Icon = () => (
  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center border border-white/20 shadow-lg">
    <LucideStar className="w-6 h-6 text-black fill-current" />
  </div>
);

const Icon2 = ({ className }: { className?: string }) => (
  <div className={className}>
    <img src="/favicon.ico" alt="Logo" className="w-full h-full" onError={(e) => e.currentTarget.style.display = 'none'} />
  </div>
);

const CurvedCard = () => (
  <div className="w-full h-full bg-[#121212] border border-white/5 rounded-2xl opacity-50" 
       style={{ background: 'radial-gradient(circle at center, rgba(16,185,129,0.1) 0%, transparent 70%)' }}>
  </div>
);

const MainCurvedCard = () => (
    <div className="w-full h-full rounded-3xl bg-[#121212] border border-white/5 overflow-hidden shadow-2xl relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="flex items-center justify-center h-full">
             <div className="w-24 h-24 rounded-full bg-primary/20 animate-pulse-glow flex items-center justify-center">
                 <LucideStar className="w-12 h-12 text-primary" />
             </div>
        </div>
    </div>
);

const Star = ({ className, style }: any) => <LucideStar className={className} style={style} />;
const MagicStar = () => <LucideStar className="w-6 h-6 text-primary" />;
const MagicCapture = ({ className }: any) => <div className={className}><LucideStar className="w-full h-full text-white" /></div>;
const Wire = ({ className }: any) => <div className={className}><ArrowRight className="w-full h-full text-white" /></div>;
const Barrel = ({ className, icon, iconClassName }: any) => <div className={className}><div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconClassName}`}>{icon}</div></div>;
const Branch = ({ className }: any) => <div className={className} />;
