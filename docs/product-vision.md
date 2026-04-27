# Product Vision — Tranqui

## 1. Vision & Mission

### Vision Statement

Un mundo donde ningún dueño tenga que elegir entre la angustia de la incertidumbre y la factura de una visita innecesaria al veterinario.

### Mission Statement

Tranqui usa IA con criterio clínico estructurado para resolver al instante el 70-80% de las dudas que tienen los dueños de perros y gatos, y conecta el resto con un veterinario aliado el mismo día — sin que el animal tenga que salir de casa.

### Founder's Why

Manuel construye Tranqui desde el lado del cliente, no del experto. Es dueño de dos perros y vive el problema cada semana: cada vez que algo no va bien, las opciones son las mismas (Google catastrofista, foros de extraños, o cargar al perro al coche para que un veterinario te diga "no es nada" después de cobrarte 100€). Después de años pagando esa factura emocional y económica, decidió construir el producto que él mismo querría tener.

Esa posición de "founder = cliente" es su mayor ventaja. No está intentando inventarse las dudas de un usuario imaginario; las tiene él mismo, todas las semanas. Eso le permite priorizar con un filtro muy útil: si yo no lo usaría, no lo construyo. Y le inmuniza frente a la tentación más común de los productos médicos — sobreescalar features clínicas que no resuelven el dolor real del usuario, que es emocional antes que médico.

A esta posición le suma una asesoría clínica de confianza: su pareja es veterinaria. No es la cara del proyecto ni co-fundadora — es la red de seguridad que valida la base médica del SKILL, testea respuestas desde la perspectiva del profesional, y abre la puerta a los primeros veterinarios aliados de la red. Una combinación difícil de copiar: cliente del problema + acceso íntimo al criterio profesional.

### Core Values

**Si yo no lo usaría, no lo lanzo.** Manuel es el primer dueño que prueba cada flujo. Si una pantalla, un mensaje o un cobro le incomoda como cliente, fuera. Esto vacuna al producto contra dark patterns, contra copy hueco y contra features que solo existen para impresionar a inversores.

**Honestidad clínica antes que conversión.** Si el caso es URGENTE, lo decimos sin paywall y sin upsell. Si no podemos ayudar, lo decimos. La confianza se construye en los momentos donde otra app cobraría de más — y vale más que cualquier conversión a corto plazo.

**El veterinario humano es el héroe, no el villano.** Tranqui no quiere reemplazar al veterinario; quiere que cada visita humana sea más útil. Cada decisión de producto debe pasar este filtro: ¿esto hace al veterinario aliado más eficaz, o solo lo extrae del flujo?

**Lenguaje probabilístico, no diagnóstico definitivo.** Nunca decimos "tu perro tiene X". Siempre decimos "lo más probable es X, observa Y, reconsulta si Z." Esa precisión lingüística es nuestra distinción frente a Google y frente a un agente IA genérico.

**Velocidad de iteración sobre perfeccionismo.** Solo founder, presupuesto ajustado, mercado por validar. La regla es lanzar la versión imperfecta del lunes y mejorarla el viernes con feedback real, no esperar tres meses a tener la versión "definitiva". Cada semana sale una mejora visible.

### Strategic Pillars

**El producto vive o muere por la confianza.** Cada decisión se evalúa contra una sola pregunta: ¿esto hace que Marta confíe más, o menos? Diseño cálido, lenguaje claro, derivación honesta a humano cuando hace falta — todo está al servicio de la confianza. Sin confianza, no hay suscripción ni recomendación boca a boca.

**Marta primero, el veterinario aliado segundo, todo lo demás después.** En empates, gana Marta. En conflictos sobre cómo presentar un caso, gana lo que sirve a Marta. Solo cuando la experiencia de Marta es excelente, vale optimizar la experiencia del veterinario aliado. Y solo cuando ambas están bien, miramos métricas de monetización.

**El triage es el producto.** No es un nice-to-have ni un wrapper sobre ChatGPT. La diferencia entre Tranqui y un agente IA genérico es la rigurosidad del triage clínico (URGENTE / PREFERENTE / ORIENTATIVO) y su capacidad de derivar al humano. Toda inversión en el SKILL clínico es inversión en moat.

**Costes variables bajo control.** Cada consulta IA tiene un coste de LLM real. Decisiones de producto y prompt engineering deben mantener el coste medio por consulta por debajo de 0,03€ — si no, el modelo de suscripción a 9,99€/mes se rompe.

### Success Looks Like

A finales de mes 12, Tranqui es una empresa real y embrionaria, no un experimento. Hay 1.500 suscriptores activos pagando 9,99€/mes (≈15.000€ MRR), 25 veterinarios aliados con disponibilidad nacional, y 5.000 consultas IA al mes con 600 derivaciones a videoconsulta humana cuyo NPS es ≥60. Marta se ha convertido en una usuaria recurrente que abre Tranqui dos o tres veces al mes para Luna y se lo ha recomendado a su grupo de amigas. Manuel ha cerrado una ronda pre-seed de 300-500k€ con 2-3 inversores ángel, ha contratado a la primera persona del equipo (probablemente Head of Growth o Product Designer), y empieza a planificar el lanzamiento en un segundo país de habla hispana. Internamente la sensación es de tracción real, no de tracción manufacturada — y eso se nota en cada métrica.

-----

## 2. User Research

### Primary Persona

**Marta, 32 años — Senior en una agencia de marketing digital, Madrid centro.**

Marta vive en un piso de 75 m² con su pareja David y su perra Luna, una beagle de 3 años que adoptaron en un refugio hace dos años. Es su primera mascota. Trata a Luna como a una hija — comparte fotos suyas en Instagram, le compra ropa para el invierno, y planifica los fines de semana en función de qué hacer con ella. Trabaja en un híbrido (3 días oficina, 2 días casa), usa Notion para todo, paga puntualmente Spotify, Netflix, HBO y dos suscripciones de productividad. Tiene Pinterest abierto para "ideas para Luna" y sigue a tres cuentas de "vida con perro" en Instagram.

Cada vez que Luna hace algo raro — y Marta percibe muchas cosas como raras — pasa entre 30 y 60 minutos buscando en Google y en grupos de Facebook. La mitad del tiempo termina más asustada que cuando empezó. Este último año ha ido al veterinario seis veces por motivos que ella misma reconoce, en frío, que probablemente no eran urgentes (un estornudo persistente, una posible cojera que se le pasó al día siguiente, una pequeña costra). Se ha gastado más de 600€ en esas visitas. Cuando piensa en ello, la mezcla es de culpa ("estoy gastando demasiado") + impotencia ("pero si no voy y resulta ser algo, ¿cómo me lo perdono?"). Esa segunda voz suele ganar.

Su rutina nocturna típica incluye un momento de tensión: Luna se mueve raro al acostarse, vomita un poco después de cenar, se rasca con insistencia. Marta deja el móvil, mira a Luna, y entra en un bucle de "¿le pasa algo?". Lo que más necesita en ese momento no es un diagnóstico definitivo — es una persona/sistema fiable que le diga "respira, esto es probablemente esto, mira esto, y si pasa X, llamamos." Es exactamente la promesa de Tranqui.

Lo que la haría cambiar a Tranqui ahora mismo: que un anuncio o una recomendación de una amiga le diga "esto te quita la angustia de las 11 de la noche por menos de 10€ al mes." Su techo de pago mental es 14,99€/mes. Su umbral de cancelación es percibir que la app no la entendió o le dio una respuesta vaga. Una sola interacción mediocre y se va. Tranqui solo tiene una oportunidad por sesión.

### Secondary Personas

**Carlos & Sofía, 35 y 33 — Pareja con dos perros, Valencia.** Doble ingreso, viven en chalet adosado, dos perros adoptados (Roco, mestizo de 5 años; Nala, podenca de 2). Gastaron 1.400€ en veterinario el año pasado y empiezan a calcular qué visitas eran necesarias. No son ansiosos, son resolutivos. Pagan suscripciones de software con criterio. Para ellos Tranqui es una palanca de optimización del gasto familiar, no un alivio emocional. Probabilidad de churn más baja que Marta (motivos racionales para quedarse), LTV más alto. Son la cuenta más rentable a largo plazo.

