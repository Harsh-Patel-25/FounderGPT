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
import { Star as LucideStar, Gift, Camera, ArrowRight, Sparkles, Zap, Smartphone, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SwitchMode } from "@/components/ui/switch-mode";
import { useTheme } from "next-themes";

const Bento4 = () => {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div
      className="w-full flex items-center justify-center bg-background py-16 px-4 md:px-8 relative overflow-hidden"
      style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10" />

      {/* Bento Grid Container */}
      <div className="w-full max-w-[1200px] mx-auto md:pt-0 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 [grid-auto-rows:minmax(140px,auto)] xl:[grid-template-rows:160px_230px_220px_160px] gap-4 sm:gap-5 lg:gap-6 xl:gap-7 relative">
          
          {/* Card 1 - Validate Your Idea */}
          <Card
            className="rounded-2xl border border-border/50 p-6 sm:p-8 flex flex-col justify-between min-h-[280px] sm:min-h-[330px] xl:min-h-0 xl:[grid-column:1/2] xl:[grid-row:1/3] cursor-pointer hover:border-primary/50 transition-all group shadow-sm hover:shadow-md"
            style={{
              background: isDark 
                ? "radial-gradient(120% 120% at 0% 100%, hsla(160, 84%, 42%, 0.15) 0%, rgba(0,0,0,0) 100%), hsl(var(--card))"
                : "radial-gradient(120% 120% at 0% 100%, hsla(160, 84%, 42%, 0.1) 0%, rgba(0,0,0,0) 100%), hsl(var(--card))",
            }}
            onClick={() => navigate("/register")}
          >
            <CardHeader className="flex flex-col gap-4 px-0">
              <Icon />
              <CardTitle className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-primary/50 leading-tight">
                Validate Your Idea
              </CardTitle>
            </CardHeader>

            <CardContent className="px-0 pt-0">
               <p className="text-muted-foreground text-sm line-clamp-2 mb-4 font-medium">
                 Get VC-grade analysis and validation in seconds with FounderGPT.
               </p>
            </CardContent>

            <CardFooter className="px-0 items-start flex-col bg-transparent border-none">
              <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                <span>Start building</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </CardFooter>
          </Card>

          {/* Card 2 - Main Hero / Sun */}
          <Card className="hidden xl:block sm:col-span-2 xl:[grid-column:2/4] xl:[grid-row:1/3] bg-transparent border-0 ring-0 shadow-none p-0 gap-0 relative">
            <div className="w-full max-w-[590px] mx-auto aspect-[556/396] relative">
              <CardHeader className="absolute inset-0 flex flex-col gap-3 sm:gap-4 items-center mt-8 sm:mt-12 px-4 z-10">
                <div className="flex items-center justify-center gap-2">
                  <Icon2 className="size-6 sm:size-8" />
                  <CardDescription className="text-lg sm:text-xl font-bold text-white tracking-tight">FounderGPT</CardDescription>
                </div>
                <CardTitle className="text-white text-[38px] sm:text-[60px] max-w-[17rem] sm:max-w-96 text-center font-bold leading-[1.1] tracking-tight">
                  Launch Your Startup.
                </CardTitle>
              </CardHeader>
              <MainCurvedCard />
            </div>
          </Card>

          {/* Decorative Fireball */}
          <div className="hidden xl:block pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-[48%]">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img 
                src="https://assets.watermelon.sh/fireball.png"
                alt="Decorative"
                className="w-[320px] max-w-full drop-shadow-[0_0_50px_rgba(16,185,129,0.3)]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </motion.div>
          </div>

          {/* Card 3 - Theme Toggle */}
          <Card
            className="rounded-2xl border border-border/50 flex flex-col items-center justify-center min-h-[150px] xl:[grid-column:4/5] xl:[grid-row:1/2] shadow-sm"
            style={{
              background: isDark 
                ? "radial-gradient(120% 120% at 0% 100%, hsla(200, 80%, 45%, 0.1) 0%, rgba(0,0,0,0) 100%), hsl(var(--card))"
                : "radial-gradient(120% 120% at 0% 100%, hsla(200, 80%, 45%, 0.08) 0%, rgba(0,0,0,0) 100%), hsl(var(--card))",
            }}
          >
            <CardContent className="px-0 flex flex-col items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">Theme Mode</span>
              <SwitchMode width={80} height={40} />
            </CardContent>
          </Card>

          {/* Card 4 - 60K+ Stats */}
          <Card
            className="rounded-2xl border border-border/50 flex flex-col items-center justify-center gap-2 sm:gap-3 min-h-[180px] xl:[grid-column:4/5] xl:[grid-row:2/3] shadow-sm transition-transform hover:scale-[1.02]"
            style={{
              background: isDark 
                ? "radial-gradient(120% 120% at 0% 100%, hsla(160, 84%, 42%, 0.1) 0%, rgba(0,0,0,0) 100%), hsl(var(--card))"
                : "radial-gradient(120% 120% at 0% 100%, hsla(160, 84%, 42%, 0.08) 0%, rgba(0,0,0,0) 100%), hsl(var(--card))",
            }}
          >
            <CardTitle className="text-[52px] sm:text-[70px] font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-foreground to-primary">
              60K+
            </CardTitle>

            <CardDescription className="text-sm sm:text-lg font-bold text-primary px-4 sm:px-6 py-2 border-x border-primary/30 bg-gradient-to-r from-primary/5 to-primary/20 uppercase tracking-widest">
              ideas validated
            </CardDescription>
          </Card>

          {/* Card 5 - AI Analysis Modules */}
          <Card
            className="rounded-2xl border border-border/50 p-6 sm:p-8 flex flex-col items-center justify-center gap-2 min-h-[220px] xl:[grid-column:1/2] xl:[grid-row:3/4] shadow-sm"
            style={{
              background: isDark 
                ? "radial-gradient(120% 120% at 0% 100%, hsla(200, 80%, 45%, 0.1) 0%, rgba(0,0,0,0) 100%), hsl(var(--card))"
                : "radial-gradient(120% 120% at 0% 100%, hsla(200, 80%, 45%, 0.08) 0%, rgba(0,0,0,0) 100%), hsl(var(--card))",
            }}
          >
            <CardHeader className="flex flex-col items-center justify-center px-0">
              <CardTitle className="text-[52px] sm:text-[70px] font-bold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-blue-500">
                100+
              </CardTitle>
              <CardDescription className="text-md font-bold text-muted-foreground text-center uppercase tracking-wider">
                AI analysis modules
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center px-0 mt-2">
              <div className="size-12 sm:size-16 bg-primary/20 rounded-full border-2 border-primary/30 relative overflow-hidden z-10 flex items-center justify-center shadow-lg">
                <Globe className="text-primary size-6 sm:size-8" />
              </div>
              <div className="size-12 sm:size-16 bg-card rounded-full border-2 border-border -ml-3 sm:-ml-4 flex items-center justify-center relative z-20 shadow-lg">
                <Star className="mt-2 sm:mt-3 text-primary" />
              </div>
              <div className="size-12 sm:size-16 bg-accent/20 rounded-full border-2 border-accent/30 -ml-3 sm:-ml-4 relative z-30 overflow-hidden flex items-center justify-center shadow-lg">
                <Smartphone className="text-accent size-6 sm:size-8" />
              </div>
            </CardContent>
          </Card>

          {/* Card 6 - Strategic Roadmaps */}
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

                <div
                  className="relative w-full h-full"
                  style={{ clipPath: "url(#cardClip)" }}
                >
                  <CurvedCard />
                  <Branch className="absolute top-0 left-0" />
                </div>
              </div>

              <Barrel
                className="absolute top-48 sm:top-55"
                iconClassName="bg-primary shadow-xl"
                icon={<Wire className="size-6 text-primary-foreground" />}
              />

              <CardFooter className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end w-full h-full items-start px-6 sm:px-8 bg-transparent border-none pointer-events-none">
                <CardTitle className="text-foreground font-bold text-lg">
                  Strategic Roadmaps
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm leading-snug font-bold mt-1">
                  Discover optimal paths through multiple growth routes.
                </CardDescription>
              </CardFooter>
            </div>
          </Card>

          {/* Card 7 - Precision Engine */}
          <Card className="hidden xl:flex justify-center xl:justify-end sm:col-span-1 xl:[grid-column:3/4] xl:[grid-row:3/5] bg-transparent border-0 ring-0 shadow-none p-0 gap-0">
            <div className="relative w-full max-w-[264px] h-[360px] sm:h-[410px]">
              <div className="relative w-full h-full -scale-x-100">
                <div
                  className="relative w-full h-full"
                  style={{ clipPath: "url(#cardClip)" }}
                >
                  <CurvedCard />
                  <Branch className="absolute top-0 left-0" />
                </div>
              </div>

              <Barrel
                className="absolute top-48 sm:top-55"
                iconClassName="bg-accent shadow-xl"
                icon={<MagicCapture className="size-8 text-accent-foreground" />}
              />

              <CardFooter className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end w-full h-full items-start px-6 sm:px-8 bg-transparent border-none pointer-events-none">
                <CardTitle className="text-foreground font-bold text-lg text-right w-full">
                  Precision Engine
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm leading-snug font-bold mt-1 text-right w-full">
                  Sharpen every strategy with AI-driven insights.
                </CardDescription>
              </CardFooter>
            </div>
          </Card>

          {/* Card 8 - Analysis Stack */}
          <Card
            className="rounded-2xl border border-border/50 p-6 sm:p-8 flex flex-col justify-between overflow-hidden min-h-[260px] sm:min-h-[320px] xl:h-full sm:col-span-2 xl:[grid-column:4/5] xl:[grid-row:3/5] shadow-sm"
            style={{
              background: isDark 
                ? "radial-gradient(120% 120% at 0% 100%, hsla(160, 84%, 42%, 0.1) 0%, rgba(0,0,0,0) 100%), hsl(var(--card))"
                : "radial-gradient(120% 120% at 0% 100%, hsla(160, 84%, 42%, 0.05) 0%, rgba(0,0,0,0) 100%), hsl(var(--card))",
            }}
          >
            <CardHeader className="w-full flex flex-col px-0">
              <CardTitle className="text-xl font-black text-foreground uppercase tracking-widest">
                Analysis Stack
              </CardTitle>
              <CardDescription className="text-md font-bold text-muted-foreground leading-[20px] mt-1 uppercase tracking-tight">
                Integrated modules for full validation.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0 pt-0 flex-1 min-h-0">
              <GravityStack />
            </CardContent>
          </Card>

          {/* Card 9 - Analyze Now Button */}
          <Card
            className="rounded-2xl border border-border/50 flex items-center justify-center relative min-h-[120px] sm:col-span-2 xl:[grid-column:1/2] xl:[grid-row:4/5] shadow-sm"
            style={{
              background: isDark 
                ? "radial-gradient(120% 120% at 0% 100%, hsla(200, 80%, 45%, 0.1) 0%, rgba(0,0,0,0) 100%), hsl(var(--card))"
                : "radial-gradient(120% 120% at 0% 100%, hsla(200, 80%, 45%, 0.08) 0%, rgba(0,0,0,0) 100%), hsl(var(--card))",
            }}
          >
            <CardContent className="px-0">
              <CardNineCTA />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Bento4;

/* --- Helper Components --- */

const TinyStarIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 2.75L14.73 8.28L20.84 9.16L16.42 13.47L17.46 19.56L12 16.69L6.54 19.56L7.58 13.47L3.16 9.16L9.27 8.28L12 2.75Z" />
  </svg>
);

