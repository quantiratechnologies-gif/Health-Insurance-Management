import { Activity, Database, ShieldCheck, Search, Bell, TerminalSquare } from "lucide-react"
import { AppLayout, NavGroup } from "../components/AppLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion, Variants } from "framer-motion"
import { useState } from "react"

export default function AdminPortal() {
  const [activeView, setActiveView] = useState("Dashboard")

  const navGroups: NavGroup[] = [
    {
      title: "PLATFORM CONFIG",
      items: [
        { label: "Platform Dashboard", icon: Activity, active: activeView === "Dashboard", onClick: () => setActiveView("Dashboard") },
        { label: "Rule Engine Settings", icon: Database, active: activeView === "Rule Engine Settings", onClick: () => setActiveView("Rule Engine Settings") }
      ]
    },
    {
      title: "SYSTEM & AUDIT",
      items: [
        { label: "Provider Approvals", icon: ShieldCheck, active: activeView === "Provider Approvals", onClick: () => setActiveView("Provider Approvals") },
        { label: "System Audit Logs", icon: TerminalSquare, active: activeView === "System Audit Logs", onClick: () => setActiveView("System Audit Logs") }
      ]
    }
  ]

  const headerContent = (
    <>
      <div className="relative hidden md:block">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input type="text" placeholder="Search Configurations..." className="pl-10 w-64 bg-muted border-border" />
      </div>
      <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:bg-muted rounded-full">
        <Bell className="w-5 h-5" />
      </Button>
      <div className="flex items-center gap-3 border-l border-border pl-4">
        <div className="text-right hidden md:block">
          <p className="text-sm font-bold leading-none text-foreground">System Admin</p>
          <p className="text-xs text-muted-foreground mt-1">Super User</p>
        </div>
        <Avatar>
          <AvatarFallback className="bg-primary/10 text-primary font-bold">SA</AvatarFallback>
        </Avatar>
      </div>
    </>
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  const renderView = () => {
    switch (activeView) {
      case "Dashboard":
        return (
          <>
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-8">Super Admin Console</motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { title: "System Uptime", value: "99.99%", desc: "Last 30 days" },
                { title: "Active TPA Sessions", value: "42", desc: "Current online adjudicators" },
                { title: "STP Processing Time", value: "1.2s", desc: "Average latency" },
                { title: "API Health", value: "100%", desc: "All endpoints operational" }
              ].map((stat, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <Card className="shadow-sm border-border h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground mt-1">{stat.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-border">
                <CardHeader>
                  <CardTitle>System Activity Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Just now</TableCell>
                        <TableCell>STP Engine</TableCell>
                        <TableCell>Ruleset v2.4 deployed</TableCell>
                        <TableCell className="text-success font-medium">Success</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2 mins ago</TableCell>
                        <TableCell>Auth Service</TableCell>
                        <TableCell>TPA session expired (SR-892)</TableCell>
                        <TableCell className="text-muted-foreground">Info</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )
      case "Rule Engine Settings":
        return (
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>STP Engine Configuration</CardTitle>
                <CardDescription>Adjust auto-adjudication thresholds.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-foreground mb-1 block">Maximum Auto-Approval Amount (₹)</label>
                    <Input defaultValue="50000" type="number" />
                    <p className="text-xs text-muted-foreground mt-1">Claims above this amount will automatically route to TPA manual review.</p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-foreground mb-1 block">Fraud Risk Tolerance Score</label>
                    <Input defaultValue="65" type="number" />
                    <p className="text-xs text-muted-foreground mt-1">Any claim scoring higher than this will be flagged as high-risk.</p>
                  </div>
                </div>
                <Button className="w-full">Save Configuration</Button>
              </CardContent>
            </Card>
          </motion.div>
        )
      case "Provider Approvals":
        return (
           <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Onboarding Network Hospitals</CardTitle>
                <CardDescription>Review and approve new provider access.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 border border-border rounded-lg flex justify-between items-center bg-muted/30">
                  <div>
                    <h3 className="font-bold text-lg">Sunshine Hospitals</h3>
                    <p className="text-sm text-muted-foreground">Hyderabad • Applied 2 days ago</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-error text-error">Reject</Button>
                    <Button className="bg-success hover:bg-success/90">Approve & Generate Credentials</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      case "System Audit Logs":
        return (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Raw Terminal Output</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black text-green-400 font-mono text-xs p-4 rounded-lg h-[400px] overflow-y-auto">
                  <p>[2026-07-07 10:14:22] INF Initializing HealthSure Platform...</p>
                  <p>[2026-07-07 10:14:23] INF Connected to MongoDB instance cluster0</p>
                  <p>[2026-07-07 10:14:25] INF React Router initialized across 4 portals</p>
                  <p>[2026-07-07 10:15:00] WRN High memory usage in Fraude_Engine_ML_Worker</p>
                  <p>[2026-07-07 10:16:30] INF User Apollo_Hospital successfully authenticated.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      default:
        return <div>View under construction</div>
    }
  }

  return (
    <AppLayout title="Super Admin Portal" navGroups={navGroups} headerContent={headerContent}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="p-8"
      >
        {renderView()}
      </motion.div>
    </AppLayout>
  )
}