**Lucía, 28 — Consultora en una Big Four, Barcelona.** Vive sola con su gato Mishi (europeo, 4 años, esterilizado). Viaja 2 días a la semana. Cuando Mishi vomita o no come, no tiene tiempo de ir al vet en horario laboral, ni quiere ignorarlo. Necesita resolver desde el móvil entre reunión y reunión. Para ella Tranqui es un ahorro de tiempo y de gestión logística — la consulta con vet humano la usa menos, pero el agente IA la usa con frecuencia. Es la persona ideal para validar que el flujo móvil funciona bien sin amigos ni pareja consultando juntos.

**Veterinario aliado (María, 34) — Veterinaria colegiada con 8 años en clínica, Salamanca.** Trabaja en una clínica pero busca complementar ingresos con flexibilidad. Tranqui le manda 6-8 videoconsultas a la semana, ya filtradas por el agente IA, con perfil de mascota e historial pre-cargados. Cobra 60% de la tarifa de consulta. Para ella es flexibilidad pura: 20 minutos de trabajo bien remunerado entre cita y cita, sin recepción ni gestión administrativa. Es co-cliente del producto: si su experiencia es mala, no se queda en la red, y entonces Marta no tiene a quién derivar.

### Jobs To Be Done

**Funcionales.** Cuando mi mascota muestra un síntoma raro, contrato a Tranqui para que me ayude a entender si es algo grave o algo que puedo manejar en casa. Cuando ya he hablado con el agente y me dice que necesito a un humano, contrato a Tranqui para que me consiga un veterinario rápido sin tener que mover al animal. Cuando estoy cuidando a la mascota de otra persona o cuando mi pareja está fuera, contrato a Tranqui para tener acceso a su perfil y consultar con contexto.

**Emocionales.** Cuando estoy preocupada por mi mascota, contrato a Tranqui para sentirme acompañada y volver a un estado de calma. Cuando algo va mal por la noche y me siento sola con la decisión, contrato a Tranqui para no estar sola con la decisión. Cuando quiero tomar buenas decisiones para mi animal, contrato a Tranqui para sentirme como una dueña competente, no como una histérica que va al veterinario por todo.

**Sociales.** Cuando mi pareja o un amigo me dice "¿en serio vas otra vez al vet por eso?", contrato a Tranqui para validar mi decisión con criterio externo y no parecer obsesiva. Cuando le cuento a otros dueños cómo gestiono la salud de mi mascota, contrato a Tranqui para parecer una dueña moderna y bien informada. Cuando el veterinario me pregunta qué he observado, contrato a Tranqui para llegar con un historial preparado y no quedar como alguien que no sabe lo que ve.

### Pain Points

**1. Decisiones de salud bajo incertidumbre fuera de horario veterinario (severidad alta, frecuencia alta).** Sucede 2-4 veces al mes para una persona como Marta. La consecuencia hoy: ansiedad nocturna, pérdida de sueño, decisiones precipitadas. Lo que hace ahora: Google + foros + a veces termina en clínica al día siguiente "por si acaso". Tranqui ataca este punto directamente y es la principal razón de churn negativo.

**2. Coste acumulado de visitas veterinarias innecesarias (severidad media-alta, frecuencia media).** 600-1.500€ al año en visitas que en muchos casos no requerían atención profesional. Hoy se asume como peaje inevitable de tener mascota. Cuando Marta lo calcula a fin de año, le duele — pero lo soluciona "voy a intentar ir menos", lo que dura una semana hasta el siguiente susto. Tranqui rompe ese ciclo dándole una alternativa concreta a "ir o no ir."

**3. Logística de mover al animal a la clínica (severidad media, frecuencia media).** Especialmente molesto con perros nerviosos en transporte, gatos que se estresan en el coche, o dueños sin coche. La consecuencia hoy: media tarde perdida + estrés del animal. Hoy se resuelve "metiendo horas." Tranqui lo evita totalmente cuando el caso lo permite.

**4. Soledad emocional ante el problema (severidad alta cuando se activa, frecuencia baja-media).** Cuando algo grave pasa, el dueño se siente solo en la decisión. Hoy las opciones son llamar al vet (a veces no contestan), preguntar a alguien que no sabe, o decidir solo. Tranqui actúa como acompañante 24/7 y derivación inmediata a humano cuando hace falta.

**5. Falta de continuidad clínica (severidad baja, frecuencia baja).** Si cambias de clínica o ves a un vet distinto, repites la historia desde cero. Tranqui mitiga esto a partir del mes 6+, cuando el perfil de mascota acumula histórico. No es el dolor primario, pero es un beneficio acumulativo importante para la retención.

### Current Alternatives & Competitive Landscape

**Barkibu (España).** Telemedicina veterinaria por suscripción (~14-20€/mes). Hace bien: app instalada, marca conocida, derivación a vet humano. Falla: la primera respuesta puede tardar horas, las videoconsultas suelen ser extras de pago, no hay triage rápido por IA — el dueño espera siempre a un humano. Para cambiar, Marta tendría que percibir Tranqui como más rápido y más barato. Lo es en ambos.

**Pawp / Vetster / Airvet.** Equivalentes en EE.UU., presencia anecdótica en España. Mismo modelo (suscripción + vet humano), mismas limitaciones. No son una amenaza directa hoy, pero podrían entrar al mercado español si ven tracción.

**Google + foros + grupos de Facebook.** El competidor real, gratuito y omnipresente. Hace bien: accesibilidad inmediata, gratis. Falla: información contradictoria, anecdótica, y muchas veces alarmista. Para cambiar, Marta tiene que percibir que Tranqui le da el mismo acceso inmediato pero con criterio clínico estructurado y sin ruido.

**ChatGPT / Claude / Gemini directo.** Cada vez más usuarios usan IA generalista para preguntar síntomas. Hace bien: respuestas razonables, gratis o casi. Falla: no tiene protocolo de triage estructurado, no puede derivar a un humano, y el modelo no está específicamente alineado con el flujo de toma de decisiones de un dueño preocupado. Es la amenaza real a 18 meses si OpenAI o Anthropic deciden empaquetar verticales de salud animal.

**WhatsApp con la veterinaria de confianza (si la hay).** Hace bien: contexto, confianza, gratuito. Falla: dependencia de una sola persona, sin disponibilidad real 24/7, sin estructura. Solo ~30% de los dueños tienen una vet con quien puedan abusar de WhatsApp.

**El statu quo: ir al vet "por si acaso."** Hace bien: tranquiliza al 100% si el resultado es "no es nada." Falla: caro, lento, agota al animal, y refuerza el ciclo de ansiedad porque no enseña al dueño a discriminar.

**No hacer nada.** Hace bien: gratis. Falla: cuando es algo, es tarde. Esta es la opción que más asusta al dueño y la que más fácil convierte a Tranqui — porque mover de "no hacer nada" a "abrir Tranqui un momento" tiene fricción casi cero.

### Key Assumptions to Validate

**Asumimos que dueños como Marta están dispuestos a pagar 9,99€/mes por reducir ansiedad y evitar visitas innecesarias.** Para validar: lanzar landing con tres precios distintos (4,99 / 9,99 / 14,99) y medir conversión a free trial. Hipótesis nula: 9,99€ está por debajo del techo de pago mental. Si la conversión es <2% del tráfico cualificado, hay que reconsiderar precio o propuesta.

**Asumimos que el agente IA puede resolver con seguridad clínica el 70-80% de las consultas habituales sin derivación.** Para validar: las primeras 200 consultas reales se revisan por la pareja veterinaria de Manuel (asesora clínica) y se mide tasa de "respuesta correcta + tasa de derivación apropiada." Si la tasa de derivación apropiada es <85%, el SKILL necesita iteración antes de escalar.

**Asumimos que conseguir 3-5 veterinarios aliados en los primeros 90 días es factible con red personal + outreach básico.** Para validar: en las primeras 4 semanas, Manuel debe firmar a 2 veterinarios aliados (más allá de la pareja). Si no lo consigue, hay que repensar el modelo de marketplace — quizás simplificar a "una clínica colaboradora exclusiva" en lugar de red distribuida.

**Asumimos que el momento de uso principal es nocturno/fin de semana, fuera de horario veterinario.** Para validar: medir distribución horaria de las primeras 500 consultas. Si el grueso es horario laboral, la propuesta de valor "24/7" pesa menos de lo previsto y hay que revisar el copy.

