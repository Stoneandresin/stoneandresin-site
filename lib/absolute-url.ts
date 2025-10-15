import { absoluteUrl } from '@/lib/absolute-url'

const res = await fetch(absoluteUrl('/api/admin/settings'), { next: { revalidate: 300 } })

export function getBaseUrl() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
  if (envUrl) return envUrl
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

export function absoluteUrl(path: string) {
  return new URL(path, getBaseUrl()).toString()
}