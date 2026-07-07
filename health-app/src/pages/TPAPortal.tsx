import { Activity, ShieldAlert, FileText, CheckCircle, Database, Search, Bell, AlertTriangle } from "lucide-react"
import { AppLayout, NavGroup } from "../components/AppLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useStore } from "../store/useStore"
import { motion, Variants } from "framer-motion"
import { useState } from "react"
import { toast } from "sonner"

export default function TPAPortal() {
  const { claims, resolveClaim } = useStore()
  const [activeView, setActiveView] = useState("Dashboard")

  const pendingClaims = claims.filter(c => c.status === 'Pending TPA' || c.status === 'Flagged')
  const totalProcessed = claims.filter(c => c.status !== 'Pending TPA' && c.status !== 'Flagged').length
  const totalAmountSaved = claims.filter(c => c.status === 'Rejected').reduce((acc, curr) => acc + curr.cost, 0)

  const navGroups: NavGroup[] = [
    {
      title: "ADJUDICATION",
      items: [
        { label: "Dashboard", icon: Activity, active: activeView === "Dashboard", onClick: () => setActiveView("Dashboard") },
        { label: "Claims Queue", icon: FileText, active: activeView === "Claims Queue", onClick: () => setActiveView("Claims Queue") }
      ]
    },
    {
      title: "NETWORK & FRAUD",
      items: [
        { label: "Provider Network", icon: Database, active: activeView === "Provider Network", onClick: () => setActiveView("Provider Network") },
        { label: "Fraud Engine", icon: ShieldAlert, active: activeView === "Fraud Engine", onClick: () => setActiveView("Fraud Engine") }
      ]
    }
  ]

  const headerContent = (
    <>
      <div className="relative hidden md:block">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input type="text" placeholder="Search Claims..." className="pl-10 w-64 bg-muted border-border" />
      </div>
      <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:bg-muted rounded-full">
        <Bell className="w-5 h-5" />
      </Button>
      <div className="flex items-center gap-3 border-l border-border pl-4">
        <div className="text-right hidden md:block">
          <p className="text-sm font-bold leading-none text-foreground">Suresh Reddy</p>
          <p className="text-xs text-muted-foreground mt-1">Lead Adjudicator</p>
        </div>
        <Avatar>
          <AvatarFallback className="bg-primary/10 text-primary font-bold">SR</AvatarFallback>
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
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-8">TPA Adjudication Hub</motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div variants={itemVariants}>
                <Card className="shadow-sm border-border border-t-4 border-t-primary h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Pending Claims Queue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{pendingClaims.length}</div>
                    <p className="text-xs font-bold text-primary mt-2">Requires manual review</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="shadow-sm border-border border-t-4 border-t-success h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Processed Today</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{totalProcessed}</div>
                    <p className="text-xs text-muted-foreground mt-2">Across all TPA teams</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="shadow-sm border-border border-t-4 border-t-error h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Amount Saved</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">₹{(totalAmountSaved / 100000).toFixed(1)}L</div>
                    <p className="text-xs text-error mt-2 font-bold">Rejected / Downcoded</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <Card className="shadow-sm border-border h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>AI Analysis Stream</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-[400px] w-full px-6">
                      <div className="space-y-6">
                        {claims.map((claim) => (
                          <div key={claim.id} className="relative pl-8 pb-6 border-l-2 border-border last:border-0 last:pb-0">
                            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-background ${
                              claim.status === 'Pending TPA' || claim.status === 'Flagged' ? 'bg-warning' : 
                              claim.status === 'Rejected' ? 'bg-error' : 'bg-success'
                            }`} />
                            
                            <div className="bg-muted rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold text-sm">Claim ID: {claim.id}</h4>
                                <span className="text-xs text-muted-foreground">{claim.date}</span>
                              </div>
                              <p className="text-sm mb-3">
                                <span className="font-medium text-foreground">{claim.hospital}</span> submitted a claim for <span className="font-medium">₹{claim.cost.toLocaleString('en-IN')}</span> ({claim.treatment}).
                              </p>
                              
                              <div className="flex items-center gap-2 mb-4">
                                {claim.status === 'Pending TPA' || claim.status === 'Flagged' ? (
                                  <>
                                    <Badge variant="outline" className="bg-warning-muted text-warning-foreground border-warning-border">Flagged for Review</Badge>
                                    <span className="text-xs text-muted-foreground font-medium">Reason: {claim.ruleTriggered || 'Manual Review Required'}</span>
                                  </>
                                ) : (
                                  <Badge variant="outline" className={
                                    claim.status === 'Rejected' 
                                      ? "bg-error-muted text-error-foreground border-error-border" 
                                      : "bg-success-muted text-success-foreground border-success-border"
                                  }>
                                    Resolved: {claim.status}
                                  </Badge>
                                )}
                              </div>

                              {(claim.status === 'Pending TPA' || claim.status === 'Flagged') && (
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    className="bg-success hover:bg-success/90 text-white"
                                    onClick={() => {
                                      resolveClaim(claim.id, 'Approve');
                                      toast.success("Claim Approved");
                                    }}
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" /> Approve
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="destructive"
                                    onClick={() => {
                                      resolveClaim(claim.id, 'Reject');
                                      toast.success("Claim Rejected");
                                    }}
                                  >
                                    <ShieldAlert className="w-4 h-4 mr-2" /> Reject
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card className="shadow-sm border-border h-full">
                  <CardHeader>
                    <CardTitle>Fraud Risk Scores</CardTitle>
                    <CardDescription>Top flagged claims requiring deep investigation.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {pendingClaims.slice(0, 3).map((claim, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-sm text-foreground">{claim.id}</span>
                          <Badge variant="destructive">High Risk (Score {Math.floor(Math.random() * 20) + 70})</Badge>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>{claim.hospital}</span>
                          <span>₹{claim.cost.toLocaleString('en-IN')}</span>
                        </div>
                        <Separator className="mt-4" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </>
        )
      case "Claims Queue":
        return (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Manual Adjudication Queue</CardTitle>
                <CardDescription>Review claims that were flagged by the STP engine.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Hospital</TableHead>
                      <TableHead>Trigger Rule</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingClaims.length === 0 ? (
                      <TableRow><TableCell colSpan={5} className="text-center py-8">Queue is empty!</TableCell></TableRow>
                    ) : pendingClaims.map(claim => (
                      <TableRow key={claim.id}>
                        <TableCell className="font-mono">{claim.id}</TableCell>
                        <TableCell>{claim.hospital}</TableCell>
                        <TableCell className="text-warning font-medium">{claim.ruleTriggered || 'Unknown'}</TableCell>
                        <TableCell>₹{claim.cost.toLocaleString('en-IN')}</TableCell>
                        <TableCell>
                           <Button size="sm" onClick={() => setActiveView("Dashboard")}>Review</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        )
      case "Provider Network":
        return (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Provider Network</CardTitle>
                <CardDescription>Manage hospital empanelment.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border border-border rounded-lg flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-bold">Apollo Hospitals</h3>
                    <p className="text-sm text-muted-foreground">Tier 1 • SLA: 98%</p>
                  </div>
                  <Badge className="bg-success text-white">Active</Badge>
                </div>
                <div className="p-4 border border-border rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">City Care Clinic</h3>
                    <p className="text-sm text-muted-foreground">Tier 3 • SLA: 85%</p>
                  </div>
                  <Badge className="bg-warning text-white">Probation</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      case "Fraud Engine":
        return (
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Fraud Detection Patterns</CardTitle>
                <CardDescription>AI insights on systemic fraud attempts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="p-6 bg-error-muted border border-error-border rounded-xl flex gap-4">
                    <AlertTriangle className="text-error w-8 h-8 shrink-0" />
                    <div>
                      <h4 className="font-bold text-error-foreground">High frequency of ICD A09 (Gastroenteritis)</h4>
                      <p className="text-sm text-error-foreground mt-1">Detected a 300% spike in admissions for gastroenteritis from Pin Code 500033 over the last 48 hours.</p>
                      <Button variant="outline" size="sm" className="mt-4 border-error text-error hover:bg-error hover:text-white">Investigate</Button>
                    </div>
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
    <AppLayout title="TPA Adjudication Portal" navGroups={navGroups} headerContent={headerContent}>
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
