import { Activity, CreditCard, Search, Bell, Home, Shield, Heart, FileText } from "lucide-react"
import { AppLayout, NavGroup } from "../components/AppLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useStore } from "../store/useStore"
import { motion, Variants } from "framer-motion"
import { useState } from "react"
import { toast } from "sonner"

export default function PatientPortal() {
  const { policies, claims } = useStore()
  const [activeView, setActiveView] = useState("Dashboard")
  
  const currentUserId = 'HS-89302'
  const policy = policies.find(p => p.id === currentUserId)
  const userClaims = claims.filter(c => c.patientId === currentUserId)

  const navGroups: NavGroup[] = [
    {
      title: "MAIN MENU",
      items: [
        { label: "Dashboard", icon: Home, active: activeView === "Dashboard", onClick: () => setActiveView("Dashboard") },
        { label: "My Policies", icon: Shield, active: activeView === "My Policies", onClick: () => setActiveView("My Policies") },
      ]
    },
    {
      title: "CLAIMS MANAGEMENT",
      items: [
        { label: "Submit New Claim", icon: CreditCard, active: activeView === "Submit New Claim", onClick: () => setActiveView("Submit New Claim") },
        { label: "Claim Tracker", icon: Activity, active: activeView === "Claim Tracker", onClick: () => setActiveView("Claim Tracker") }
      ]
    },
    {
      title: "NETWORK & HEALTH",
      items: [
        { label: "Network Hospitals", icon: Heart, active: activeView === "Network Hospitals", onClick: () => setActiveView("Network Hospitals") },
        { label: "Health Locker (ABDM)", icon: Shield, active: activeView === "Health Locker", onClick: () => setActiveView("Health Locker") }
      ]
    }
  ]

  const headerContent = (
    <>
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input type="text" placeholder="Search..." className="pl-10 w-64 bg-muted border-border" />
      </div>
      <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:bg-muted rounded-full transition-colors cursor-pointer">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-white"></span>
      </Button>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>VK</AvatarFallback>
      </Avatar>
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

  const progressPercentage = policy 
    ? Math.round((policy.availableBalance / policy.totalSumInsured) * 100) 
    : 0

  const renderView = () => {
    switch (activeView) {
      case "Dashboard":
        return (
          <>
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-8">Good morning, Vamshi 👋</motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div variants={itemVariants}>
                <Card className="shadow-sm border-border bg-gradient-to-br from-primary to-secondary text-primary-foreground border-0 h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-primary-foreground/90 flex items-center justify-between">
                      Active Policy
                      <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-0">Primary</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-1">{policy?.planName || 'N/A'}</div>
                    <p className="text-sm text-primary-foreground/80 mb-4">Valid till Dec 31, 2027</p>
                    
                    <div className="space-y-2 pt-2 border-t border-white/20">
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-foreground/80">Available Balance</span>
                        <span className="font-bold">₹{policy?.availableBalance.toLocaleString('en-IN') || '0'}</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2 bg-white/20 [&>div]:bg-white" />
                      <div className="text-right text-xs text-primary-foreground/80">
                        of ₹{policy?.totalSumInsured.toLocaleString('en-IN') || '0'} Limit
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="shadow-sm border-border h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                      Total Claims
                      <Activity className="w-4 h-4 text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">{userClaims.length}</div>
                    <p className="text-sm text-muted-foreground mt-1">Submitted this year</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="shadow-sm border-border h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                      Pending Actions
                      <Bell className="w-4 h-4 text-warning" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">0</div>
                    <p className="text-sm text-muted-foreground mt-1">You are all caught up!</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-border">
                <CardHeader>
                  <CardTitle>Recent Claims History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Claim ID</TableHead>
                        <TableHead>Hospital</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userClaims.map(claim => (
                        <TableRow key={claim.id}>
                          <TableCell className="font-medium font-mono text-xs">{claim.id}</TableCell>
                          <TableCell>{claim.hospital}</TableCell>
                          <TableCell>{claim.date}</TableCell>
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
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )
      case "My Policies":
        return (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>My Policies</CardTitle>
                <CardDescription>View your active health insurance plans.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 border border-border rounded-lg bg-muted flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{policy?.planName || 'Arogya Sanjeevani'}</h3>
                    <p className="text-sm text-muted-foreground">ID: {currentUserId}</p>
                  </div>
                  <Badge className="bg-success text-white">Active</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      case "Submit New Claim":
        return (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Submit Reimbursement Claim</CardTitle>
                <CardDescription>Upload your documents to get reimbursed for out-of-network expenses.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); toast.success("Claim Submitted", { description: "Your reimbursement claim is under review." }); setActiveView("Dashboard"); }} className="space-y-4 max-w-xl">
                  <div><label className="text-sm font-medium">Hospital Name</label><Input required placeholder="Hospital Name" /></div>
                  <div><label className="text-sm font-medium">Total Amount</label><Input required type="number" placeholder="₹0" /></div>
                  <div><label className="text-sm font-medium">Date of Admission</label><Input required type="date" /></div>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground bg-muted hover:bg-muted/80 cursor-pointer transition-colors">
                     <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                     <p className="font-medium text-foreground">Upload Bills & Reports</p>
                     <p className="text-xs">PDF, JPG, PNG up to 10MB</p>
                  </div>
                  <Button type="submit" className="w-full">Submit Claim for Review</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )
      case "Claim Tracker":
        return (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Claim Tracker</CardTitle>
                <CardDescription>Detailed view of your ongoing and past claims.</CardDescription>
              </CardHeader>
              <CardContent>
                {userClaims.length > 0 ? (
                  <div className="space-y-6">
                    {userClaims.map(claim => (
                      <div key={claim.id} className="p-6 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold">{claim.hospital}</h3>
                            <p className="text-sm text-muted-foreground">{claim.treatment}</p>
                          </div>
                          <Badge variant="outline">{claim.status}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm mt-4 pt-4 border-t border-border">
                          <div><span className="text-muted-foreground">Claim ID:</span> <span className="font-mono">{claim.id}</span></div>
                          <div><span className="text-muted-foreground">Amount:</span> <span>₹{claim.cost.toLocaleString('en-IN')}</span></div>
                          <div><span className="text-muted-foreground">Date:</span> <span>{claim.date}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8 text-muted-foreground">No claims found.</div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )
      case "Network Hospitals":
        return (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Network Hospitals</CardTitle>
                <CardDescription>Find hospitals where you can avail cashless treatments.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-border rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">Apollo Hospitals</h3>
                    <p className="text-sm text-muted-foreground">Jubilee Hills, Hyderabad</p>
                  </div>
                  <Badge className="bg-success text-white">Cashless Available</Badge>
                </div>
                <div className="p-4 border border-border rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">Fortis Healthcare</h3>
                    <p className="text-sm text-muted-foreground">Bannerghatta Road, Bangalore</p>
                  </div>
                  <Badge className="bg-success text-white">Cashless Available</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      case "Health Locker":
        return (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="bg-primary text-primary-foreground rounded-t-lg mb-6 pb-6">
                <CardTitle className="text-primary-foreground">ABDM Health Locker</CardTitle>
                <CardDescription className="text-primary-foreground/80">Linked via ABHA ID: 91-1234-5678-9012</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Discharge Summary</TableCell>
                      <TableCell>Apollo Hospitals</TableCell>
                      <TableCell>14 Dec 2025</TableCell>
                      <TableCell><Button variant="link" className="text-primary p-0">View</Button></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Blood Test (CBC)</TableCell>
                      <TableCell>Dr. Lal PathLabs</TableCell>
                      <TableCell>12 Dec 2025</TableCell>
                      <TableCell><Button variant="link" className="text-primary p-0">View</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        )
      default:
        return <div>View under construction</div>
    }
  }

  return (
    <AppLayout title="Patient Portal" navGroups={navGroups} headerContent={headerContent}>
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
