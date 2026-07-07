import { ShieldAlert, Server, AlertTriangle, Bell, Activity, Users, Database } from "lucide-react"
import { AppLayout, NavGroup } from "../components/AppLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion, Variants } from "framer-motion"

export default function AdminPortal() {
  const navGroups: NavGroup[] = [
    {
      title: "PLATFORM CONFIG",
      items: [
        { label: "Platform Dashboard", icon: Activity, active: true },
        { label: "Rule Engine Settings", icon: Database },
        { label: "Fraud Engine Setup", icon: AlertTriangle }
      ]
    },
    {
      title: "USER MANAGEMENT",
      items: [
        { label: "Provider Approvals", icon: ShieldAlert },
        { label: "TPA Accounts", icon: Users },
        { label: "System Audit Logs", icon: Activity },
      ]
    }
  ]

  const headerContent = (
    <>
      <Badge variant="secondary" className="flex items-center gap-2 px-3 py-1 bg-success-muted text-success-foreground rounded-full text-sm font-bold border-none">
        <Server className="w-4 h-4" /> All Systems Nominal
      </Badge>
      <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary transition-colors cursor-pointer">
        <Bell className="w-6 h-6" />
      </Button>
      <div className="flex items-center gap-3 border-l border-border pl-6">
        <div className="text-right">
          <p className="text-sm font-bold">Super Admin</p>
          <p className="text-xs text-muted-foreground">Root Access</p>
        </div>
        <Avatar>
          <AvatarFallback className="bg-primary/20 text-primary font-bold">SA</AvatarFallback>
        </Avatar>
      </div>
    </>
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <AppLayout title="Super Admin Portal" navGroups={navGroups} headerContent={headerContent}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-1 overflow-auto p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-border h-full">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active TPA Users</p>
                    <h3 className="text-3xl font-bold mt-1">12</h3>
                  </div>
                  <Users className="w-8 h-8 text-muted-foreground opacity-20" />
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-border h-full">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Server Uptime</p>
                    <h3 className="text-3xl font-bold mt-1 text-success">99.9%</h3>
                  </div>
                  <Server className="w-8 h-8 text-success opacity-20" />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-border h-full">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Rules Firing</p>
                    <h3 className="text-3xl font-bold mt-1 text-primary">2,142/hr</h3>
                  </div>
                  <Database className="w-8 h-8 text-primary opacity-20" />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-border h-full">
                <CardHeader className="border-b border-border pb-4 bg-muted/50">
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Real-time infrastructure monitoring</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Claims Database</span>
                      <Badge variant="outline" className="bg-success-muted text-success-foreground border-success-border">Healthy</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">STP ML Model API</span>
                      <Badge variant="outline" className="bg-success-muted text-success-foreground border-success-border">Healthy</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Provider Sync API</span>
                      <Badge variant="outline" className="bg-success-muted text-success-foreground border-success-border">Healthy</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-border h-full">
                <CardHeader className="border-b border-border pb-4 bg-muted/50">
                  <CardTitle>Recent Audit Logs</CardTitle>
                  <CardDescription>Security and configuration changes</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start border-b border-border pb-3">
                      <div>
                        <p className="text-sm font-medium">ML Threshold Updated</p>
                        <p className="text-xs text-muted-foreground">Auto-approve threshold set to 80%</p>
                      </div>
                      <span className="text-xs text-muted-foreground">10m ago</span>
                    </div>
                    <div className="flex justify-between items-start border-b border-border pb-3">
                      <div>
                        <p className="text-sm font-medium">New TPA User Created</p>
                        <p className="text-xs text-muted-foreground">TPA-009 access granted</p>
                      </div>
                      <span className="text-xs text-muted-foreground">1h ago</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium">System Backup Completed</p>
                        <p className="text-xs text-muted-foreground">Database snapshot #4092</p>
                      </div>
                      <span className="text-xs text-muted-foreground">3h ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
    </AppLayout>
  )
}