**Asumimos que los dueños están cómodos compartiendo síntomas sensibles por chat con una IA.** Para validar: tasa de abandono entre "primera pregunta" y "respuesta del agente" en las primeras consultas. Si >40% abandonan tras la pregunta de anamnesis #2, hay un problema de UX o de confianza.

**Asumimos que los veterinarios humanos aceptan trabajar con casos pre-filtrados por IA cobrando 60% de la tarifa.** Para validar: en entrevistas con 5-8 veterinarios, evaluar reacción al modelo. Si el rechazo es alto, hay que repensar la economía del marketplace o presentarlo como "lead generation premium" en lugar de marketplace puro.

**Asumimos que el SEO + comunidad + partnerships físicos es suficiente para llegar a 100-150 suscriptores en 90 días sin pagar ads.** Para validar: medir CAC efectivo durante meses 1-3. Si está por encima de 30€ ya con orgánico, en cuanto entre paid el unit economics se rompe.

**Asumimos que el churn mensual será <10%.** Para validar: medir cohorte de los primeros 50 suscriptores a los 30 y 60 días. Si el churn es >15%, hay un problema de onboarding o de propuesta de valor que hay que resolver antes de invertir en captación.

### User Journey Map

**Awareness (días o semanas antes del primer uso).** Marta ve a una amiga compartir en Instagram una historia de "Tranqui me dijo que era una otitis, no era nada, ahorrada otra visita al vet" o ve un anuncio orgánico en un grupo de Facebook. La emoción es curiosidad + algo de escepticismo. Friction: percepción de "otra app de IA, no me fío".

**Consideration (entre awareness y primera visita a la web).** Marta entra a la landing, lee el one-liner, ve el precio. Si la landing es honesta sobre lo que hace y lo que no, el escepticismo baja. Friction: si la landing parece otra "telemedicina veterinaria", se pierde porque ya conoce Barkibu y no quiere otra. Hay que dejar claro: "primero IA, después vet humano si hace falta — más rápido y más barato".

**First use (primer uso del producto, free trial).** Marta llega tras un susto con Luna. Crea cuenta, hace el perfil de Luna, plantea su primera consulta. La emoción es expectativa nerviosa. Friction: si el formulario de perfil es largo, se va. Si la primera respuesta del agente tarda más de 8 segundos en empezar, se va. Si la respuesta es vaga, se va.

**Magic moment (idealmente en la primera consulta).** El agente hace 3-4 preguntas claras, devuelve causas posibles ordenadas, da consejo concreto, marca nivel de urgencia. Marta sigue las instrucciones, Luna mejora, no necesita ir al vet. Emoción: alivio + "ostras, esto funciona". Friction casi nula si la consulta sale bien — esa es justo la diferencia entre cliente y exuser.

**Habit formation (semanas 2-4).** Marta vuelve a abrir Tranqui ante cosas más pequeñas (una uña rota, una pregunta de alimentación, una duda sobre antiparasitario). Con cada uso, el perfil de Luna se enriquece. La app deja de ser "para emergencias" y se convierte en "consultora habitual". Friction: si las consultas no urgentes reciben respuestas mediocres, se rompe el hábito. Hay que clavar también el caso ORIENTATIVO.

**Advocacy (mes 2-3+).** Marta lo recomienda a una amiga con perro. Comparte una historia en stories. Si Tranqui ofrece una mecánica de "invita a una amiga, X días gratis" puede acelerarse — pero solo después de que ya hay un grupo de usuarias enganchadas que tienen historia que contar. Friction de advocacy: si la marca no tiene un nombre que se recuerde y un mensaje que se transmita en una frase, no se viraliza.

-----

## 3. Product Strategy

### Product Principles

**El triage es el producto, todo lo demás es accesorio.** El SKILL clínico estructurado (URGENTE / PREFERENTE / ORIENTATIVO) es lo que distingue a Tranqui de un agente IA generalista. Todas las decisiones de inversión de tiempo y prompt engineering se evalúan contra: ¿esto mejora la calidad del triage?

**La urgencia siempre rompe el paywall.** Si una consulta cualquiera (gratis, en trial, sin login) es URGENTE, Tranqui muestra la información completa y derivación inmediata sin pedir nada a cambio. Esa decisión cuesta unos cuantos euros perdidos y vale toda la confianza del mundo.

**El veterinario humano gana visibilidad cuando aporta más.** Tranqui no oculta que detrás hay vets humanos; al contrario, los presenta como héroes. Cada videoconsulta termina con "ahora ya sabes lo que dice Tranqui Y lo que dice un veterinario colegiado." Esa sinergia es el corazón del modelo.

**Lenguaje probabilístico, nunca diagnóstico.** "Lo más probable es", "se parece a", "podría ser" — siempre. Esa precisión protege legalmente y, paradójicamente, refuerza confianza. Una IA que dice "es exactamente esto" pierde toda credibilidad cuando se equivoca una vez. Una IA que da rangos de probabilidad acumula confianza incluso cuando se equivoca puntualmente.

**Cada interacción debe poder llegar al momento mágico.** Si el flujo no puede entregar el "me ahorré 100€ y dormí tranquila" en menos de 3 minutos, está mal diseñado. Toda fricción innecesaria es enemiga.

**Coste por consulta visible, siempre.** El equipo (Manuel inicialmente) debe ver el coste medio de LLM por consulta cada semana. Si sube por encima de 0,03€, antes de optimizar producto se optimiza prompt. Es una decisión cultural: el unit economics manda.

### Market Differentiation

Tranqui se sitúa en una categoría que hoy no existe en español: telemedicina veterinaria con triage IA primero. Las telemedicinas tradicionales (Barkibu, Pawp, Vetster) construyen su propuesta sobre "te conectamos con un vet humano" — la IA aparece, si acaso, como un enrutador de chat. Tranqui invierte el modelo: la IA es el primer punto de contacto, resuelve la mayoría de los casos, y reserva el tiempo del veterinario humano para los pocos donde aporta valor real.

La consecuencia económica de esa inversión es brutal. Si Barkibu necesita pagar a un vet humano por cada consulta, su coste marginal por usuario es alto y su modelo de unit economics requiere precios de 14-20€/mes. Tranqui paga ~0,02€ a un LLM por la mayoría de consultas y solo paga (vía comisión sobre el ticket de la videoconsulta) cuando el caso lo requiere. Eso permite ofrecer la suscripción base más barata o, alternativamente, mantener el precio y ganar mejor margen — la opción que se elija depende de elasticidad de demanda.

La consecuencia experiencial es igual de fuerte. Marta no quiere esperar a que un humano le conteste a las 23:00 — quiere una respuesta ahora. Tranqui se la da. Y si la respuesta requiere humano, llega más rápido y mejor preparado: el vet aliado recibe el caso con perfil de mascota, anamnesis ya hecha, y nivel de urgencia clasificado. Eso le permite resolver en 20 minutos lo que normalmente tomaría 30-40.

La defensibilidad del moat tiene tres capas: el SKILL clínico (que se va refinando con cada conversación real), la red de veterinarios aliados (que crece con efectos de escala — más usuarios = más casos para cada vet = más atractivo unirse), y la marca (Tranqui como categoría mental para "primer punto de contacto digital antes de ir al vet"). Las tres se refuerzan.

### Magic Moment Design

El momento mágico de Tranqui es: **"Marta resuelve una preocupación nocturna por su mascota en menos de 3 minutos, sin moverse de casa, sin gastarse 100€, y se siente en control."**

Para que ese momento ocurra de forma fiable, el producto debe garantizar:

**Acceso instantáneo desde cero fricción.** La home pública debe permitir empezar una consulta sin login (con un wall suave hacia el final si quieres guardar histórico). Si el primer paso requiere registro, perdemos la primera consulta — y la primera consulta es donde se gana o se pierde la suscripción.

**Streaming visible de la respuesta.** El agente empieza a responder en menos de 2 segundos desde que el usuario manda el mensaje. Aunque la respuesta completa tarde 8-12 segundos, el usuario ve texto apareciendo desde el segundo 2 — esa percepción de "está pensando" mantiene la atención y baja la ansiedad.

