// Shared UI atoms — Button, Card, Badge, TriageBadge, Sidebar, Disclaimer, PetAvatar.

const cls = (...xs) => xs.filter(Boolean).join(" ");

function Button({ variant = "primary", size = "md", children, style, ...rest }) {
  const variants = {
    primary: { background: "var(--coral-400)", color: "#fff", border: "1px solid transparent" },
    primaryHover: { background: "var(--coral-600)" },
    secondary: { background: "transparent", color: "var(--sage-700)", border: "1px solid var(--sage-500)" },
    ghost: { background: "transparent", color: "var(--text-primary)", border: "1px solid transparent" },
    dark: { background: "var(--text-primary)", color: "var(--cream-100)", border: "1px solid transparent" },
  };
  const sizes = {
    sm: { height: 36, padding: "0 14px", fontSize: 13, borderRadius: 10 },
    md: { height: 44, padding: "0 20px", fontSize: 14, borderRadius: 12 },
    lg: { height: 52, padding: "0 26px", fontSize: 15, borderRadius: 14 },
  };
  const [hover, setHover] = React.useState(false);
  const v = hover && variant === "primary" ? variants.primaryHover : variants[variant] || variants.primary;
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        fontWeight: 500, cursor: "pointer", transition: "all .18s var(--ease-out)",
        ...sizes[size], ...variants[variant], ...v, ...style,
      }}
      {...rest}
    >{children}</button>
  );
}

function Card({ children, style, padding = 28, hover, ...rest }) {
  const [h, setH] = React.useState(false);
  return (
    <div
      onMouseEnter={() => hover && setH(true)}
      onMouseLeave={() => hover && setH(false)}
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding,
        boxShadow: h ? "var(--shadow-md)" : "var(--shadow-sm)",
        transition: "box-shadow .25s var(--ease-out), transform .25s var(--ease-out)",
        ...style,
      }}
      {...rest}
    >{children}</div>
  );
}

function MonoLabel({ children, color = "var(--text-tertiary)", style }) {
  return <div className="mono" style={{ color, ...style }}>{children}</div>;
}

function TriageBadge({ level, size = "md" }) {
  const labels = { urgente: "Urgente", preferente: "Preferente", orientativo: "Orientativo" };
  const colors = {
    urgente: { c: "var(--danger)", bg: "rgba(201,65,42,.10)", b: "rgba(201,65,42,.32)" },
    preferente: { c: "#9b6e1a", bg: "rgba(212,160,74,.14)", b: "rgba(212,160,74,.34)" },
    orientativo: { c: "var(--success)", bg: "rgba(90,139,107,.10)", b: "rgba(90,139,107,.32)" },
  };
  const c = colors[level];
  const isLg = size === "lg";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: isLg ? "8px 14px" : "5px 11px",
      fontSize: isLg ? 12 : 11, fontWeight: 600,
      letterSpacing: ".09em", textTransform: "uppercase",
      color: c.c, background: c.bg, border: `1px solid ${c.b}`,
      borderRadius: 999, fontFamily: "var(--font-mono)",
    }}>
      <span style={{ width: 7, height: 7, borderRadius: 99, background: c.c, boxShadow: `0 0 0 3px ${c.bg}` }}/>
      {labels[level]}
    </span>
  );
}

function PetAvatar({ name, species, size = 40 }) {
  const initial = (name || "?").trim().charAt(0).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "linear-gradient(135deg, var(--sage-100), var(--sage-200))",
      color: "var(--sage-700)", display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "var(--font-display)", fontWeight: 600, fontSize: size * 0.42,
      flexShrink: 0,
    }} aria-hidden>{initial}</div>
  );
}

function Disclaimer({ style }) {
  return (
    <div role="note" style={{
      display: "flex", alignItems: "flex-start", gap: 10,
      padding: "10px 14px", background: "var(--bg-muted)",
      borderLeft: "3px solid var(--info)", borderRadius: 8,
      fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.5,
      ...style,
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--info)" strokeWidth="2" style={{ marginTop: 2, flexShrink: 0 }}>
        <circle cx="12" cy="12" r="10"/><path d="M12 8h.01M11 12h1v4h1"/>
      </svg>
      <p style={{ margin: 0 }}>
        Tranqui es una herramienta de orientación, no un diagnóstico veterinario.
        Si tu mascota corre peligro, contacta directamente con un veterinario colegiado.
      </p>
    </div>
  );
}

// Tiny inline icons (no library) — only what we need
const Icon = {
  Stethoscope: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3"/><path d="M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4"/><circle cx="20" cy="10" r="2"/></svg>,
  Send: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>,
  Arrow: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  ArrowL: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>,
  Calendar: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  Pet: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="14" r="2"/><circle cx="4" cy="14" r="2"/><path d="M8 19a4 4 0 014-4h0a4 4 0 014 4v0a2 2 0 01-2 2h-4a2 2 0 01-2-2z"/></svg>,
  History: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 109-9 9.7 9.7 0 00-7 3L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/></svg>,
  Settings: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>,
  Plus: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>,
  Check: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
  Eye: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>,
  Phone: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .8 2.9a2 2 0 01-.5 2.1L8 10a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.3 1.9.6 2.9.7a2 2 0 011.7 2z"/></svg>,
  Video: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
  Sparkle: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l1.7 5.5L19 9.2l-5.3 1.7L12 16.4l-1.7-5.5L5 9.2l5.3-1.7z"/><path d="M19 14l.7 1.8L21.5 16l-1.8.7L19 18.5l-.7-1.8L16.5 16l1.8-.7z"/></svg>,
  Clock: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  Shield: (p) => <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
};

window.UI = { cls, Button, Card, MonoLabel, TriageBadge, PetAvatar, Disclaimer, Icon };
