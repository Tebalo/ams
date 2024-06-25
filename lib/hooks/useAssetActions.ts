'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteCaseById } from '@/lib/api'

export const useAssetActions = (caseCode: string) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleUpdate = () => {
    router.push(`/ams/cases/edit/${caseCode}`)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this case?')) {
      setIsDeleting(true)
      try {
        await deleteCaseById(caseCode)
        router.push('/ams/cases')
      } catch (error) {
        console.error('Failed to delete case:', error)
        alert('Failed to delete case. Please try again.')
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return { handleUpdate, handleDelete, isDeleting }
}