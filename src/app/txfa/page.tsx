"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import "./tfa.css";

/* ── Design Tokens — TFA Brand (exact from txfordaquatics.com) ── */
const T = {
  navy:      "#020b27",   // primary dark navy
  navyMid:   "#00215b",   // secondary navy
  white:     "#ffffff",
  offWhite:  "#F7F8FA",
  lightGray: "#EDEFF2",
  text:      "#1A1A1A",
  textMid:   "#444444",
  textLight: "#777777",
  red:       "#bd2533",   // TFA red (exact)
  redDark:   "#8a0a00",   // TFA dark crimson (hover/accent)
  gold:      "#C9A035",
  goldLight: "#E4BA55",
  silver:    "#8FA8BF",
  border:    "#E0E3E8",
};

const HEADING = "'Oswald', sans-serif";
const BODY    = "'Open Sans', sans-serif";

/* ── SVG Icons (no emojis) ── */
const IC = { stroke: T.red, strokeWidth: "1.75", fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Icon({ type }: { type: string }) {
  const sz = { width: 40, height: 40 };
  switch (type) {
    /* Why Partner */
    case "users": return (
      <svg {...sz} viewBox="0 0 24 24"><g {...IC}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </g></svg>
    );
    case "eye": return (
      <svg {...sz} viewBox="0 0 24 24"><g {...IC}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </g></svg>
    );
    case "target": return (
      <svg {...sz} viewBox="0 0 24 24"><g {...IC}>
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </g></svg>
    );
    case "shield": return (
      <svg {...sz} viewBox="0 0 24 24"><g {...IC}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </g></svg>
    );
    /* Gold Exclusive */
    case "award": return (
      <svg {...sz} viewBox="0 0 24 24"><g {...IC}>
        <circle cx="12" cy="8" r="7"/>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
      </g></svg>
    );
    case "video": return (
      <svg {...sz} viewBox="0 0 24 24"><g {...IC}>
        <polygon points="23 7 16 12 23 17 23 7"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </g></svg>
    );
    case "star": return (
      <svg {...sz} viewBox="0 0 24 24"><g {...IC}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </g></svg>
    );
    case "file-text": return (
      <svg {...sz} viewBox="0 0 24 24"><g {...IC}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </g></svg>
    );
    /* Event Activation */
    case "map-pin": return (
      <svg {...sz} viewBox="0 0 24 24"><g {...IC}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </g></svg>
    );
    case "monitor": return (
      <svg {...sz} viewBox="0 0 24 24"><g {...IC}>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </g></svg>
    );
    case "zap": return (
      <svg {...sz} viewBox="0 0 24 24"><g {...IC}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </g></svg>
    );
    case "package": return (
      <svg {...sz} viewBox="0 0 24 24"><g {...IC}>
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </g></svg>
    );
    default: return null;
  }
}

/* ── Shared pieces ── */
function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: 11, fontWeight: 700, letterSpacing: 4,
      textTransform: "uppercase" as const,
      color: T.red, marginBottom: 14,
      fontFamily: BODY,
    }}>
      {children}
    </p>
  );
}

function RedButton({ href, children, outline }: { href: string; children: React.ReactNode; outline?: boolean }) {
  return (
    <a href={href} style={{
      display: "inline-block",
      background: outline ? "transparent" : T.red,
      border: `2px solid ${T.red}`,
      color: outline ? T.red : T.white,
      fontFamily: HEADING,
      fontWeight: 600, fontSize: 15,
      letterSpacing: 1.5,
      textTransform: "uppercase" as const,
      padding: "13px 32px",
      textDecoration: "none",
    }}>
      {children}
    </a>
  );
}

function CheckRow({ children, gold }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <li style={{
      display: "flex", alignItems: "flex-start", gap: 12,
      fontSize: 15, color: T.textMid, lineHeight: 1.6,
      padding: "8px 0", borderBottom: `1px solid ${T.border}`,
    }}>
      <span style={{
        color: gold ? T.gold : T.red,
        fontWeight: 900, fontSize: 14, marginTop: 2, flexShrink: 0,
      }}>✓</span>
      {children}
    </li>
  );
}

