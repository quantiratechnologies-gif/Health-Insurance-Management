import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Building2, User, ShieldCheck, Loader2, Activity } from "lucide-react"
import { Logo } from "./components/Logo"
import { motion } from "framer-motion"

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
import TPAPortal from './pages/TPAPortal'
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
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Premium Background Gradients */}
      <div className="absolute top-0 left-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-8 cursor-pointer z-10" 
        onClick={() => navigate('/knowledge-base')}
      >
        <Logo className="h-10 w-auto" />
        <p className="text-muted-foreground mt-3 font-medium tracking-wide text-sm">UNIFIED PLATFORM ACCESS</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-[420px] z-10"
      >
        <Tabs defaultValue="patient" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="patient" className="flex gap-2"><User className="w-4 h-4" /> Patient</TabsTrigger>
            <TabsTrigger value="hospital" className="flex gap-2"><Building2 className="w-4 h-4" /> Provider</TabsTrigger>
            <TabsTrigger value="tpa" className="flex gap-2"><Activity className="w-4 h-4" /> TPA</TabsTrigger>
            <TabsTrigger value="admin" className="flex gap-2"><ShieldCheck className="w-4 h-4" /> Admin</TabsTrigger>
          </TabsList>
          
          <TabsContent value="patient">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-xl">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl font-bold tracking-tight">Member Portal</CardTitle>
                <CardDescription>Sign in to manage your health policies and claims.</CardDescription>
              </CardHeader>
              <form onSubmit={(e) => handleLogin(e, '/patient')}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-email">Email or Policy ID</Label>
                    <Input id="patient-email" type="text" placeholder="m.doe@example.com" required className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="patient-password">Password</Label>
                      <a href="#" className="text-xs text-primary font-medium hover:underline">Forgot password?</a>
                    </div>
                    <Input id="patient-password" type="password" required className="bg-white" />
                  </div>
                </CardContent>
                <CardFooter className="pt-2 pb-6">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Authenticating...</> : "Sign In"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="hospital">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-xl">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl font-bold tracking-tight">Provider Portal</CardTitle>
                <CardDescription>Access patient eligibility and submit pre-auths.</CardDescription>
              </CardHeader>
              <form onSubmit={(e) => handleLogin(e, '/hospital')}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hospital-id">Provider Registration ID</Label>
                    <Input id="hospital-id" type="text" placeholder="PRV-8492" required className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="hospital-password">Password</Label>
                      <a href="#" className="text-xs text-primary font-medium hover:underline">Forgot password?</a>
                    </div>
                    <Input id="hospital-password" type="password" required className="bg-white" />
                  </div>
                </CardContent>
                <CardFooter className="pt-2 pb-6">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Authenticating...</> : "Sign In to Provider Portal"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="tpa">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-xl">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl font-bold tracking-tight">TPA Portal</CardTitle>
                <CardDescription>Manage claims, pre-auths, and AI predictions.</CardDescription>
              </CardHeader>
              <form onSubmit={(e) => handleLogin(e, '/tpa')}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tpa-email">TPA Email</Label>
                    <Input id="tpa-email" type="email" placeholder="tpa@healthsure.com" required className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="tpa-password">Password</Label>
                      <a href="#" className="text-xs text-primary font-medium hover:underline">Forgot password?</a>
                    </div>
                    <Input id="tpa-password" type="password" required className="bg-white" />
                  </div>
                </CardContent>
                <CardFooter className="pt-2 pb-6">
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                    {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Authenticating...</> : "Sign In to TPA Portal"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-xl">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl font-bold tracking-tight">System Admin</CardTitle>
                <CardDescription>Secure access for claim adjudication and rule engines.</CardDescription>
              </CardHeader>
              <form onSubmit={(e) => handleLogin(e, '/admin')}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input id="admin-email" type="email" placeholder="admin@healthsure.com" required className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="admin-password">Password</Label>
                      <a href="#" className="text-xs text-muted-foreground font-medium hover:underline">SSO Recovery</a>
                    </div>
                    <Input id="admin-password" type="password" required className="bg-white" />
                  </div>
                </CardContent>
                <CardFooter className="pt-2 pb-6">
                  <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" disabled={isLoading}>
                    {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Authenticating...</> : "Secure Admin Login"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 text-center z-10"
      >
        <Button variant="link" onClick={() => navigate('/knowledge-base')} className="text-muted-foreground font-medium">
          Explore Knowledge Base &rarr;
        </Button>
        <div className="text-sm text-muted-foreground mt-2 font-medium">
          &copy; 2026 HealthSure TPA Systems.
        </div>
      </motion.div>
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
        <Route path="/tpa" element={<TPAPortal />} />
        <Route path="/knowledge-base" element={<KnowledgeBase />} />
      </Routes>
    </Router>
  )
}

export default App
