// Chat screen — the hero. Streams real Claude responses, then renders AnalysisCard.

const { Button, Card, MonoLabel, TriageBadge, Icon, PetAvatar, Disclaimer } = window.UI;

function ChatScreen({ pet, initialMessage, triageOverride, onBookVet, onBack }) {
  const [messages, setMessages] = React.useState([]);
  const [streaming, setStreaming] = React.useState(false);
  const [analysis, setAnalysis] = React.useState(null);
  const [phase, setPhase] = React.useState("anamnesis"); // anamnesis | analyzing | done
  const [input, setInput] = React.useState("");
  const [questionsAsked, setQuestionsAsked] = React.useState(0);
  const scrollRef = React.useRef(null);

  // Auto-scroll
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, analysis]);

  // Kick off with initial message
  React.useEffect(() => {
    if (initialMessage && messages.length === 0) {
      const userMsg = { role: "user", content: initialMessage };
      setMessages([userMsg]);
      askAssistant([userMsg]);
    }
    // eslint-disable-next-line
  }, []);

  // Re-render analysis when triageOverride changes (Tweaks panel)
  React.useEffect(() => {
    if (analysis && triageOverride && triageOverride !== analysis.triageLevel) {
      setAnalysis({ ...analysis, triageLevel: triageOverride });
    }
  }, [triageOverride]);

  async function askAssistant(history) {
    setStreaming(true);
    const systemPrompt = `Eres Tranqui, una asistente veterinaria IA especializada en triage clínico para perros y gatos. Hablas en español de España, tuteas, eres cálida pero sobria. Lenguaje probabilístico, NUNCA diagnóstico definitivo.

Mascota: ${pet.petName} (${pet.species === "cat" ? "gato" : "perro"}${pet.age ? `, ${pet.age} años` : ""}).

REGLAS:
- Si llevas menos de 3 preguntas hechas Y aún te falta info clave (localización, duración, dolor/comportamiento), haz UNA sola pregunta corta y empática (máx 2 frases). NO des análisis todavía.
- Si ya tienes suficiente contexto (3+ intercambios o info clínica suficiente), devuelve un análisis estructurado en JSON dentro de un bloque <analysis>...</analysis>, después de una frase corta de cierre amable.
- Formato del JSON:
{"summaryTitle": "string corto en minúscula salvo nombres propios",
 "triageLevel": "urgente"|"preferente"|"orientativo",
 "probableCauses": [{"title":"...","likelihood":"alta"|"media"|"baja","explanation":"frase corta"}],
 "recommendedActions": ["...","..."],
 "observationGuidance": "qué observar y cuándo reconsultar",
 "escalateAvailable": true}
- Lleva ${history.filter(m=>m.role==="assistant").length} preguntas hechas. Quedan ${Math.max(0, 3 - history.filter(m=>m.role==="assistant").length)} antes de dar análisis.`;

    try {
      const text = await window.claude.complete({
        messages: [
          { role: "user", content: systemPrompt + "\n\n--- conversación ---\n" + history.map(m => `${m.role === "user" ? "Dueña" : "Tranqui"}: ${m.content}`).join("\n") + "\n\nResponde como Tranqui:" },
        ],
      });
      // Parse out analysis block if any
      const analysisMatch = text.match(/<analysis>([\s\S]*?)<\/analysis>/);
      let displayText = text.replace(/<analysis>[\s\S]*?<\/analysis>/, "").trim();
      let parsedAnalysis = null;
      if (analysisMatch) {
        try {
          parsedAnalysis = JSON.parse(analysisMatch[1].trim());
        } catch (e) { /* ignore */ }
      }

      // Simulate streaming
      const finalMsg = { role: "assistant", content: "" };
      setMessages((m) => [...m, finalMsg]);
      const chars = displayText.split("");
      for (let i = 0; i < chars.length; i++) {
        await new Promise((r) => setTimeout(r, 8 + Math.random() * 14));
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { ...copy[copy.length - 1], content: copy[copy.length - 1].content + chars[i] };
          return copy;
        });
      }
      setStreaming(false);

      if (parsedAnalysis) {
        setPhase("done");
        await new Promise((r) => setTimeout(r, 350));
        setAnalysis(parsedAnalysis);
      } else {
        setQuestionsAsked((n) => n + 1);
      }
    } catch (err) {
      // Fallback canned response
      const fallback = {
        role: "assistant",
        content: questionsAsked === 0
          ? `Entiendo. Para orientarte mejor: ¿el rascado es solo en una oreja o en las dos? ¿Y desde cuándo notas el olor?`
          : `Vale, gracias. Una última cosa: ¿${pet.petName} sacude la cabeza con frecuencia o se queja al tocarle la oreja?`,
      };
      setMessages((m) => [...m, fallback]);
      setStreaming(false);
      setQuestionsAsked((n) => n + 1);
      // After 2 fallback questions, show canned analysis
      if (questionsAsked >= 1) {
        setPhase("done");
        await new Promise((r) => setTimeout(r, 600));
        setAnalysis(CANNED_ANALYSIS);
      }
    }
  }

  function send() {
    if (!input.trim() || streaming) return;
    const next = [...messages, { role: "user", content: input.trim() }];
    setMessages(next);
    setInput("");
    askAssistant(next);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <ChatHeader pet={pet} onBack={onBack}/>
      <div ref={scrollRef} className="scroll" style={{
        flex: 1, overflowY: "auto", padding: "28px 0",
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 56px", display: "flex", flexDirection: "column", gap: 18 }}>
          <Disclaimer/>
          {messages.map((m, i) => <MessageBubble key={i} {...m} pet={pet}/>)}
          {streaming && messages[messages.length - 1]?.role === "user" && (
            <ThinkingBubble/>
          )}
          {analysis && (
            <div className="fade-up" style={{ marginTop: 12 }}>
              <AnalysisCard analysis={analysis} onBookVet={onBookVet}/>
            </div>
          )}
        </div>
      </div>
      {!analysis && (
        <ChatInput value={input} setValue={setInput} onSend={send} disabled={streaming}/>
      )}
      {analysis && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "16px 56px", background: "var(--bg-elevated)", display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
            ¿Tienes más dudas sobre {pet.petName}?
          </span>
          <Button variant="secondary" size="sm" onClick={() => {
            setAnalysis(null);
          }}>Seguir preguntando</Button>
        </div>
      )}
    </div>
  );
}

