import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "../components/columns"
import { UserNav } from "../components/user-nav"
import { DataTable } from "../components/data-table"
import { getCasesByStatus } from "@/lib/api"

export const metadata: Metadata = {
  title: "Asset Cases",
  description: "An asset case tracker built using Tanstack Table.",
}

// Define the schema for an asset
const assetSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string(),
  status: z.string(),
  description: z.string(),
  type: z.string(),

})

export default async function Cases() {
  const result = await getCasesByStatus('Disposed')

  let assets: any[] = []
  if (result.success) {
    assets = z.array(assetSchema).parse(result.data)
  } else {
    console.error(result.message)
    // You might want to handle this error state in the UI
  }

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-2 p-2 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Disposals</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of asset cases that are in the disposal stage!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={assets} columns={columns} />
      </div>
    </>
  )
}