export default function TFASponsorshipPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => scrollRef.current?.scrollBy({ left: dir * 380, behavior: "smooth" });

  return (
    <main className="tfa-page" style={{ background: T.white, fontFamily: BODY, color: T.text, overflowX: "hidden" }}>

      {/* ─────────────── NAV ─────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: T.navy,
        borderBottom: `1px solid rgba(255,255,255,0.08)`,
        padding: "0 clamp(16px, 4vw, 60px)",
        height: 70,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo is white-on-transparent — needs dark nav bg */}
        <Image
          src="/tfa-logo.png"
          alt="Texas Ford Aquatics"
          width={280}
          height={76}
          unoptimized
          style={{ height: 52, width: "auto", objectFit: "contain", display: "block" }}
        />
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <a href="https://txfordaquatics.com" target="_blank" rel="noopener noreferrer"
            className="tfa-nav-main-site"
            style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", textDecoration: "none", letterSpacing: 0.5 }}>
            Main Site
          </a>
          <a href="#apply" className="tfa-nav-cta-btn" style={{
            display: "inline-block",
            background: T.red, border: `2px solid ${T.red}`,
            color: T.white,
            fontFamily: HEADING, fontWeight: 600, fontSize: 15,
            letterSpacing: 1.5, textTransform: "uppercase",
            padding: "13px 32px", textDecoration: "none",
          }}>Become a Sponsor</a>
        </div>
      </nav>


      {/* ─────────────── HERO ─────────────── */}
      <section style={{
        position: "relative", minHeight: "90vh",
        display: "flex", alignItems: "flex-end",
        paddingTop: 70, overflow: "hidden",
      }}>
        {/* bg image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/tfa-hero.jpg')",
          backgroundSize: "cover", backgroundPosition: "center 25%",
        }} />
        {/* Dark overlay — gradient from bottom */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(2,11,39,0.96) 0%, rgba(2,11,39,0.7) 40%, rgba(2,11,39,0.3) 80%, transparent 100%)",
        }} />

        {/* Content pinned to bottom */}
        <div style={{
          position: "relative", zIndex: 2,
          width: "100%",
          maxWidth: 1300, margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 80px) 80px",
        }}>
          <h1 style={{
            fontSize: "clamp(40px, 6.5vw, 90px)",
            fontWeight: 900, lineHeight: 1.0,
            letterSpacing: "0.01em",
            textTransform: "uppercase" as const,
            color: T.white, marginBottom: 20,
          }}>
            Support Champions.<br />
            <span style={{ color: T.red }}>Grow Your Brand.</span>
          </h1>

          <p style={{
            fontSize: "clamp(16px, 1.6vw, 20px)",
            color: "rgba(255,255,255,0.8)", lineHeight: 1.7,
            maxWidth: 620, marginBottom: 36,
          }}>
            Partner with Texas Ford Aquatics and connect your business with one of the most engaged family communities in North Texas.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" as const }}>
            <RedButton href="#apply">Become a Sponsor</RedButton>
            <a href="#tiers" style={{
              display: "inline-block",
              border: "2px solid rgba(255,255,255,0.5)",
              color: T.white,
              fontWeight: 700, fontSize: 14,
              letterSpacing: 1.5,
              textTransform: "uppercase" as const,
              padding: "14px 32px",
              textDecoration: "none",
            }}>
              View Packages
            </a>
          </div>
        </div>
      </section>


      {/* ─────────────── STAT BAR ─────────────── */}
      <div style={{
        background: T.navy,
        padding: "0 clamp(20px, 5vw, 80px)",
      }}>
        <div className="tfa-stat-grid" style={{
          maxWidth: 1300, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          borderLeft: `4px solid ${T.red}`,
        }}>
          {[
            { num: "1,000+", label: "Active Families" },
            { num: "3–10×", label: "Weekly Facility Visits" },
            { num: "50+", label: "Years of Excellence" },
          ].map((s, i) => (
            <div key={s.label} style={{
              padding: "28px 32px",
              borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none",
              textAlign: "center" as const,
            }}>
              <div style={{
                fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 900,
                color: T.white, lineHeight: 1, letterSpacing: "-0.01em",
              }}>{s.num}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: 2, marginTop: 6, textTransform: "uppercase" as const }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* ─────────────── WHY PARTNER ─────────────── */}
      <section style={{ background: T.white, padding: "100px clamp(20px, 5vw, 80px)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ textAlign: "center" as const, marginBottom: 70, maxWidth: 700, margin: "0 auto 70px" }}>
            <SectionEyebrow>About Texas Ford Aquatics</SectionEyebrow>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900,
              textTransform: "uppercase" as const, lineHeight: 1.1,
              letterSpacing: "0.02em", color: T.text, marginBottom: 20,
            }}>
              Why Partner With Us
            </h2>
            <p style={{ fontSize: 17, color: T.textMid, lineHeight: 1.8 }}>
              Texas Ford Aquatics is both a world-class training facility and a community hub where athletes, families, and coaches gather throughout the week. Sponsors gain access to a high-frequency, engaged audience in a trusted environment.
            </p>
          </div>

          <div className="tfa-why-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 0,
            border: `1px solid ${T.border}`,
          }}>
            {[
              { icon: "users",  title: "High-Frequency Audience", body: "More than 1,000 active families engage with Texas Ford Aquatics every week." },
              { icon: "eye",    title: "Consistent Visibility", body: "Families visit the facility 3–10 times per week, creating repeated brand impressions." },
              { icon: "target", title: "Engaged Decision Makers", body: "Parents and guardians are present during practices and meets — real face-to-face marketing." },
              { icon: "shield", title: "Trust-Based Environment", body: "Brands are introduced through a respected organization committed to athlete development." },
            ].map((item, i) => (
              <div key={item.title} style={{
                padding: "40px 28px",
                borderRight: i < 3 ? `1px solid ${T.border}` : "none",
                borderBottom: `1px solid ${T.border}`,
              }}>
                <div style={{ marginBottom: 18 }}><Icon type={item.icon} /></div>
                <h3 style={{
                  fontSize: 15, fontWeight: 700, textTransform: "uppercase" as const,
                  letterSpacing: "0.04em", color: T.text, marginBottom: 12,
                }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.75 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ─────────────── CLUB EXCELLENCE BANNER ─────────────── */}
      <section style={{
        position: "relative", overflow: "hidden",
        padding: "100px clamp(20px, 5vw, 80px)",
        minHeight: 420, display: "flex", alignItems: "center",
      }}>
        {/* bg */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/tfa-excellence-badge.png')",
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.2)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, rgba(2,11,39,0.95) 0%, rgba(10,26,58,0.9) 100%)`,
        }} />

        <div style={{
          position: "relative", zIndex: 2,
          maxWidth: 1300, margin: "0 auto", width: "100%",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))",
          gap: 60, alignItems: "center",
        }}>
          <div>
            <Image src="/tfa-excellence-badge.png" alt="USA Swimming Club Excellence Gold Award"
              width={140} height={140}
              unoptimized
              style={{ marginBottom: 24 }}
            />
            <h2 style={{
              fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 900,
              textTransform: "uppercase" as const, lineHeight: 1.0,
              letterSpacing: "0.03em", color: T.white,
            }}>
              Club Excellence
            </h2>
            <div style={{ width: 60, height: 4, background: T.red, margin: "20px 0 24px" }} />
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: 480 }}>
              Texas Ford Aquatics has earned the USA Swimming Club Excellence Gold Award — placing our program among the nation's most elite competitive swim clubs.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" as const, gap: 20 }}>
            {[
              "Nationally recognized award-winning program",
              "Athletes competing at regional, national & international levels",
              "Decades of developing elite swimmers and future champions",
              "Year-round high-performance training environment",
            ].map((item) => (
              <div key={item} style={{
                display: "flex", gap: 14, alignItems: "flex-start",
                padding: "16px 20px",
                background: "rgba(255,255,255,0.05)",
                borderLeft: `3px solid ${T.red}`,
              }}>
                <span style={{ color: T.red, fontWeight: 900, fontSize: 14, marginTop: 2, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ─────────────── PRICING TIERS ─────────────── */}
      <section id="tiers" style={{ background: T.offWhite, padding: "100px clamp(20px, 5vw, 80px)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ textAlign: "center" as const, marginBottom: 64 }}>
            <SectionEyebrow>Sponsorship Packages</SectionEyebrow>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900,
              textTransform: "uppercase" as const, lineHeight: 1.1,
              letterSpacing: "0.02em", color: T.text,
            }}>
              Choose Your Partnership Level
            </h2>
            <p style={{ fontSize: 17, color: T.textMid, marginTop: 16, maxWidth: 520, margin: "16px auto 0" }}>
              Select the tier that aligns with your marketing goals and brand vision.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 2, background: T.border,
          }}>

            {/* SILVER */}
            <div style={{ background: T.white, padding: "0" }}>
              <div style={{
                background: T.navy, padding: "32px 40px",
                borderTop: `5px solid ${T.silver}`,
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: 4,
                  textTransform: "uppercase" as const, color: T.silver, marginBottom: 12,
                }}>Silver Sponsor</div>
                <div style={{
                  fontSize: "clamp(40px, 5vw, 60px)", fontWeight: 900,
                  color: T.white, lineHeight: 1,
                }}>
                  $2,500
                  <span style={{ fontSize: 16, fontWeight: 500, color: "rgba(255,255,255,0.4)" }}> / year</span>
                </div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", marginTop: 12 }}>
                  Consistent visibility and strong community alignment.
                </p>
              </div>
              <div style={{ padding: "36px 40px" }}>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {[
                    "Logo on the Texas Ford Aquatics website",
                    "Sponsored commercial on lobby TVs",
                    "Quarterly social media sponsor highlights",
                    "Digital sponsor badge for your marketing",
                    "Recognition in quarterly email newsletters",
                    "On-site banner placement for one year",
                    "Invitation to the TFA Team Awards event",
                  ].map((item) => <CheckRow key={item}>{item}</CheckRow>)}
                </ul>
                <div style={{ marginTop: 32 }}>
                  <RedButton href="#apply" outline>Apply for Silver →</RedButton>
                </div>
              </div>
            </div>

            {/* GOLD */}
            <div style={{ background: T.white, padding: "0", position: "relative" as const }}>
              <div style={{
                background: T.navy, padding: "32px 40px",
                borderTop: `5px solid ${T.gold}`,
              }}>
                {/* Badge */}
                <div style={{
                  position: "absolute" as const, top: 12, right: 20,
                  background: T.gold, color: T.navy,
                  fontWeight: 800, fontSize: 10, letterSpacing: 2,
                  textTransform: "uppercase" as const,
                  padding: "5px 14px",
                }}>Most Popular</div>
                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: 4,
                  textTransform: "uppercase" as const, color: T.goldLight, marginBottom: 12,
                }}>Gold Sponsor</div>
                <div style={{
                  fontSize: "clamp(40px, 5vw, 60px)", fontWeight: 900,
                  color: T.white, lineHeight: 1,
                }}>
                  $5,000
                  <span style={{ fontSize: 16, fontWeight: 500, color: "rgba(255,255,255,0.4)" }}> / year</span>
                </div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", marginTop: 12 }}>
                  Deeper engagement, premium placement, and content opportunities.
                </p>
              </div>
              <div style={{ padding: "36px 40px" }}>
                <p style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" as const,
                  color: T.gold, marginBottom: 16,
                }}>Everything in Silver, plus:</p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {[
                    "Priority logo placement across all digital platforms",
                    "Social media feature video with sponsor messaging",
                    "Logo on Texas Ford Aquatics team t-shirts",
                    "Dedicated sponsor spotlight in email newsletter",
                    "Additional social media features throughout the season",
                    "On-site booth activation at home swim meets",
                    "Logo in the annual TFA highlight video",
                  ].map((item) => <CheckRow key={item} gold>{item}</CheckRow>)}
                </ul>
                <div style={{ marginTop: 32 }}>
                  <RedButton href="#apply">Apply for Gold →</RedButton>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ─────────────── GOLD EXCLUSIVE (horizontal scroll) ─────────────── */}
      <section style={{ background: T.white, padding: "100px 0", overflow: "hidden" }}>
        <div style={{ padding: "0 clamp(20px, 5vw, 80px)", marginBottom: 48 }}>
          <div style={{
            maxWidth: 1300, margin: "0 auto",
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            flexWrap: "wrap" as const, gap: 20,
          }}>
            <div>
              <SectionEyebrow>Gold Tier Exclusive</SectionEyebrow>
              <h2 style={{
                fontSize: "clamp(24px, 3.5vw, 46px)", fontWeight: 900,
                textTransform: "uppercase" as const, lineHeight: 1.1,
                letterSpacing: "0.02em", color: T.text,
              }}>Exclusive Gold Experiences</h2>
            </div>
            <div className="tfa-gold-arrows" style={{ display: "flex", gap: 8 }}>
              {["‹", "›"].map((arrow, i) => (
                <button key={arrow} onClick={() => scroll(i === 0 ? -1 : 1)} style={{
                  width: 44, height: 44,
                  background: T.navy, color: T.white,
                  border: "none", fontSize: 20, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{arrow}</button>
              ))}
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="tfa-gold-scroll" style={{
          display: "flex", gap: 0,
          overflowX: "auto", scrollSnapType: "x mandatory",
          padding: "0 clamp(20px, 5vw, 80px) 8px",
          scrollbarWidth: "none",
        }}>
          {[
            { title: "VIP Meet Access", body: "Reserved seating and behind-the-scenes access during Texas Ford meets with elite athletes.", icon: "award" },
            { title: "Brand Content Sessions", body: "Professional photography and video sessions featuring Texas Ford athletes with your brand.", icon: "video" },
            { title: "Friends & Family Night", body: "An invitation-only experience to host guests and see elite swim training up close.", icon: "star" },
            { title: "Featured Sponsor Spotlight", body: "A long-form newsletter feature that tells your business story to our entire community.", icon: "file-text" },
          ].map((card) => (
            <div key={card.title} className="tfa-gold-card" style={{
              minWidth: 340, maxWidth: 360, flexShrink: 0, scrollSnapAlign: "start",
              background: T.offWhite, border: `1px solid ${T.border}`,
              borderTop: `4px solid ${T.gold}`,
              padding: "36px 32px", marginRight: 20,
            }}>
              <div style={{ marginBottom: 20 }}><Icon type={card.icon} /></div>
              <h3 style={{
                fontSize: 18, fontWeight: 800, textTransform: "uppercase" as const,
                letterSpacing: "0.04em", color: T.text, marginBottom: 12,
              }}>{card.title}</h3>
              <p style={{ fontSize: 14.5, color: T.textMid, lineHeight: 1.75 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ─────────────── COMPARISON TABLE ─────────────── */}
      <section style={{ background: T.offWhite, padding: "100px clamp(20px, 5vw, 80px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center" as const, marginBottom: 56 }}>
            <SectionEyebrow>Compare Packages</SectionEyebrow>
            <h2 style={{
              fontSize: "clamp(26px, 4vw, 46px)", fontWeight: 900,
              textTransform: "uppercase" as const, lineHeight: 1.1,
              letterSpacing: "0.02em", color: T.text,
            }}>Sponsorship Comparison</h2>
          </div>

          <div style={{ background: T.white, border: `1px solid ${T.border}` }}>
            {/* Header */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              background: T.navy, color: T.white,
            }}>
              <div style={{ padding: "18px 24px", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.5)" }}>Feature</div>
              <div style={{ padding: "18px 24px", fontSize: 13, fontWeight: 700, textAlign: "center" as const, color: T.silver, letterSpacing: 1 }}>Silver</div>
              <div style={{ padding: "18px 24px", fontSize: 13, fontWeight: 700, textAlign: "center" as const, color: T.goldLight, letterSpacing: 1 }}>Gold</div>
            </div>

            {[
              { feature: "Website Logo Placement", silver: true, gold: "Priority" },
              { feature: "Lobby TV Commercial", silver: true, gold: true },
              { feature: "Quarterly Social Features", silver: true, gold: "+ Additional" },
              { feature: "Newsletter Recognition", silver: true, gold: "Dedicated Feature" },
              { feature: "On-Site Banner", silver: true, gold: true },
              { feature: "Team Awards Event Invite", silver: true, gold: true },
              { feature: "Team T-Shirt Logo", silver: false, gold: true },
              { feature: "Meet Booth Activation", silver: false, gold: true },
              { feature: "Sponsor Feature Video", silver: false, gold: true },
              { feature: "Annual Highlight Video", silver: false, gold: true },
              { feature: "VIP Meet Access", silver: false, gold: true },
              { feature: "Brand Content Sessions", silver: false, gold: true },
            ].map((row, i) => (
              <div key={row.feature} style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                borderBottom: `1px solid ${T.border}`,
                background: i % 2 === 0 ? T.white : T.offWhite,
              }}>
                <div style={{ padding: "13px 24px", fontSize: 14, color: T.textMid }}>{row.feature}</div>
                <div style={{ padding: "13px 24px", textAlign: "center" as const, borderLeft: `1px solid ${T.border}`, fontSize: 14 }}>
                  {row.silver === true ? <span style={{ color: T.silver, fontWeight: 800 }}>✓</span>
                    : row.silver === false ? <span style={{ color: T.border }}>—</span>
                    : <span style={{ color: T.silver, fontSize: 12, fontWeight: 600 }}>{row.silver}</span>}
                </div>
                <div style={{ padding: "13px 24px", textAlign: "center" as const, borderLeft: `1px solid ${T.border}`, fontSize: 14 }}>
                  {row.gold === true ? <span style={{ color: T.gold, fontWeight: 800 }}>✓</span>
                    : row.gold === false ? <span style={{ color: T.border }}>—</span>
                    : <span style={{ color: T.gold, fontSize: 12, fontWeight: 600 }}>{row.gold}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ─────────────── EVENT ACTIVATION ─────────────── */}
      <section style={{ background: T.white, padding: "100px clamp(20px, 5vw, 80px)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ maxWidth: 700, marginBottom: 56 }}>
            <SectionEyebrow>Event Activation</SectionEyebrow>
            <h2 style={{
              fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 900,
              textTransform: "uppercase" as const, lineHeight: 1.1,
              letterSpacing: "0.02em", color: T.text, marginBottom: 20,
            }}>
              Promote Your Business at TFA Events
            </h2>
            <p style={{ fontSize: 16, color: T.textMid, lineHeight: 1.8 }}>
              Sponsors connect directly with families during local meets and events. These in-person opportunities create real connections with athletes and families in a high-traffic, trusted environment.
            </p>
          </div>

          <div className="tfa-event-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 0,
            border: `1px solid ${T.border}`,
          }}>
            {[
              { icon: "map-pin", label: "Branded Booths",         note: "High-visibility placement during meets" },
              { icon: "monitor", label: "Service Tables",          note: "Direct customer engagement" },
              { icon: "zap",     label: "Promotional Experiences", note: "Interactive brand moments" },
              { icon: "package", label: "Product Demonstrations",  note: "Hands-on sampling and showcasing" },
            ].map((item, i) => (
              <div key={item.label} style={{
                padding: "36px 28px",
                borderRight: i < 3 ? `1px solid ${T.border}` : "none",
              }}>
                <div style={{ marginBottom: 16 }}><Icon type={item.icon} /></div>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.text, textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 13, color: T.textLight, lineHeight: 1.6 }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ─────────────── FINAL CTA ─────────────── */}
      <section id="apply" style={{
        background: T.navy,
        padding: "100px clamp(20px, 5vw, 80px)",
        position: "relative" as const, overflow: "hidden",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" as const, position: "relative" as const, zIndex: 1 }}>
          <SectionEyebrow>Get Started Today</SectionEyebrow>
          <h2 style={{
            fontSize: "clamp(32px, 5.5vw, 70px)", fontWeight: 900,
            textTransform: "uppercase" as const, lineHeight: 1.05,
            letterSpacing: "0.02em", color: T.white, marginBottom: 20,
          }}>
            Become a Texas Ford Aquatics Sponsor
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, maxWidth: 540, margin: "0 auto 16px" }}>
            Support elite athletes while placing your brand in front of one of the most engaged family communities in North Texas.
          </p>
          <p style={{
            fontSize: 12, color: T.red, fontWeight: 700, letterSpacing: 2,
            textTransform: "uppercase" as const, marginBottom: 48,
          }}>
            Sponsorship opportunities are limited to ensure strong visibility for each partner.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" as const }}>
            <RedButton href="https://form.typeform.com/to/REPLACE_WITH_TYPEFORM_ID">
              Apply to Become a Sponsor
            </RedButton>
            <a href="https://txfordaquatics.com/contact" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-block",
              border: "2px solid rgba(255,255,255,0.35)",
              color: T.white, fontWeight: 700, fontSize: 14,
              letterSpacing: 1.5, textTransform: "uppercase" as const,
              padding: "14px 32px", textDecoration: "none",
            }}>
              Schedule a Call
            </a>
          </div>
        </div>
      </section>


      {/* ─────────────── FOOTER ─────────────── */}
      <footer style={{ background: "#0D0D0D", padding: "70px clamp(20px, 5vw, 80px) 40px" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 40, marginBottom: 60,
            alignItems: "start",
          }}>
            {/* Tagline + CTA */}
            <div className="tfa-footer-tagline" style={{ gridColumn: "span 2" }}>
              <h3 style={{
                fontSize: "clamp(26px, 4vw, 52px)", fontWeight: 900,
                textTransform: "uppercase" as const, lineHeight: 1.05,
                letterSpacing: "0.02em", color: T.white, marginBottom: 28,
              }}>
                Inspiring the Next<br />Generation of Greatness
              </h3>
              <RedButton href="#apply">Contact Us</RedButton>
            </div>

            {/* Nav col 1 */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
                Sponsorship
              </p>
              {["Silver Package", "Gold Package", "Event Activation", "Apply Now"].map((item) => (
                <a key={item} href="#tiers" style={{ display: "block", fontSize: 14, color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: 10, letterSpacing: 0.3 }}>
                  {item}
                </a>
              ))}
            </div>

            {/* Nav col 2 */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
                Texas Ford Aquatics
              </p>
              {[
                { label: "Main Website", href: "https://txfordaquatics.com" },
                { label: "Our Mission", href: "https://txfordaquatics.com" },
                { label: "Swim Programs", href: "https://txfordaquatics.com" },
                { label: "Contact", href: "https://txfordaquatics.com/contact" },
              ].map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", fontSize: 14, color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: 10, letterSpacing: 0.3 }}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28, display: "flex", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 16 }}>
            <Image src="/tfa-logo.png" alt="Texas Ford Aquatics"
              width={110} height={30}
              unoptimized
              style={{ objectFit: "contain", opacity: 0.4 }}
            />
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: 0.5 }}>
              © {new Date().getFullYear()} Texas Ford Aquatics. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </main>
  );
}
