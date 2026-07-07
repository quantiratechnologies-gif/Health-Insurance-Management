import React from 'react'
import { Logo } from './Logo'
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset, SidebarTrigger } from './ui/sidebar'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

export interface NavLink {
  label: string
  icon: React.ElementType
  onClick?: () => void
  active?: boolean
}

export interface NavGroup {
  title?: string
  items: NavLink[]
}

interface AppLayoutProps {
  children: React.ReactNode
  title: string
  navGroups: NavGroup[]
  headerContent?: React.ReactNode
}

export function AppLayout({ children, title, navGroups, headerContent }: AppLayoutProps) {
  const navigate = useNavigate()

  return (
    <SidebarProvider>
      <div className="flex w-full h-screen bg-background overflow-hidden">
        <Sidebar className="border-r border-border bg-sidebar">
          <SidebarHeader className="p-4 py-6">
            <Logo className="h-8 w-auto mb-2" />
          </SidebarHeader>
          <SidebarContent>
            {navGroups.map((group, gIdx) => (
              <SidebarGroup key={gIdx}>
                {group.title && <SidebarGroupLabel>{group.title}</SidebarGroupLabel>}
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((link, idx) => (
                      <SidebarMenuItem key={idx}>
                        <SidebarMenuButton 
                          asChild
                          onClick={link.onClick}
                          isActive={link.active}
                          tooltip={link.label}
                        >
                          <button className="flex items-center gap-3 cursor-pointer">
                            <link.icon className="w-4 h-4" />
                            <span>{link.label}</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-border">
             <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground cursor-pointer" onClick={() => navigate('/')}>
              <LogOut className="w-4 h-4 mr-2" /> Terminate Session
            </Button>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden">
          <header className="h-16 shrink-0 bg-card border-b border-border px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <SidebarTrigger />
               <h1 className="text-xl font-bold tracking-tight text-foreground">{title}</h1>
            </div>
            {headerContent && (
              <div className="flex items-center gap-4">
                {headerContent}
              </div>
            )}
          </header>
          <main className="flex-1 overflow-auto p-4 sm:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