**Anamnesis estructurada pero conversacional.** Las 3-5 preguntas dirigidas tienen que sentirse como una conversación, no como un formulario. El agente refleja lo que ya ha entendido ("ya me has contado que Luna se rasca la oreja derecha; ahora dime…") para que el usuario sienta progreso.

**Análisis claro y accionable.** La respuesta final tiene tres partes visibles: (1) causas posibles ordenadas con probabilidad relativa, (2) qué hacer ahora — concreto, paso a paso, (3) nivel de urgencia con código de color. Sin esas tres partes, no hay momento mágico.

**Botón de derivación visible cuando aplica.** Si el caso es PREFERENTE o URGENTE, el botón "reservar veterinario" debe estar en pantalla. Si es ORIENTATIVO, el botón "consultar igualmente con un vet" puede estar como secundario, sin presionar.

**Cierre con captura de retención.** Tras el primer momento mágico (gratis o trial), la app pregunta: "¿Te ayudó?" y, si sí, ofrece guardar el perfil de Luna y el histórico. Esa captura es donde el trial se convierte en suscripción.

El momento mágico es alcanzable en el MVP — el SKILL clínico ya cubre la profundidad necesaria. La pieza más delicada es el copy y el ritmo de la conversación, que requiere iteración real con usuarios en mes 1.

### MVP Definition

**En scope para v1 (lanzable en 6-10 semanas):**

**Consulta sintomática 24/7 con anamnesis dirigida.** El agente IA atiende al usuario, hace 3-5 preguntas según sistema (basado en el SKILL.md), y devuelve análisis. "Hecho" significa: 95% de las consultas reciben una respuesta coherente y procesable, sin alucinaciones graves; el SKILL ha sido revisado por la asesora clínica.

**Triage clínico en 3 niveles con derivación condicional.** Cada respuesta del agente termina con un nivel claro (URGENTE / PREFERENTE / ORIENTATIVO). Para los dos primeros niveles, aparece un botón visible para reservar videoconsulta. "Hecho" significa: el nivel se asigna correctamente en el 90%+ de los casos auditados.

**Perfil persistente por mascota.** Tras la primera consulta, el usuario puede guardar a su mascota (especie, raza, edad, sexo, esterilizada, alergias conocidas). Las consultas posteriores arrancan desde ese contexto. "Hecho" significa: el agente referencia datos del perfil en su anamnesis ("dado que Luna es beagle…").

**Reserva de videoconsulta de 20 min con vet aliado.** Pantalla de calendario con disponibilidad de los vets aliados. El usuario reserva, recibe email de confirmación, y entra a una videollamada en navegador a la hora pactada. El veterinario recibe el caso con perfil + anamnesis + análisis del agente pre-cargados. "Hecho" significa: las reservas funcionan sin asistencia manual y el vet recibe el contexto.

**Suscripción + tier gratis limitado.** 3 consultas IA gratis para usuarios sin pagar; después, suscripción mensual a 9,99€ con consultas IA ilimitadas + 1 videoconsulta vet incluida al mes. Las videoconsultas extra a 25€. Polar gestiona el cobro recurrente. "Hecho" significa: el flujo de pago funciona end-to-end y la primera persona externa a Manuel se suscribe.

**Disclaimer médico-legal visible.** Cada conversación arranca con un disclaimer corto y claro. Cada respuesta del agente lleva un footer con el recordatorio. "Hecho" significa: revisado por un asesor legal (incluso pro-bono o un solo founder veterinario que conozca regulación).

### Explicitly Out of Scope

**Subida de fotos del síntoma.** Tentación: muchas otitis, problemas de piel y heridas son más fáciles de diagnosticar con imagen. Realidad: la moderación de imágenes (privacidad, contenido inapropiado), el coste de modelos multimodales, y la complejidad de UX añaden 3-4 semanas al MVP. Diferir a v2 (mes 4-6 si hay tracción).

**Subida o transcripción de audio.** Tentación: a las 23:00 el usuario quiere hablar, no teclear. Realidad: añade complejidad de audio + transcripción, y el primer caso de uso (texto) es perfectamente válido. Diferir a v2.

**App nativa (iOS/Android).** Tentación: tener un icono en la pantalla de inicio del móvil. Realidad: añade meses de App Store reviews + costes de desarrollo dual. La PWA cubre 95% del valor. Diferir hasta tener señales claras de retención que justifiquen el coste (mes 6+).

**Recordatorios proactivos (vacunas, antiparasitarios).** Tentación: usar Tranqui como CRM de salud de la mascota. Realidad: requiere construir un calendario clínico genérico y sistema de notificaciones. Es un punto de retención fuerte pero no es el corazón del producto. Diferir a v2.

**Marketplace de productos recomendados.** Tentación: cuando el agente recomienda una crema o un antiparasitario, vincularla con un click a una compra. Realidad: añade complejidad legal (recomendación de productos) + integración con marketplaces. Diferir a v3 — solo cuando haya volumen que justifique las negociaciones con marcas.

**Soporte multi-idioma más allá de español.** Tentación: lanzar también en inglés o portugués para abrir más mercado. Realidad: el producto es de habla hispana primero, español de España específicamente (modismos, regulación, marca). Diferir hasta el lanzamiento del segundo país (mes 9-12).

**Personalización del agente (varios "veterinarios virtuales").** Tentación: dar al usuario varias personalidades para elegir. Realidad: dispersa la marca y multiplica el coste de mantenimiento del SKILL. Mantener un solo agente coherente.

**Modo "premium" con respuestas más detalladas.** Tentación: sacar más ARPU vendiendo un tier "Pro" con análisis más profundos. Realidad: rompe la promesa de honestidad clínica ("¿por qué no me das la mejor respuesta directamente?"). Mantener una sola calidad de respuesta para todos los suscriptores.

### Feature Priority (MoSCoW)

**Must Have (v1, semanas 1-10).** Consulta sintomática conversacional con SKILL.md cargado; triage en 3 niveles; perfil persistente por mascota; reserva de videoconsulta con vet aliado; sistema de cobro recurrente (Polar); disclaimer médico-legal; landing pública mobile-first; auth (Clerk) con login social; histórico de consultas accesible al usuario.

**Should Have (v1.1-1.2, semanas 11-16).** Pantalla de gestión de suscripción y facturación; modo "compartir cuenta familiar" con perfiles compartidos entre miembros del hogar; resumen post-consulta para compartir con vet de cabecera por email/PDF; copy onboarding cuidado para reducir tiempo a primer momento mágico; analytics básico (cohortes de retención, % de derivaciones, NPS).

**Could Have (v2, mes 4-6).** Subida de fotos del síntoma con análisis multimodal; recordatorios proactivos básicos (vacunas, antiparasitarios) opcionales; modo voz/dictado de texto; notificaciones push de la PWA; programa de referidos con incentivo; panel de control para veterinarios aliados (estadísticas de sus videoconsultas, reviews).

**Won't Have (no v1, no v2).** App nativa iOS/Android; marketplace de productos físicos integrado; tier "Pro" con respuestas premium; soporte multi-idioma; veterinarios virtuales personalizados; chat en vivo con humanos como sustituto del agente IA.

### Core User Flows

**Flujo 1: Primera consulta (usuario nuevo).**
*Trigger:* Marta llega a la landing tras anuncio o recomendación.
*Pasos:* Click en "Empezar consulta gratis" → mini-formulario de mascota (3 campos: nombre, especie, edad) → pregunta abierta "¿qué te preocupa hoy?" → 3-5 preguntas de anamnesis dirigida → análisis con causas + recomendaciones + nivel de urgencia → CTA "guardar perfil y crear cuenta para acceder al histórico" o "reservar vet aliado" si aplica.
*Outcome:* Marta sale con respuesta + sentimiento de "esto me ha valido."
*Success criteria:* >40% de quienes empiezan completan la consulta; >25% de quienes completan crean cuenta; >5% se suscriben dentro de 7 días.

**Flujo 2: Consulta recurrente (usuario suscrito).**
*Trigger:* Marta abre Tranqui ante un nuevo síntoma de Luna.
*Pasos:* Login → home con tarjeta de Luna y CTA "nueva consulta sobre Luna" → pregunta abierta → anamnesis (más corta que el flujo nuevo, porque el perfil ya está cargado) → análisis con referencia al histórico ("la última consulta fue hace 10 días por X — ¿está relacionado?").
*Outcome:* Resolución rápida + acumulación de historial.
*Success criteria:* >60% de los suscriptores activos tienen ≥2 consultas/mes; tiempo medio de consulta <3 minutos.

