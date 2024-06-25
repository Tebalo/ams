"use client"

import React, { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "./components/sidebar-nav"
import { Home, FileText, DollarSign, ShoppingCart, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"

const sidebarNavItems = [
  {
    title: "Pre Confiscations",
    href: "/ams/cases",
    icon: Home,
  },
  {
    title: "Confiscations",
    href: "/ams/cases/confiscations",
    icon: FileText,
  },
  {
    title: "Valuations",
    href: "/ams/cases/valuations",
    icon: DollarSign,
  },
  {
    title: "Disposals",
    href: "/ams/cases/disposals",
    icon: ShoppingCart,
  },
  // {
  //   title: "Trust Fund",
  //   href: "/ams/cases/trust-fund",
  //   icon: Briefcase,
  // },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Asset Case Management Lifecycle</h2>
          <p className="text-muted-foreground">
            Manage case lifecycle.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col lg:flex-row lg:space-x-12 space-y-8 lg:space-y-0">
          <aside className={`lg:w-${isCollapsed ? '16' : '1/4'} transition-all duration-300 relative`}>
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-4 top-0 z-10"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </Button>
            <SidebarNav items={sidebarNavItems} isCollapsed={isCollapsed} />
          </aside>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  )
}