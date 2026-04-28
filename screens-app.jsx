// Authed app shell: sidebar + screens (NewConsult mini-perfil, History, Pets)

const { Button, Card, MonoLabel, Icon, PetAvatar, Disclaimer } = window.UI;

function Sidebar({ active, onNav, onNewConsult }) {
  const items = [
    { id: "home",     label: "Inicio",    icon: Icon.Sparkle },
    { id: "history",  label: "Historial", icon: Icon.History },
    { id: "pets",     label: "Mascotas",  icon: Icon.Pet },
    { id: "bookings", label: "Reservas",  icon: Icon.Calendar },
    { id: "settings", label: "Ajustes",   icon: Icon.Settings },
  ];
  return (
    <aside style={{
      width: 248, flexShrink: 0, borderRight: "1px solid var(--border)",
      background: "var(--bg-elevated)", display: "flex", flexDirection: "column",
      padding: "22px 16px", height: "100vh", position: "sticky", top: 0,
    }}>
      <div style={{ padding: "0 8px 22px" }}>
        <window.Wordmark size={20}/>
      </div>
      <Button onClick={onNewConsult} size="md" style={{ width: "100%", marginBottom: 22 }}>
        <Icon.Plus size={15}/> Nueva consulta
      </Button>
      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <button
              key={it.id}
              onClick={() => onNav(it.id)}
              style={{
                display: "flex", alignItems: "center", gap: 11,
                padding: "9px 11px", borderRadius: 10, border: "none",
                background: isActive ? "var(--sage-200)" : "transparent",
                color: isActive ? "var(--sage-700)" : "var(--text-secondary)",
                fontSize: 14, fontWeight: isActive ? 500 : 400, cursor: "pointer",
                textAlign: "left", transition: "background .15s",
              }}>
              <it.icon size={16}/>{it.label}
            </button>
          );
        })}
      </nav>

      <div style={{ marginTop: "auto", padding: 14, background: "var(--bg-muted)", borderRadius: 12 }}>
        <MonoLabel style={{ color: "var(--text-tertiary)", marginBottom: 6 }}>Plan trial</MonoLabel>
        <div style={{ fontSize: 13, color: "var(--text-primary)", marginBottom: 10 }}>
          2 de 3 consultas usadas
        </div>
        <div style={{ height: 4, background: "rgba(122,144,128,.16)", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ width: "66%", height: "100%", background: "var(--sage-500)" }}/>
        </div>
        <button style={{
          marginTop: 12, fontSize: 12, color: "var(--coral-600)", background: "none",
          border: "none", padding: 0, cursor: "pointer", fontWeight: 500,
        }}>Ver suscripción →</button>
      </div>
    </aside>
  );
}