**Flujo 3: Derivación a veterinario aliado.**
*Trigger:* El agente clasifica el caso como PREFERENTE o URGENTE y el usuario hace click en "reservar".
*Pasos:* Pantalla con vets disponibles + slots → selección → confirmación de cobro (incluido en el plan o pago extra de 25€) → email con link de videollamada y resumen del caso → en la hora acordada, sala de videollamada con el contexto del caso visible para el vet → tras la consulta, resumen escrito del vet enviado por email.
*Outcome:* Marta tiene atención profesional el mismo día sin moverse de casa.
*Success criteria:* >90% de las videoconsultas se completan en la primera reserva; NPS post-consulta ≥60; tasa de cancelación <10%.

### Success Metrics

**Métrica primaria — la única que importa más:** Suscriptores activos (NPS ≥60). En 90 días: 100-150. En 6 meses: 1.000-1.500. Esa métrica reúne adquisición, conversión, retención y satisfacción en un solo número.

**Métricas secundarias.** Tasa de conversión free → paid en 7 días (target ≥5%); churn mensual (target <10%); coste medio LLM por consulta (target <0,03€); tasa de derivación apropiada (target ≥85% revisada por asesora clínica); tasa de reserva de videoconsulta entre quienes la ven ofrecida (target ≥30%); CAC orgánico (target <30€).

**Leading indicators (señales tempranas que predicen la métrica primaria).** Tiempo a primer momento mágico (<3 min); número de consultas por suscriptor activo al mes (target ≥2); % de suscriptores que crean perfil completo de mascota (target ≥80%); % de suscriptores que recomiendan a una amiga en 60 días (target ≥15%).

**Umbrales "bueno" vs "excelente" para 90 días.** Bueno: 80 suscriptores, 8% churn, NPS 50. Excelente: 150 suscriptores, 5% churn, NPS 65. Por debajo de bueno, hay que reconsiderar producto o GTM antes de invertir más.

### Risks

**Riesgo regulatorio (probabilidad media, impacto alto).** En España la práctica veterinaria está regulada y "diagnosticar" sin colegiación es ilegal. Tranqui se mueve en la línea fina entre "orientación" y "diagnóstico". Mitigación: lenguaje probabilístico estricto, disclaimer en cada interacción, asesoría legal antes de lanzar, derivación clara a vet humano cuando hay duda. Auditar copy mensualmente.

**Riesgo de calidad clínica (probabilidad media-alta, impacto crítico).** Una alucinación grave del LLM (ej. minimizar una urgencia real) puede causar daño al animal y daño irreparable a la marca. Mitigación: SKILL clínico revisado, prompts estrictos, evaluación de las primeras 200 consultas por la asesora clínica, mecanismo de "reportar respuesta incorrecta" visible siempre.

**Riesgo de unit economics (probabilidad media, impacto alto).** Si el coste medio LLM por consulta supera 0,05€ y los suscriptores hacen muchas consultas, el modelo de 9,99€ se rompe. Mitigación: monitorizar coste por consulta semanalmente; si sube, optimizar prompt/modelo (Sonnet → Haiku para casos sencillos), o introducir tier superior; revisar precio si hace falta.

**Riesgo de adquisición de veterinarios aliados (probabilidad media, impacto alto).** Si no se consigue una red mínima de 3-5 vets en los primeros 3 meses, el modelo de derivación falla. Mitigación: empezar por la red personal (asesora clínica + sus colegas), ofrecer condiciones generosas en los primeros 6 meses (% mayor de la tarifa), tener un protocolo claro de derivación (qué espera el vet recibir).

**Riesgo de churn por momento mágico no clavado (probabilidad media-alta, impacto alto).** Si las primeras 1-2 consultas de un suscriptor son mediocres, churn al 1er mes es alto. Mitigación: priorizar SKILL clínico, copy y experiencia de respuesta antes que features; iterar onboarding semanalmente con feedback real.

**Riesgo competitivo (probabilidad baja-media a 12 meses, alta a 24 meses).** Barkibu o un nuevo entrante con financiación podría replicar el modelo IA + vet humano. Mitigación: velocidad de iteración + marca + acumulación de datos de consultas (mejora SKILL con el tiempo). Construir marca defendible más rápido que la copia.

**Riesgo de quemar runway personal (probabilidad media, impacto alto).** Manuel sin trabajo, presupuesto ajustado. Si en 6 meses no hay tracción suficiente para volverse sostenible o cerrar ronda, hay que volver al mercado laboral. Mitigación: hitos claros a 90 / 180 días; conversaciones de inversión empezadas en mes 4; opción de plan B (volver al mercado laboral con Tranqui como side project) sin estigma.

**Riesgo de "founder = único punto de fallo".** Si Manuel se quema o se va, no hay quien continúe. Mitigación: documentar todo desde el día 1 (vision, prd, roadmap, decisiones); validar que la asesora clínica pueda asumir parte del trabajo si fuera necesario; plantear contratación temprana cuando haya cash flow.

-----

## 4. Brand Strategy

### Positioning Statement

**Para dueños urbanos de perros y gatos** que se angustian cuando algo no va bien con su mascota y no saben si ir al veterinario o esperar, **Tranqui es el asistente veterinario digital** que les da una respuesta clara en 3 minutos y, si hace falta, les conecta con un veterinario aliado el mismo día. **A diferencia de Barkibu y otras telemedicinas que arrancan con un humano caro y lento**, Tranqui resuelve la mayoría de las dudas con IA clínica especializada y reserva al humano para los casos que de verdad lo necesitan — más rápido, más barato, y con el animal sin moverse de casa.

### Brand Personality

Tranqui es **una compañera tranquila** — la amiga cercana que casualmente es enfermera o veterinaria. Si fuera una persona, tendría treinta y muchos, vendría de un entorno técnico (ciencias de la salud, biología) pero hablaría sin academicismo. Tutea siempre. No alza la voz; no tiene por qué. Su autoridad viene de la claridad, no del tono. Se viste con prendas neutras y cómodas — beiges, verde salvia, un punto de coral suave; no se viste de bata blanca porque no necesita el atrezzo de la autoridad.

En una conversación tensa, te mira a los ojos y te dice "vamos a calmarnos un momento, vamos paso a paso." En una conversación trivial, sabe escuchar sin que se note el reloj. Cuando algo es urgente, lo dice directamente: "esto no puede esperar, ve ahora a urgencias." Cuando algo es leve, también lo dice, sin minimizar las emociones de quien le pregunta: "respira, esto es probablemente esto, mira esto, vuelve a hablarme si pasa X."

Lo que **nunca** haría: ponerte un emoji al lado de una urgencia médica. Hacer chistes sobre tu mascota. Decirte "todo va a estar bien" cuando no puede saberlo. Vestirse con frases motivacionales tipo "tu mascota es lo más importante." Venderte algo en mitad de una preocupación. Mandarte a un humano sin antes intentar ayudarte ella.

### Voice & Tone Guide

**Voz constante.** Cálida, clara, fiable, empática, sobria. Tutea siempre. Llama a la mascota por su nombre cuando se sabe. No usa jerga clínica innecesaria; cuando la usa, la explica. Lenguaje probabilístico ("es probable que", "lo más frecuente sería") nunca diagnóstico ("tu perro tiene"). Frases cortas, no enrevesadas.

**Modulación por contexto:**

