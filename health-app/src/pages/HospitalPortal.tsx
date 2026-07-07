import { Users, PlusCircle, FileCheck, CheckCircle2, XCircle, Clock, Search, Bell } from "lucide-react"
import { AppLayout, NavLink } from "../components/AppLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useStore } from "../store/useStore"
import { useState } from "react"

export default function HospitalPortal() {
  const { claims, submitClaim } = useStore()
  const [open, setOpen] = useState(false)

  // Form State
  const [patientId, setPatientId] = useState('')
  const [patientName, setPatientName] = useState('')
  const [treatment, setTreatment] = useState('')
  const [cost, setCost] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitClaim({
      patientId,
      patientName,
      treatment,
      cost: Number(cost),
      hospital: 'Apollo Hospitals, Jubilee Hills'
    })
    setOpen(false)
    setPatientId('')
    setPatientName('')
    setTreatment('')
    setCost('')
  }

  const hospitalClaims = claims.filter(c => c.hospital === 'Apollo Hospitals, Jubilee Hills')
  const pendingCount = hospitalClaims.filter(c => c.status === 'Pending TPA' || c.status === 'Flagged').length
  const approvedCount = hospitalClaims.filter(c => c.status === 'Auto-Approved' || c.status === 'Manual-Approved').length
  const rejectedCount = hospitalClaims.filter(c => c.status === 'Rejected').length

  const navLinks: NavLink[] = [
    { label: "Dashboard", icon: Users, active: true },
    { label: "Verify Eligibility", icon: FileCheck },
  ]

  const headerContent = (
    <>
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <Input className="pl-10 w-64 bg-slate-50 border-slate-200 rounded-full" placeholder="Search patient ID..." />
      </div>
      <button className="relative p-2 text-slate-400 hover:text-primary transition-colors cursor-pointer">
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
    </>
  )

  return (
    <AppLayout title="Provider Hub" navLinks={navLinks} headerContent={headerContent}>
        <div className="flex-1 overflow-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-800">Apollo Hospitals, Jubilee Hills</h2>
            
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"><PlusCircle className="w-4 h-4 mr-2" /> New Request</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Submit Pre-Auth</DialogTitle>
                  <DialogDescription>
                    Enter patient details to trigger the STP Adjudication Engine.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="patientId">Policy ID</Label>
                      <Input id="patientId" value={patientId} onChange={e => setPatientId(e.target.value)} placeholder="HS-89302" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Patient Name</Label>
                      <Input id="name" value={patientName} onChange={e => setPatientName(e.target.value)} placeholder="Vempati Vamshi Krishna" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="treatment">Diagnosis / Treatment</Label>
                      <Input id="treatment" value={treatment} onChange={e => setTreatment(e.target.value)} placeholder="Cataract Surgery" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cost">Estimated Cost (₹)</Label>
                      <Input id="cost" type="number" value={cost} onChange={e => setCost(e.target.value)} placeholder="45000" required />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Submit to TPA</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-sm border-slate-200">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Pending</p>
                  <h3 className="text-2xl font-bold mt-1">{pendingCount}</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-slate-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-200">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Approved (STP)</p>
                  <h3 className="text-2xl font-bold mt-1 text-green-600">{approvedCount}</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-200">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Rejected</p>
                  <h3 className="text-2xl font-bold mt-1 text-red-600">{rejectedCount}</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle>Recent Patient Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hospitalClaims.map(claim => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium font-mono text-xs">{claim.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{claim.patientName}</div>
                        <div className="text-xs text-slate-500">{claim.patientId}</div>
                      </TableCell>
                      <TableCell>{claim.treatment}</TableCell>
                      <TableCell>₹{claim.cost.toLocaleString('en-IN')}</TableCell>
                      <TableCell>
                        {claim.status === 'Pending TPA' || claim.status === 'Flagged' ? (
                           <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">{claim.status}</Badge>
                        ) : claim.status === 'Rejected' ? (
                           <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>
                        ) : (
                           <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{claim.status}</Badge>
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
