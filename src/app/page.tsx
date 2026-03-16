"use client";

import { useState, FormEvent } from "react";

const benefits = [
  {
    icon: "📱",
    title: "Daily Content Prompts",
    description:
      "Never stare at a blank screen again. Get a specific, actionable prompt every single day for 30 days.",
  },
  {
    icon: "🎯",
    title: "Build a Real Content System",
    description:
      "Learn how to plan, create, and publish content consistently — without burning out.",
  },
  {
    icon: "🚀",
    title: "Grow Your Brand & Audience",
    description:
      "Attract followers, clients, and opportunities by showing up with valuable content daily.",
  },
  {
    icon: "💡",
    title: "Find Your Unique Voice",
    description:
      "Discover what makes your content stand out and build authority in your niche.",
  },
  {
    icon: "🤝",
    title: "Land Paid Brand Deals",
    description:
      "Position yourself as a creator brands want to work with — even if you're just starting out.",
  },
  {
    icon: "📈",
    title: "Track Your Progress",
    description:
      "Stay accountable with a structured challenge that builds momentum day after day.",
  },
];

const dayPreviews = [
  { day: "Day 1-5", focus: "Foundation", desc: "Define your niche, audience, and content pillars" },
  { day: "Day 6-10", focus: "Creation", desc: "Master short-form and long-form content formats" },
  { day: "Day 11-15", focus: "Engagement", desc: "Build community and grow your reach" },
  { day: "Day 16-20", focus: "Strategy", desc: "Develop your content calendar and workflow" },
  { day: "Day 21-25", focus: "Monetization", desc: "Learn to attract brands and partnerships" },
  { day: "Day 26-30", focus: "Scale", desc: "Systematize your process for long-term growth" },
];

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
      setFirstName("");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  const EmailForm = ({ id, dark = false }: { id: string; dark?: boolean }) => (
    <div id={id}>
      {status === "success" ? (
        <div className="animate-fade-in-up rounded-2xl border-2 border-brand/30 bg-brand/5 p-8 text-center">
          <div className="mb-3 text-4xl">🎉</div>
          <h3 className="mb-2 text-2xl font-bold text-brand">You&apos;re In!</h3>
          <p className={dark ? "text-white/70" : "text-gray-600"}>
            Check your inbox for Day 1 of the challenge. Let&apos;s build something amazing together.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full rounded-xl border-2 px-5 py-4 text-base transition-all focus:outline-none sm:w-1/3 ${
                dark
                  ? "border-white/20 bg-white/10 text-white placeholder-white/50 focus:border-white/40"
                  : "border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-brand"
              }`}
            />
            <input
              type="email"
              placeholder="Your best email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full rounded-xl border-2 px-5 py-4 text-base transition-all focus:outline-none sm:flex-1 ${
                dark
                  ? "border-white/20 bg-white/10 text-white placeholder-white/50 focus:border-white/40"
                  : "border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-brand"
              }`}
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="animate-pulse-glow w-full cursor-pointer rounded-xl bg-brand px-8 py-4 text-lg font-bold tracking-wide text-white uppercase transition-all hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading"
              ? "Joining..."
              : "Join the Free 30-Day Challenge →"}
          </button>
          {status === "error" && (
            <p className="text-center text-sm text-red-500">{errorMsg}</p>
          )}
          <p className={`text-center text-xs ${dark ? "text-white/40" : "text-gray-400"}`}>
            100% free. No spam. Unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  );

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-1/2 -right-1/4 h-[800px] w-[800px] rounded-full bg-white/20" />
          <div className="absolute -bottom-1/3 -left-1/4 h-[600px] w-[600px] rounded-full bg-white/10" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-24 text-center md:pt-28 md:pb-32">
          <div className="animate-fade-in-up mb-6 inline-block rounded-full bg-white/15 px-5 py-2 text-sm font-semibold tracking-wider text-white/90 uppercase backdrop-blur-sm">
            Free Challenge — Limited Spots
          </div>
          <h1 className="animate-fade-in-up-delay-1 mb-6 text-4xl leading-tight font-extrabold tracking-tight text-white md:text-6xl md:leading-tight">
            The 30-Day Content
            <br />
            <span className="text-yellow-300">Challenge</span>
          </h1>
          <p className="animate-fade-in-up-delay-2 mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            The exact system to go from{" "}
            <span className="font-semibold text-white">&quot;I don&apos;t know what to post&quot;</span>{" "}
            to creating content that{" "}
            <span className="font-semibold text-yellow-300">
              builds your brand, grows your audience, and lands paid deals
            </span>{" "}
            — in just 30 days.
          </p>
          <p className="animate-fade-in-up-delay-2 mx-auto mb-10 max-w-xl text-base text-white/60">
            You don&apos;t need permission to start. You just need a plan.
          </p>
          <div className="animate-fade-in-up-delay-3 mx-auto max-w-xl">
            <EmailForm id="hero-form" dark />
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="border-b border-gray-100 bg-warm-gray py-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 px-6 text-sm text-gray-500">
          <span className="flex items-center gap-2 font-medium">
            <span className="text-brand text-lg">✓</span> 500+ Creators Joined
          </span>
          <span className="hidden h-4 w-px bg-gray-300 sm:block" />
          <span className="flex items-center gap-2 font-medium">
            <span className="text-brand text-lg">✓</span> 100% Free
          </span>
          <span className="hidden h-4 w-px bg-gray-300 sm:block" />
          <span className="flex items-center gap-2 font-medium">
            <span className="text-brand text-lg">✓</span> Delivered to Your Inbox
          </span>
          <span className="hidden h-4 w-px bg-gray-300 sm:block" />
          <span className="flex items-center gap-2 font-medium">
            <span className="text-brand text-lg">✓</span> Actionable Daily Prompts
          </span>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Sound familiar?
          </h2>
          <div className="space-y-4 text-left">
            {[
              "You know you should be posting content, but you never know what to say",
              "You start strong but lose motivation after a week",
              "You see other creators getting brand deals and wonder what they're doing differently",
              "You feel like you need a huge following before you can monetize",
              "You're overthinking every post instead of just hitting publish",
            ].map((pain, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-5"
              >
                <span className="mt-0.5 shrink-0 text-lg text-red-400">✕</span>
                <p className="text-gray-700">{pain}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-xl font-semibold text-brand">
            This challenge was built to fix all of that.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-warm-gray py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              What You&apos;ll Get
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Everything you need to build a content habit that actually sticks
              — and starts working for your business.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 text-3xl">{benefit.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge Breakdown */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              Your 30-Day Roadmap
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              A structured path from content beginner to confident creator.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dayPreviews.map((phase, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border-2 border-brand/10 bg-brand/[0.02] p-6 transition-all hover:border-brand/30 hover:bg-brand/[0.05]"
              >
                <div className="mb-1 text-xs font-bold tracking-widest text-brand/60 uppercase">
                  {phase.day}
                </div>
                <h3 className="mb-2 text-xl font-bold text-brand">
                  {phase.focus}
                </h3>
                <p className="text-sm text-gray-600">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Quote */}
      <section className="bg-brand py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <blockquote className="mb-6 text-2xl leading-relaxed font-medium text-white/90 italic md:text-3xl">
            &ldquo;The best time to start creating content was a year ago. The
            second best time is today.&rdquo;
          </blockquote>
          <p className="text-sm font-semibold tracking-wider text-white/50 uppercase">
            Stop waiting. Start creating.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-warm-gray py-20 md:py-28">
        <div className="mx-auto max-w-xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Ready to Start?
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Join the challenge today and start building content that works for
            you — not against you.
          </p>
          <EmailForm id="cta-form" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="mx-auto max-w-4xl px-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} GoLocal Group. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