| Contexto | DO ✓ | DON'T ✗ |
|---|---|---|
| Onboarding | "Hola, soy Tranqui. Para ayudarte mejor, cuéntame quién es tu peludo." | "¡Bienvenido! 🎉 Estamos emocionados de tenerte aquí." |
| Pregunta de anamnesis | "Para entenderlo mejor: ¿el rascado es solo en una oreja o en las dos?" | "Necesito que respondas la siguiente pregunta para continuar." |
| Triage ORIENTATIVO | "Buenas noticias — por lo que describes, lo de Luna parece leve. Te dejo qué mirar y cuándo volver a contactar." | "No es nada, no te preocupes." |
| Triage PREFERENTE | "Esto puede esperar 24-48h pero merece una mirada profesional. ¿Te reservo videoconsulta con un veterinario hoy?" | "Tienes que ir al veterinario obligatoriamente." |
| Triage URGENTE | "Esto necesita atención inmediata. Ve ahora a urgencias o llama a tu veterinario. Si quieres, te ayudo a localizar la clínica más cercana." | "🚨 Algo va mal, intenta calmarte." |
| Empty state | "Aquí aparecerán las consultas que vayas haciendo sobre Luna." | "No hay nada por aquí todavía." |
| Error genérico | "Algo no salió bien. Vuelve a intentarlo en un momento; si sigue fallando, escríbenos a hola@tranqui.app." | "Error 500. Inténtelo de nuevo más tarde." |
| CTA suscripción | "Resuelve tus dudas siempre que las tengas, las 24h del día. 9,99€/mes." | "¡Suscríbete YA y aprovecha la oferta!" |
| Confirmación de pago | "Listo. Estás suscrito a Tranqui — Luna y tú podéis consultarme cuando queráis." | "¡Felicidades por tu compra!" |
| Cancelación | "Lo siento. ¿Puedes contarnos qué falló para mejorar? Tu suscripción seguirá activa hasta el [fecha]." | "Lamentamos verte partir. 😢" |

### Messaging Framework

**Tagline candidato.** *"Tranquilidad para ti. Bienestar para tu mascota."*

**Headlines de homepage candidatos.**
- *"Tu asistente veterinario, las 24 horas."*
- *"Respuestas claras antes de ir al veterinario."*
- *"Cuida a Luna sin angustiarte por cada estornudo."* (con personalización de nombre si se llega ahí)

**Value propositions (3).**
*Tranquilidad inmediata.* "Cuando tu mascota te preocupa, tienes una respuesta clara en menos de 3 minutos — sin esperas, sin foros contradictorios, sin pánico."
*Ahorro consciente.* "Evita las visitas al veterinario que no necesitas. Cuando sí hace falta, te conectamos con un profesional el mismo día."
*Cuidado continuo.* "Tu mascota tiene un perfil que aprende contigo. Cada consulta es más rápida y más útil que la anterior."

**Feature descriptions (cómo se cuenta cada feature en copy externo):**
- Triage IA: "Diagnóstico orientativo en 3 niveles: cuándo correr, cuándo agendar, cuándo observar."
- Videoconsulta: "20 minutos con un veterinario colegiado, sin moverte de casa, con el caso ya preparado."
- Perfil persistente: "Luna y los suyos, recordados — alergias, raza, edad, historial. Sin repetir nunca."

**Objection handlers.**
*"¿Y si la IA se equivoca?"* — "Tranqui usa lenguaje probabilístico y siempre marca el nivel de urgencia. Cuando tiene la más mínima duda, te deriva a un veterinario humano. Y el SKILL clínico está revisado por veterinarios colegiados."
*"¿Por qué pagar si Google es gratis?"* — "Google te da 100 respuestas distintas y muchas alarmistas. Tranqui te da una respuesta estructurada, con triage clínico, y un humano detrás cuando hace falta. Por menos de lo que cuesta una visita al vet."
*"Mi vet ya me responde por WhatsApp."* — "Genial — sigue contándole con él. Tranqui es para el momento en que no responde, o para evitar molestar por dudas pequeñas que tampoco quieres callar."
*"¿Sois vosotros vets?"* — "No. Somos una herramienta de orientación que conecta con vets colegiados. Nuestro trabajo es hacer que tu visita al veterinario llegue en el momento justo y mejor preparada."

### Elevator Pitches

**5 segundos.** *"Tranqui es tu asistente veterinario IA 24/7 con vet humano cuando hace falta."*

**30 segundos.** *"Tranqui es la app que resuelve la mayoría de tus dudas sobre la salud de tu perro o gato en menos de 3 minutos, sin que tengas que ir al veterinario por cada cosa. Cuando sí hace falta un profesional, te conectamos por videollamada con un veterinario aliado el mismo día. Por 9,99€/mes te quitas la angustia de las 23:00 y dejas de pagar visitas innecesarias."*

**2 minutos.** *"Soy dueño de dos perros, y como cualquier dueño, cada vez que algo no va bien me toca elegir entre dos malas opciones: googlear y aterrorizarme con foros catastrofistas, o cargar al perro al coche y pagar 100€ por una consulta que muchas veces termina en 'no es nada, observa.' Eso me pasa, según mis cálculos, unas 6 veces al año. Multiplicado por millones de dueños en España, hablamos de cientos de millones de euros gastados en visitas evitables y de muchísima ansiedad mal gestionada.*

*Tranqui resuelve eso. Es un asistente veterinario basado en IA, con un protocolo de triage clínico estructurado en tres niveles — urgente, preferente, orientativo — que resuelve al instante el 70-80% de las consultas habituales. Para el 20-30% restante, te conecta con un veterinario aliado de nuestra red por videollamada en el mismo día, ya con el contexto de tu mascota y el análisis del caso pre-cargados.*

*La diferencia con telemedicinas como Barkibu es que ellos arrancan con un humano caro y lento. Nosotros arrancamos con una IA rápida y barata, y reservamos al humano para cuando aporta valor. Eso nos permite ofrecer una suscripción a 9,99€/mes — la mitad que la competencia — y tener mejores unit economics. La defensibilidad viene de tres capas: el SKILL clínico estructurado que se mejora con cada consulta, la red de veterinarios aliados que crece con efectos de escala, y la marca como categoría mental.*

*Estoy construyendo Tranqui en solitario, con asesoría clínica de mi pareja que es veterinaria, y con un coding agent. El plan a 90 días es llegar a 100-150 suscriptores y validar el SKILL con casos reales. A 6 meses, 1.000-1.500 suscriptores y conversaciones con inversores ángel. Lo que busco ahora son las primeras Marta — los dueños que tienen este dolor y a quienes Tranqui les puede cambiar el día."*

### Competitive Differentiation Narrative

Las telemedicinas veterinarias actuales están construidas sobre una premisa cara y lenta: cada consulta empieza con un humano. Eso obliga a precios altos (14-20€/mes), tiempos de espera de horas a la primera respuesta, y una experiencia que se siente como una sala de espera virtual. Funciona, pero no quita el miedo de las 23:00.

Tranqui invierte la cadena. La primera línea de respuesta es una IA con criterio clínico estructurado, basada en un protocolo de triage propio que clasifica cada caso en tres niveles. Esa IA resuelve la mayoría de las consultas habituales — picores, vómitos puntuales, dudas de alimentación — en menos de 3 minutos, sin coste marginal humano. Solo cuando el caso lo requiere, derivamos a un veterinario humano de nuestra red, ya con el contexto del caso pre-cargado: el vet llega en el segundo cero del valor, no en el segundo treinta.

La consecuencia económica es decisiva. Nuestra suscripción base puede costar la mitad que Barkibu. Nuestro margen es mejor. Y, lo más importante, el flujo de derivación nos permite atraer a la red de veterinarios aliados con propuestas mejores: 60% de la tarifa, casos pre-filtrados, sin admin. Es un modelo win-win-win — para el dueño, para el vet, y para nosotros.

La defensibilidad tiene tres capas que se refuerzan: el SKILL clínico (mejora con cada conversación), la red de veterinarios aliados (efectos de red — más usuarios = más valor para los vets = más vets se unen), y la marca (Tranqui como reflejo automático antes de "¿llamamos al veterinario?"). Las tres se construyen con tiempo, no con dinero — lo que hace muy difícil que un nuevo entrante con financiación nos copie sin pasar por las mismas etapas.

### Brand Anti-Patterns

**Tono y comunicación.** Nunca minimizar síntomas con "no te preocupes" cuando hay señales reales — es la frase que destroza la confianza. Nunca prescribir medicamentos ni dosis: nuestro rol es orientar, no recetar. Nunca emojis en triage URGENTE — la gravedad pierde peso. Nunca chistes sobre la mascota o la situación; el dueño no está para humor. Nunca decir "todo va a salir bien" cuando no podemos saberlo.

