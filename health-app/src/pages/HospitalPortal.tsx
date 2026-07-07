import { Users, PlusCircle, FileCheck, CheckCircle2, XCircle, Clock, Search, Bell } from "lucide-react"
import { AppLayout, NavGroup } from "../components/AppLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useStore } from "../store/useStore"
import { useState } from "react"
import { toast } from "sonner"
import { motion, Variants } from "framer-motion"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const claimFormSchema = z.object({
  patientId: z.string().regex(/^HS-\d{5}$/, "Policy ID must be in format HS-XXXXX (e.g. HS-89302)"),
  patientName: z.string().min(2, "Patient Name is required"),
  treatment: z.string().min(5, "Treatment description must be at least 5 characters"),
  cost: z.string().min(1, "Minimum cost is ₹100"),
})

export default function HospitalPortal() {
  const { claims, submitClaim } = useStore()
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof claimFormSchema>>({
    resolver: zodResolver(claimFormSchema),
    defaultValues: {
      patientId: "",
      patientName: "",
      treatment: "",
      cost: "",
    },
  })

  const onSubmit = (values: z.infer<typeof claimFormSchema>) => {
    submitClaim({
      patientId: values.patientId,
      patientName: values.patientName,
      treatment: values.treatment,
      cost: Number(values.cost),
      hospital: 'Apollo Hospitals, Jubilee Hills'
    })
    
    toast.success("Pre-Authorization Submitted", {
      description: `Claim for ${values.patientName} has been routed to the STP Engine.`,
    })

    setOpen(false)
    form.reset()
  }

  const hospitalClaims = claims.filter(c => c.hospital === 'Apollo Hospitals, Jubilee Hills')
  const pendingCount = hospitalClaims.filter(c => c.status === 'Pending TPA' || c.status === 'Flagged').length
  const approvedCount = hospitalClaims.filter(c => c.status === 'Auto-Approved' || c.status === 'Manual-Approved').length
  const rejectedCount = hospitalClaims.filter(c => c.status === 'Rejected').length

  const navGroups: NavGroup[] = [
    {
      title: "NETWORK TOOLS",
      items: [
        { label: "Dashboard", icon: Users, active: true },
        { label: "Check Eligibility", icon: FileCheck },
      ]
    },
    {
      title: "CLAIMS & AUTH",
      items: [
        { label: "Submit Claim", icon: FileCheck },
        { label: "Pre-Authorizations", icon: Users }
      ]
    }
  ]

  const headerContent = (
    <>
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-10 w-64 bg-muted border-border rounded-full" placeholder="Search patient ID..." />
      </div>
      <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary transition-colors cursor-pointer">
        <Bell className="w-6 h-6" />
      </Button>
      <div className="flex items-center gap-3 border-l border-border pl-6">
        <div className="text-right">
          <p className="text-sm font-bold">Billing Dept</p>
          <p className="text-xs text-muted-foreground">ID: PRV-8492</p>
        </div>
        <Avatar>
          <AvatarFallback className="bg-primary/20 text-primary font-bold">AH</AvatarFallback>
        </Avatar>
      </div>
    </>
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <AppLayout title="Provider Portal" navGroups={navGroups} headerContent={headerContent}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-1 overflow-auto p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-foreground">Apollo Hospitals, Jubilee Hills</h2>
            
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"><PlusCircle className="w-4 h-4 mr-2" /> New Request</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Submit Pre-Auth</DialogTitle>
                  <DialogDescription>
                    Enter patient details to trigger the STP Adjudication Engine.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="patientId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Policy ID</FormLabel>
                          <FormControl>
                            <Input placeholder="HS-89302" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="patientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Patient Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Vempati Vamshi Krishna" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="treatment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Diagnosis / Treatment</FormLabel>
                          <FormControl>
                            <Input placeholder="Cataract Surgery" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control as any}
                      name="cost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated Cost (₹)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="45000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter className="pt-4">
                      <Button type="submit">Submit to TPA</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-border">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending</p>
                    <h3 className="text-2xl font-bold mt-1">{pendingCount}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-border">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Approved (STP)</p>
                    <h3 className="text-2xl font-bold mt-1 text-success">{approvedCount}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-success-muted flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-border">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                    <h3 className="text-2xl font-bold mt-1 text-error">{rejectedCount}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-error-muted flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-error" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <Card className="shadow-sm border-border">
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
                          <div className="text-xs text-muted-foreground">{claim.patientId}</div>
                        </TableCell>
                        <TableCell>{claim.treatment}</TableCell>
                        <TableCell>₹{claim.cost.toLocaleString('en-IN')}</TableCell>
                        <TableCell>
                          {claim.status === 'Pending TPA' || claim.status === 'Flagged' ? (
                             <Badge variant="outline" className="bg-warning-muted text-warning-foreground border-warning-border">{claim.status}</Badge>
                          ) : claim.status === 'Rejected' ? (
                             <Badge variant="outline" className="bg-error-muted text-error-foreground border-error-border">Rejected</Badge>
                          ) : (
                             <Badge variant="outline" className="bg-success-muted text-success-foreground border-success-border">{claim.status}</Badge>
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
