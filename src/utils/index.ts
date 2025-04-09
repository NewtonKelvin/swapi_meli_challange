'use client'
import { usePathname } from 'next/navigation'

const useUtils = () => {
  const formatDate = (stringDate: string | undefined): string | void => {
    if (!stringDate) return
    const date = new Date(stringDate)

    const day = date.getDate()
    const month = date.toLocaleString('en-US', { month: 'long' })
    const year = date.getFullYear()

    let hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const isPM = hours >= 12

    // Convert to 12-hour format
    hours = hours % 12 || 12

    return `${day} ${month} ${year} at ${hours}:${minutes}${isPM ? 'pm' : 'am'}`
  }
  const path = usePathname().replace(/[^a-zA-Z]+/g, '')
  const currentPath = String(path).charAt(0).toUpperCase() + String(path).slice(1) || 'home'
  const extractIdFromUrl = (url: string): number => {
    const matches = url.match(/\/(\d+)\/?$/)
    return matches ? parseInt(matches[1], 10) : NaN
  }
  return { formatDate, currentPath, extractIdFromUrl }
}

export default useUtils