**Visuales.** Nada de stock photos genéricas de perros sonrientes con la lengua fuera — es marca de pienso de supermercado. Nada de paletas saturadas tipo Duolingo — resta autoridad clínica. Nada de íconos médicos cliché (cruces rojas grandes, estetoscopios) — son visualmente fríos. Nada de pantallas de carga con frases tipo "tu mascota es lo más importante" — es cursi. Nada de fotos de gente en bata blanca posando: si mostramos veterinarios, son personas reales, en su consulta o sala, sin posar.

**Producto.** Nunca paywalls duros en momentos de urgencia: si el caso es URGENTE, la información completa se muestra siempre, gratis. Nunca dark patterns en la suscripción: la cancelación es tan fácil como el alta, en una pantalla. Nunca cross-sell durante un triage clínico: el momento de venta nunca es durante una preocupación. Nunca diagnósticos definitivos — siempre lenguaje probabilístico. Nunca presentar al agente IA como "veterinario virtual" — somos asistente, no profesional colegiado.

**Marketing.** Nunca clickbait alarmista tipo "lo que tu perro intenta decirte y nadie te cuenta". Nunca testimonios falsos o de actores. Nunca prometer "diagnóstico" — siempre "orientación". Nunca usar miedo como palanca de conversión ("si no usas Tranqui, tu perro podría…"); el miedo es exactamente la emoción que estamos prometiendo aliviar, y usarla en marketing destruye la promesa.

-----

## 5. Design Direction

### Design Philosophy

**Calidez clínica.** Tranqui no es una clínica fría; es una sala de estar bien iluminada donde te resuelven dudas. Cada decisión visual debe transmitir competencia profesional sin dureza institucional. Si en duda entre "más cálido" y "más profesional", elige cálido — la profesionalidad ya viene de la marca.

**Información sobre decoración.** En cada pantalla, lo más visible debe ser la respuesta a la pregunta del usuario. Las ilustraciones, los iconos y los micro-detalles existen para guiar la atención, no para impresionar. Si una decoración no aporta a la jerarquía de información, fuera.

**Ritmo respirado, nunca denso.** El usuario llega ansioso. La densidad visual amplifica la ansiedad. Más whitespace, más párrafos cortos, más respiraciones entre acciones. Mejor que la primera consulta sea levemente lenta y serena que rápida y abrumadora.

**Emoción modulada por contexto.** Los componentes cambian sutilmente según el nivel de urgencia. ORIENTATIVO se siente cálido y tranquilo. PREFERENTE introduce un punto de seriedad. URGENTE reduce decoración al mínimo y va al grano. La UI no se viste igual en cada caso.

### Visual Mood

Tranqui se siente como **Notion encontrándose con Headspace** — la claridad estructural y el dominio de la jerarquía tipográfica de Notion, fusionados con la calidez visual y la respiración emocional de Headspace. Hay referencias también a **los emails de Substack** (limpios, jerarquizados, pero cálidos), **Linear** (precisión, pero con un punto más cálido), y **las apps de bienestar contemporáneas** que han aprendido a ser profesionales sin ser frías.

El uso del color es deliberado y silencioso: el beige y el verde salvia no compiten por atención, dejan que el contenido sea el protagonista. El coral aparece solo en momentos de acción primaria — el botón "enviar consulta", el CTA "reservar veterinario". El rojo coral solo aparece en URGENTE; cuando aparece, es la única cosa que importa en la pantalla.

La sensación al abrir Tranqui a las 22:30 angustiada por Luna debe ser inmediatamente: "vale, aquí puedo respirar." No es una promesa, es una experiencia táctil del producto.

### Color Palette

**Primarios (base).**

| Token | Hex | CSS variable | Tailwind | Uso |
|---|---|---|---|---|
| Beige cálido | `#F5F1E8` | `--color-bg-base` | `bg-cream-50` | Fondo de toda la app |
| Crema clara | `#FAF7F0` | `--color-bg-elevated` | `bg-cream-100` | Tarjetas, modales |
| Crema medio | `#EDE7D9` | `--color-bg-muted` | `bg-cream-200` | Inputs en reposo, separadores |

**Secundarios (color de marca).**

| Token | Hex | CSS variable | Tailwind | Uso |
|---|---|---|---|---|
| Verde salvia | `#7A9080` | `--color-brand-primary` | `bg-sage-500` | Logo, headers de sección, ilustración |
| Verde salvia oscuro | `#5C6F62` | `--color-brand-primary-dark` | `bg-sage-700` | Hover de botones secundarios, links activos |
| Verde salvia claro | `#C7D3CB` | `--color-brand-primary-light` | `bg-sage-200` | Backgrounds de hint, badges informativos |

**Acentos (acción).**

| Token | Hex | CSS variable | Tailwind | Uso |
|---|---|---|---|---|
| Coral suave | `#E89B7B` | `--color-accent` | `bg-coral-400` | Botones primarios (CTA principal), links importantes |
| Coral oscuro | `#C77855` | `--color-accent-dark` | `bg-coral-600` | Hover de CTA primario |

**Semánticos (estado).**

| Token | Hex | CSS variable | Tailwind | Uso |
|---|---|---|---|---|
| Verde éxito | `#5A8B6B` | `--color-success` | `bg-emerald-700` | Confirmaciones (pago, reserva exitosa) |
| Ámbar atención | `#D4A04A` | `--color-warning` | `bg-amber-500` | Triage PREFERENTE, avisos |
| Rojo urgencia | `#C9412A` | `--color-danger` | `bg-red-600` | Triage URGENTE, errores graves |
| Azul info | `#6B8AA8` | `--color-info` | `bg-blue-500` | Mensajes informativos, tooltips |

**Texto.**

| Token | Hex | Uso |
|---|---|---|
| Texto principal | `#2C2A26` | Body, títulos |
| Texto secundario | `#6B6862` | Captions, metadata |
| Texto inverso | `#FAF7F0` | Sobre fondos oscuros |

**Modo oscuro.** Versión adaptada con fondos `#1F1D1A` / `#2C2A26`, texto principal `#F5F1E8`, salvia y coral mantenidos pero ligeramente más saturados. Implementación opcional para v1.1 (la mayoría de Marta abrirá en modo claro de día y modo automático del sistema de noche).

### Typography

**Heading & Body — Inter.** Familia humanista contemporánea, gratuita en Google Fonts, neutral pero cálida. Usar pesos 400 (regular), 500 (medium), 600 (semibold). Cargar solo esos tres pesos para mantener el bundle ligero.

**Display opcional — Fraunces o Source Serif Pro.** Para títulos grandes en landing y onboarding (>32px). Solo en superficie de marketing y momentos especiales. No usar en UI funcional.

**Mono — JetBrains Mono o Fira Code.** Para mostrar IDs de consulta, códigos de soporte. Uso muy limitado.

**Escala tipográfica (rem; base = 16px).**

| Nombre | Tamaño | Line-height | Peso típico | Uso |
|---|---|---|---|---|
| Display | 2.5rem (40px) | 1.1 | 600 | Hero homepage |
| H1 | 2rem (32px) | 1.2 | 600 | Títulos de página |
| H2 | 1.5rem (24px) | 1.3 | 600 | Secciones |
| H3 | 1.25rem (20px) | 1.4 | 500 | Sub-secciones |
| Body L | 1.125rem (18px) | 1.6 | 400 | Cuerpo en lectura larga |
| Body | 1rem (16px) | 1.6 | 400 | Body por defecto |
| Body S | 0.875rem (14px) | 1.5 | 400 | Captions, metadata |
| Tiny | 0.75rem (12px) | 1.4 | 500 | Tags, badges |

**CSS variables.** `--font-sans: 'Inter', system-ui, sans-serif;` `--font-display: 'Fraunces', serif;` `--font-mono: 'JetBrains Mono', monospace;`

### Spacing & Layout

**Base unit: 4px.** Escala: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.

**Reglas duras.**
- Mínimo 24px (`space-6`) entre secciones de contenido.
- Mínimo 48px (`space-12`) entre bloques de página/landing.
- Mínimo 16px (`space-4`) entre elementos relacionados dentro de un bloque.
- Touch targets ≥44×44px (recomendación Apple) → padding mínimo en botones.

**Max content width.** 720px para texto en lectura (chat, artículos, FAQ). 1200px para layouts amplios (landing, dashboard de gestión). Centrado con `mx-auto`.

**Grid system.** Móvil: 4 columnas, gutter 16px. Tablet: 8 columnas, gutter 24px. Desktop: 12 columnas, gutter 32px.

