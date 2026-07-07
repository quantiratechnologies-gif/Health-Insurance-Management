import { Activity, CreditCard, Search, Bell, Home, Shield, Heart } from "lucide-react"
import { AppLayout, NavGroup } from "../components/AppLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useStore } from "../store/useStore"
import { motion, Variants } from "framer-motion"

export default function PatientPortal() {
  const { policies, claims } = useStore()
  
  const currentUserId = 'HS-89302'
  const policy = policies.find(p => p.id === currentUserId)
  const userClaims = claims.filter(c => c.patientId === currentUserId)

  const navGroups: NavGroup[] = [
    {
      title: "MAIN MENU",
      items: [
        { label: "Dashboard", icon: Home, active: true },
        { label: "My Policies", icon: Shield },
      ]
    },
    {
      title: "CLAIMS MANAGEMENT",
      items: [
        { label: "Submit New Claim", icon: CreditCard },
        { label: "Claim Tracker", icon: Activity }
      ]
    },
    {
      title: "NETWORK & HEALTH",
      items: [
        { label: "Network Hospitals", icon: Heart },
        { label: "Health Locker (ABDM)", icon: Shield }
      ]
    }
  ]

  const headerContent = (
    <>
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <Input type="text" placeholder="Search..." className="pl-10 w-64 bg-slate-50 border-slate-200" />
      </div>
      <Button variant="ghost" size="icon" className="relative text-slate-500 hover:bg-slate-50 rounded-full transition-colors cursor-pointer">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
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

  return (
    <AppLayout title="Patient Portal" navGroups={navGroups} headerContent={headerContent}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="p-8 space-y-8"
        >
          <motion.h2 variants={itemVariants} className="text-2xl font-bold">Good morning, Vamshi 👋</motion.h2>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-slate-200 bg-gradient-to-br from-primary to-blue-700 text-white border-0 h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-blue-100 flex items-center justify-between">
                    Active Policy
                    <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-0">Primary</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{policy?.planName || 'N/A'}</div>
                  <p className="text-sm text-blue-100 mb-4">Valid till Dec 31, 2027</p>
                  
                  <div className="space-y-2 pt-2 border-t border-white/20">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-100">Available Balance</span>
                      <span className="font-bold">₹{policy?.availableBalance.toLocaleString('en-IN') || '0'}</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2 bg-white/20 [&>div]:bg-white" />
                    <div className="text-right text-xs text-blue-100">
                      of ₹{policy?.totalSumInsured.toLocaleString('en-IN') || '0'} Limit
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-slate-200 h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500 flex items-center justify-between">
                    Total Claims
                    <Activity className="w-4 h-4 text-slate-400" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">{userClaims.length}</div>
                  <p className="text-sm text-slate-500 mt-1">Submitted this year</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-slate-200 h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500 flex items-center justify-between">
                    Pending Actions
                    <Bell className="w-4 h-4 text-orange-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">0</div>
                  <p className="text-sm text-slate-500 mt-1">You are all caught up!</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Claims Table */}
          <motion.div variants={itemVariants}>
            <Card className="shadow-sm border-slate-200">
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
                             <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{claim.status}</Badge>
                          ) : claim.status === 'Rejected' ? (
                             <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>
                          ) : (
                             <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">{claim.status}</Badge>
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
