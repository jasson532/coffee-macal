/**
 * Configuración de WhatsApp para Café El Macal
 */

/** Número de WhatsApp con código de país (sin +, sin espacios) */
const PHONE_NUMBER = '573115594119';

/** Mensajes predefinidos para diferentes acciones */
const MESSAGES = {
  general: 'Hola quiero saber acerca del café Macal',
  order: 'Hola quiero saber acerca del café Macal',
  wholesale: 'Hola quiero saber acerca del café Macal, me interesa comprar al por mayor 📦',
  info: 'Hola quiero saber acerca del café Macal, quisiera más información sobre su origen 🌱',
} as const;

export type WhatsAppMessageKey = keyof typeof MESSAGES;

/** Genera la URL de WhatsApp con mensaje */
function getWhatsAppUrl(messageKey: WhatsAppMessageKey = 'order'): string {
  const message = encodeURIComponent(MESSAGES[messageKey]);
  return `https://wa.me/${PHONE_NUMBER}?text=${message}`;
}

export const WHATSAPP_CONFIG = {
  phoneNumber: PHONE_NUMBER,
  messages: MESSAGES,
  getUrl: getWhatsAppUrl,
} as const;
