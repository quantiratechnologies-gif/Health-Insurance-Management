import { ShieldHalf, Users, PlusCircle, FileCheck, CheckCircle2, XCircle, Clock, Search, LogOut, Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"

export default function HospitalPortal() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white border-r border-slate-800 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <ShieldHalf className="w-5 h-5 text-slate-900" />
          </div>
          <span className="font-bold text-xl tracking-tight">Provider Hub</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl font-medium">
            <Users className="w-5 h-5" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
            <FileCheck className="w-5 h-5" /> Verify Eligibility
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
            <PlusCircle className="w-5 h-5" /> Submit Pre-Auth
          </a>
        </nav>
        
        <div className="p-4 mt-auto border-t border-slate-800">
          <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-white hover:bg-white/5" onClick={() => navigate('/')}>
            <LogOut className="w-5 h-5 mr-3" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <h1 className="text-2xl font-bold">Apollo Hospitals, Jubilee Hills</h1>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input className="pl-10 w-64 bg-slate-50 border-slate-200 rounded-full" placeholder="Search patient ID..." />
            </div>
            <button className="relative p-2 text-slate-400 hover:text-primary transition-colors">
              <Bell className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <div className="text-right">
                <p className="text-sm font-bold">Billing Dept</p>
                <p className="text-xs text-slate-500">ID: PRV-8492</p>
              </div>
              <Avatar>
                <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">AH</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-8">
          
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-800">Pre-Auth Requests (Today)</h2>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white"><PlusCircle className="w-4 h-4 mr-2" /> New Request</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-sm border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Pending</p>
                    <h3 className="text-2xl font-bold mt-1">12</h3>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500 opacity-20" />
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-sm border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Approved (STP)</p>
                    <h3 className="text-2xl font-bold mt-1">45</h3>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-primary opacity-20" />
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-sm border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Rejected</p>
                    <h3 className="text-2xl font-bold mt-1">3</h3>
                  </div>
                  <XCircle className="w-8 h-8 text-destructive opacity-20" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm border-slate-200">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle>Recent Patient Submissions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="w-[100px]">Req ID</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Est. Cost</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">REQ-9923</TableCell>
                    <TableCell>Rajesh Kumar</TableCell>
                    <TableCell>Cardiac Bypass</TableCell>
                    <TableCell>₹3,50,000</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending TPA</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">REQ-9922</TableCell>
                    <TableCell>Sunita Sharma</TableCell>
                    <TableCell>Cataract Surgery</TableCell>
                    <TableCell>₹45,000</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved (STP)</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
