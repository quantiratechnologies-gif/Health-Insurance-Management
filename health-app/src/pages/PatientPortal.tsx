import { ShieldHalf, FileText, Activity, CreditCard, LogOut, Search, Bell, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"

export default function PatientPortal() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <ShieldHalf className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">HealthSure</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl font-medium">
            <Activity className="w-5 h-5" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors">
            <FileText className="w-5 h-5" /> My Policies
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors">
            <CreditCard className="w-5 h-5" /> Track Claims
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </a>
        </nav>
        
        <div className="p-4 mt-auto border-t border-slate-200">
          <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-destructive" onClick={() => navigate('/')}>
            <LogOut className="w-5 h-5 mr-3" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <h1 className="text-2xl font-bold">Good morning, Vamshi 👋</h1>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input className="pl-10 w-64 bg-slate-50 border-slate-200 rounded-full" placeholder="Search claims or policies..." />
            </div>
            <button className="relative p-2 text-slate-400 hover:text-primary transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <div className="text-right">
                <p className="text-sm font-bold">Vempati Vamshi Krishna</p>
                <p className="text-xs text-slate-500">Member ID: HS-89302</p>
              </div>
              <Avatar>
                <AvatarImage src="https://ui.shadcn.com/avatars/02.png" />
                <AvatarFallback>VK</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-8">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-sm border-slate-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Active Policy</p>
                    <h3 className="text-xl font-bold mt-1">Arogya Sanjeevani</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldHalf className="w-5 h-5" />
                  </div>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none">Active • Renews in 45 days</Badge>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Total Sum Insured</p>
                    <h3 className="text-xl font-bold mt-1">₹5,00,000</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <CreditCard className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-sm text-slate-500">₹4,20,000 balance remaining</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-200 bg-primary text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm font-medium text-primary-foreground/80">Total Claims This Year</p>
                    <h3 className="text-3xl font-bold mt-1">2</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="w-full bg-white text-primary hover:bg-slate-50">File a New Claim</Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Claims Table */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle>Recent Claims</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="w-[100px]">Claim ID</TableHead>
                    <TableHead>Hospital</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">CLM-98231</TableCell>
                    <TableCell>Apollo Hospitals, Jubilee Hills</TableCell>
                    <TableCell>Oct 12, 2025</TableCell>
                    <TableCell>₹45,000</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Settled (STP)</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">CLM-84920</TableCell>
                    <TableCell>Yashoda Hospitals</TableCell>
                    <TableCell>Jun 04, 2025</TableCell>
                    <TableCell>₹35,000</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Settled (Manual)</Badge>
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