type StarParticle = {
  id: number;
  angle: number;
  distance: number;
  rotate: number;
  size: number;
  delay: number;
  duration: number;
};

const makeStarParticles = (count: number): StarParticle[] => {
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
  const [bursts, setBursts] = React.useState<Array<{ id: number; particles: StarParticle[] }>>([]);
  const burstIdRef = React.useRef(0);
  const lastTriggerAtRef = React.useRef(0);

  const triggerConfetti = () => {
    const now = Date.now();
    if (now - lastTriggerAtRef.current < 220) return;
    lastTriggerAtRef.current = now;

    const id = burstIdRef.current + 1;
    burstIdRef.current = id;

    setBursts([{ id, particles: makeStarParticles(compact ? 12 : 16) }]);
    window.setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== id)), 1600);
    setTimeout(() => navigate("/register"), 500);
  };

  return (
    <div className="relative isolate">
      <button
        type="button"
        onPointerDown={triggerConfetti}
        className={`relative z-20 w-fit flex items-center justify-center rounded-full gap-2 bg-gradient-to-r from-primary to-accent shadow-xl hover:scale-105 active:scale-95 transition-all text-primary-foreground ${
          compact ? "px-6 py-3" : "px-10 py-3"
        }`}
      >
        <Sparkles className="size-5" />
        <span className="font-bold text-xl">Analyze Now</span>
      </button>

      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 z-10 ${compact ? "w-40 h-14" : "w-50 h-18"} blur-lg`} />

      <div className="pointer-events-none absolute inset-0 z-30">
        {bursts.map((burst) =>
          burst.particles.map((particle) => {
            const x = Math.cos(particle.angle) * particle.distance;
            const y = Math.sin(particle.angle) * particle.distance;

            return (
              <motion.div
                key={`${burst.id}-${particle.id}`}
                className="absolute left-1/2 top-1/2"
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.35, rotate: 0 }}
                animate={{ x, y, opacity: [0, 1, 0], scale: [0.35, 1, 0.45], rotate: particle.rotate }}
                transition={{ duration: particle.duration, delay: particle.delay, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <Star className="text-primary drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" style={{ width: particle.size, height: particle.size }} />
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
    const randomInRange = (min: number, max: number) => min + Math.random() * (max - min);
    const eventCleanup: Array<() => void> = [];

    const engine = Engine.create({ gravity: { x: 0, y: 1.35 } });
    const runner = Runner.create();

    const ground = Bodies.rectangle(W / 2, H + 28, W * 2, 56, { isStatic: true, friction: 0.95 });
    const wallL = Bodies.rectangle(-25, H / 2, 50, H * 3, { isStatic: true });
    const wallR = Bodies.rectangle(W + 25, H / 2, 50, H * 3, { isStatic: true });
    Composite.add(engine.world, [ground, wallL, wallR]);

    const synced: Array<{ body: Matter.Body; el: HTMLDivElement; w: number; h: number }> = [];
    let activeInteraction: { body: Matter.Body; pointerId: number } | null = null;

    const getLocalPoint = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!activeInteraction || activeInteraction.pointerId !== event.pointerId) return;
      const { body } = activeInteraction;
      const point = getLocalPoint(event);
      const deltaX = point.x - body.position.x;
      const deltaY = point.y - body.position.y;
      const clamp = (v: number, limit: number) => Math.max(-limit, Math.min(limit, v));

      Body.applyForce(body, body.position, { x: clamp(deltaX * 0.000012, 0.0009), y: clamp(deltaY * 0.00001, 0.0007) });
      Body.setAngularVelocity(body, body.angularVelocity + clamp(deltaX * 0.00015, 0.025));
    };

    const releaseInteraction = (event: PointerEvent) => {
      if (!activeInteraction || activeInteraction.pointerId !== event.pointerId) return;
      activeInteraction = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", releaseInteraction);
    window.addEventListener("pointercancel", releaseInteraction);
    eventCleanup.push(() => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", releaseInteraction);
      window.removeEventListener("pointercancel", releaseInteraction);
    });

    itemRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const minX = w / 2 + 12;
      const maxX = W - w / 2 - 12;
      const startX = randomInRange(minX, Math.max(minX, maxX));
      const startY = -(50 + i * 62);
      const body = Bodies.rectangle(startX, startY, w, h, { 
        restitution: 0.08, friction: 0.88, frictionAir: 0.018, 
        chamfer: { radius: Math.min(18, h / 2) } 
      });
      Body.setAngle(body, randomInRange(-0.2, 0.2));
      Composite.add(engine.world, body);
      synced.push({ body, el, w, h });

      el.addEventListener("pointerdown", (e) => {
        activeInteraction = { body, pointerId: e.pointerId };
        el.style.cursor = "grabbing";
        Body.applyForce(body, body.position, { x: randomInRange(-0.0004, 0.0004), y: -0.00035 });
      });
      el.addEventListener("pointerup", (e) => { if (activeInteraction?.pointerId === e.pointerId) el.style.cursor = "grab"; });
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
      eventCleanup.forEach((dis) => dis());
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div ref={stackRef} className="w-full h-44 sm:h-52 lg:h-56 xl:h-full pt-4 relative overflow-hidden select-none">
      <div ref={itemRefs[0]} className="w-fit whitespace-nowrap px-8 py-3 rounded-full border-2 border-primary bg-primary/10 text-foreground font-bold text-sm shadow-md">Market Analysis</div>
      <div ref={itemRefs[1]} className="border border-border bg-accent/10 px-8 py-3 w-fit rounded-full flex items-center justify-center gap-2 shadow-md">
        <span className="size-2 rounded-full bg-accent" />
        <p className="text-foreground font-bold text-sm">Revenue Models</p>
      </div>
      <div ref={itemRefs[2]} className="size-12 rounded-full border border-border bg-primary flex items-center justify-center shadow-lg"><Gift className="text-primary-foreground size-5" /></div>
      <div ref={itemRefs[3]} className="border border-border bg-primary/10 px-6 py-3 w-fit rounded-full flex items-center justify-center gap-2 shadow-md">
        <span className="size-2 rounded-full bg-primary" />
        <p className="text-foreground font-bold text-sm">GTM Strategy</p>
      </div>
      <div ref={itemRefs[4]} className="size-12 rounded-full border border-border bg-accent flex items-center justify-center shadow-lg"><Camera className="text-accent-foreground size-5" /></div>
    </div>
  );
};

const Icon = () => (
  <div className="w-[52px] h-[52px] rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
    <LucideStar className="size-7 text-primary-foreground fill-current" />
  </div>
);

const Icon2 = ({ className }: { className?: string }) => (
  <div className={`w-[52px] h-[52px] rounded-xl bg-accent flex items-center justify-center ${className} shadow-[0_0_15px_rgba(14,165,233,0.3)]`}>
    <Zap className="size-5 text-accent-foreground fill-current" />
  </div>
);

const Star = ({ className, style }: { className?: string; style?: React.CSSProperties }) => <LucideStar className={className} style={style} fill="currentColor" />;
const MagicStar = () => <Sparkles className="size-8 text-primary" />;

const CurvedCard = ({ className }: { className?: string }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const idBase = React.useId().replace(/:/g, "");
  const notchArcId = `${idBase}-curved-notch-arc`;
  const notchFadeId = `${idBase}-curved-notch-fade`;

  return (
    <svg viewBox="0 0 264 412" className={`w-full h-full relative overflow-hidden ${className || ""}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cardGradient2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-276 419.017 -418 -276.671 276 -7.017)">
          <stop stopColor="hsl(160, 84%, 42%)" />
          <stop offset="1" stopColor="hsl(160, 84%, 42%)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path fillRule="evenodd" clipRule="evenodd" d="M118.572 22.9996C116.289 10.2858 105.878 0 92.9611 0H24C10.7452 0 0 10.7452 0 24V388C0 401.255 10.7452 412 24 412H240C253.255 412 264 401.255 264 388V178.229C264 165.819 254.471 155.646 242.376 152.869C179.242 138.374 130.103 87.2133 118.572 22.9996Z" fill={isDark ? "hsl(220, 18%, 10%)" : "hsl(210, 20%, 90%)"} />
      <path fillRule="evenodd" clipRule="evenodd" d="M118.572 22.9996C116.289 10.2858 105.878 0 92.9611 0H24C10.7452 0 0 10.7452 0 24V388C0 401.255 10.7452 412 24 412H240C253.255 412 264 401.255 264 388V178.229C264 165.819 254.471 155.646 242.376 152.869C179.242 138.374 130.103 87.2133 118.572 22.9996Z" fill="url(#cardGradient2)" fillOpacity="0.3" />
      <BinaryRibbon pathId={notchArcId} pathD="M118.572 22.9996C130.103 87.2133 179.242 138.374 242.376 152.869C254.471 155.646 264 165.819 264 178.229" fadeId={notchFadeId} gradientStart={100} gradientEnd={240} activeColor="hsl(160, 84%, 42%)" text={CURVED_CARD_BINARY_RIBBON} fontSize={14} fontWeight="500" letterSpacing={2} startOffset="55%" dy={18} />
    </svg>
  );
};

