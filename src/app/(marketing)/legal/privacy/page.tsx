import { LegalPage, LegalSection } from "@/components/marketing/LegalPage";

export const metadata = {
  title: "Política de privacidad — Tranqui",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de privacidad" lastUpdated="29 de abril de 2026">
      <LegalSection title="1. Responsable del tratamiento">
        <p>
          <strong>[Razón social pendiente]</strong>, con domicilio en Madrid
          (España), es el responsable del tratamiento de los datos personales
          recogidos a través de Tranqui. Contacto:{" "}
          <a href="mailto:hola@tranqui.app" className="underline">
            hola@tranqui.app
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Datos que recogemos">
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong>Cuenta:</strong> nombre, correo electrónico (gestionado por
            Clerk como proveedor de identidad).
          </li>
          <li>
            <strong>Mascota:</strong> nombre, especie, raza, edad aproximada,
            sexo, alergias o condiciones conocidas.
          </li>
          <li>
            <strong>Consultas:</strong> mensajes que escribes al asistente y
            respuestas generadas, junto con el análisis y nivel de triage
            asignado.
          </li>
          <li>
            <strong>Reservas y videoconsultas:</strong> fecha, hora, vet
            asignado, notas clínicas registradas por el vet.
          </li>
          <li>
            <strong>Pago:</strong> los datos de tarjeta los procesa
            directamente el proveedor de pagos. Tranqui no almacena números de
            tarjeta.
          </li>
          <li>
            <strong>Técnicos:</strong> dirección IP, tipo de dispositivo,
            navegador, eventos de uso para analítica y prevención de fraude.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Finalidades y bases jurídicas">
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong>Prestación del servicio</strong> (ejecución de contrato):
            gestionar tu cuenta, las consultas con el asistente y las reservas
            con veterinarios.
          </li>
          <li>
            <strong>Facturación y obligaciones contables</strong> (obligación
            legal).
          </li>
          <li>
            <strong>Mejora del servicio</strong> (interés legítimo): analítica
            agregada y de-identificada para mejorar las respuestas del
            asistente y la experiencia de uso.
          </li>
          <li>
            <strong>Comunicaciones operativas</strong> (ejecución de contrato):
            confirmaciones de reserva, recordatorios, cambios de servicio.
          </li>
          <li>
            <strong>Comunicaciones comerciales</strong> (consentimiento): solo
            si lo aceptas expresamente al registrarte.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Conservación">
        <p>
          Los datos de cuenta y mascota se conservan mientras la cuenta esté
          activa y hasta 24 meses después de la baja, salvo obligación legal de
          mayor conservación. Los datos de facturación se conservan durante 6
          años (Código de Comercio). Las transcripciones de consulta se
          conservan 36 meses para que puedas consultar tu historial; pasado ese
          periodo se anonimizan.
        </p>
      </LegalSection>

      <LegalSection title="5. Encargados del tratamiento">
        <p>
          Tranqui utiliza proveedores de confianza para operar el servicio:
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong>Clerk</strong> — autenticación e identidad (EE. UU., con
            cláusulas contractuales tipo).
          </li>
          <li>
            <strong>Convex</strong> — base de datos y backend (EE. UU., con
            cláusulas contractuales tipo).
          </li>
          <li>
            <strong>Anthropic</strong> — modelo de IA Claude (EE. UU.,
            procesamiento sin retención por defecto en API).
          </li>
          <li>
            <strong>Daily.co</strong> — videollamadas (EE. UU.).
          </li>
          <li>
            <strong>Resend</strong> — envío de correos transaccionales.
          </li>
          <li>
            <strong>Vercel</strong> — alojamiento del front-end (EE. UU. / UE).
          </li>
          <li>
            <strong>Polar</strong> — procesador de pagos como merchant of
            record.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Transferencias internacionales">
        <p>
          Algunos proveedores procesan datos fuera del Espacio Económico
          Europeo. En todos los casos contamos con garantías adecuadas
          (cláusulas contractuales tipo aprobadas por la Comisión Europea).
        </p>
      </LegalSection>

      <LegalSection title="7. Derechos">
        <p>
          Puedes ejercer en cualquier momento tus derechos de acceso,
          rectificación, supresión, oposición, limitación y portabilidad
          escribiendo a{" "}
          <a href="mailto:hola@tranqui.app" className="underline">
            hola@tranqui.app
          </a>
          . Atenderemos tu solicitud en un plazo máximo de 30 días. Si
          consideras que hemos vulnerado tus derechos, puedes presentar una
          reclamación ante la Agencia Española de Protección de Datos
          (
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            aepd.es
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection title="8. Cookies">
        <p>
          Usamos cookies estrictamente necesarias para mantener tu sesión y
          cookies analíticas para entender el uso del servicio. Puedes ajustar
          tus preferencias desde el banner de cookies en tu primera visita.
        </p>
      </LegalSection>

      <LegalSection title="9. Seguridad">
        <p>
          Aplicamos medidas técnicas y organizativas razonables para proteger
          los datos: cifrado en tránsito (TLS), control de accesos, separación
          de entornos y registro de auditoría. Ningún sistema es infalible; te
          comunicaremos cualquier brecha de seguridad relevante en los plazos
          legales aplicables.
        </p>
      </LegalSection>

      <LegalSection title="10. Cambios">
        <p>
          Esta política puede actualizarse. Los cambios sustanciales se
          notificarán por correo electrónico con al menos 30 días de
          antelación.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
