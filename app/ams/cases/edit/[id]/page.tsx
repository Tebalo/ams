'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCaseById, updateCaseById } from '@/lib/api'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function EditCasePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [caseDetails, setCaseDetails] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function fetchCaseDetails() {
      try {
        const details = await getCaseById(params.id)
        setCaseDetails(details)
      } catch (error) {
        console.error('Failed to fetch case details:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCaseDetails()
  }, [params.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setCaseDetails((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (name: string) => (date: Date | undefined) => {
    setCaseDetails((prev: any) => ({ 
      ...prev, 
      [name]: date ? date.toISOString().split('T')[0] : null 
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      await updateCaseById(params.id, caseDetails)
      router.push(`/ams/cases/${params.id}`)
    } catch (error) {
      console.error('Failed to update case:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!caseDetails) {
    return <div className="flex justify-center items-center h-screen">Case not found</div>
  }

  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Case: {caseDetails.name}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <Input
                type="text"
                id="name"
                name="name"
                value={caseDetails.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">Code</label>
              <Input
                type="text"
                id="code"
                name="code"
                value={caseDetails.code}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="owner" className="block text-sm font-medium text-gray-700">Owner</label>
              <Input
                type="text"
                id="owner"
                name="owner"
                value={caseDetails.owner}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <Input
                type="text"
                id="location"
                name="location"
                value={caseDetails.location}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Asset Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
              <Input
                type="text"
                id="type"
                name="type"
                value={caseDetails.type}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="value" className="block text-sm font-medium text-gray-700">Value</label>
              <Input
                type="text"
                id="value"
                name="value"
                value={caseDetails.value}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condition</label>
              <Input
                type="text"
                id="condition"
                name="condition"
                value={caseDetails.condition}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <Select
                name="status"
                value={caseDetails.status}
                onValueChange={(value) => handleInputChange({ target: { name: 'status', value } } as any)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pre-Confiscated">Pre-Confiscated</SelectItem>
                  <SelectItem value="Confiscated">Confiscated</SelectItem>
                  <SelectItem value="Disposed">Disposed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              id="description"
              name="description"
              value={caseDetails.description}
              onChange={handleInputChange}
              rows={3}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Confiscation Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="confiscation_date" className="block text-sm font-medium text-gray-700">Confiscation Date</label>
              <DatePicker
                date={caseDetails.confiscation_date ? new Date(caseDetails.confiscation_date) : undefined}
                setDate={handleDateChange('confiscation_date')}
              />
            </div>
            <div>
              <label htmlFor="case_number" className="block text-sm font-medium text-gray-700">Case Number</label>
              <Input
                type="text"
                id="case_number"
                name="case_number"
                value={caseDetails.case_number}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="confiscation_reason" className="block text-sm font-medium text-gray-700">Confiscation Reason</label>
              <Textarea
                id="confiscation_reason"
                name="confiscation_reason"
                value={caseDetails.confiscation_reason}
                onChange={handleInputChange}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Valuation</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
              <label htmlFor="valuation_date" className="block text-sm font-medium text-gray-700">Valuation Date</label>
              <DatePicker
                date={caseDetails.valuation_date ? new Date(caseDetails.valuation_date) : undefined}
                setDate={handleDateChange('valuation_date')}
              />
            </div>
            <div>
              <label htmlFor="valuation_amount" className="block text-sm font-medium text-gray-700">Valuation Amount</label>
              <Input
                type="text"
                id="valuation_amount"
                name="valuation_amount"
                value={caseDetails.valuation_amount}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}