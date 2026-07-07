import { ShieldHalf, ShieldAlert, BarChart3, Server, CheckCircle2, AlertTriangle, LogOut, Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { useStore } from "../store/useStore"

export default function AdminPortal() {
  const navigate = useNavigate()
  const { claims, resolveClaim } = useStore()

  const autoApproved = claims.filter(c => c.status === 'Auto-Approved').length
  const totalClaims = claims.length
  const autoApproveRate = totalClaims > 0 ? Math.round((autoApproved / totalClaims) * 100) : 0
  const manualReviewReq = claims.filter(c => c.status === 'Flagged').length
  const manualRate = totalClaims > 0 ? Math.round((manualReviewReq / totalClaims) * 100) : 0
  const hardRejected = claims.filter(c => c.status === 'Rejected').length
  const rejectRate = totalClaims > 0 ? Math.round((hardRejected / totalClaims) * 100) : 0

  return (
    <div className="flex h-screen bg-slate-100 text-slate-900">
      <aside className="w-64 bg-slate-950 text-white border-r border-slate-800 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <ShieldHalf className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">TPA Admin</span>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl font-medium">
            <BarChart3 className="w-5 h-5 text-purple-400" /> STP Engine
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
            <ShieldAlert className="w-5 h-5" /> Fraud Detection
          </a>
        </nav>
        <div className="p-4 mt-auto border-t border-slate-800">
          <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-white hover:bg-white/5" onClick={() => navigate('/')}>
            <LogOut className="w-5 h-5 mr-3" /> Terminate Session
          </Button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <h1 className="text-2xl font-bold">Straight-Through Processing Engine</h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-bold">
              <Server className="w-4 h-4" /> Systems Operational
            </div>
            <button className="relative p-2 text-slate-400 hover:text-purple-600 transition-colors">
              <Bell className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <div className="text-right">
                <p className="text-sm font-bold">System Administrator</p>
                <p className="text-xs text-slate-500">Root Access</p>
              </div>
              <Avatar>
                <AvatarFallback className="bg-purple-100 text-purple-700 font-bold">SA</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-sm border-slate-200">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Claims Processed</p>
                  <h3 className="text-3xl font-bold mt-1">{totalClaims}</h3>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-sm border-slate-200 border-l-4 border-l-green-500">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Auto-Approved (STP)</p>
                  <h3 className="text-3xl font-bold mt-1 text-green-600">{autoApproveRate}%</h3>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-500 opacity-20" />
              </CardContent>
            </Card>
            <Card className="shadow-sm border-slate-200 border-l-4 border-l-yellow-500">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Manual Review Required</p>
                  <h3 className="text-3xl font-bold mt-1 text-yellow-600">{manualRate}%</h3>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-500 opacity-20" />
              </CardContent>
            </Card>
            <Card className="shadow-sm border-slate-200 border-l-4 border-l-red-500">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Hard Rejected (Rules)</p>
                  <h3 className="text-3xl font-bold mt-1 text-red-600">{rejectRate}%</h3>
                </div>
                <ShieldAlert className="w-8 h-8 text-red-500 opacity-20" />
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm border-slate-200">
            <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
              <CardTitle>Live AI Adjudication Stream</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
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
                          <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full" style={{
                              width: `${claim.score}%`,
                              backgroundColor: (claim.score || 0) > 80 ? '#22c55e' : (claim.score || 0) > 40 ? '#eab308' : '#ef4444'
                            }}></div>
                          </div>
                          <span className="text-xs text-slate-500">{claim.score}%</span>
                        </div>
                      </TableCell>
                      <TableCell className={`text-sm font-medium ${(claim.score || 0) < 50 ? 'text-red-500' : 'text-slate-500'}`}>
                        {claim.ruleTriggered}
                      </TableCell>
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
                      <TableCell>
                        {claim.status === 'Flagged' ? (
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => resolveClaim(claim.id, 'Approve')} className="bg-green-600 hover:bg-green-700 text-white">Approve</Button>
                            <Button size="sm" onClick={() => resolveClaim(claim.id, 'Reject')} variant="destructive">Reject</Button>
                          </div>
                        ) : (
                          <Button variant="ghost" size="sm" className="text-purple-600" disabled>Resolved</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
