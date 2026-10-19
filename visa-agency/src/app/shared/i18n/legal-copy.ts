// Legal texts shown on /privacidad, /terminos, /reembolsos and accepted on the WhatsApp and hiring checkboxes.
//
// ⚠️ DRAFT: the client must fill every [BRACKET] and a Mexican lawyer must review before launch.
// Written against: LFPDPPP (DOF 20-03-2025, arts. 7, 8, 9, 15, 24, 31, 34) and LFPC (arts. 7 Bis, 32, 52, 56, 76 Bis, 85, 92 Bis, 92 Ter).
//
// TRACEABILITY: every acceptance stores the document's `version` and a SHA-256 of the exact text shown
// (title + intro + sections). If you change ANY wording, bump `version` (date) so old acceptances keep
// pointing at the text the person actually read; git history keeps every version.

const PROVIDER_ES = '[NOMBRE O RAZÓN SOCIAL], RFC [RFC], con domicilio en [DOMICILIO COMPLETO], México. WhatsApp: +52 646 187 4375. Correo: [CORREO DE CONTACTO].';
const PROVIDER_EN = '[LEGAL NAME OR COMPANY NAME], RFC (tax ID) [RFC], located at [FULL ADDRESS], Mexico. WhatsApp: +52 646 187 4375. Email: [CONTACT EMAIL].';

