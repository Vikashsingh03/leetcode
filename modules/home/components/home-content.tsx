"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  Play,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ---------- helpers ----------

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function useCountUp(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value;
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ---------- data ----------

const features = [
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "Interactive Coding",
    description:
      "Practice with real-world coding challenges and get instant feedback on your solutions.",
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    title: "Track Progress",
    description:
      "Monitor your improvement with detailed analytics and achievement systems.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Global Community",
    description:
      "Learn from thousands of developers worldwide and share your knowledge.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Real-time Feedback",
    description:
      "Get instant feedback on your solutions with detailed explanations.",
  },
];

const stats = [
  { value: 50, suffix: "K+", label: "Problems Solved" },
  { value: 10, suffix: "K+", label: "Active Developers" },
  { value: 25, suffix: "+", label: "Programming Languages" },
  { value: 98, suffix: "%", label: "Success Rate" },
];

// Difficulty colors kept semantic (matches real coding-platform convention) — untouched
const problemCategories = [
  {
    level: "Beginner",
    title: "Easy Problems",
    description:
      "Perfect for getting started with basic programming concepts and syntax.",
    count: "500+ Problems",
    tone: "emerald",
  },
  {
    level: "Intermediate",
    title: "Medium Problems",
    description:
      "Challenge yourself with data structures and algorithm problems.",
    count: "800+ Problems",
    tone: "amber",
  },
  {
    level: "Advanced",
    title: "Hard Problems",
    description:
      "Master complex algorithms and compete in programming contests.",
    count: "300+ Problems",
    tone: "rose",
  },
] as const;

