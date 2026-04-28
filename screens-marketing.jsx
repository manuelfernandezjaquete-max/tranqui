// Marketing landing — public face of Tranqui

const { Button, Card, MonoLabel, TriageBadge, Icon, Disclaimer, PetAvatar } = window.UI;

function MarketingNav({ onStart }) {
  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "22px 56px", borderBottom: "1px solid var(--border)",
      background: "rgba(245,241,232,.75)", backdropFilter: "blur(10px)",
      position: "sticky", top: 0, zIndex: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Wordmark />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 14, color: "var(--text-secondary)" }}>
        <a href="#" style={{ cursor: "pointer" }}>Cómo funciona</a>
        <a href="#" style={{ cursor: "pointer" }}>Veterinarios</a>
        <a href="#" style={{ cursor: "pointer" }}>Precio</a>
        <Button variant="ghost" size="sm">Iniciar sesión</Button>
        <Button size="sm" onClick={onStart}>Empezar gratis</Button>
      </div>
    </nav>
  );
}

function Wordmark({ size = 22 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <div style={{
        width: size + 6, height: size + 6, borderRadius: "50%",
        background: "var(--sage-700)", display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--cream-100)", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: size * 0.7,
        letterSpacing: "-0.02em",
      }}>t</div>
      <span className="display" style={{ fontSize: size, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>tranqui</span>
    </div>
  );
}

function Hero({ onStart }) {
  return (
    <section style={{ padding: "88px 56px 72px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 72, alignItems: "center" }}>
        <div>
          <MonoLabel style={{ marginBottom: 22, color: "var(--sage-700)" }}>
            ◦ Asistente veterinario · 24/7
          </MonoLabel>
          <h1 className="display" style={{
            fontSize: 64, lineHeight: 1.04, fontWeight: 500,
            margin: 0, letterSpacing: "-0.025em", color: "var(--text-primary)",
          }}>
            Respira.<br/>
            <span style={{ fontStyle: "italic", color: "var(--sage-700)" }}>Vamos paso </span>
            <span style={{ fontStyle: "italic", color: "var(--sage-700)" }}>a paso.</span>
          </h1>
          <p style={{
            marginTop: 28, fontSize: 18, lineHeight: 1.55, color: "var(--text-secondary)",
            maxWidth: 480,
          }}>
            Cuando algo no va bien con tu mascota, Tranqui te da una respuesta clara
            en menos de 3 minutos. Y si hace falta, te conectamos hoy con un veterinario
            colegiado — sin que el animal salga de casa.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 36, alignItems: "center" }}>
            <Button size="lg" onClick={onStart}>
              Empezar consulta gratis <Icon.Arrow size={16}/>
            </Button>
            <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>Sin tarjeta · sin login</span>
          </div>
          <div style={{ marginTop: 56, display: "flex", gap: 36 }}>
            {[
              ["3 min", "respuesta media"],
              ["9,99 €", "/mes después del trial"],
              ["24 / 7", "incluido fin de semana"],
            ].map(([n, t], i) => (
              <div key={i}>
                <div className="display" style={{ fontSize: 28, fontWeight: 500, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{n}</div>
                <div style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 2 }}>{t}</div>
              </div>
            ))}
          </div>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div style={{ position: "relative" }}>
      {/* soft ambient glow */}
      <div style={{
        position: "absolute", inset: -40, borderRadius: 40,
        background: "radial-gradient(60% 50% at 50% 40%, rgba(232,155,123,.16), transparent 70%)",
        zIndex: 0,
      }}/>
      <Card style={{ position: "relative", zIndex: 1, padding: 0, overflow: "hidden" }}>
        {/* fake browser-ish chrome */}
        <div style={{
          padding: "12px 16px", borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center", gap: 10,
          background: "var(--bg-muted)",
        }}>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ width: 9, height: 9, borderRadius: 99, background: "#d8d2c2" }}/>
            <span style={{ width: 9, height: 9, borderRadius: 99, background: "#d8d2c2" }}/>
            <span style={{ width: 9, height: 9, borderRadius: 99, background: "#d8d2c2" }}/>
          </div>
          <div style={{ flex: 1, textAlign: "center", fontSize: 11, color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>
            tranqui.app/consult
          </div>
        </div>

        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
          {/* user msg */}
          <div style={{ alignSelf: "flex-end", maxWidth: "78%" }}>
            <div style={{
              background: "var(--coral-100)", padding: "11px 14px",
              borderRadius: "16px 16px 4px 16px", fontSize: 13.5, color: "var(--text-primary)",
            }}>Luna lleva toda la tarde rascándose la oreja derecha y huele un poco raro.</div>
          </div>
          {/* assistant msg */}
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <PetAvatar name="t" size={26}/>
            <div style={{
              background: "var(--sage-100)", padding: "11px 14px",
              borderRadius: "16px 16px 16px 4px", fontSize: 13.5, color: "var(--text-primary)",
              maxWidth: "78%", lineHeight: 1.5,
            }}>
              Entiendo. Para orientarte mejor, ¿se rasca <em>solo</em> la oreja derecha o las dos? ¿Y cuándo notaste el olor por primera vez?
            </div>
          </div>

          {/* mini analysis preview */}
          <div data-triage="orientativo" style={{
            marginTop: 8,
            background: "var(--bg-muted)", border: "1px solid var(--border)",
            borderRadius: 14, padding: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <TriageBadge level="orientativo" size="md"/>
              <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>Análisis preliminar</span>
            </div>
            <div className="display" style={{ fontSize: 17, fontWeight: 500, marginBottom: 10 }}>
              Lo más probable: otitis externa leve
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {["Limpia con suero fisiológico, no introduzcas nada.", "Observa 24-48h.", "Si aparece dolor o secreción amarilla, escríbenos."].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, color: "var(--text-primary)" }}>
                  <span style={{ marginTop: 6, width: 4, height: 4, borderRadius: 99, background: "var(--sage-500)", flexShrink: 0 }}/>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ValueProps() {
  const props = [
    {
      kicker: "01 / Tranquilidad",
      title: "Respuesta en 3 minutos",
      body: "Sin esperas, sin foros contradictorios, sin pánico. Una IA con criterio clínico te orienta paso a paso.",
    },
    {
      kicker: "02 / Honestidad",
      title: "Triage en 3 niveles",
      body: "Urgente, preferente u orientativo. Cuando es urgente lo decimos sin paywall ni rodeos.",
    },
    {
      kicker: "03 / Continuidad",
      title: "Veterinario humano si hace falta",
      body: "Reservas videoconsulta el mismo día con un colegiado de la red — con tu caso ya preparado.",
    },
  ];
  return (
    <section style={{ padding: "72px 56px", borderTop: "1px solid var(--border)", background: "var(--bg-elevated)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ maxWidth: 560, marginBottom: 56 }}>
          <MonoLabel style={{ color: "var(--sage-700)", marginBottom: 16 }}>Cómo funciona</MonoLabel>
          <h2 className="display" style={{ fontSize: 40, fontWeight: 500, margin: 0, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Primero la IA. Después el humano,<br/>solo si aporta más.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {props.map((p, i) => (
            <div key={i} style={{ borderTop: "1px solid var(--border)", paddingTop: 24 }}>
              <MonoLabel style={{ color: "var(--text-tertiary)", marginBottom: 18 }}>{p.kicker}</MonoLabel>
              <h3 className="display" style={{ fontSize: 22, fontWeight: 500, margin: 0, marginBottom: 12, letterSpacing: "-0.01em" }}>{p.title}</h3>
              <p style={{ fontSize: 14.5, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarketingFooter() {
  return (
    <footer style={{ padding: "48px 56px 32px", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "var(--text-tertiary)" }}>
        <Wordmark size={18}/>
        <div style={{ display: "flex", gap: 24 }}>
          <span>Aviso legal</span>
          <span>Privacidad</span>
          <span>hola@tranqui.app</span>
        </div>
      </div>
    </footer>
  );
}

function MarketingScreen({ onStart }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <MarketingNav onStart={onStart}/>
      <Hero onStart={onStart}/>
      <ValueProps/>
      <MarketingFooter/>
    </div>
  );
}

window.MarketingScreen = MarketingScreen;
window.Wordmark = Wordmark;