const buildBinaryRibbon = (seed: number, groups: number, bitsPerGroup = 4) => {
  let value = seed >>> 0;
  return Array.from({ length: groups }, () => {
    let chunk = "";
    for (let index = 0; index < bitsPerGroup; index += 1) { value = (value * 1664525 + 1013904223) >>> 0; chunk += ((value >>> 31) & 1).toString(); }
    return chunk;
  }).join(" ");
};

const MAIN_BINARY_RIBBON = buildBinaryRibbon(0x51f4, 19);
const CURVED_CARD_BINARY_RIBBON = buildBinaryRibbon(0xc18d, 15);

const BinaryRibbon = ({ pathId, pathD, fadeId, gradientStart, gradientEnd, activeColor, text, fontSize, fontWeight, letterSpacing, startOffset = "50%", dy = 0 }: any) => {
  const [animatedText, setAnimatedText] = React.useState(text);
  React.useEffect(() => {
    const int = setInterval(() => setAnimatedText((curr: string) => curr.split("").map(c => (c !== "0" && c !== "1") ? c : (Math.random() < 0.2 ? (c === "0" ? "1" : "0") : c)).join("")), 150);
    return () => clearInterval(int);
  }, [text]);

  return (
    <>
      <defs>
        <path id={pathId} d={pathD} />
        <linearGradient id={fadeId} x1={gradientStart} y1="0" x2={gradientEnd} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={activeColor} stopOpacity="0" />
          <stop offset="0.12" stopColor={activeColor} stopOpacity="0.78" />
          <stop offset="0.88" stopColor={activeColor} stopOpacity="0.78" />
          <stop offset="1" stopColor={activeColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <text fill={`url(#${fadeId})`} fontSize={fontSize} fontWeight={fontWeight} letterSpacing={letterSpacing} dy={dy} textAnchor="middle" style={{ fontFamily: 'monospace' }}>
        <textPath href={`#${pathId}`} startOffset={startOffset}>{animatedText}</textPath>
      </text>
    </>
  );
};

const MainCurvedCard = () => (
  <svg viewBox="0 0 556 396" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="cardGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(278 423.9) rotate(-90) scale(295.7 296.5)">
        <stop stopColor="hsla(160, 84%, 60%, 1)" />
        <stop offset="1" stopColor="hsla(160, 84%, 42%, 1)" />
      </radialGradient>
    </defs>
    <path fillRule="evenodd" clipRule="evenodd" d="M556 24C556 10.7452 545.255 0 532 0H24C10.7452 0 0 10.7452 0 24V372C0 385.255 10.7452 396 24 396H95.4926C107.507 396 117.483 387.043 120.612 375.443C139.327 306.059 202.701 255 278 255C353.299 255 416.673 306.059 435.388 375.443C438.517 387.043 448.493 396 460.507 396H532C545.255 396 556 385.255 556 372V24Z" fill="url(#cardGradient)" />
    <BinaryRibbon pathId="topArc" pathD="M120.612 375.443A163.1 163.1 0 0 1 435.388 375.443" fadeId="topFade" gradientStart={90} gradientEnd={466} activeColor="#F7CFB1" text={MAIN_BINARY_RIBBON} fontSize={14} fontWeight="600" letterSpacing={3.2} dy={-9} />
  </svg>
);

const Wire = ({ className }: { className?: string }) => <Zap className={className} />;
const MagicCapture = ({ className }: { className?: string }) => <Sparkles className={className} />;

const Barrel = ({ className, icon, iconClassName }: { className?: string; icon?: React.ReactNode; iconClassName?: string }) => (
  <div className={className}>
    <div className="relative">
      <div className={`w-[52px] h-[52px] absolute right-[7px] bottom-[8px] border border-white/20 rounded-full flex items-center justify-center ${iconClassName}`}>
        {icon}
      </div>
      <svg width="91" height="66" viewBox="0 0 91 66" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_di_682_141)">
          <path fillRule="evenodd" clipRule="evenodd" d="M58 64C75.6731 64 90 49.6731 90 32C90 14.3269 75.6731 0 58 0C41.9801 0 28.7096 11.7719 26.3671 27.1372C26.0414 29.2739 24.2976 31 22.1362 31H-35C-36.6569 31 -38 32.3431 -38 34C-38 35.6569 -36.6569 37 -35 37H22.967C24.9368 37 26.5869 38.4443 27.0993 40.3462C30.7706 53.972 43.2142 64 58 64Z" fill="hsl(160, 84%, 42%)" fillOpacity="0.25" shapeRendering="crispEdges" />
        </g>
        <defs>
          <filter id="filter0_di_682_141" x="-39" y="0" width="130" height="66" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="0.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.07 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_682_141" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_682_141" result="shape" />
          </filter>
        </defs>
      </svg>
    </div>
  </div>
);

