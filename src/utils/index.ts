'use client'
import { usePathname } from 'next/navigation'

const useUtils = () => {
  const path = usePathname().replace('/', '')
  const pathName =
    String(path).charAt(0).toUpperCase() + String(path).slice(1) || 'Home'
  return {
    pathName
  }
}

export default useUtils