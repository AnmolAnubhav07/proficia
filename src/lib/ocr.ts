import { createWorker } from 'tesseract.js'

// Real client-side OCR (Tesseract.js, runs entirely in the browser — no external API,
// no cost). Used to check whether an uploaded offer letter mentions the claimed employer.
export async function extractTextFromImage(file: File): Promise<string> {
  const worker = await createWorker('eng')
  try {
    const {
      data: { text },
    } = await worker.recognize(file)
    return text
  } finally {
    await worker.terminate()
  }
}

export function textMentionsCompany(text: string, companyName: string): boolean {
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
  const haystack = normalize(text)
  const needle = normalize(companyName)
  if (!needle) return false
  return haystack.includes(needle)
}

export function isValidUan(value: string): boolean {
  return /^\d{12}$/.test(value.replace(/\s/g, ''))
}