export const LEGAL_ES = {
  back: 'Volver al inicio',
  updated: 'Versión vigente desde el',
  privacy: {
    version: '2026-10-19',
    title: 'Aviso de privacidad',
    intro: 'Tu información es parte de tu historia, y la cuidamos como tal. Aquí te explicamos qué datos usamos, para qué y cómo puedes controlarlos.',
    sections: [
      { heading: 'Quién es responsable de tus datos', body: [
        `Easytravel Visa es el nombre comercial de ${PROVIDER_ES} Somos responsables del tratamiento de tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.`,
      ] },
      { heading: 'Qué datos tratamos', body: [
        'Cuando nos escribes por WhatsApp: tu nombre, tu número de teléfono y lo que nos compartas en tus mensajes.',
        'Si contratas una asesoría: datos de identificación y contacto, historial laboral, académico, familiar y de viajes, y los datos patrimoniales o financieros que tu solicitud requiera (por ejemplo, ingresos, empleo o bienes). Para los datos patrimoniales o financieros te pedimos tu consentimiento expreso.',
        'Datos sensibles: el formulario DS-160 incluye preguntas que pueden revelar datos sensibles, como información de salud. Solo los tratamos si tú decides compartirlos para tu solicitud y con tu consentimiento expreso y por escrito.',
        'Cuando aceptas nuestros documentos guardamos una constancia: la fecha y hora, tu dirección IP, tu navegador y la versión del documento que aceptaste.',
      ] },
      { heading: 'Para qué los usamos', body: [
        'Finalidades necesarias para la relación contigo (no requieren un consentimiento adicional): responder tus preguntas, prestarte la asesoría que contrates, prepararte para tu entrevista, emitir tu factura, cumplir nuestras obligaciones legales y conservar la constancia de lo que aceptaste.',
        'Finalidades adicionales: ninguna. No usamos tus datos para publicidad, no hacemos perfiles y no vendemos tu información.',
      ] },
      { heading: 'Con quién los compartimos', body: [
        'No transferimos tus datos a terceros sin tu consentimiento, salvo en los casos que la ley permite, como el requerimiento de una autoridad competente.',
        'La información de tu solicitud de visa se captura en los sistemas oficiales del gobierno de Estados Unidos solo con tu autorización y para el trámite que tú solicitas.',
        'Nuestros proveedores de alojamiento y almacenamiento tratan los datos únicamente por nuestra cuenta y bajo nuestras instrucciones.',
      ] },
      { heading: 'Cómo limitar el uso de tus datos', body: [
        'Puedes pedirnos en cualquier momento que limitemos el uso o la divulgación de tus datos escribiendo a [CORREO DE CONTACTO]. Si no quieres recibir mensajes nuestros, dínoslo por el mismo medio o por WhatsApp y dejaremos de enviarlos.',
      ] },
      { heading: 'Tus derechos ARCO y cómo revocar tu consentimiento', body: [
        'Tienes derecho a acceder a tus datos, rectificarlos, cancelarlos u oponerte a su uso (derechos ARCO), y a revocar tu consentimiento. Escríbenos a [CORREO DE CONTACTO] indicando tu nombre, un medio para responderte, el derecho que quieres ejercer y los datos a los que se refiere, y adjunta una identificación oficial (o la de tu representante legal y el documento que lo acredite).',
        'Te comunicaremos nuestra respuesta en un máximo de veinte días desde que recibamos tu solicitud y, si procede, la haremos efectiva dentro de los quince días siguientes. Ejercer estos derechos es gratuito; solo podrían cobrarse costos de reproducción o envío.',
      ] },
      { heading: 'Cuánto tiempo los conservamos', body: [
        'Conservamos tus datos mientras dure la relación contigo y, después, solo durante el plazo que las leyes exigen o para atender posibles responsabilidades. Al terminar ese plazo los bloqueamos y los suprimimos.',
      ] },
      { heading: 'Cómo protegemos tus datos', body: [
        'El sitio funciona solo con conexión cifrada (HTTPS). El acceso a la información de los clientes está restringido al personal autorizado, las contraseñas se guardan cifradas y las constancias de aceptación no pueden modificarse.',
      ] },
      { heading: 'Lo que guarda tu navegador', body: [
        'No usamos cookies de rastreo ni de publicidad. Tu navegador guarda el idioma que elegiste y, si aceptas nuestros documentos antes de escribirnos por WhatsApp, un identificador aleatorio y la versión que aceptaste, para no volver a preguntarte. Puedes borrarlos desde la configuración de tu navegador.',
      ] },
      { heading: 'Cambios a este aviso', body: [
        'Publicaremos cualquier cambio en esta página con su nueva fecha de vigencia. Si ya eres cliente, también te lo avisaremos por WhatsApp o correo.',
        'Si consideras que tus derechos no fueron atendidos, puedes acudir a la Secretaría Anticorrupción y Buen Gobierno, autoridad en materia de protección de datos personales.',
      ] },
    ],
  },
  terms: {
    version: '2026-10-19',
    title: 'Términos y condiciones',
    intro: 'Preferimos que sepas desde el principio cómo trabajamos y qué podemos y no podemos hacer por ti.',
    sections: [
      { heading: 'Quiénes somos', body: [
        `Easytravel Visa es el nombre comercial de ${PROVIDER_ES}`,
        'Somos una agencia privada de asesoría. No somos una entidad del gobierno de Estados Unidos y no tenemos relación con la Embajada ni con los consulados.',
      ] },
      { heading: 'Nuestro servicio', body: [
        'Te orientamos para llenar el formulario DS-160, reunir tus documentos y prepararte para tu entrevista. Antes de empezar firmamos un contrato por escrito con el alcance del servicio, el precio y la forma de pago, y te entregamos una copia.',
      ] },
      { heading: 'Nadie puede garantizar una visa', body: [
        'La decisión de otorgar o negar una visa le corresponde únicamente al oficial consular. Ninguna agencia puede garantizarte una visa, conseguirte citas preferentes ni influir en el resultado, y nosotros tampoco.',
      ] },
      { heading: 'Precios y pagos', body: [
        'Antes de contratar te informamos el precio total de nuestros honorarios en pesos mexicanos, con IVA y cualquier otro cargo incluidos.',
        'El derecho de solicitud de visa se paga directamente al gobierno de Estados Unidos, es distinto de nuestros honorarios y el gobierno no lo reembolsa.',
      ] },
      { heading: 'Cancelaciones y reembolsos', body: [
        'Puedes cancelar sin costo dentro de los cinco días hábiles siguientes a la firma del contrato, con las condiciones que explica nuestra Política de cancelación y reembolsos, que forma parte de estos términos.',
      ] },
      { heading: 'Tu parte', body: [
        'La información que nos des y la que se envíe en tu solicitud debe ser verdadera y completa. Dar información falsa al gobierno de Estados Unidos puede hacer que te nieguen la visa de forma permanente. Antes de enviar tu solicitud, tú la revisas y la confirmas.',
      ] },
      { heading: 'Uso de este sitio', body: [
        'El contenido de este sitio es informativo. No es asesoría legal y no sustituye la opinión de un abogado de inmigración.',
      ] },
      { heading: 'Dudas, quejas y PROFECO', body: [
        'Para cualquier aclaración o queja escríbenos por WhatsApp al +52 646 187 4375 o a [CORREO DE CONTACTO], o visítanos en [DOMICILIO COMPLETO].',
        'También puedes acudir a la Procuraduría Federal del Consumidor (PROFECO), que es competente en la vía administrativa para resolver controversias sobre estos términos.',
      ] },
      { heading: 'Ley aplicable', body: [
        'Estos términos se rigen por las leyes de México. Para cualquier controversia, además de PROFECO, serán competentes los tribunales de [CIUDAD Y ESTADO].',
      ] },
      { heading: 'Cambios', body: [
        'Podemos actualizar estos términos. Cada versión se publica en esta página con su fecha de vigencia, y tu contrato se rige por la versión que aceptaste.',
      ] },
    ],
  },
  refund: {
    version: '2026-10-19',
    title: 'Política de cancelación y reembolsos',
    intro: 'Queremos que contrates con tranquilidad. Estas son tus opciones si cambias de opinión o si algo no sale como acordamos.',
    sections: [
      { heading: 'Cinco días hábiles para cancelar sin costo', body: [
        'Si contratas fuera de nuestra oficina (por WhatsApp, por internet o en tu domicilio), puedes cancelar sin ninguna responsabilidad dentro de los cinco días hábiles siguientes a la firma del contrato, y te devolvemos el total pagado.',
        'Esto no aplica cuando la fecha del servicio (por ejemplo, tu sesión de preparación) está a diez días hábiles o menos de la fecha en que lo contrataste.',
        'Para cancelar basta un aviso por WhatsApp, por correo o por cualquier otro medio que deje constancia.',
      ] },
      { heading: 'Si cancelas después de ese plazo', body: [
        'Si todavía no hemos empezado a trabajar en tu caso, te devolvemos el [PORCENTAJE]% de nuestros honorarios.',
        'Si ya empezamos, te devolvemos la parte que corresponde a los servicios que aún no te hemos prestado, de acuerdo con el desglose de tu contrato. Los servicios ya prestados no son reembolsables.',
      ] },
      { heading: 'Si nosotros fallamos', body: [
        'Si no te prestamos el servicio o lo prestamos de forma deficiente por causas que nos son imputables, te devolvemos lo que pagaste por ese servicio y te bonificamos al menos el veinte por ciento del precio pagado, sin perjuicio de cualquier otra indemnización que corresponda.',
      ] },
      { heading: 'Lo que no podemos reembolsar', body: [
        'El derecho de solicitud de visa, porque lo pagas directamente al gobierno de Estados Unidos.',
        'La negativa de una visa no da derecho por sí sola a un reembolso de los servicios ya prestados, porque la decisión es exclusiva del oficial consular y nadie puede garantizarla.',
      ] },
      { heading: 'Cómo pedir tu reembolso', body: [
        'Escríbenos a [CORREO DE CONTACTO] o por WhatsApp con tu nombre, la fecha de tu contrato y el motivo. Te respondemos en un máximo de [PLAZO] días hábiles y hacemos la devolución por el mismo medio con el que pagaste, salvo que aceptes otro.',
        'Si no estás de acuerdo con nuestra respuesta, puedes acudir a PROFECO.',
      ] },
    ],
  },
  // Accepted as its own checkbox when hiring (LFPDPPP art. 7: financial/property data need express consent).
  financialData: {
    version: '2026-10-19',
    title: 'Consentimiento para datos patrimoniales y financieros',
    intro: 'Otorgo mi consentimiento expreso para que Easytravel Visa trate mis datos patrimoniales y financieros (por ejemplo, ingresos, empleo, bienes y estados de cuenta) únicamente para preparar mi solicitud de visa, conforme al Aviso de privacidad.',
    sections: [] as { heading: string; body: string[] }[],
  },
};

