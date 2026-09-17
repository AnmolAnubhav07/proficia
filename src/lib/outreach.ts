// Real, working outreach links — no paid WhatsApp Business API or SMS gateway needed.
// wa.me and sms: are native deep links; clicking them opens the actual app pre-filled.
function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return `91${digits}`
  return digits
}

export function whatsappLink(phone: string, message: string) {
  return `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(message)}`
}

export function smsLink(phone: string, message: string) {
  return `sms:${phone}?body=${encodeURIComponent(message)}`
}

export function telLink(phone: string) {
  return `tel:${phone}`
}