const Branch = ({ className }: { className?: string }) => {
  const travelPath = "M 5 2 C 5 5 35 33 39.38 40 L 39.38 103 C 40 108 55 122 67.38 133";
  return (
    <div className={className} style={{ width: 101, height: 166 }}>
      <svg width="101" height="166" viewBox="0 0 101 166" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_di_682_126)">
          <path d="M2.87891 0.878616C1.70746 2.05006 1.70746 3.94936 2.87891 5.1208L35.2073 37.4492C35.9575 38.1994 36.3789 39.2168 36.3789 40.2777L36.3789 102.565C36.3791 105.482 37.5378 108.281 39.6006 110.343L58.0306 128.773C59.0833 129.825 59.3789 131.39 59.3789 132.879C59.3791 137.297 62.9607 140.879 67.3789 140.879C71.7971 140.879 75.3787 137.297 75.3789 132.879C75.3789 128.46 71.7972 124.879 67.3789 124.879C67.049 124.879 66.7237 124.899 66.4042 124.937C64.6483 125.15 62.7229 124.978 61.4721 123.728L43.8438 106.1C42.9062 105.163 42.3791 103.891 42.3789 102.565L42.3789 44.3786C42.3789 42.1695 44.1698 40.3786 46.3789 40.3786H56.8839C58.6116 40.3786 60.0717 41.5635 61.1582 42.9068C62.6243 44.7194 64.8659 45.8786 67.3789 45.8786C71.7971 45.8786 75.3787 42.2967 75.3789 37.8786C75.3789 33.4603 71.7972 29.8786 67.3789 29.8786C65.1118 29.8786 63.0652 30.8216 61.6096 32.3368C60.5498 33.4401 59.2129 34.3786 57.6831 34.3786H42.2779C41.2171 34.3786 40.1997 33.9572 39.4495 33.207L7.12109 0.878616C5.94965 -0.292832 4.05035 -0.292831 2.87891 0.878616Z" fill="hsl(160, 84%, 42%)" fillOpacity="0.25" shapeRendering="crispEdges" />
        </g>
        <defs>
          <filter id="filter0_di_682_126" x="0" y="0.00012207" width="75.3789" height="142.879" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dx="-1" dy="1" />
            <feGaussianBlur stdDeviation="0.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.08 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_682_126" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_682_126" result="shape" />
          </filter>
        </defs>
      </svg>
      <motion.div
        style={{
          position: "absolute", top: 0, left: 0, width: 20, height: 5, borderRadius: 9999,
          background: "linear-gradient(180deg, hsl(160, 84%, 60%) 0%, #FFFFFF 40%, #FFFFFF 100%)",
          opacity: 0, offsetPath: `path('${travelPath}')`, offsetDistance: "0%", offsetRotate: "auto",
          filter: "drop-shadow(0 0 3px hsl(160, 84%, 50%)) drop-shadow(0 0 8px hsl(160, 84%, 40%))",
        }}
        animate={{ offsetDistance: "90%", opacity: [0, 1, 1, 0] }}
        transition={{
          offsetDistance: { duration: 2.5, ease: "linear", repeat: Infinity, repeatType: "loop" },
          opacity: { duration: 2.5, times: [0, 0.12, 0.88, 1], ease: "linear", repeat: Infinity, repeatType: "loop" },
        }}
      />
    </div>
  );
};