function HomeScreen({ onNewConsult, onOpenConsult }) {
  return (
    <div style={{ padding: "44px 56px", maxWidth: 980 }}>
      <MonoLabel style={{ color: "var(--text-tertiary)", marginBottom: 14 }}>Hola, Marta</MonoLabel>
      <h1 className="display" style={{ fontSize: 38, fontWeight: 500, margin: 0, letterSpacing: "-0.02em" }}>
        ¿Cómo está Luna hoy?
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: 15.5, marginTop: 10, maxWidth: 540 }}>
        Cuéntame qué te preocupa y vamos paso a paso.
      </p>

      <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 20 }}>
        <Card padding={28} style={{ background: "linear-gradient(160deg, var(--sage-100), var(--bg-elevated) 70%)" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <PetAvatar name="Luna" size={56}/>
            <div style={{ flex: 1 }}>
              <div className="display" style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em" }}>Luna</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>Beagle · 3 años · hembra</div>
              <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
                <Button size="sm" onClick={onNewConsult}>
                  <Icon.Sparkle size={14}/> Nueva consulta sobre Luna
                </Button>
                <Button size="sm" variant="secondary">Ver perfil</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card padding={24}>
          <MonoLabel style={{ color: "var(--text-tertiary)", marginBottom: 12 }}>Próxima reserva</MonoLabel>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 12, background: "var(--bg-muted)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            }}>
              <div className="display" style={{ fontSize: 18, fontWeight: 600, color: "var(--sage-700)" }}>30</div>
              <div style={{ fontSize: 9, color: "var(--text-tertiary)", letterSpacing: ".1em", textTransform: "uppercase" }}>Abr</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, fontWeight: 500 }}>Dra. María García</div>
              <div style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>Videoconsulta · 19:30</div>
            </div>
          </div>
          <Button size="sm" variant="secondary" style={{ width: "100%", marginTop: 16 }}>
            <Icon.Video size={14}/> Entrar a la sala
          </Button>
        </Card>
      </div>

      <div style={{ marginTop: 44 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18 }}>
          <h2 className="display" style={{ fontSize: 22, fontWeight: 500, margin: 0, letterSpacing: "-0.01em" }}>Consultas recientes</h2>
          <a style={{ fontSize: 13, color: "var(--sage-700)", cursor: "pointer" }}>Ver todas →</a>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { date: "Hace 3 días", title: "Cojera leve en pata trasera", level: "orientativo" },
            { date: "Hace 2 semanas", title: "Vómito puntual tras cena", level: "orientativo" },
            { date: "Hace 1 mes", title: "Rascado persistente — oreja", level: "preferente" },
          ].map((c, i) => (
            <button key={i} onClick={onOpenConsult} style={{
              display: "flex", alignItems: "center", gap: 18, padding: "14px 18px",
              background: "var(--bg-elevated)", border: "1px solid var(--border)",
              borderRadius: 12, cursor: "pointer", textAlign: "left", width: "100%",
              transition: "all .15s",
            }}>
              <div style={{ fontSize: 12, color: "var(--text-tertiary)", width: 110, fontFamily: "var(--font-mono)" }}>{c.date}</div>
              <div style={{ flex: 1, fontSize: 14.5, color: "var(--text-primary)" }}>{c.title}</div>
              <window.UI.TriageBadge level={c.level}/>
              <Icon.Arrow size={14}/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function NewConsultScreen({ onSubmit, defaultPet }) {
  const [step, setStep] = React.useState(1);
  const [petName, setPetName] = React.useState(defaultPet?.name || "Luna");
  const [species, setSpecies] = React.useState(defaultPet?.species || "dog");
  const [age, setAge] = React.useState(defaultPet?.age || "3");
  const [message, setMessage] = React.useState("");

  const baseInput = {
    width: "100%", padding: "12px 14px", borderRadius: 10,
    border: "1px solid var(--border)", background: "var(--bg-elevated)",
    fontSize: 14, color: "var(--text-primary)", outline: "none",
    transition: "border-color .15s",
  };

  return (
    <div style={{ padding: "56px 56px", maxWidth: 640, margin: "0 auto" }}>
      <MonoLabel style={{ color: "var(--sage-700)", marginBottom: 14 }}>
        Paso {step} de 2 · Nueva consulta
      </MonoLabel>
      <h1 className="display" style={{ fontSize: 32, fontWeight: 500, margin: 0, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
        {step === 1 ? <>Háblame de tu peludo.</> : <>¿Qué te preocupa hoy?</>}
      </h1>

      <div style={{ marginTop: 24 }}><Disclaimer/></div>

      <Card style={{ marginTop: 22 }}>
        {step === 1 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Field label="Nombre de la mascota">
              <input style={baseInput} value={petName} onChange={(e) => setPetName(e.target.value)} placeholder="Luna"/>
            </Field>
            <Field label="Especie">
              <div style={{ display: "flex", gap: 8 }}>
                {[["dog","Perro"],["cat","Gato"]].map(([k, l]) => (
                  <button key={k} onClick={() => setSpecies(k)} style={{
                    flex: 1, padding: "11px 14px", borderRadius: 10,
                    border: `1px solid ${species === k ? "var(--sage-500)" : "var(--border)"}`,
                    background: species === k ? "var(--sage-200)" : "var(--bg-elevated)",
                    color: species === k ? "var(--sage-700)" : "var(--text-secondary)",
                    fontWeight: species === k ? 500 : 400, fontSize: 14, cursor: "pointer",
                  }}>{l}</button>
                ))}
              </div>
            </Field>
            <Field label="Edad aproximada (años)" hint="Opcional">
              <input style={baseInput} type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="3"/>
            </Field>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
              <Button onClick={() => setStep(2)} disabled={!petName.trim()}>
                Continuar <Icon.Arrow size={14}/>
              </Button>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Field label={`Cuéntame qué le pasa a ${petName || "tu mascota"}`}>
              <textarea
                style={{ ...baseInput, minHeight: 140, resize: "vertical", lineHeight: 1.55 }}
                placeholder={`Lleva toda la tarde rascándose la oreja derecha y huele un poco raro. No tiene fiebre y come bien...`}
                value={message} onChange={(e) => setMessage(e.target.value)} autoFocus
                maxLength={2000}
              />
              <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 6, display: "flex", justifyContent: "space-between" }}>
                <span>Cuanto más concreta seas, mejor te puedo orientar.</span>
                <span>{message.length}/2000</span>
              </div>
            </Field>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <Button variant="ghost" onClick={() => setStep(1)}>
                <Icon.ArrowL size={14}/> Volver
              </Button>
              <Button onClick={() => onSubmit({ petName, species, age, message })} disabled={!message.trim()}>
                Enviar consulta <Icon.Send size={14}/>
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)", display: "flex", justifyContent: "space-between" }}>
        <span>{label}</span>
        {hint && <span style={{ color: "var(--text-tertiary)", fontWeight: 400 }}>{hint}</span>}
      </span>
      {children}
    </label>
  );
}

window.Sidebar = Sidebar;
window.HomeScreen = HomeScreen;
window.NewConsultScreen = NewConsultScreen;
