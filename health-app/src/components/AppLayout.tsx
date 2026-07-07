import React from 'react'
import { Logo } from './Logo'
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset, SidebarTrigger } from './ui/sidebar'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

export interface NavLink {
  label: string
  icon: React.ElementType
  onClick?: () => void
  active?: boolean
}

interface AppLayoutProps {
  children: React.ReactNode
  title: string
  navLinks: NavLink[]
  headerContent?: React.ReactNode
}

export function AppLayout({ children, title, navLinks, headerContent }: AppLayoutProps) {
  const navigate = useNavigate()

  return (
    <SidebarProvider>
      <div className="flex w-full h-screen bg-slate-50 overflow-hidden">
        <Sidebar className="border-r border-slate-200 bg-white">
          <SidebarHeader className="p-4 py-6">
            <Logo className="h-8 w-auto mb-2" />
            <div className="px-2 font-bold tracking-tight text-lg text-slate-800">{title}</div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navLinks.map((link, idx) => (
                    <SidebarMenuItem key={idx}>
                      <SidebarMenuButton 
                        asChild
                        onClick={link.onClick}
                        isActive={link.active}
                        className={link.active ? "bg-primary/10 text-primary font-medium" : "text-slate-500 font-medium"}
                      >
                        <button className="flex items-center gap-3 px-3 w-full cursor-pointer">
                          <link.icon className="w-5 h-5" />
                          <span>{link.label}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-slate-100">
             <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer" onClick={() => navigate('/')}>
              <LogOut className="w-4 h-4 mr-2" /> Terminate Session
            </Button>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-hidden">
          <header className="h-16 shrink-0 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <SidebarTrigger />
               <h1 className="text-xl font-bold tracking-tight text-slate-900">{title}</h1>
            </div>
            {headerContent && (
              <div className="flex items-center gap-4">
                {headerContent}
              </div>
            )}
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