export type LegalCopy = typeof LEGAL_ES;

export const LEGAL_EN: LegalCopy = {
  back: 'Back to home',
  updated: 'Version in force since',
  privacy: {
    version: '2026-10-19',
    title: 'Privacy notice',
    intro: 'Your information is part of your story, and we look after it that way. Here is what data we use, why, and how you stay in control of it.',
    sections: [
      { heading: 'Who is responsible for your data', body: [
        `Easytravel Visa is the trade name of ${PROVIDER_EN} We are responsible for processing your personal data under Mexico's Federal Law on the Protection of Personal Data Held by Private Parties.`,
      ] },
      { heading: 'What data we process', body: [
        'When you message us on WhatsApp: your name, your phone number and whatever you share in your messages.',
        'If you hire our advisory service: identification and contact details, work, education, family and travel history, and the financial or property information your application requires (for example income, employment or assets). We ask for your express consent for financial or property data.',
        'Sensitive data: the DS-160 form includes questions that can reveal sensitive data, such as health information. We only process it if you choose to share it for your application, with your express written consent.',
        'When you accept our documents we keep a record: the date and time, your IP address, your browser and the version of the document you accepted.',
      ] },
      { heading: 'What we use it for', body: [
        'Purposes needed for our relationship with you (no additional consent required): answering your questions, providing the advisory service you hire, preparing you for your interview, issuing your invoice, meeting our legal obligations and keeping the record of what you accepted.',
        'Additional purposes: none. We do not use your data for advertising, we do not profile you and we do not sell your information.',
      ] },
      { heading: 'Who we share it with', body: [
        'We do not transfer your data to third parties without your consent, except where the law allows it, such as a request from a competent authority.',
        'Your visa application details are entered into the official US government systems only with your authorization and for the application you request.',
        'Our hosting and storage providers process data only on our behalf and under our instructions.',
      ] },
      { heading: 'How to limit the use of your data', body: [
        'You can ask us at any time to limit the use or disclosure of your data by writing to [CONTACT EMAIL]. If you do not want to receive messages from us, tell us the same way or on WhatsApp and we will stop.',
      ] },
      { heading: 'Your ARCO rights and how to withdraw consent', body: [
        'You have the right to access, rectify, cancel or object to the use of your data (ARCO rights), and to withdraw your consent. Write to [CONTACT EMAIL] with your name, a way to reply to you, the right you want to exercise and the data it concerns, and attach an official ID (or your legal representative\'s, with the document that proves it).',
        'We will reply within twenty days of receiving your request and, if it applies, carry it out within the following fifteen days. Exercising these rights is free; only reproduction or delivery costs may be charged.',
      ] },
      { heading: 'How long we keep it', body: [
        'We keep your data while our relationship lasts and afterwards only for the period the law requires or to handle possible liabilities. At the end of that period we block it and then delete it.',
      ] },
      { heading: 'How we protect your data', body: [
        'The site only works over an encrypted connection (HTTPS). Access to client information is restricted to authorized staff, passwords are stored encrypted and acceptance records cannot be modified.',
      ] },
      { heading: 'What your browser stores', body: [
        'We do not use tracking or advertising cookies. Your browser stores the language you chose and, if you accept our documents before messaging us on WhatsApp, a random identifier and the version you accepted, so we do not ask again. You can delete them in your browser settings.',
      ] },
      { heading: 'Changes to this notice', body: [
        'We will publish any change on this page with its new effective date. If you are already a client, we will also tell you on WhatsApp or by email.',
        'If you believe your rights were not respected, you can contact the Secretaría Anticorrupción y Buen Gobierno, Mexico\'s authority for personal data protection.',
      ] },
    ],
  },
  terms: {
    version: '2026-10-19',
    title: 'Terms and conditions',
    intro: 'We would rather you know from the start how we work and what we can and cannot do for you.',
    sections: [
      { heading: 'Who we are', body: [
        `Easytravel Visa is the trade name of ${PROVIDER_EN}`,
        'We are a private advisory agency. We are not a United States government entity and we have no relationship with the Embassy or the consulates.',
      ] },
      { heading: 'Our service', body: [
        'We guide you through the DS-160 form, gathering your documents and preparing for your interview. Before we start we sign a written contract with the scope, price and payment terms, and give you a copy.',
      ] },
      { heading: 'No one can guarantee a visa', body: [
        'The decision to grant or refuse a visa belongs only to the consular officer. No agency can guarantee you a visa, get you priority appointments or influence the outcome, and neither can we.',
      ] },
      { heading: 'Prices and payments', body: [
        'Before you hire us we tell you the total price of our fees in Mexican pesos, with VAT and any other charge included.',
        'The visa application fee is paid directly to the US government, is separate from our fees and is not refunded by the government.',
      ] },
      { heading: 'Cancellations and refunds', body: [
        'You can cancel at no cost within five business days of signing the contract, under the conditions explained in our Cancellation and refund policy, which is part of these terms.',
      ] },
      { heading: 'Your part', body: [
        'The information you give us and that goes into your application must be true and complete. Giving false information to the US government can lead to a permanent visa refusal. You review and confirm your application before it is submitted.',
      ] },
      { heading: 'Use of this site', body: [
        'The content of this site is for information only. It is not legal advice and does not replace the opinion of an immigration lawyer.',
      ] },
      { heading: 'Questions, complaints and PROFECO', body: [
        'For any question or complaint, message us on WhatsApp at +52 646 187 4375, write to [CONTACT EMAIL], or visit us at [FULL ADDRESS].',
        'You can also contact PROFECO (Mexico\'s Federal Consumer Protection Agency), which has administrative authority to settle disputes about these terms.',
      ] },
      { heading: 'Governing law', body: [
        'These terms are governed by the laws of Mexico. For any dispute, in addition to PROFECO, the courts of [CITY AND STATE] will have jurisdiction.',
      ] },
      { heading: 'Changes', body: [
        'We may update these terms. Each version is published on this page with its effective date, and your contract is governed by the version you accepted.',
      ] },
    ],
  },
  refund: {
    version: '2026-10-19',
    title: 'Cancellation and refund policy',
    intro: 'We want you to hire us with peace of mind. These are your options if you change your mind or if something does not go as agreed.',
    sections: [
      { heading: 'Five business days to cancel at no cost', body: [
        'If you hire us outside our office (on WhatsApp, online or at your home), you can cancel without any liability within five business days of signing the contract, and we refund everything you paid.',
        'This does not apply when the service date (for example, your preparation session) is ten business days or less from the date you hired it.',
        'To cancel, a message on WhatsApp, an email or any other means that leaves a record is enough.',
      ] },
      { heading: 'If you cancel after that period', body: [
        'If we have not started working on your case yet, we refund [PERCENTAGE]% of our fees.',
        'If we have already started, we refund the part that corresponds to services not yet provided, according to the breakdown in your contract. Services already provided are not refundable.',
      ] },
      { heading: 'If we fail', body: [
        'If we do not provide the service, or provide it deficiently for reasons attributable to us, we refund what you paid for that service and add compensation of at least twenty percent of the price paid, without prejudice to any other damages that may apply.',
      ] },
      { heading: 'What we cannot refund', body: [
        'The visa application fee, because you pay it directly to the US government.',
        'A visa refusal does not by itself entitle you to a refund of services already provided, because the decision belongs only to the consular officer and no one can guarantee it.',
      ] },
      { heading: 'How to request your refund', body: [
        'Write to [CONTACT EMAIL] or on WhatsApp with your name, the date of your contract and the reason. We reply within [DAYS] business days and refund through the same payment method you used, unless you accept another.',
        'If you disagree with our answer, you can contact PROFECO.',
      ] },
    ],
  },
  financialData: {
    version: '2026-10-19',
    title: 'Consent for financial and property data',
    intro: 'I give my express consent for Easytravel Visa to process my financial and property data (for example income, employment, assets and bank statements) only to prepare my visa application, as described in the Privacy notice.',
    sections: [],
  },
};
