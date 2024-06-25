// app/ams/cases/create/page.tsx

import { CreateCaseForm } from "@/components/Cases/CreateCaseForm";


export default function CreateCasePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Case</h1>
      <CreateCaseForm />
    </div>
  )
}