function ChatHeader({ pet, onBack }) {
  return (
    <header style={{
      borderBottom: "1px solid var(--border)", padding: "16px 56px",
      display: "flex", alignItems: "center", gap: 14, background: "var(--bg-elevated)",
    }}>
      <button onClick={onBack} style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 32, height: 32, borderRadius: 8, border: "none",
        background: "var(--bg-muted)", color: "var(--text-secondary)", cursor: "pointer",
      }}><Icon.ArrowL size={15}/></button>
      <PetAvatar name={pet.petName} size={36}/>
      <div>
        <div className="display" style={{ fontSize: 16, fontWeight: 500, letterSpacing: "-0.01em" }}>{pet.petName}</div>
        <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", letterSpacing: ".05em" }}>
          {pet.species === "cat" ? "GATO" : "PERRO"}{pet.age ? ` · ${pet.age}A` : ""} · CONSULTA INICIADA HOY
        </div>
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text-tertiary)" }}>
        <span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--success)" }}/>
        IA conectada
      </div>
    </header>
  );
}

function MessageBubble({ role, content, pet }) {
  if (role === "user") {
    return (
      <div className="fade-up" style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{
          maxWidth: "75%", background: "var(--coral-100)", color: "var(--text-primary)",
          padding: "12px 16px", borderRadius: "16px 16px 4px 16px", fontSize: 14.5, lineHeight: 1.55,
          whiteSpace: "pre-wrap",
        }}>{content}</div>
      </div>
    );
  }
  return (
    <div className="fade-up" style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
      <div style={{
        width: 30, height: 30, borderRadius: 99, background: "var(--sage-200)",
        color: "var(--sage-700)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon.Sparkle size={14}/>
      </div>
      <div style={{
        maxWidth: "75%", background: "var(--sage-100)", color: "var(--text-primary)",
        padding: "12px 16px", borderRadius: "16px 16px 16px 4px", fontSize: 14.5, lineHeight: 1.6,
        whiteSpace: "pre-wrap",
      }}>
        {content}
        {/* Streaming cursor: show only on the last assistant msg if it's still streaming-ish (no analysis yet, content nonempty) */}
      </div>
    </div>
  );
}

function ThinkingBubble() {
  return (
    <div className="fade-up" style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
      <div style={{
        width: 30, height: 30, borderRadius: 99, background: "var(--sage-200)",
        color: "var(--sage-700)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon.Sparkle size={14}/>
      </div>
      <div style={{
        background: "var(--sage-100)", padding: "14px 16px",
        borderRadius: "16px 16px 16px 4px", display: "flex", gap: 5, alignItems: "center",
      }}>
        <span className="dot"/><span className="dot"/><span className="dot"/>
      </div>
    </div>
  );
}

function ChatInput({ value, setValue, onSend, disabled }) {
  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };
  return (
    <div style={{ borderTop: "1px solid var(--border)", padding: "18px 56px 22px", background: "var(--bg-elevated)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{
          display: "flex", alignItems: "flex-end", gap: 10,
          background: "var(--bg-base)", border: "1px solid var(--border)",
          borderRadius: 16, padding: "8px 8px 8px 16px",
          transition: "border-color .15s",
        }}>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            disabled={disabled}
            rows={1}
            placeholder="Escribe tu respuesta..."
            style={{
              flex: 1, border: "none", background: "transparent", outline: "none",
              resize: "none", fontSize: 14.5, color: "var(--text-primary)",
              fontFamily: "inherit", lineHeight: 1.5, padding: "8px 0", maxHeight: 140,
            }}
          />
          <Button size="sm" onClick={onSend} disabled={disabled || !value.trim()}>
            <Icon.Send size={14}/>
          </Button>
        </div>
        <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", marginTop: 8, textAlign: "center", fontFamily: "var(--font-mono)", letterSpacing: ".05em" }}>
          ENTER PARA ENVIAR · SHIFT+ENTER PARA SALTO DE LÍNEA
        </div>
      </div>
    </div>
  );
}

// =================== ANALYSIS CARD — the hero piece ===================

function AnalysisCard({ analysis, onBookVet }) {
  const isUrgent = analysis.triageLevel === "urgente";
  const isPreferent = analysis.triageLevel === "preferente";
  const showBookCta = analysis.escalateAvailable && (isUrgent || isPreferent);

  const triageCopy = {
    urgente: "Esto necesita atención inmediata. Si tu vet de cabecera no contesta, ve a urgencias 24h.",
    preferente: "Esto puede esperar 24-48h pero merece una mirada profesional.",
    orientativo: "Por lo que cuentas, parece manejable en casa. Te dejo qué mirar y cuándo reconsultar.",
  };

  return (
    <Card data-triage={analysis.triageLevel} padding={0} style={{
      background: "var(--bg-elevated)",
      border: "1px solid var(--border)",
      overflow: "hidden",
    }}>
      {/* triage banner */}
      <div style={{
        background: "var(--tri-bg)",
        borderBottom: "1px solid var(--tri-border)",
        padding: "18px 26px",
        display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
      }}>
        <TriageBadge level={analysis.triageLevel} size="lg"/>
        <span style={{ fontSize: 13.5, color: "var(--text-secondary)", flex: 1, lineHeight: 1.5 }}>
          {triageCopy[analysis.triageLevel]}
        </span>
      </div>

      <div style={{ padding: "26px 26px 30px" }}>
        {/* headline */}
        <MonoLabel style={{ color: "var(--text-tertiary)", marginBottom: 8 }}>Análisis preliminar</MonoLabel>
        <h2 className="display" style={{
          fontSize: 28, fontWeight: 500, margin: 0, letterSpacing: "-0.018em",
          lineHeight: 1.15, color: "var(--text-primary)",
        }}>{analysis.summaryTitle}</h2>

        {/* causes */}
        <section style={{ marginTop: 28 }}>
          <SectionHead n="01">Causas probables</SectionHead>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            {analysis.probableCauses.map((c, i) => <CauseRow key={i} cause={c}/>)}
          </div>
        </section>

        {/* actions */}
        <section style={{ marginTop: 32 }}>
          <SectionHead n="02">Qué hacer ahora</SectionHead>
          <ol style={{ marginTop: 14, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {analysis.recommendedActions.map((a, i) => (
              <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "12px 14px", background: "var(--bg-muted)", borderRadius: 10 }}>
                <span style={{
                  flexShrink: 0, width: 22, height: 22, borderRadius: 6,
                  background: "var(--bg-elevated)", border: "1px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--sage-700)",
                }}>{i + 1}</span>
                <span style={{ fontSize: 14, color: "var(--text-primary)", lineHeight: 1.55 }}>{a}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* observation */}
        <section style={{ marginTop: 32 }}>
          <SectionHead n="03">Qué observar</SectionHead>
          <div style={{
            marginTop: 14, padding: "16px 18px", background: "var(--bg-muted)",
            borderRadius: 10, borderLeft: "3px solid var(--sage-500)",
            fontSize: 14, color: "var(--text-primary)", lineHeight: 1.6,
          }}>
            <Icon.Eye size={14}/> <span style={{ marginLeft: 8 }}>{analysis.observationGuidance}</span>
          </div>
        </section>

        {/* CTAs */}
        {(showBookCta || isUrgent) && (
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--border)", display: "flex", gap: 10, flexWrap: "wrap" }}>
            {showBookCta && (
              <Button onClick={onBookVet}>
                <Icon.Video size={14}/> Reservar veterinario · hoy
              </Button>
            )}
            {isUrgent && (
              <Button variant="secondary">
                <Icon.Phone size={14}/> Urgencias 24/7 cerca
              </Button>
            )}
            <Button variant="ghost" size="md" style={{ marginLeft: "auto" }}>
              Guardar resumen ↓
            </Button>
          </div>
        )}

        {/* footer disclaimer */}
        <div style={{ marginTop: 24 }}>
          <Disclaimer/>
        </div>
      </div>
    </Card>
  );
}

function SectionHead({ n, children }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-tertiary)", letterSpacing: ".08em" }}>{n}</span>
      <span style={{ flex: 1, height: 1, background: "var(--border)" }}/>
      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".09em", fontFamily: "var(--font-mono)" }}>{children}</span>
    </div>
  );
}

