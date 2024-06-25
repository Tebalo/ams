"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

// Define the statuses for assets
const assetStatuses = [
  { label: "Confiscated", value: "Confiscated" },
  { label: "Disposed", value: "Disposed" },
  { label: "Valuation", value: "Valuation" },
  { label: "Pre-Confiscated", value: "Pre-Confiscated" },
]

const assetTypes = [
  { label: "Real Estate", value: "Real Estate" },
  { label: "Vehicle, Plant and Equipment", value: "Vehicle, Plant and Equipment" },
  { label: "Personal Effects", value: "Personal Effects" },
  { label: "Biological Assets", value: "Biological Assets" },
  { label: "Office equipment and furniture", value: "Office equipment and furniture" },
  { label: "Artefacts", value: "Artefacts" },
  { label: "Money", value: "Money" },
]

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter assets..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={assetStatuses}
          />
        )}
        {table.getColumn("type") && (
          <DataTableFacetedFilter
            column={table.getColumn("type")}
            title="Type"
            options={assetTypes}
          />
        )},
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}