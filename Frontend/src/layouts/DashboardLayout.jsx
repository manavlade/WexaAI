import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
} from "@/components/ui/sidebar"

import { Link, Outlet, useLocation } from "react-router-dom"
import { Home, Package } from "lucide-react"

export default function DashboardLayout() {
  const { pathname } = useLocation()

  const isActive = (path) => pathname === path

  return (
    <>
      <Sidebar className="border-r bg-gradient-to-b from-gray-900 to-black text-white">
        <SidebarContent className="p-4">
          <div className="mb-8 px-2">
            <h1 className="text-xl font-bold tracking-wide">
              Wexa<span className="text-primary">AI</span>
            </h1>
            <p className="text-xl text-gray-400 italic">Admin Dashboard</p>
          </div>

          <SidebarGroup>
           

            <SidebarGroupContent>
              <SidebarMenu className="space-y-5">

                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className={`flex items-center gap-3 rounded-lg px-3 py-5 transition-all
                      ${
                        isActive("/dashboard")
                          ? "bg-black text-white shadow-md"
                          : "hover:bg-white/10 text-gray-300"
                      }`}
                  >
                    <Link to="/dashboard">
                      <Home className="h-5 w-5" />
                      <span className="text-sm font-medium">Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className={`flex items-center gap-3 rounded-lg px-3 py-5 transition-all
                      ${
                        isActive("/dashboard/products")
                          ? "bg-black text-white shadow-md"
                          : "hover:bg-white/10 text-gray-300"
                      }`}
                  >
                    <Link to="/dashboard/products">
                      <Package className="h-5 w-5" />
                      <span className="text-sm font-medium">Products</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="bg-gray-50 min-h-screen p-6">
        <Outlet />
      </SidebarInset>
    </>
  )
}
