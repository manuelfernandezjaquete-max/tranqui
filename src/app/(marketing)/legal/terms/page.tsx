import { LegalPage, LegalSection } from "@/components/marketing/LegalPage";

export const metadata = {
  title: "Aviso legal y términos — Tranqui",
};

export default function TermsPage() {
  return (
    <LegalPage title="Aviso legal y términos de uso" lastUpdated="29 de abril de 2026">
      <LegalSection title="1. Identificación del prestador">
        <p>
          El servicio Tranqui (en adelante, &laquo;el Servicio&raquo;) es
          ofrecido por <strong>[Razón social pendiente]</strong>, con domicilio
          en Madrid (España) y correo de contacto{" "}
          <a href="mailto:hola@tranqui.app" className="underline">
            hola@tranqui.app
          </a>
          . Datos registrales y CIF se completarán antes del lanzamiento
          comercial.
        </p>
      </LegalSection>

      <LegalSection title="2. Objeto del servicio">
        <p>
          Tranqui es una aplicación web que ofrece (i) un asistente
          conversacional basado en IA para orientar a personas que conviven con
          perros y gatos sobre síntomas y cambios de comportamiento de sus
          mascotas, y (ii) la posibilidad de reservar videoconsultas con
          veterinarios colegiados de la red Tranqui.
        </p>
        <p>
          Tranqui no diagnostica, no prescribe medicamentos ni sustituye la
          consulta veterinaria presencial. Véase{" "}
          <a href="/legal/disclaimer" className="underline">
            Disclaimer médico
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="3. Cuentas de usuario">
        <p>
          El registro requiere correo electrónico válido. El usuario es
          responsable de mantener la confidencialidad de sus credenciales y de
          toda actividad realizada bajo su cuenta. Tranqui podrá suspender
          cuentas que incumplan estos términos o realicen un uso fraudulento
          del Servicio.
        </p>
      </LegalSection>

      <LegalSection title="4. Suscripción y facturación">
        <p>
          La suscripción mensual tiene un precio de 9,99 € / mes (IVA incluido)
          e incluye una videoconsulta con veterinario por mes natural. Las
          videoconsultas adicionales se facturan a 25 € / consulta. Los precios
          podrán actualizarse con un preaviso mínimo de 30 días por correo
          electrónico.
        </p>
        <p>
          La suscripción se renueva automáticamente cada mes hasta que el
          usuario la cancele desde su panel de ajustes. La cancelación tiene
          efecto al final del periodo facturado en curso.
        </p>
      </LegalSection>

      <LegalSection title="5. Política de reembolsos">
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong>No-show del veterinario:</strong> reembolso íntegro de la
            videoconsulta no celebrada por causa imputable al veterinario.
          </li>
          <li>
            <strong>Cancelación por parte del usuario con más de 2 horas de
            antelación:</strong> la videoconsulta vuelve al cupo mensual
            disponible.
          </li>
          <li>
            <strong>Cancelación con menos de 2 horas o no-show del usuario:</strong>{" "}
            la consulta se considera consumida y no se reembolsa.
          </li>
          <li>
            <strong>Suscripción mensual:</strong> no se reembolsa el periodo en
            curso una vez iniciado, salvo obligación legal.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Conducta del usuario">
        <p>
          El usuario se compromete a usar el Servicio de buena fe, a no
          intentar manipular el asistente para obtener prescripciones de
          medicamentos, dosis o diagnósticos formales, y a no falsear
          información sobre su mascota o sobre supuestas urgencias.
        </p>
      </LegalSection>

      <LegalSection title="7. Propiedad intelectual">
        <p>
          La marca Tranqui, su software, diseño, contenidos y bases de
          conocimiento son titularidad de [Razón social pendiente] o de sus
          licenciantes. Queda prohibida su reproducción, distribución o
          ingeniería inversa sin autorización escrita.
        </p>
      </LegalSection>

      <LegalSection title="8. Limitación de responsabilidad">
        <p>
          Tranqui no se responsabiliza de daños derivados del uso o
          imposibilidad de uso del Servicio, salvo en los casos de dolo o culpa
          grave previstos por la legislación española aplicable. La
          responsabilidad clínica sobre la salud de la mascota recae en el
          usuario y, en su caso, en el veterinario colegiado que la atienda.
        </p>
      </LegalSection>

      <LegalSection title="9. Ley aplicable y jurisdicción">
        <p>
          Estos términos se rigen por la ley española. Para cualquier
          controversia, las partes se someten a los juzgados y tribunales del
          domicilio del consumidor cuando este sea persona física, o a los de
          Madrid (España) en el resto de casos.
        </p>
      </LegalSection>

      <LegalSection title="10. Modificaciones">
        <p>
          Tranqui se reserva el derecho a modificar estos términos. Los
          cambios sustanciales se notificarán por correo electrónico con un
          mínimo de 30 días de antelación.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
