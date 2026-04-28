// Root app — routing, Tweaks integration

const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "triageLevel": "orientativo"
}/*EDITMODE-END*/;

function App() {
  const [route, setRoute] = useState("marketing"); // marketing | new | chat | booking | home
  const [pet, setPet] = useState(null);
  const [initialMessage, setInitialMessage] = useState("");
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  function startConsult() {
    setRoute("new");
  }
  function submitConsult({ petName, species, age, message }) {
    setPet({ petName, species, age });
    setInitialMessage(message);
    setRoute("chat");
  }
  function backToHome() {
    setRoute("home");
    setInitialMessage("");
  }

  return (
    <>
      {route === "marketing" && (
        <MarketingScreen onStart={startConsult}/>
      )}
      {route !== "marketing" && (
        <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-base)" }}>
          <Sidebar
            active={route === "chat" || route === "booking" ? null : route === "new" ? null : route}
            onNav={(id) => setRoute(id === "home" ? "home" : id)}
            onNewConsult={startConsult}
          />
          <main style={{ flex: 1, minWidth: 0 }}>
            {route === "home" && <HomeScreen onNewConsult={startConsult} onOpenConsult={() => {
              setPet({ petName: "Luna", species: "dog", age: "3" });
              setInitialMessage("Le revisé el oído ayer y parece que ya no se rasca, pero ¿debo seguir con el suero unos días más?");
              setRoute("chat");
            }}/>}
            {route === "new" && <NewConsultScreen onSubmit={submitConsult}/>}
            {route === "chat" && pet && (
              <ChatScreen
                pet={pet}
                initialMessage={initialMessage}
                triageOverride={tweaks.triageLevel}
                onBookVet={() => setRoute("booking")}
                onBack={backToHome}
              />
            )}
            {route === "booking" && pet && (
              <BookingScreen pet={pet} onBack={() => setRoute("chat")} onConfirm={backToHome}/>
            )}
            {(route === "history" || route === "pets" || route === "bookings" || route === "settings") && (
              <PlaceholderScreen route={route}/>
            )}
          </main>
        </div>
      )}

      <TweaksPanel title="Tweaks" defaultPos={{ right: 20, bottom: 20 }}>
        <TweakSection title="Análisis · estado del triage">
          <TweakRadio
            label="Nivel"
            value={tweaks.triageLevel}
            onChange={(v) => setTweak("triageLevel", v)}
            options={[
              { value: "orientativo", label: "Orientativo" },
              { value: "preferente",  label: "Preferente" },
              { value: "urgente",     label: "Urgente" },
            ]}
          />
          <div style={{ fontSize: 11.5, color: "#888", marginTop: 8, lineHeight: 1.5 }}>
            Cambia el nivel del análisis renderizado para ver los 3 estados (URGENTE / PREFERENTE / ORIENTATIVO).
          </div>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

function PlaceholderScreen({ route }) {
  const titles = {
    history:  ["Historial", "Aquí aparecerán todas las consultas que vayas haciendo. Cada conversación queda guardada y enriquece el perfil de tu mascota."],
    pets:     ["Mis mascotas", "Gestiona los perfiles que Tranqui usa para contextualizar cada consulta — raza, edad, alergias conocidas."],
    bookings: ["Mis reservas", "Tus videoconsultas con veterinarios aliados, pasadas y futuras."],
    settings: ["Ajustes", "Plan, facturación, notificaciones y preferencias."],
  };
  const [t, sub] = titles[route];
  return (
    <div style={{ padding: "44px 56px", maxWidth: 980 }}>
      <window.UI.MonoLabel style={{ color: "var(--text-tertiary)", marginBottom: 14 }}>{route.toUpperCase()}</window.UI.MonoLabel>
      <h1 className="display" style={{ fontSize: 36, fontWeight: 500, margin: 0, letterSpacing: "-0.02em" }}>{t}</h1>
      <p style={{ color: "var(--text-secondary)", maxWidth: 480, marginTop: 12 }}>{sub}</p>
      <div className="ph-stripe" style={{
        marginTop: 32, height: 280, borderRadius: 16,
        border: "1px dashed var(--border-strong)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".08em",
      }}>
        VISTA NO IMPLEMENTADA EN ESTE PROTOTIPO
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
