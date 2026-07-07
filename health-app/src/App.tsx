import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Building2, User, ShieldCheck } from "lucide-react"
import { Logo } from "./components/Logo"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import PatientPortal from './pages/PatientPortal'
import HospitalPortal from './pages/HospitalPortal'
import AdminPortal from './pages/AdminPortal'
import KnowledgeBase from './pages/KnowledgeBase'

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent, route: string) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate(route)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-8 cursor-pointer" onClick={() => navigate('/knowledge-base')}>
        <Logo className="h-10 w-auto" />
        <p className="text-slate-500 mt-2">Unified Platform Access</p>
      </div>

      <Tabs defaultValue="patient" className="w-full max-w-[400px]">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="patient" className="flex gap-2"><User className="w-4 h-4" /> Patient</TabsTrigger>
          <TabsTrigger value="hospital" className="flex gap-2"><Building2 className="w-4 h-4" /> Hospital</TabsTrigger>
          <TabsTrigger value="admin" className="flex gap-2"><ShieldCheck className="w-4 h-4" /> Admin</TabsTrigger>
        </TabsList>
        
        {/* Patient Login */}
        <TabsContent value="patient">
          <Card className="border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle>Member Portal</CardTitle>
              <CardDescription>Sign in to manage your health policies and claims.</CardDescription>
            </CardHeader>
            <form onSubmit={(e) => handleLogin(e, '/patient')}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-email">Email or Policy ID</Label>
                  <Input id="patient-email" type="text" placeholder="m.doe@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-password">Password</Label>
                  <Input id="patient-password" type="password" required />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Authenticating..." : "Sign In to Member Portal"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Hospital Login */}
        <TabsContent value="hospital">
          <Card className="border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle>Provider Portal</CardTitle>
              <CardDescription>Access patient eligibility and submit pre-auths.</CardDescription>
            </CardHeader>
            <form onSubmit={(e) => handleLogin(e, '/hospital')}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hospital-id">Provider Registration ID</Label>
                  <Input id="hospital-id" type="text" placeholder="PRV-8492" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hospital-password">Password</Label>
                  <Input id="hospital-password" type="password" required />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Authenticating..." : "Sign In to Provider Portal"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Admin Login */}
        <TabsContent value="admin">
          <Card className="border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle>TPA / Super Admin</CardTitle>
              <CardDescription>Secure access for claim adjudication and rule engines.</CardDescription>
            </CardHeader>
            <form onSubmit={(e) => handleLogin(e, '/admin')}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input id="admin-email" type="email" placeholder="admin@healthsure.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input id="admin-password" type="password" required />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white" disabled={isLoading}>
                  {isLoading ? "Authenticating..." : "Secure Admin Login"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 text-center">
        <Button variant="link" onClick={() => navigate('/knowledge-base')} className="text-slate-500">
          Explore Knowledge Base &rarr;
        </Button>
        <div className="text-sm text-slate-400 mt-2">
          &copy; 2026 HealthSure TPA Systems.
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/patient" element={<PatientPortal />} />
        <Route path="/hospital" element={<HospitalPortal />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/knowledge-base" element={<KnowledgeBase />} />
      </Routes>
    </Router>
  )
}

export default App