**Breakpoints (Tailwind defaults adaptados).** `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`. Diseñar mobile-first; sólo un `lg:` reposiciona elementos a layouts más amplios.

### Component Philosophy

**Border-radius.** Por defecto 12px (`rounded-xl`) para cards, inputs y modales. 9999px (`rounded-full`) para pills, avatars y badges pequeños. 8px (`rounded-lg`) para botones. Nada cuadrado (a la marca le quita calidez).

**Shadows.** Sutiles. Tres niveles: `sm` (`0 1px 2px rgba(0,0,0,0.04)`) para elevación leve, `md` (`0 4px 12px rgba(0,0,0,0.06)`) para tarjetas elevadas y dropdowns, `lg` (`0 12px 32px rgba(0,0,0,0.10)`) para modales. Nunca usar shadows duros tipo material design.

**Borders.** 1px sólido `var(--color-bg-muted)` para separar inputs y secciones cuando shadow no aplica. En foco, borde 2px `var(--color-brand-primary)` con sombra suave.

**Botones.**
- Primario: fondo `--color-accent`, texto blanco, padding 12px 24px, peso 500, radius 8px. Hover: fondo `--color-accent-dark`.
- Secundario: fondo transparente, borde 1px `--color-brand-primary`, texto `--color-brand-primary`, padding igual al primario.
- Ghost: fondo transparente, sin borde, texto `--color-brand-primary`. Para acciones terciarias (cancelar, "ver más").
- Destructivo: fondo `--color-danger`, texto blanco. Uso: cancelar suscripción, eliminar mascota.

**Inputs.** Fondo `--color-bg-muted`, borde 1px transparente, radius 8px, padding 12px 16px. Foco: borde `--color-brand-primary` 2px, fondo `--color-bg-elevated`.

**Cards.** Fondo `--color-bg-elevated`, padding 24px, radius 12px, sombra `sm` por defecto. En hover (si interactiva): sombra `md`.

### Iconography & Imagery

**Estilo de iconos.** Line-style (no filled, no duotone). Stroke 1.5px-2px. Tamaño base 20px en UI funcional, 24-32px en headers. Recomendado: **Lucide Icons** (open-source, perfectamente alineado con la estética humanista). Cargar via `lucide-react`.

**Ilustraciones.** Estilo minimalista line-art con un toque de color en momentos puntuales. Ilustraciones de mascotas con líneas sueltas, sin caricatura excesiva, paleta limitada (salvia + coral suave + crema). Para empty states, onboarding y momentos de marketing. Recomendado: ilustración custom o paquetes como **Storyset**, **unDraw** muy editado.

**Fotografía.** Mínima. Si se usa: fotos auténticas de mascotas reales (idealmente cliente-aportadas en testimonios), iluminación natural, color tratado para encajar con la paleta beige-salvia. Nada de stock.

**Lo que evitamos.** Iconos médicos cliché (cruces, estetoscopios). Mascotas en stock photo con expresiones forzadas. Ilustraciones infantiles tipo Bluey (resta autoridad). 3D rendering. Glitter, partículas, confetti.

### Accessibility Commitments

- **Contraste de color.** Mínimo WCAG AA en todo el producto (4.5:1 para texto regular, 3:1 para texto grande y elementos UI). Validar `--color-accent` (coral) sobre fondo crema con herramienta antes de implementar.
- **Touch targets.** Mínimo 44×44px en móvil para cualquier elemento interactivo.
- **Focus indicators.** Anillo visible (2px outline `--color-brand-primary` + offset 2px) en todos los elementos interactivos. Nunca eliminar el outline sin reemplazo.
- **Screen reader.** Etiquetas semánticas correctas (botones son `<button>`, no `<div>`). `aria-label` en iconos sin texto. `role="alert"` en mensajes de error y triage URGENTE.
- **Tipografía.** Mínimo 16px para body en móvil para que sea legible sin zoom. Soporte de zoom hasta 200% sin romper layout.
- **Reduced motion.** Respetar `prefers-reduced-motion`: animaciones decorativas se eliminan, transiciones funcionales se acortan a 100ms.
- **Idioma.** `lang="es-ES"` declarado en el HTML. Disclaimers traducidos a un español accesible (lectura nivel B1).

### Motion & Interaction

**Duración por defecto.** 200ms para micro-interacciones (hover, focus, ripples). 300ms para transiciones de estado (modal abrir/cerrar, tab switch). 400-500ms para transiciones de página o contenido grande.

**Easing.** `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out estándar) por defecto. `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out enfático) para entradas de elementos importantes.

**Qué animamos.** Apariciones de mensajes nuevos en el chat (fade + slide-up sutil). Cambios de estado en botones (hover, press). Streaming del agente (fade-in cada pocas palabras nuevas). Transiciones de paso en onboarding.

**Qué no animamos.** Decoraciones gratuitas. Iconos rebotando. Loaders elaborados — preferimos un simple spinner o, idealmente, un skeleton state.

**Loading states.** Skeleton screens (forma del contenido en gris suave) para listas y secciones. Spinner sutil en botones que disparan acciones. Nunca pantalla en blanco mientras carga.

**Hover/focus/active.** Hover: leve elevación de sombra + color ligeramente más oscuro. Focus: anillo visible (ver Accessibility). Active: leve scale-down (0.98) + sombra reducida — sensación de "pulsar" físicamente.

### Design Tokens

Tabla consolidada como single source of truth para implementación.

**Color tokens.**

| Token | CSS variable | Tailwind class | Hex |
|---|---|---|---|
| Background base | `--color-bg-base` | `bg-cream-50` | `#F5F1E8` |
| Background elevated | `--color-bg-elevated` | `bg-cream-100` | `#FAF7F0` |
| Background muted | `--color-bg-muted` | `bg-cream-200` | `#EDE7D9` |
| Brand primary | `--color-brand-primary` | `bg-sage-500` | `#7A9080` |
| Brand primary dark | `--color-brand-primary-dark` | `bg-sage-700` | `#5C6F62` |
| Brand primary light | `--color-brand-primary-light` | `bg-sage-200` | `#C7D3CB` |
| Accent | `--color-accent` | `bg-coral-400` | `#E89B7B` |
| Accent dark | `--color-accent-dark` | `bg-coral-600` | `#C77855` |
| Success | `--color-success` | `bg-emerald-700` | `#5A8B6B` |
| Warning | `--color-warning` | `bg-amber-500` | `#D4A04A` |
| Danger | `--color-danger` | `bg-red-600` | `#C9412A` |
| Info | `--color-info` | `bg-blue-500` | `#6B8AA8` |
| Text primary | `--color-text-primary` | `text-stone-900` | `#2C2A26` |
| Text secondary | `--color-text-secondary` | `text-stone-600` | `#6B6862` |
| Text inverse | `--color-text-inverse` | `text-cream-100` | `#FAF7F0` |

**Spacing tokens.** `--space-1: 4px`, `--space-2: 8px`, `--space-3: 12px`, `--space-4: 16px`, `--space-5: 20px`, `--space-6: 24px`, `--space-8: 32px`, `--space-10: 40px`, `--space-12: 48px`, `--space-16: 64px`.

**Radius tokens.** `--radius-sm: 8px`, `--radius-md: 12px`, `--radius-lg: 16px`, `--radius-full: 9999px`.

**Shadow tokens.** `--shadow-sm: 0 1px 2px rgba(0,0,0,0.04)`, `--shadow-md: 0 4px 12px rgba(0,0,0,0.06)`, `--shadow-lg: 0 12px 32px rgba(0,0,0,0.10)`.

**Transition tokens.** `--transition-fast: 200ms cubic-bezier(0.4, 0, 0.2, 1)`, `--transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1)`, `--transition-slow: 500ms cubic-bezier(0.16, 1, 0.3, 1)`.

**Typography tokens.** `--font-sans: 'Inter', system-ui, sans-serif`, `--font-display: 'Fraunces', serif`, `--font-mono: 'JetBrains Mono', monospace`. Tamaños como en la escala (rem) y line-heights asociados.

Estos tokens se reflejan idénticos en `tailwind.config.ts` y en variables CSS globales del proyecto, asegurando una sola fuente de verdad para toda la implementación.