function CauseRow({ cause }) {
  const w = cause.likelihood === "alta" ? "84%" : cause.likelihood === "media" ? "56%" : "28%";
  const lab = cause.likelihood === "alta" ? "Probable" : cause.likelihood === "media" ? "Posible" : "Menos probable";
  const color = cause.likelihood === "alta" ? "var(--tri)" : cause.likelihood === "media" ? "var(--warning)" : "var(--sage-500)";
  return (
    <div style={{ padding: "14px 16px", background: "var(--bg-muted)", borderRadius: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 14.5, fontWeight: 500, color: "var(--text-primary)", flex: 1 }}>{cause.title}</span>
        <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: ".06em", textTransform: "uppercase", color: color, fontWeight: 600 }}>{lab}</span>
      </div>
      <div style={{ height: 3, background: "rgba(122,144,128,.12)", borderRadius: 99, overflow: "hidden", marginBottom: 8 }}>
        <div style={{ width: w, height: "100%", background: color, borderRadius: 99, transition: "width .6s var(--ease-out)" }}/>
      </div>
      <p style={{ margin: 0, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55 }}>{cause.explanation}</p>
    </div>
  );
}

const CANNED_ANALYSIS = {
  summaryTitle: "Probablemente otitis externa leve",
  triageLevel: "orientativo",
  probableCauses: [
    { title: "Otitis externa por humedad o cera acumulada", likelihood: "alta", explanation: "Encaja con el rascado unilateral y el olor leve. Muy común en beagles por la forma de la oreja." },
    { title: "Cuerpo extraño (espiga, semilla)", likelihood: "media", explanation: "Si ha estado en zona de hierba alta, posible — suele dar molestia más intensa y aguda." },
    { title: "Dermatitis o reacción alérgica", likelihood: "baja", explanation: "Menos probable si es solo una oreja y no rasca otras zonas." },
  ],
  recommendedActions: [
    "Limpia el pabellón con suero fisiológico tibio y una gasa, sin introducir nada en el conducto.",
    "Evita bañarla o que se moje las orejas durante 48h.",
    "Observa si aparece secreción amarilla, dolor al tocar o si sacude la cabeza con frecuencia.",
  ],
  observationGuidance: "Reconsulta si en 48h sigue rascándose, aparece secreción, o si Luna se vuelve apática o deja de comer. Cualquier signo de dolor → vet humano.",
  escalateAvailable: true,
};

window.ChatScreen = ChatScreen;
window.CANNED_ANALYSIS = CANNED_ANALYSIS;
