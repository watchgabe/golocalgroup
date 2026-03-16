"use client";

import Image from "next/image";
import { useState, useRef } from "react";

/* ── Design Tokens — TFA Brand ── */
const T = {
  navy:       "#020B27",
  navyMid:    "#061643",
  navyLight:  "#0A2159",
  gold:       "#C9A035",
  goldLight:  "#E4BA55",
  silver:     "#8FA8BF",
  silverLight:"#B8CDD8",
  white:      "#FFFFFF",
  offWhite:   "#F5F7FA",
  gray:       "#E8ECF0",
  textDark:   "#1A1A2E",
  textMid:    "#4A5568",
  textLight:  "#8896A8",
  accent:     "#0066CC",
  accentLight:"#3D8FE0",
  green:      "#B8E6BF",
  greenDark:  "#00450C",
};

const gradientBtn = `linear-gradient(135deg, ${T.accent} 0%, #0099FF 100%)`;
const gradientGold = `linear-gradient(135deg, ${T.gold} 0%, ${T.goldLight} 100%)`;
const gradientNavy = `linear-gradient(180deg, ${T.navy} 0%, ${T.navyMid} 100%)`;

/* ── Sub-components ── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: "'Open Sans', sans-serif",
      fontSize: 11, fontWeight: 700, letterSpacing: 4,
      textTransform: "uppercase" as const,
      color: T.accentLight, marginBottom: 14,
    }}>
      {children}
    </p>
  );
}

function CheckItem({ children, gold }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <li style={{
      display: "flex", alignItems: "flex-start", gap: 10,
      fontSize: 14.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.65,
    }}>
      <span style={{
        width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 1,
        background: gold ? gradientGold : gradientBtn,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, color: "#fff", fontWeight: 900,
      }}>✓</span>
      {children}
    </li>
  );
}

export default function TFASponsorshipPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -360, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 360, behavior: "smooth" });

  return (
    <main style={{
      background: T.navy, minHeight: "100vh",
      fontFamily: "'Open Sans', sans-serif",
      color: T.white, overflowX: "hidden",
    }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(2, 11, 39, 0.96)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "0 clamp(16px, 5vw, 80px)",
        height: 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Image src="/tfa-logo.png" alt="Texas Ford Aquatics" width={160} height={44} style={{ objectFit: "contain", height: 44, width: "auto" }} />

        {/* Desktop nav buttons */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a
            href="https://txfordaquatics.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)",
              textDecoration: "none", letterSpacing: 0.5,
            }}
          >
            Main Site
          </a>
          <a
            href="#apply"
            style={{
              background: gradientBtn, color: T.white,
              fontWeight: 700, fontSize: 13, letterSpacing: 0.5,
              padding: "10px 22px", borderRadius: 4,
              textDecoration: "none", whiteSpace: "nowrap" as const,
            }}
          >
            Become a Sponsor
          </a>
        </div>
      </nav>


      {/* ── HERO ── */}
      <section style={{
        position: "relative", minHeight: "100vh",
        display: "flex", alignItems: "center",
        paddingTop: 72, overflow: "hidden",
      }}>
        {/* Background image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/tfa-hero.jpg')",
          backgroundSize: "cover", backgroundPosition: "center 30%",
          filter: "brightness(0.35)",
        }} />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, rgba(2,11,39,0.92) 0%, rgba(0,40,100,0.7) 60%, rgba(2,11,39,0.85) 100%)`,
        }} />

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 2,
          maxWidth: 1200, margin: "0 auto",
          padding: "80px clamp(20px, 5vw, 80px)",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 48,
        }}>
          {/* Tag */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{
              background: "rgba(0,102,204,0.2)", border: "1px solid rgba(0,153,255,0.35)",
              borderRadius: 30, padding: "6px 18px",
              fontSize: 11, fontWeight: 700, letterSpacing: 3,
              textTransform: "uppercase" as const, color: T.accentLight,
            }}>
              Sponsorship Opportunities
            </span>
          </div>

          {/* Headline */}
          <div>
            <h1 style={{
              fontSize: "clamp(38px, 6vw, 80px)",
              fontWeight: 800, lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: T.white, marginBottom: 24,
              maxWidth: 900,
            }}>
              Support Champions.{" "}
              <span style={{
                background: gradientBtn,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Grow Your Brand.
              </span>
            </h1>

            <p style={{
              fontSize: "clamp(16px, 1.8vw, 20px)",
              fontWeight: 400, lineHeight: 1.75,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 640, marginBottom: 40,
            }}>
              Partner with Texas Ford Aquatics and connect your business with one of the most engaged family communities in North Texas. With over <strong style={{ color: T.white }}>1,000 active families</strong> visiting our facility multiple times each week, sponsors receive consistent exposure in a trusted environment built around discipline, performance, and youth development.
            </p>

            {/* Stat bar */}
            <div style={{
              display: "flex", flexWrap: "wrap" as const, gap: 32,
              marginBottom: 40,
              padding: "24px 32px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              maxWidth: 640,
            }}>
              {[
                { num: "1,000+", label: "Active Families" },
                { num: "3–10×", label: "Weekly Visits" },
                { num: "50+", label: "Years of Excellence" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: T.white, lineHeight: 1 }}>
                    {s.num}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: 1, marginTop: 4 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 14 }}>
              <a
                href="#apply"
                style={{
                  background: gradientBtn, color: T.white,
                  fontWeight: 700, fontSize: 16, letterSpacing: 0.5,
                  padding: "16px 36px", borderRadius: 4,
                  textDecoration: "none",
                  boxShadow: "0 8px 32px rgba(0,102,204,0.4)",
                }}
              >
                Become a Sponsor
              </a>
              <a
                href="#tiers"
                style={{
                  background: "transparent",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  color: "rgba(255,255,255,0.85)",
                  fontWeight: 600, fontSize: 16,
                  padding: "16px 36px", borderRadius: 4,
                  textDecoration: "none",
                }}
              >
                View Packages ↓
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 6,
          opacity: 0.4,
        }}>
          <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.5)" }} />
        </div>
      </section>


      {/* ── WHY PARTNER ── */}
      <section style={{
        background: T.navyMid,
        padding: "100px clamp(20px, 5vw, 80px)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionLabel>Why Partner With Us</SectionLabel>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800,
            lineHeight: 1.15, letterSpacing: "-0.02em",
            marginBottom: 16, maxWidth: 680,
          }}>
            Where Elite Training Meets Community
          </h2>
          <p style={{
            fontSize: 17, color: "rgba(255,255,255,0.65)", lineHeight: 1.8,
            maxWidth: 680, marginBottom: 64,
          }}>
            Texas Ford Aquatics is both a world-class training facility and a community hub where athletes, families, and coaches gather throughout the week. Sponsors gain access to a high-frequency audience that spends real time inside the facility, creating repeated brand exposure and meaningful connections.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}>
            {[
              {
                icon: "👨‍👩‍👧‍👦",
                title: "High-Frequency Audience",
                body: "More than 1,000 active families engage with Texas Ford Aquatics every single week.",
              },
              {
                icon: "🔄",
                title: "Consistent Visibility",
                body: "Families visit the facility 3–10 times per week, creating repeated brand impressions.",
              },
              {
                icon: "💼",
                title: "Engaged Decision Makers",
                body: "Parents and guardians are present during practices and meets — real face-to-face marketing.",
              },
              {
                icon: "🏆",
                title: "Trust-Based Environment",
                body: "Brands are introduced through a respected organization committed to athlete development.",
              },
            ].map((item) => (
              <div key={item.title} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8, padding: "32px 28px",
                transition: "border-color 0.2s",
              }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{
                  fontSize: 18, fontWeight: 700, marginBottom: 10, color: T.white,
                }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── ALIGN YOUR BRAND ── */}
      <section style={{
        position: "relative", overflow: "hidden",
        padding: "100px clamp(20px, 5vw, 80px)",
        background: T.navy,
      }}>
        {/* Decorative */}
        <div style={{
          position: "absolute", top: -100, right: -100,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,102,204,0.12) 0%, transparent 70%)",
        }} />

        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 64, alignItems: "center",
        }}>
          <div>
            <SectionLabel>Brand Alignment</SectionLabel>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800,
              lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 20,
            }}>
              Align Your Brand With Excellence
            </h2>
            <p style={{
              fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: 24,
            }}>
              Texas Ford Aquatics athletes compete at elite levels across regional, national, and international competitions. Sponsorship places your business alongside a nationally recognized and awarded program built on discipline, commitment, and high performance.
            </p>
            <p style={{
              fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: 36,
            }}>
              Sponsors also play a vital role in supporting the next generation of athletes who dedicate countless hours to training, education, and personal growth.
            </p>
            <a
              href="#tiers"
              style={{
                display: "inline-block",
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.3)",
                color: T.white, fontWeight: 600, fontSize: 15,
                padding: "13px 28px", borderRadius: 4,
                textDecoration: "none",
              }}
            >
              See Sponsorship Packages →
            </a>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}>
            {[
              { label: "Club Excellence Award", note: "National recognition" },
              { label: "Elite Training", note: "World-class facility" },
              { label: "1,000+ Families", note: "Strong community" },
              { label: "All-Season Program", note: "Year-round exposure" },
            ].map((item) => (
              <div key={item.label} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8, padding: "24px 20px",
                textAlign: "center" as const,
              }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.white, marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── SPONSORSHIP TIERS ── */}
      <section id="tiers" style={{
        background: T.navyMid,
        padding: "100px clamp(20px, 5vw, 80px)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center" as const, marginBottom: 64 }}>
            <SectionLabel>Sponsorship Packages</SectionLabel>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800,
              lineHeight: 1.15, letterSpacing: "-0.02em",
            }}>
              Choose Your Partnership Level
            </h2>
            <p style={{
              fontSize: 17, color: "rgba(255,255,255,0.6)", marginTop: 16,
              maxWidth: 560, margin: "16px auto 0",
            }}>
              Select the tier that aligns with your marketing goals and brand vision.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 28, alignItems: "start",
          }}>

            {/* ── SILVER ── */}
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(168,184,200,0.3)",
              borderRadius: 12, overflow: "hidden",
            }}>
              {/* Card header */}
              <div style={{
                padding: "32px 36px 28px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(143,168,191,0.08)",
              }}>
                <div style={{
                  display: "inline-block",
                  background: "rgba(143,168,191,0.15)",
                  border: "1px solid rgba(143,168,191,0.35)",
                  borderRadius: 4, padding: "4px 12px",
                  fontSize: 11, fontWeight: 700, letterSpacing: 3,
                  textTransform: "uppercase" as const,
                  color: T.silverLight, marginBottom: 16,
                }}>
                  Silver
                </div>
                <div style={{
                  fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 800,
                  color: T.white, lineHeight: 1,
                }}>
                  $2,500
                  <span style={{ fontSize: 16, fontWeight: 500, color: "rgba(255,255,255,0.4)" }}> / year</span>
                </div>
                <p style={{
                  fontSize: 14, color: "rgba(255,255,255,0.55)", marginTop: 10, lineHeight: 1.6,
                }}>
                  Designed for businesses seeking consistent visibility and strong community alignment.
                </p>
              </div>

              {/* Card features */}
              <div style={{ padding: "28px 36px 36px" }}>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column" as const, gap: 14 }}>
                  {[
                    "Logo placement on the TFA website",
                    "Sponsored video commercial on lobby TVs",
                    "Quarterly social media sponsor highlights",
                    "Digital sponsor badge for your marketing",
                    "Recognition in quarterly email newsletters",
                    "On-site banner placement for one year",
                    "Invitation to the TFA Team Awards event",
                  ].map((item) => <CheckItem key={item}>{item}</CheckItem>)}
                </ul>

                <a
                  href="#apply"
                  style={{
                    display: "block", textAlign: "center" as const,
                    marginTop: 32,
                    background: "rgba(255,255,255,0.08)",
                    border: "1.5px solid rgba(143,168,191,0.4)",
                    color: T.white, fontWeight: 700, fontSize: 15, letterSpacing: 0.5,
                    padding: "14px", borderRadius: 4, textDecoration: "none",
                  }}
                >
                  Apply for Silver →
                </a>
              </div>
            </div>

            {/* ── GOLD ── */}
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1.5px solid rgba(201,160,53,0.5)",
              borderRadius: 12, overflow: "hidden",
              position: "relative" as const,
              boxShadow: "0 0 40px rgba(201,160,53,0.12)",
            }}>
              {/* Best value badge */}
              <div style={{
                position: "absolute" as const, top: 20, right: 20,
                background: gradientGold, color: T.navy,
                fontWeight: 800, fontSize: 11, letterSpacing: 2,
                textTransform: "uppercase" as const,
                padding: "5px 14px", borderRadius: 20,
              }}>
                Most Popular
              </div>

              {/* Card header */}
              <div style={{
                padding: "32px 36px 28px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(201,160,53,0.08)",
              }}>
                <div style={{
                  display: "inline-block",
                  background: "rgba(201,160,53,0.15)",
                  border: "1px solid rgba(201,160,53,0.4)",
                  borderRadius: 4, padding: "4px 12px",
                  fontSize: 11, fontWeight: 700, letterSpacing: 3,
                  textTransform: "uppercase" as const,
                  color: T.goldLight, marginBottom: 16,
                }}>
                  Gold
                </div>
                <div style={{
                  fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 800,
                  color: T.white, lineHeight: 1,
                }}>
                  $5,000
                  <span style={{ fontSize: 16, fontWeight: 500, color: "rgba(255,255,255,0.4)" }}> / year</span>
                </div>
                <p style={{
                  fontSize: 14, color: "rgba(255,255,255,0.55)", marginTop: 10, lineHeight: 1.6,
                }}>
                  Built for brands seeking deeper engagement, premium placement, and content opportunities.
                </p>
              </div>

              {/* Card features */}
              <div style={{ padding: "28px 36px 36px" }}>
                <p style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" as const,
                  color: "rgba(255,255,255,0.35)", marginBottom: 14,
                }}>
                  Everything in Silver, plus:
                </p>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column" as const, gap: 14 }}>
                  {[
                    "Priority logo placement across all digital platforms",
                    "Social media feature video with sponsor messaging",
                    "Logo on Texas Ford Aquatics team t-shirts",
                    "Dedicated sponsor spotlight in email newsletter",
                    "Additional social media features throughout the season",
                    "On-site activation opportunities at home swim meets",
                    "Logo inclusion in the annual TFA highlight video",
                  ].map((item) => <CheckItem key={item} gold>{item}</CheckItem>)}
                </ul>

                <a
                  href="#apply"
                  style={{
                    display: "block", textAlign: "center" as const,
                    marginTop: 32,
                    background: gradientGold,
                    color: T.navy, fontWeight: 800, fontSize: 15, letterSpacing: 0.5,
                    padding: "14px", borderRadius: 4, textDecoration: "none",
                  }}
                >
                  Apply for Gold →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ── GOLD EXCLUSIVE EXPERIENCES (Horizontal Scroll) ── */}
      <section style={{
        background: T.navy,
        padding: "100px 0",
        overflow: "hidden",
      }}>
        <div style={{ padding: "0 clamp(20px, 5vw, 80px)", marginBottom: 48 }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap" as const, gap: 20 }}>
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14,
              }}>
                <span style={{
                  background: "rgba(201,160,53,0.15)", border: "1px solid rgba(201,160,53,0.4)",
                  borderRadius: 4, padding: "4px 12px",
                  fontSize: 11, fontWeight: 700, letterSpacing: 3,
                  textTransform: "uppercase" as const, color: T.goldLight,
                }}>Gold Tier Exclusive</span>
              </div>
              <h2 style={{
                fontSize: "clamp(24px, 3.5vw, 42px)", fontWeight: 800,
                lineHeight: 1.2, letterSpacing: "-0.02em",
              }}>
                Exclusive Gold Experiences
              </h2>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={scrollLeft}
                style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: T.white, fontSize: 18, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >‹</button>
              <button
                onClick={scrollRight}
                style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: T.white, fontSize: 18, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >›</button>
            </div>
          </div>
        </div>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          style={{
            display: "flex", gap: 20,
            overflowX: "auto", scrollSnapType: "x mandatory",
            padding: "8px clamp(20px, 5vw, 80px) 24px",
            scrollbarWidth: "none",
          }}
        >
          {[
            {
              title: "VIP Meet Access",
              body: "Reserved seating and behind-the-scenes access during Texas Ford meets. Experience the energy of elite competition up close.",
              icon: "🏅",
            },
            {
              title: "Brand Content Sessions",
              body: "Professional content opportunities featuring Texas Ford athletes alongside your brand. Authentic, high-quality creative assets.",
              icon: "🎬",
            },
            {
              title: "Friends & Family Night",
              body: "An invitation-only experience to host your team, clients, or guests to see elite training firsthand.",
              icon: "⭐",
            },
            {
              title: "Featured Sponsor Spotlight",
              body: "A long-form newsletter feature highlighting your business, your story, and your community commitment.",
              icon: "📰",
            },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                minWidth: 320, maxWidth: 360,
                flexShrink: 0, scrollSnapAlign: "start",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(201,160,53,0.2)",
                borderRadius: 10, padding: "36px 28px",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 20 }}>{card.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: T.white }}>
                {card.title}
              </h3>
              <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* ── COMPARISON TABLE ── */}
      <section style={{
        background: T.navyMid,
        padding: "100px clamp(20px, 5vw, 80px)",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center" as const, marginBottom: 56 }}>
            <SectionLabel>Compare Packages</SectionLabel>
            <h2 style={{
              fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800,
              lineHeight: 1.15, letterSpacing: "-0.02em",
            }}>
              Sponsorship Comparison
            </h2>
          </div>

          <div style={{
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10, overflow: "hidden",
          }}>
            {/* Header row */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              background: "rgba(255,255,255,0.06)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}>
              <div style={{ padding: "20px 24px", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>Feature</div>
              <div style={{
                padding: "20px 24px", fontSize: 15, fontWeight: 700,
                color: T.silverLight, textAlign: "center" as const,
                borderLeft: "1px solid rgba(255,255,255,0.06)",
              }}>Silver</div>
              <div style={{
                padding: "20px 24px", fontSize: 15, fontWeight: 700,
                color: T.goldLight, textAlign: "center" as const,
                borderLeft: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(201,160,53,0.05)",
              }}>Gold</div>
            </div>

            {/* Feature rows */}
            {[
              { feature: "Website Logo Placement", silver: true, gold: "Priority" },
              { feature: "Lobby TV Commercial", silver: true, gold: true },
              { feature: "Quarterly Social Features", silver: true, gold: "+ More" },
              { feature: "Newsletter Recognition", silver: true, gold: "Dedicated Feature" },
              { feature: "On-Site Banner", silver: true, gold: true },
              { feature: "Team Awards Event Invite", silver: true, gold: true },
              { feature: "Team T-Shirt Logo", silver: false, gold: true },
              { feature: "Meet Booth Activation", silver: false, gold: true },
              { feature: "Sponsor Feature Video", silver: false, gold: true },
              { feature: "Highlight Video Placement", silver: false, gold: true },
              { feature: "VIP Meet Access", silver: false, gold: true },
              { feature: "Brand Content Sessions", silver: false, gold: true },
            ].map((row, i) => (
              <div
                key={row.feature}
                style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
                }}
              >
                <div style={{ padding: "15px 24px", fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{row.feature}</div>
                <div style={{
                  padding: "15px 24px", textAlign: "center" as const,
                  borderLeft: "1px solid rgba(255,255,255,0.06)",
                  fontSize: 14,
                }}>
                  {row.silver === true ? (
                    <span style={{ color: T.silverLight, fontWeight: 700 }}>✓</span>
                  ) : row.silver === false ? (
                    <span style={{ color: "rgba(255,255,255,0.2)" }}>—</span>
                  ) : (
                    <span style={{ color: T.silverLight, fontSize: 12 }}>{row.silver}</span>
                  )}
                </div>
                <div style={{
                  padding: "15px 24px", textAlign: "center" as const,
                  borderLeft: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(201,160,53,0.03)",
                  fontSize: 14,
                }}>
                  {row.gold === true ? (
                    <span style={{ color: T.goldLight, fontWeight: 700 }}>✓</span>
                  ) : row.gold === false ? (
                    <span style={{ color: "rgba(255,255,255,0.2)" }}>—</span>
                  ) : (
                    <span style={{ color: T.goldLight, fontSize: 12, fontWeight: 600 }}>{row.gold}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── EVENT ACTIVATION ── */}
      <section style={{
        background: T.navy,
        padding: "100px clamp(20px, 5vw, 80px)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 64, alignItems: "center",
          }}>
            <div>
              <SectionLabel>Event Activation</SectionLabel>
              <h2 style={{
                fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 800,
                lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 20,
              }}>
                Promote Your Business at TFA Events
              </h2>
              <p style={{
                fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: 32,
              }}>
                Sponsors have the opportunity to connect directly with families during local meets and events. These in-person opportunities allow sponsors to create real connections with athletes and families in a high-traffic, trusted environment.
              </p>

              <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
                {[
                  { icon: "🏪", label: "Branded Booths", note: "High-visibility placement during meets" },
                  { icon: "🖥️", label: "Service Tables", note: "Direct customer engagement" },
                  { icon: "🎯", label: "Promotional Experiences", note: "Interactive brand moments" },
                  { icon: "🎁", label: "Product Demonstrations", note: "Hands-on sampling opportunities" },
                ].map((item) => (
                  <div key={item.label} style={{
                    display: "flex", alignItems: "center", gap: 16,
                    padding: "16px 20px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 8,
                  }}>
                    <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: T.white }}>{item.label}</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{item.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial placeholder */}
            <div>
              <SectionLabel>Hear From Our Partners</SectionLabel>
              <h2 style={{
                fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800,
                lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: 32,
              }}>
                Local Businesses That Trust TFA
              </h2>

              {/* Placeholder testimonials */}
              {[
                {
                  quote: "Partnering with Texas Ford Aquatics gave us consistent exposure to exactly the audience we were looking for — active, engaged families who value quality.",
                  name: "Business Partner",
                  role: "Silver Sponsor",
                },
                {
                  quote: "The team at TFA made sponsorship effortless. We saw real results from the visibility at their events and our logo on their website.",
                  name: "Local Business Owner",
                  role: "Gold Sponsor",
                },
              ].map((t, i) => (
                <div key={i} style={{
                  padding: "24px 28px", marginBottom: 16,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                }}>
                  <p style={{
                    fontSize: 14.5, color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.75, marginBottom: 16, fontStyle: "italic",
                  }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%",
                      background: "rgba(255,255,255,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18,
                    }}>👤</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: T.white }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: T.accentLight }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── FINAL CTA ── */}
      <section id="apply" style={{
        position: "relative", overflow: "hidden",
        padding: "100px clamp(20px, 5vw, 80px)",
        background: T.navyLight,
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800, height: 400,
          background: "radial-gradient(ellipse, rgba(0,102,204,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: 800, margin: "0 auto", textAlign: "center" as const,
        }}>
          <SectionLabel>Get Started Today</SectionLabel>
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 800,
            lineHeight: 1.1, letterSpacing: "-0.02em",
            marginBottom: 20,
          }}>
            Become a Texas Ford Aquatics Sponsor
          </h2>
          <p style={{
            fontSize: 17, color: "rgba(255,255,255,0.65)", lineHeight: 1.8,
            maxWidth: 560, margin: "0 auto 16px",
          }}>
            Support elite athletes while placing your brand in front of one of the most engaged family communities in North Texas.
          </p>
          <p style={{
            fontSize: 14, color: T.accentLight, fontWeight: 600,
            letterSpacing: 1, marginBottom: 48,
            textTransform: "uppercase" as const,
          }}>
            Sponsorship opportunities are limited to ensure strong visibility for each partner.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 16, justifyContent: "center" }}>
            {/* Typeform trigger — swap href with actual Typeform URL */}
            <a
              href="https://form.typeform.com/to/REPLACE_WITH_TYPEFORM_ID"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: gradientBtn, color: T.white,
                fontWeight: 700, fontSize: 17, letterSpacing: 0.5,
                padding: "18px 44px", borderRadius: 4,
                textDecoration: "none",
                boxShadow: "0 8px 32px rgba(0,102,204,0.4)",
              }}
            >
              Apply to Become a Sponsor
            </a>
            <a
              href="https://txfordaquatics.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.3)",
                color: "rgba(255,255,255,0.85)",
                fontWeight: 600, fontSize: 17,
                padding: "18px 44px", borderRadius: 4,
                textDecoration: "none",
              }}
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </section>


      {/* ── FOOTER ── */}
      <footer style={{
        background: T.navy,
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "40px clamp(20px, 5vw, 80px)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", flexWrap: "wrap" as const,
          justifyContent: "space-between", alignItems: "center", gap: 24,
        }}>
          <Image src="/tfa-logo.png" alt="Texas Ford Aquatics" width={120} height={33} style={{ objectFit: "contain", height: 33, width: "auto", opacity: 0.7 }} />
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" as const }}>
            <a href="https://txfordaquatics.com" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
              txfordaquatics.com
            </a>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>
              © {new Date().getFullYear()} Texas Ford Aquatics. All rights reserved.
            </span>
          </div>
        </div>
      </footer>

    </main>
  );
}
