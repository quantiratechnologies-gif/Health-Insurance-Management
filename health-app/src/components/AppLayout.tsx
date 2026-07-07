import React from 'react'
import { Logo } from './Logo'
import { 
  SidebarProvider, Sidebar, SidebarHeader, SidebarContent, 
  SidebarGroup, SidebarGroupLabel, SidebarGroupContent, 
  SidebarMenu, SidebarMenuItem, SidebarMenuButton, 
  SidebarFooter, SidebarInset, SidebarTrigger 
} from './ui/sidebar'
import { LogOut, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export interface NavLink {
  label: string
  icon: React.ElementType
  onClick?: () => void
  active?: boolean
  badge?: string | number
  id?: string
}

export interface NavGroup {
  title?: string
  items: NavLink[]
}

interface AppLayoutProps {
  children: React.ReactNode
  title?: string
  portalTitle?: string
  portalLabel?: string
  navGroups: NavGroup[]
  headerContent?: React.ReactNode
  userName?: string
  userLabel?: string
  userRole?: string
  userSub?: string
  activeItem?: string
  onNavChange?: (id: string) => void
  onNavigate?: (id: string) => void
  portalSubtitle?: string
}

export function AppLayout({ 
  children, title, portalTitle, portalLabel, navGroups, headerContent, 
  userName, userLabel, userRole, userSub,
  activeItem, onNavChange, onNavigate
}: AppLayoutProps) {
  const displayTitle = portalTitle || title || 'Portal'
  const displayUser = userName || userLabel
  const displayRole = userRole || userSub
  const navigate = useNavigate()

  return (
    <SidebarProvider>
      <Sidebar className="border-r-0">

          {/* Sidebar Header — Logo + Portal Name */}
          <SidebarHeader className="p-5 pb-4" style={{ background: 'hsl(var(--sidebar-background))' }}>
            <Logo className="h-7 w-auto mb-4" />
            {portalLabel && (
              <div className="flex items-center gap-2">
                <span 
                  className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ 
                    background: 'hsl(var(--primary) / 0.2)', 
                    color: 'hsl(var(--sidebar-primary))'
                  }}
                >
                  {portalLabel}
                </span>
              </div>
            )}
          </SidebarHeader>

          <Separator style={{ background: 'hsl(var(--sidebar-border))' }} />

          {/* Navigation */}
          <SidebarContent style={{ background: 'hsl(var(--sidebar-background))' }}>
            {navGroups.map((group, gIdx) => (
              <SidebarGroup key={gIdx} className="px-3 py-2">
                {group.title && (
                  <SidebarGroupLabel 
                    className="text-[10px] font-bold uppercase tracking-widest mb-1 px-2"
                    style={{ color: 'hsl(var(--sidebar-foreground) / 0.45)' }}
                  >
                    {group.title}
                  </SidebarGroupLabel>
                )}
                <SidebarGroupContent>
                  <SidebarMenu className="gap-0.5">
                    {group.items.map((link, idx) => (
                      <SidebarMenuItem key={idx}>
                        <SidebarMenuButton
                          asChild
                          onClick={link.onClick || (link.id && onNavChange ? () => onNavChange(link.id!) : (link.id && onNavigate ? () => onNavigate(link.id!) : undefined))}
                          isActive={link.active !== undefined ? link.active : (activeItem === link.id)}
                          tooltip={link.label}
                          className="h-9 rounded-lg gap-3 px-3 text-sm font-medium transition-all duration-150"
                        >
                          <button 
                            className="flex items-center w-full cursor-pointer"
                            style={{
                              color: (link.active || activeItem === link.id) 
                                ? 'hsl(var(--sidebar-primary))' 
                                : 'hsl(var(--sidebar-foreground) / 0.75)',
                              background: (link.active || activeItem === link.id)
                                ? 'hsl(var(--primary) / 0.15)' 
                                : 'transparent',
                            }}
                          >
                            <link.icon 
                              className="w-4 h-4 shrink-0" 
                              aria-hidden="true"
                              style={{ color: (link.active || activeItem === link.id) ? 'hsl(var(--sidebar-primary))' : 'hsl(var(--sidebar-foreground) / 0.6)' }}
                            />
                            <span className="flex-1 text-left">{link.label}</span>
                            {link.badge !== undefined && (
                              <span 
                                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
                                style={{
                                  background: (link.active || activeItem === link.id) ? 'hsl(var(--primary) / 0.25)' : 'hsl(var(--sidebar-accent))',
                                  color: (link.active || activeItem === link.id) ? 'hsl(var(--sidebar-primary))' : 'hsl(var(--sidebar-foreground) / 0.6)',
                                }}
                              >
                                {link.badge}
                              </span>
                            )}
                            {(link.active || activeItem === link.id) && (
                              <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" aria-hidden="true" />
                            )}
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          {/* Footer with user info + sign out */}
          <SidebarFooter 
            className="p-4"
            style={{ background: 'hsl(var(--sidebar-background))', borderTop: '1px solid hsl(var(--sidebar-border))' }}
          >
            {(displayUser || displayRole) && (
              <div className="flex items-center gap-3 mb-3 px-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: 'hsl(var(--primary) / 0.2)', color: 'hsl(var(--sidebar-primary))' }}
                >
                  {(displayUser || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  {displayUser && <p className="text-xs font-semibold truncate" style={{ color: 'hsl(var(--sidebar-foreground))' }}>{displayUser}</p>}
                  {displayRole && <p className="text-[10px] truncate" style={{ color: 'hsl(var(--sidebar-foreground) / 0.5)' }}>{displayRole}</p>}
                </div>
              </div>
            )}
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sm h-9 rounded-lg gap-2 cursor-pointer"
              style={{ color: 'hsl(var(--sidebar-foreground) / 0.6)' }}
              onClick={() => navigate('/')}
              aria-label="Terminate session and return to login"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              <span>Terminate Session</span>
            </Button>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden">
          {/* Top Header Bar */}
          <header 
            className="h-14 shrink-0 border-b px-4 flex items-center justify-between gap-4"
            style={{ 
              background: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))'
            }}
          >
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" aria-label="Toggle sidebar" />
              <div className="h-5 w-px bg-border" role="separator" aria-hidden="true" />
              <h1 className="text-base font-semibold text-foreground tracking-tight">{displayTitle}</h1>
            </div>
            {headerContent && (
              <div className="flex items-center gap-3" role="toolbar" aria-label="Page actions">
                {headerContent}
              </div>
            )}
          </header>

          {/* Scrollable Page Content */}
          <main 
            className="flex-1 overflow-auto custom-scroll"
            id="main-content"
            role="main"
            aria-label={displayTitle}
          >
            {children}
          </main>
        </SidebarInset>
    </SidebarProvider>
  )
}
