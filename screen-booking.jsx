// Booking screen — derivación a vet aliado

const { Button, Card, MonoLabel, Icon, PetAvatar } = window.UI;

function BookingScreen({ pet, onBack, onConfirm }) {
  const [vet, setVet] = React.useState(0);
  const [day, setDay] = React.useState(0);
  const [slot, setSlot] = React.useState(2);
  const [confirmed, setConfirmed] = React.useState(false);

  const vets = [
    { name: "Dra. María García", years: 8, city: "Salamanca", rating: 4.9, reviews: 127, focus: "Medicina general · dermatología" },
    { name: "Dr. Pablo Ruiz", years: 12, city: "Madrid", rating: 4.8, reviews: 84, focus: "Medicina general · gatos" },
    { name: "Dra. Laura Mendoza", years: 6, city: "Valencia", rating: 4.9, reviews: 56, focus: "Medicina general · comportamiento" },
  ];
  const days = ["Hoy", "Mañana", "Vie 1", "Sáb 2", "Dom 3"];
  const slots = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"];

  if (confirmed) {
    return (
      <div style={{ padding: "80px 56px", maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <div style={{
          width: 72, height: 72, borderRadius: 99, background: "var(--sage-200)",
          display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--sage-700)",
          marginBottom: 24,
        }}>
          <Icon.Check size={28}/>
        </div>
        <h1 className="display" style={{ fontSize: 32, fontWeight: 500, margin: 0, letterSpacing: "-0.02em" }}>
          Listo. Tu reserva está confirmada.
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: 12, fontSize: 15 }}>
          Te hemos enviado el enlace de la videoconsulta a tu email.<br/>
          {vets[vet].name.split(" ").slice(0, 2).join(" ")} ya tiene el contexto de {pet.petName}.
        </p>
        <Card style={{ marginTop: 28, textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <PetAvatar name={vets[vet].name.split(" ")[1]?.charAt(0) || "M"} size={48}/>
            <div style={{ flex: 1 }}>
              <div className="display" style={{ fontSize: 17, fontWeight: 500 }}>{vets[vet].name}</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                {days[day]} · {slots[slot]} · 20 min
              </div>
            </div>
            <Button variant="secondary" size="sm"><Icon.Calendar size={13}/> Añadir al calendario</Button>
          </div>
        </Card>
        <Button onClick={onBack} variant="ghost" style={{ marginTop: 28 }}>
          <Icon.ArrowL size={14}/> Volver al inicio
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: "44px 56px", maxWidth: 920, margin: "0 auto" }}>
      <button onClick={onBack} style={{
        background: "none", border: "none", color: "var(--text-secondary)",
        cursor: "pointer", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6,
        marginBottom: 18, padding: 0, fontFamily: "inherit",
      }}><Icon.ArrowL size={13}/> Volver al análisis</button>

      <MonoLabel style={{ color: "var(--sage-700)", marginBottom: 12 }}>Reserva videoconsulta</MonoLabel>
      <h1 className="display" style={{ fontSize: 36, fontWeight: 500, margin: 0, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
        Un veterinario humano,<br/>
        <span style={{ fontStyle: "italic", color: "var(--sage-700)" }}>el mismo día.</span>
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: 15, marginTop: 14, maxWidth: 520 }}>
        20 minutos por videollamada con un veterinario colegiado. Llega con el caso de {pet.petName} ya preparado.
      </p>

      <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
        <div>
          <SectionTitle n="01" label="Elige veterinario"/>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
            {vets.map((v, i) => {
              const active = vet === i;
              return (
                <button key={i} onClick={() => setVet(i)} style={{
                  display: "flex", alignItems: "center", gap: 16, padding: 18,
                  background: "var(--bg-elevated)", borderRadius: 14, cursor: "pointer", textAlign: "left",
                  border: `1px solid ${active ? "var(--sage-500)" : "var(--border)"}`,
                  boxShadow: active ? "0 0 0 3px rgba(122,144,128,.10)" : "none",
                  transition: "all .15s",
                }}>
                  <PetAvatar name={v.name.split(" ")[1] || "V"} size={48}/>
                  <div style={{ flex: 1 }}>
                    <div className="display" style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.005em" }}>{v.name}</div>
                    <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 2 }}>{v.focus}</div>
                    <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 6, display: "flex", gap: 12, fontFamily: "var(--font-mono)", letterSpacing: ".05em" }}>
                      <span>★ {v.rating} · {v.reviews}</span>
                      <span>{v.years} AÑOS</span>
                      <span>{v.city.toUpperCase()}</span>
                    </div>
                  </div>
                  <div style={{
                    width: 18, height: 18, borderRadius: 99,
                    border: `1.5px solid ${active ? "var(--sage-700)" : "var(--border-strong)"}`,
                    background: active ? "var(--sage-700)" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {active && <span style={{ width: 6, height: 6, borderRadius: 99, background: "white" }}/>}
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: 32 }}>
            <SectionTitle n="02" label="Elige día y hora"/>
            <div style={{ marginTop: 14, display: "flex", gap: 8, overflow: "auto" }}>
              {days.map((d, i) => (
                <button key={i} onClick={() => setDay(i)} style={{
                  padding: "10px 16px", borderRadius: 10, fontSize: 13, fontWeight: 500,
                  background: day === i ? "var(--sage-700)" : "var(--bg-elevated)",
                  color: day === i ? "var(--cream-100)" : "var(--text-secondary)",
                  border: `1px solid ${day === i ? "var(--sage-700)" : "var(--border)"}`,
                  cursor: "pointer", whiteSpace: "nowrap",
                }}>{d}</button>
              ))}
            </div>
            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
              {slots.map((s, i) => (
                <button key={i} onClick={() => setSlot(i)} style={{
                  padding: "10px 0", borderRadius: 10, fontSize: 13, fontWeight: 500,
                  background: slot === i ? "var(--coral-100)" : "var(--bg-elevated)",
                  color: slot === i ? "var(--coral-600)" : "var(--text-secondary)",
                  border: `1px solid ${slot === i ? "var(--coral-400)" : "var(--border)"}`,
                  cursor: "pointer", fontFamily: "var(--font-mono)", letterSpacing: ".03em",
                }}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* summary card */}
        <Card style={{ position: "sticky", top: 24, height: "fit-content" }}>
          <MonoLabel style={{ color: "var(--text-tertiary)", marginBottom: 14 }}>Resumen</MonoLabel>
          <SummaryRow icon={<Icon.Stethoscope size={14}/>} label="Veterinario" value={vets[vet].name}/>
          <SummaryRow icon={<Icon.Calendar size={14}/>} label="Cuándo" value={`${days[day]} · ${slots[slot]}`}/>
          <SummaryRow icon={<Icon.Clock size={14}/>} label="Duración" value="20 min · videollamada"/>
          <SummaryRow icon={<Icon.Pet size={14}/>} label="Sobre" value={pet.petName}/>

          <div style={{ marginTop: 18, padding: 14, background: "var(--bg-muted)", borderRadius: 10, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55 }}>
            El veterinario recibe automáticamente el perfil de {pet.petName}, la anamnesis y el análisis IA — para que la consulta arranque ya en contexto.
          </div>

          <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>Tu plan incluye</div>
              <div style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: 500 }}>1 videoconsulta /mes</div>
            </div>
            <div className="display" style={{ fontSize: 24, fontWeight: 500, color: "var(--sage-700)" }}>0 €</div>
          </div>

          <Button onClick={() => setConfirmed(true)} style={{ width: "100%", marginTop: 18 }}>
            Confirmar reserva <Icon.Arrow size={14}/>
          </Button>
          <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", textAlign: "center", marginTop: 10 }}>
            Cancela hasta 1h antes sin coste.
          </div>
        </Card>
      </div>
    </div>
  );
}

function SectionTitle({ n, label }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-tertiary)", letterSpacing: ".08em" }}>{n}</span>
      <span style={{ flex: 1, height: 1, background: "var(--border)" }}/>
      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".09em", fontFamily: "var(--font-mono)" }}>{label}</span>
    </div>
  );
}

function SummaryRow({ icon, label, value }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderTop: "1px solid var(--border)" }}>
      <span style={{ color: "var(--sage-700)", marginTop: 2 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", letterSpacing: ".05em", textTransform: "uppercase" }}>{label}</div>
        <div style={{ fontSize: 14, color: "var(--text-primary)", marginTop: 2 }}>{value}</div>
      </div>
    </div>
  );
}

window.BookingScreen = BookingScreen;
