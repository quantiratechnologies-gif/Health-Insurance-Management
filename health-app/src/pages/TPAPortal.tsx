import { ShieldAlert, Server, CheckCircle2, AlertTriangle, Bell, Activity, Users, Database } from "lucide-react"
import { AppLayout, NavGroup } from "../components/AppLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useStore } from "../store/useStore"
import { motion, Variants } from "framer-motion"
import { toast } from "sonner"

export default function TPAPortal() {
  const { claims, resolveClaim } = useStore()

  const autoApproved = claims.filter(c => c.status === 'Auto-Approved').length
  const totalClaims = claims.length
  const autoApproveRate = totalClaims > 0 ? Math.round((autoApproved / totalClaims) * 100) : 0
  const manualReviewReq = claims.filter(c => c.status === 'Flagged').length
  const manualRate = totalClaims > 0 ? Math.round((manualReviewReq / totalClaims) * 100) : 0
  const hardRejected = claims.filter(c => c.status === 'Rejected').length
  const rejectRate = totalClaims > 0 ? Math.round((hardRejected / totalClaims) * 100) : 0

  const navGroups: NavGroup[] = [
    {
      title: "OPERATIONS",
      items: [
        { label: "Dashboard", icon: Activity, active: true },
        { label: "Provider Network", icon: ShieldAlert },
        { label: "Member Directory", icon: Users },
        { label: "Fraud Engine", icon: AlertTriangle }
      ]
    },
    {
      title: "SYSTEM",
      items: [
        { label: "Audit Logs", icon: Activity },
        { label: "Rule Engine", icon: Database },
      ]
    }
  ]

  const headerContent = (
    <>
      <Badge variant="secondary" className="flex items-center gap-2 px-3 py-1 bg-success-muted text-success-foreground rounded-full text-sm font-bold border-none">
        <Server className="w-4 h-4" /> Systems Operational
      </Badge>
      <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary transition-colors cursor-pointer">
        <Bell className="w-6 h-6" />
      </Button>
      <div className="flex items-center gap-3 border-l border-border pl-6">
        <div className="text-right">
          <p className="text-sm font-bold">Third Party Admin</p>
          <p className="text-xs text-muted-foreground">TPA Operations</p>
        </div>
        <Avatar>
          <AvatarFallback className="bg-primary/20 text-primary font-bold">TPA</AvatarFallback>
        </Avatar>
      </div>
    </>
  )

  const handleResolve = (id: string, action: 'Approve' | 'Reject') => {
    resolveClaim(id, action)
    if (action === 'Approve') {
      toast.success("Claim Approved", { description: `Claim ${id} manually approved.` })
    } else {
      toast.error("Claim Rejected", { description: `Claim ${id} manually rejected.` })
    }
  }

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
    <AppLayout title="TPA Portal" navGroups={navGroups} headerContent={headerContent}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-1 overflow-auto p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-border h-full">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Claims</p>
                    <h3 className="text-3xl font-bold mt-1">{totalClaims}</h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-border border-l-4 border-l-success h-full">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Auto-Approved</p>
                    <h3 className="text-3xl font-bold mt-1 text-success">{autoApproveRate}%</h3>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-success opacity-20" />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-border border-l-4 border-l-warning h-full">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Manual Review</p>
                    <h3 className="text-3xl font-bold mt-1 text-warning">{manualRate}%</h3>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-warning opacity-20" />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-border border-l-4 border-l-error h-full">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Hard Rejected</p>
                    <h3 className="text-3xl font-bold mt-1 text-error">{rejectRate}%</h3>
                  </div>
                  <ShieldAlert className="w-8 h-8 text-error opacity-20" />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <Card className="shadow-sm border-border">
              <CardHeader className="border-b border-border pb-4 bg-muted/50">
                <CardTitle>Live AI Adjudication Stream</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted hover:bg-muted">
                      <TableHead className="w-[100px]">Claim ID</TableHead>
                      <TableHead>Algorithm Score</TableHead>
                      <TableHead>Rule Triggered</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Decision</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {claims.map(claim => (
                      <TableRow key={claim.id}>
                        <TableCell className="font-mono text-xs">{claim.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full" style={{
                                width: `${claim.score}%`,
                                backgroundColor: (claim.score || 0) > 80 ? 'hsl(var(--success))' : (claim.score || 0) > 40 ? 'hsl(var(--warning))' : 'hsl(var(--error))'
                              }}></div>
                            </div>
                            <span className="text-xs text-muted-foreground">{claim.score}%</span>
                          </div>
                        </TableCell>
                        <TableCell className={`text-sm font-medium ${(claim.score || 0) < 50 ? 'text-error' : 'text-muted-foreground'}`}>
                          {claim.ruleTriggered}
                        </TableCell>
                        <TableCell>₹{claim.cost.toLocaleString('en-IN')}</TableCell>
                        <TableCell>
                           {claim.status === 'Auto-Approved' || claim.status === 'Manual-Approved' ? (
                             <Badge variant="outline" className="bg-success-muted text-success-foreground border-success-border">{claim.status}</Badge>
                          ) : claim.status === 'Rejected' ? (
                             <Badge variant="outline" className="bg-error-muted text-error-foreground border-error-border">Rejected</Badge>
                          ) : (
                             <Badge variant="outline" className="bg-warning-muted text-warning-foreground border-warning-border">{claim.status}</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {claim.status === 'Flagged' || claim.status === 'Pending TPA' ? (
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleResolve(claim.id, 'Approve')} className="bg-success hover:bg-success/90 text-white cursor-pointer">Approve</Button>
                              <Button size="sm" onClick={() => handleResolve(claim.id, 'Reject')} variant="destructive" className="cursor-pointer">Reject</Button>
                            </div>
                          ) : (
                            <Button variant="ghost" size="sm" className="text-primary" disabled>Resolved</Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
    </AppLayout>
  )
}
