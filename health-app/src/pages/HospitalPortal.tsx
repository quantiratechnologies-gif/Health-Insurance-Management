import { Activity, ShieldCheck, UserCheck, CheckCircle2, Search, Bell, FilePlus2, Eye } from "lucide-react"
import { AppLayout, NavGroup } from "../components/AppLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useStore, Claim } from "../store/useStore"
import { motion, Variants } from "framer-motion"
import { useState } from "react"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function HospitalPortal() {
  const { claims, submitClaim } = useStore()
  const [activeView, setActiveView] = useState("Dashboard")

  const pendingClaimsCount = claims.filter(c => c.status === 'Pending TPA' || c.status === 'Flagged').length
  const totalClaims = claims.length
  
  const [patientName, setPatientName] = useState("")
  const [patientId, setPatientId] = useState("")
  const [amount, setAmount] = useState("")
  const [treatment, setTreatment] = useState("")
  
  // Dialog States
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null)
  const [preAuthOpen, setPreAuthOpen] = useState(false)
  const [preAuthData, setPreAuthData] = useState({ patientId: "", doctorName: "", reason: "" })

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!patientId || !patientName || !amount) {
      toast.error("Please fill all required fields")
      return
    }
    submitClaim({
      patientId,
      patientName,
      hospital: "Apollo Hospitals",
      cost: parseFloat(amount),
      treatment: treatment || "General Treatment"
    })
    toast.success("Claim Submitted to STP Engine", { description: "The claim has been pushed for real-time adjudication." })
    setPatientName("")
    setPatientId("")
    setAmount("")
    setTreatment("")
    setActiveView("Dashboard")
  }

  const navGroups: NavGroup[] = [
    {
      title: "NETWORK TOOLS",
      items: [
        { label: "Dashboard", icon: Activity, active: activeView === "Dashboard", onClick: () => setActiveView("Dashboard") },
        { label: "Check Eligibility", icon: UserCheck, active: activeView === "Check Eligibility", onClick: () => setActiveView("Check Eligibility") }
      ]
    },
    {
      title: "CLAIMS & AUTH",
      items: [
        { label: "Submit Claim", icon: FilePlus2, active: activeView === "Submit Claim", onClick: () => setActiveView("Submit Claim") },
        { label: "Pre-Authorizations", icon: ShieldCheck, active: activeView === "Pre-Authorizations", onClick: () => setActiveView("Pre-Authorizations") }
      ]
    }
  ]

  const headerContent = (
    <>
      <div className="relative hidden md:block">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input type="text" placeholder="Search Patient ID..." className="pl-10 w-64 bg-muted border-border" />
      </div>
      <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:bg-muted rounded-full">
        <Bell className="w-5 h-5" />
      </Button>
      <div className="flex items-center gap-3 border-l border-border pl-4">
        <div className="text-right hidden md:block">
          <p className="text-sm font-bold leading-none text-foreground">Apollo Hospitals</p>
          <p className="text-xs text-muted-foreground mt-1">Tier 1 Provider</p>
        </div>
        <Avatar>
          <AvatarFallback className="bg-primary/10 text-primary font-bold">AH</AvatarFallback>
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

  const renderView = () => {
    switch (activeView) {
      case "Dashboard":
        return (
          <>
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-8">Provider Dashboard</motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div variants={itemVariants}>
                <Card className="shadow-sm border-border border-t-4 border-t-primary h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Submissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{totalClaims}</div>
                    <p className="text-xs font-bold text-primary mt-2">All time</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="shadow-sm border-border border-t-4 border-t-success h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">STP Auto-Approval Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">85%</div>
                    <p className="text-xs text-muted-foreground mt-2">Target: 90%</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="shadow-sm border-border border-t-4 border-t-warning h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Pending Pre-Auths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{pendingClaimsCount}</div>
                    <p className="text-xs font-bold text-warning mt-2">Requires TPA attention</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle>Recent Claim Submissions</CardTitle>
                  <Button variant="link" className="text-primary p-0">View All</Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient / ID</TableHead>
                        <TableHead>Treatment</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {claims.map((claim) => (
                        <TableRow key={claim.id}>
                          <TableCell>
                            <p className="font-bold">{claim.patientName}</p>
                            <p className="text-xs text-muted-foreground font-mono">{claim.patientId}</p>
                          </TableCell>
                          <TableCell>{claim.treatment}</TableCell>
                          <TableCell className="font-medium">₹{claim.cost.toLocaleString('en-IN')}</TableCell>
                          <TableCell>{claim.date}</TableCell>
                          <TableCell>
                            {claim.status === 'Auto-Approved' || claim.status === 'Manual-Approved' ? (
                               <Badge variant="outline" className="bg-success-muted text-success-foreground border-success-border">{claim.status}</Badge>
                            ) : claim.status === 'Rejected' ? (
                               <Badge variant="outline" className="bg-error-muted text-error-foreground border-error-border">Rejected</Badge>
                            ) : (
                               <Badge variant="outline" className="bg-warning-muted text-warning-foreground border-warning-border">{claim.status}</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" className="gap-2" onClick={() => setSelectedClaim(claim)}>
                              <Eye className="w-4 h-4" /> View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )
      case "Submit Claim":
        return (
          <motion.div variants={itemVariants}>
            <Card className="max-w-3xl mx-auto shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Submit New Claim to STP</CardTitle>
                <CardDescription>Enter patient and treatment details. The claim will be immediately processed by the AI Engine.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleClaimSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="patientId">Patient ID (e.g. HS-89302)</Label>
                      <Input id="patientId" value={patientId} onChange={e => setPatientId(e.target.value)} required placeholder="HS-XXXXX" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patientName">Patient Name</Label>
                      <Input id="patientName" value={patientName} onChange={e => setPatientName(e.target.value)} required placeholder="Full Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="treatment">Procedure / Treatment</Label>
                      <Input id="treatment" value={treatment} onChange={e => setTreatment(e.target.value)} required placeholder="e.g. Appendectomy" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Total Amount (₹)</Label>
                      <Input id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} required placeholder="0.00" />
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-muted/30">
                    <FilePlus2 className="w-10 h-10 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="font-bold text-foreground mb-1">Upload Discharge Summary & Bills</p>
                    <p className="text-sm text-muted-foreground">Drag & drop files here. Our OCR engine will parse line items automatically.</p>
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full text-lg font-bold h-12 shadow-md">
                    Process via STP Gateway
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )
      case "Check Eligibility":
        return (
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Verify Patient Eligibility</CardTitle>
                <CardDescription>Enter Member ID to check active coverage and policy balance.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-8">
                  <Input placeholder="e.g. HS-89302" className="flex-1" />
                  <Button onClick={() => toast.success("Eligibility Verified", { description: "Active Policy: Arogya Sanjeevani" })}>Check</Button>
                </div>
                <div className="p-6 border border-success-border bg-success-muted rounded-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle2 className="w-8 h-8 text-success" />
                    <div>
                      <h3 className="text-xl font-bold text-success-foreground">Active Coverage</h3>
                      <p className="text-sm text-success-foreground/80">Patient: Vamshi (HS-89302)</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 bg-background p-4 rounded-lg border border-border">
                    <div><p className="text-xs text-muted-foreground">Plan</p><p className="font-bold">Arogya Sanjeevani</p></div>
                    <div><p className="text-xs text-muted-foreground">Available Balance</p><p className="font-bold text-success">₹15,00,000</p></div>
                    <div><p className="text-xs text-muted-foreground">Room Rent Cap</p><p className="font-bold">₹5,000 / Day</p></div>
                    <div><p className="text-xs text-muted-foreground">Co-Pay</p><p className="font-bold">0%</p></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      case "Pre-Authorizations":
        return (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Pending Pre-Authorizations</CardTitle>
                <CardDescription>Track approvals for upcoming planned procedures.</CardDescription>
              </CardHeader>
              <CardContent className="py-12">
                <div className="text-center">
                  <ShieldCheck className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground font-medium text-lg">No pending requests.</p>
                  <Button variant="outline" className="mt-6" onClick={() => setPreAuthOpen(true)}>New Pre-Auth Request</Button>
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
    <AppLayout title="Provider Portal" navGroups={navGroups} headerContent={headerContent}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="p-8"
      >
        {renderView()}
      </motion.div>

      {/* Claim Details Dialog */}
      <Dialog open={!!selectedClaim} onOpenChange={(open) => !open && setSelectedClaim(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Claim Details: {selectedClaim?.id}</DialogTitle>
            <DialogDescription>Submitted on {selectedClaim?.date}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Patient Name</p>
                <p className="font-semibold">{selectedClaim?.patientName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Patient ID</p>
                <p className="font-semibold">{selectedClaim?.patientId}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Treatment</p>
                <p className="font-semibold">{selectedClaim?.treatment}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Total Cost</p>
                <p className="font-semibold">₹{selectedClaim?.cost.toLocaleString('en-IN')}</p>
              </div>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg mt-2">
              <p className="text-xs text-muted-foreground uppercase mb-1">STP Adjudication Result</p>
              <div className="flex items-center gap-2 mb-2">
                <Badge>{selectedClaim?.status}</Badge>
                <span className="text-sm font-medium">Score: {selectedClaim?.score}/100</span>
              </div>
              <p className="text-sm text-foreground"><span className="font-semibold">Rule Triggered:</span> {selectedClaim?.ruleTriggered}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedClaim(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pre-Auth Request Dialog */}
      <Dialog open={preAuthOpen} onOpenChange={setPreAuthOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request Pre-Authorisation</DialogTitle>
            <DialogDescription>Submit clinical details for planned procedures.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Patient ID</Label>
              <Input placeholder="e.g. HS-89302" value={preAuthData.patientId} onChange={(e) => setPreAuthData({ ...preAuthData, patientId: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Treating Doctor</Label>
              <Input placeholder="Dr. Name" value={preAuthData.doctorName} onChange={(e) => setPreAuthData({ ...preAuthData, doctorName: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Clinical Justification & Procedure Details</Label>
              <Textarea placeholder="Enter detailed medical necessity..." value={preAuthData.reason} onChange={(e) => setPreAuthData({ ...preAuthData, reason: e.target.value })} className="h-24" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreAuthOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success("Pre-Auth Requested Successfully", { description: "TPA is reviewing the clinical details." });
              setPreAuthOpen(false);
              setPreAuthData({ patientId: "", doctorName: "", reason: "" });
            }}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </AppLayout>
  )
}
