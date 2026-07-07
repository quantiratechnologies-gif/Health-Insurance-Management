import { FileText, Activity, CreditCard, Search, Bell, Settings } from "lucide-react"
import { AppLayout, NavLink } from "../components/AppLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useStore } from "../store/useStore"

export default function PatientPortal() {
  const { policies, claims } = useStore()
  
  const currentUserId = 'HS-89302'
  const policy = policies.find(p => p.id === currentUserId)
  const userClaims = claims.filter(c => c.patientId === currentUserId)

  const navLinks: NavLink[] = [
    { label: "Dashboard", icon: Activity, active: true },
    { label: "My Policies", icon: FileText },
    { label: "Track Claims", icon: CreditCard },
    { label: "Settings", icon: Settings },
  ]

  const headerContent = (
    <>
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <Input type="text" placeholder="Search..." className="pl-10 w-64 bg-slate-50 border-slate-200" />
      </div>
      <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors cursor-pointer">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>VK</AvatarFallback>
      </Avatar>
    </>
  )

  return (
    <AppLayout title="Patient Dashboard" navLinks={navLinks} headerContent={headerContent}>
        <div className="p-8 space-y-8">
          
          <h2 className="text-2xl font-bold">Good morning, Vamshi 👋</h2>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-sm border-slate-200 bg-gradient-to-br from-primary to-blue-700 text-white border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-100 flex items-center justify-between">
                  Active Policy
                  <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-0">Primary</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{policy?.planName || 'N/A'}</div>
                <p className="text-sm text-blue-100 mb-4">Valid till Dec 31, 2027</p>
                <div className="pt-4 border-t border-white/20 flex justify-between items-center text-sm">
                  <span>Coverage Limit</span>
                  <span className="font-bold text-lg">₹{policy?.totalSumInsured.toLocaleString('en-IN') || '0'}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-200">
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

            <Card className="shadow-sm border-slate-200">
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
          </div>

          {/* Recent Claims Table */}
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
          
        </div>
    </AppLayout>
  )
}