const toneClasses = {
  emerald: {
    badge:
      "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300",
    border:
      "border-emerald-200 dark:border-emerald-900 hover:border-emerald-400",
    dot: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  amber: {
    badge: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-900 hover:border-amber-400",
    dot: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
  },
  rose: {
    badge: "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-900 hover:border-rose-400",
    dot: "bg-rose-500",
    text: "text-rose-600 dark:text-rose-400",
  },
} as const;

const floatingTags = [
  { label: "Python", top: "32%", left: "7%", duration: "7s", delay: "0s" },
  { label: "JavaScript", top: "68%", left: "5%", duration: "8s", delay: "1s" },
  { label: "Go", top: "38%", left: "89%", duration: "6.5s", delay: "0.5s" },
  { label: "Rust", top: "72%", left: "90%", duration: "9s", delay: "1.5s" },
  { label: "C++", top: "52%", left: "3%", duration: "7.5s", delay: "2s" },
  { label: "Java", top: "56%", left: "92%", duration: "8.5s", delay: "0.8s" },
];

// ---------- component ----------

export const HomeContent = () => {
  const statsRef = useInView<HTMLDivElement>(0.4);

  return (
    <div className="min-h-screen transition-colors mt-24">
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-16">
        {/* Ambient floating language tags */}
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          aria-hidden
        >
          {floatingTags.map((tag) => (
            <span
              key={tag.label}
              style={{
                top: tag.top,
                left: tag.left,
                animation: `floatTag ${tag.duration} ease-in-out infinite`,
                animationDelay: tag.delay,
              }}
              className="absolute rounded-full border border-zinc-200/60 bg-white/60 px-3 py-1 text-xs font-medium text-zinc-400 backdrop-blur-sm motion-reduce:!animate-none dark:border-zinc-800/60 dark:bg-zinc-900/40 dark:text-zinc-500"
            >
              {tag.label}
            </span>
          ))}
        </div>

        <div className="mx-auto max-w-6xl text-center">
          <Reveal>
            <Badge
              variant="secondary"
              className="mb-8 border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300"
            >
              <Star className="mr-2 h-4 w-4" />
              Join 10,000+ developers already coding
            </Badge>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mb-8 text-3xl font-black leading-tight text-zinc-900 dark:text-white md:text-5xl lg:text-6xl">
              Master{" "}
              <span className="relative inline-block px-1">
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 origin-left rounded-lg bg-yellow-400 motion-safe:animate-[highlightGrow_0.7s_cubic-bezier(0.65,0,0.35,1)_0.4s_both] dark:bg-yellow-500"
                />
                <span className="relative px-5 py-3 text-white">Problem</span>
              </span>{" "}
              Solving
              <br />
              with{" "}
              <span className="relative inline-block px-1">
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 origin-left rounded-lg bg-violet-600 motion-safe:animate-[highlightGrow_0.7s_cubic-bezier(0.65,0,0.35,1)_0.7s_both] dark:bg-violet-500"
                />
                <span className="relative px-5 py-3 text-white">Code</span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 md:text-xl">
              Challenge yourself with thousands of coding problems, compete with
              developers worldwide, and accelerate your programming journey with
              real-time feedback and expert solutions.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/problems">
                <Button
                  size="lg"
                  className="group bg-indigo-600 text-white shadow-md shadow-indigo-600/25 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Coding Now
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/problems">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-zinc-300 text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                >
                  Browse Problems
                </Button>
              </Link>
            </div>
          </Reveal>

          <div
            ref={statsRef.ref}
            className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={400 + index * 80}>
                <StatItem stat={stat} start={statsRef.inView} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-zinc-50 py-24 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white md:text-5xl">
              Everything you need to{" "}
              <span className="text-yellow-600 dark:text-yellow-400">
                excel
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-300 md:text-xl">
              Our platform provides comprehensive tools and resources to help
              you become a better programmer
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 100}>
                <Card className="group h-full border-zinc-200 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:shadow-lg dark:border-zinc-800 dark:hover:border-yellow-800">
                  <CardHeader>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 dark:bg-yellow-950 dark:text-yellow-400">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-zinc-900 dark:text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-zinc-600 dark:text-zinc-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Categories */}
      <section id="problems" className="py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white md:text-5xl">
              Choose your{" "}
              <span className="text-zinc-500 dark:text-zinc-400">
                challenge
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-300 md:text-xl">
              From beginner-friendly puzzles to advanced algorithmic challenges
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {problemCategories.map((category, index) => {
              const tone = toneClasses[category.tone];
              return (
                <Reveal key={category.title} delay={index * 120}>
                  <Card
                    className={`h-full border-2 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-zinc-950 ${tone.border}`}
                  >
                    <CardHeader>
                      <div className="mb-2 flex items-center gap-2">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className={`h-1.5 w-5 rounded-full ${
                              i <= index
                                ? tone.dot
                                : "bg-zinc-200 dark:bg-zinc-800"
                            }`}
                          />
                        ))}
                      </div>
                      <Badge
                        variant="secondary"
                        className={`w-fit ${tone.badge}`}
                      >
                        {category.level}
                      </Badge>
                      <CardTitle className="text-zinc-900 dark:text-white">
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-zinc-600 dark:text-zinc-300">
                        {category.description}
                      </CardDescription>
                      <div className={`font-semibold ${tone.text}`}>
                        {category.count}
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 py-24">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
          aria-hidden
        />
        <Reveal className="relative mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">
            Ready to start your coding journey?
          </h2>
          <p className="mb-8 text-lg text-white/90 md:text-xl">
            Join thousands of developers who are improving their skills every
            day
          </p>
          <Link href="/problems">
            <Button
              size="lg"
              className="group bg-white text-zinc-900 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-100"
            >
              Get Started for Free
              <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </Link>
        </Reveal>
      </section>

      <style jsx global>{`
        @keyframes highlightGrow {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        @keyframes floatTag {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-14px);
          }
        }
      `}</style>
    </div>
  );
};

function StatItem({
  stat,
  start,
}: {
  stat: { value: number; suffix: string; label: string };
  start: boolean;
}) {
  const value = useCountUp(stat.value, start);
  return (
    <div className="text-center">
      <div className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl">
        {value}
        {stat.suffix}
      </div>
      <div className="font-medium text-zinc-600 dark:text-zinc-400">
        {stat.label}
      </div>
    </div>
  );
}
