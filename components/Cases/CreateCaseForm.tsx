'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createCase } from '@/lib/api'
import axios from 'axios'

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  owner: z.string().min(2, { message: "Owner must be at least 2 characters." }),
  location: z.string().min(2, { message: "Location is required." }),
  code: z.string().min(2, { message: "Code is required." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  value: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Value must be a valid number." }),
  type: z.string().min(2, { message: "Type is required." }),
  condition: z.string().min(2, { message: "Condition is required." }),
  status: z.string().min(2, { message: "Status is required." }),
  file_link: z.instanceof(File).optional(),
});

export function CreateCaseForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      owner: "",
      location: "",
      code: "C-XXXX",
      description: "",
      value: "",
      type: "",
      condition: "",
      status: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      let imagePath = null
      if (values.file_link) {
        const formData = new FormData()
        formData.append('title', values.name)
        formData.append('file', values.file_link)

        const response = await axios.post('http://74.208.205.44:8084/api/documents/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        imagePath = response.data.file_path
      }
      console.log(imagePath)
      const caseData = {
        ...values,
        file_link: imagePath
      }
      await createCase(caseData)
      router.push('/ams/cases')
    } catch (error) {
      console.error('Failed to create case:', error)
      // Handle error (e.g., show error message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the basic details of the asset case.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Asset name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset Code Auto-generated..</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="C-XXXX" 
                      {...field} 
                      readOnly 
                      className="bg-gray-100 cursor-not-allowed"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="owner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner</FormLabel>
                  <FormControl>
                    <Input placeholder="Owner's name or ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Asset location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
  <CardHeader>
    <CardTitle>Asset Details</CardTitle>
    <CardDescription>Provide specific details about the asset.</CardDescription>
  </CardHeader>
  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Type</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select asset type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Real Estate">Real Estate</SelectItem>
              <SelectItem value="Vehicle, Plant and Equipment">Vehicle, Plant and Equipment</SelectItem>
              <SelectItem value="Personal Effects">Personal Effects</SelectItem>
              <SelectItem value="Biological Assets">Biological Assets</SelectItem>
              <SelectItem value="Office equipment and furniture">Office equipment and furniture</SelectItem>
              <SelectItem value="Artefacts">Artefacts</SelectItem>
              <SelectItem value="Money">Money</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="value"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Value</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Asset value" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="condition"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Condition</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select asset condition" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Excellent">Excellent</SelectItem>
              <SelectItem value="Good">Good</SelectItem>
              <SelectItem value="Fair">Fair</SelectItem>
              <SelectItem value="Poor">Poor</SelectItem>
              <SelectItem value="Very Poor">Very Poor</SelectItem>
              <SelectItem value="Needs Repair">Needs Repair</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Status</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Pre-Confiscated">Pre-Confiscated</SelectItem>
              <SelectItem value="Confiscated">Confiscated</SelectItem>
              <SelectItem value="Valuation">Valuation</SelectItem>
              <SelectItem value="Disposed">Disposed</SelectItem>
              {/* <SelectItem value="Case-Complete">Disposed</SelectItem> */}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  </CardContent>
</Card>

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
            <CardDescription>Provide a detailed description of the asset.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Detailed description of the asset" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Asset Image</CardTitle>
            <CardDescription>Upload an image of the asset.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="file_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Case"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}