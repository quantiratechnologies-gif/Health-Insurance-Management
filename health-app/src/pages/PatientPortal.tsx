import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Shield, CreditCard, Activity, Heart, Lock, LifeBuoy,
  Download, RefreshCw, Send, Upload, CheckCircle2, Circle,
  ChevronRight, Phone, MessageCircle, FileText, AlertCircle,
} from 'lucide-react';
import { AppLayout, NavGroup } from '../components/AppLayout';
import { useStore } from '../store/useStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

import { toast } from 'sonner';

// ---------------------------------------------------------------------------
// Constants / mock data
// ---------------------------------------------------------------------------
const CURRENT_USER_ID = 'HS-89302';

const NAV_GROUPS: NavGroup[] = [
  {
    title: 'MAIN MENU',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'my-policies', label: 'My Policies', icon: Shield },
    ],
  },
  {
    title: 'CLAIMS',
    items: [
      { id: 'submit-claim', label: 'Submit New Claim', icon: CreditCard },
      { id: 'claim-tracker', label: 'Claim Tracker', icon: Activity },
    ],
  },
  {
    title: 'NETWORK & HEALTH',
    items: [
      { id: 'network-hospitals', label: 'Network Hospitals', icon: Heart },
      { id: 'health-locker', label: 'Health Locker / ABDM', icon: Lock },
      { id: 'support', label: 'Support', icon: LifeBuoy },
    ],
  },
];

const HOSPITALS = [
  { name: 'Apollo Hospitals', tier: 'Tier 1', location: 'Jubilee Hills', cashless: true, specialty: 'Multi-Speciality' },
  { name: 'Fortis Healthcare', tier: 'Tier 1', location: 'Bangalore', cashless: true, specialty: 'Cardiac & Neurology' },
  { name: 'Max Super Speciality', tier: 'Tier 2', location: 'Delhi', cashless: true, specialty: 'Orthopaedics' },
  { name: 'KIMS Hospital', tier: 'Tier 1', location: 'Hyderabad', cashless: true, specialty: 'Oncology' },
  { name: 'Manipal Hospital', tier: 'Tier 2', location: 'Bangalore', cashless: true, specialty: 'Transplants' },
  { name: 'Aster CMI', tier: 'Tier 2', location: 'Bangalore', cashless: true, specialty: 'Gastroenterology' },
];

const HEALTH_DOCS = [
  { id: 'd1', name: 'Discharge Summary', source: 'Apollo Hospitals', date: 'Dec 2025', type: 'Discharge Summary', summary: 'Patient admitted for acute appendicitis. Appendectomy performed successfully. Discharged after 3 days of post-op care. No complications noted.' },
  { id: 'd2', name: 'Blood Test – CBC', source: 'Lal PathLabs', date: 'Dec 2025', type: 'Lab Report', summary: 'Complete Blood Count shows Hb: 13.2 g/dL, WBC: 7200/μL, Platelets: 2.1 lakh/μL. All values within normal range.' },
  { id: 'd3', name: 'Prescription', source: 'City Care Clinic', date: 'Nov 2025', type: 'Prescription', summary: 'Azithromycin 500mg OD × 5 days. Pantoprazole 40mg BD × 10 days. Paracetamol 650mg SOS.' },
  { id: 'd4', name: 'ECG Report', source: 'Cardiac Center', date: 'Oct 2025', type: 'Diagnostic Report', summary: 'Sinus rhythm, normal axis, no ST-T wave changes. Heart rate 72 bpm. QTc 420ms. No ectopic activity observed.' },
  { id: 'd5', name: 'Vaccination Record', source: 'PHC Hyderabad', date: 'Sep 2025', type: 'Immunisation', summary: 'Covaxin booster administered. Hepatitis B booster (3rd dose) administered. COVID-19 bivalent booster administered. Next due: Sep 2026.' },
];

const MOCK_CHAT = [
  { from: 'bot', text: 'Hello! How can I help you today?' },
  { from: 'user', text: 'My claim status?' },
  { from: 'bot', text: 'Claim CLM-98231 is Auto-Approved. Settlement of ₹45,000 is being processed.' },
];

function rand5() {
  return Math.floor(10000 + Math.random() * 90000);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

function getClaimStatusColor(status: string) {
  if (status === 'Auto-Approved' || status === 'Manual-Approved') return 'bg-green-100 text-green-700 border-green-200';
  if (status === 'Rejected') return 'bg-red-100 text-red-700 border-red-200';
  if (status === 'Pending TPA') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  return 'bg-blue-100 text-blue-700 border-blue-200';
}

type StepState = 'done' | 'active' | 'pending';

function claimSteps(status: string): StepState[] {
  // Steps: Submitted, Under Review, TPA Decision, Settled
  if (status === 'Auto-Approved' || status === 'Manual-Approved') return ['done', 'done', 'done', 'done'];
  if (status === 'Rejected') return ['done', 'done', 'done', 'pending'];
  if (status === 'Pending TPA') return ['done', 'done', 'active', 'pending'];
  return ['done', 'active', 'pending', 'pending']; // Pending
}

const STEP_LABELS = ['Submitted', 'Under Review', 'TPA Decision', 'Settled'];

// ---------------------------------------------------------------------------
// Sub-views
// ---------------------------------------------------------------------------

// ── Dashboard ───────────────────────────────────────────────────────────────
function DashboardView({ claims }: { claims: any[] }) {
  const [preAuthOpen, setPreAuthOpen] = useState(false);
  const [diagnosis, setDiagnosis] = useState('');
  const [hospital, setHospital] = useState('');
  const [expectedDate, setExpectedDate] = useState('');

  function handlePreAuth() {
    if (!diagnosis || !hospital || !expectedDate) {
      toast.error('Please fill all fields');
      return;
    }
    setPreAuthOpen(false);
    toast.success(`Pre-Auth Request PAR-${rand5()} submitted successfully!`);
    setDiagnosis(''); setHospital(''); setExpectedDate('');
  }

  const recentClaims = claims.slice(0, 5);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Vamshi 👋</h1>
        <p className="text-gray-500 text-sm mt-1">Here's your health insurance snapshot for today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Policy card */}
        <Card className="col-span-1 border-0 shadow-md overflow-hidden">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Active Policy</p>
            <h2 className="text-xl font-bold mt-1">Family Floater Gold</h2>
            <p className="text-xs opacity-70 mt-0.5">Policy No: HLTH-2024-98302</p>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Available Balance</span>
                <span>₹3,75,000 / ₹5,00,000</span>
              </div>
              <Progress value={75} className="h-2 bg-white/30 [&>div]:bg-white" />
            </div>
          </div>
        </Card>

        {/* Total claims */}
        <Card className="border-0 shadow-md flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-widest">Total Claims Filed</CardDescription>
            <CardTitle className="text-4xl font-extrabold text-blue-600">{claims.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Across all policy periods</p>
          </CardContent>
        </Card>

        {/* Upcoming renewals */}
        <Card className="border-0 shadow-md flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-widest">Upcoming Renewals</CardDescription>
            <CardTitle className="text-4xl font-extrabold text-amber-500">1</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Due in Dec 2027</p>
            <Button size="sm" variant="outline" className="mt-3 w-full text-xs">Renew Now</Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick action */}
      <div className="flex items-center gap-3">
        <Button onClick={() => setPreAuthOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          <CreditCard className="w-4 h-4" /> Request Pre-Auth
        </Button>
      </div>

      {/* Recent claims table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-base">Recent Claims</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim ID</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentClaims.length === 0 && (
                <TableRow><TableCell colSpan={5} className="text-center text-gray-400 py-6">No claims found</TableCell></TableRow>
              )}
              {recentClaims.map((c: any) => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono text-xs">{c.id}</TableCell>
                  <TableCell>{c.hospitalName ?? 'N/A'}</TableCell>
                  <TableCell>{formatINR(c.claimedAmount ?? c.amount ?? 0)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs ${getClaimStatusColor(c.status)}`}>{c.status}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-gray-500">{c.admissionDate ?? c.date ?? '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pre-Auth Dialog */}
      <Dialog open={preAuthOpen} onOpenChange={setPreAuthOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request Pre-Authorisation</DialogTitle>
            <DialogDescription>Fill in the details below. Our team will review within 2 hours.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Diagnosis / Procedure</Label>
              <Input placeholder="e.g. Appendectomy" value={diagnosis} onChange={e => setDiagnosis(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Hospital Name</Label>
              <Input placeholder="e.g. Apollo Hospitals, Jubilee Hills" value={hospital} onChange={e => setHospital(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Admission Date</Label>
              <Input type="date" value={expectedDate} onChange={e => setExpectedDate(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreAuthOpen(false)}>Cancel</Button>
            <Button onClick={handlePreAuth} className="bg-blue-600 hover:bg-blue-700 text-white">Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

// ── My Policies ──────────────────────────────────────────────────────────────
function MyPoliciesView() {
  const [renewOpen, setRenewOpen] = useState(false);
  const sumInsured = 500000;
  const balance = 375000;
  const used = sumInsured - balance;
  const pct = Math.round((used / sumInsured) * 100);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Policies</h1>
        <p className="text-gray-500 text-sm mt-1">All your active health insurance plans.</p>
      </div>

      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <Badge className="bg-white/20 text-white border-white/30 mb-2">Active</Badge>
              <h2 className="text-2xl font-bold">Family Floater Gold</h2>
              <p className="text-xs opacity-80 mt-0.5">Policy No: HLTH-2024-98302 | UIN: IRDAI-HLT-2024</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-teal-400/30 text-teal-100 border-teal-300/40 text-xs">
                🔗 ABHA Linked
              </Badge>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="opacity-70 text-xs uppercase">Sum Insured</p>
              <p className="font-bold text-lg">{formatINR(sumInsured)}</p>
            </div>
            <div>
              <p className="opacity-70 text-xs uppercase">Available Balance</p>
              <p className="font-bold text-lg">{formatINR(balance)}</p>
            </div>
            <div>
              <p className="opacity-70 text-xs uppercase">Valid Until</p>
              <p className="font-bold text-lg">Dec 2027</p>
            </div>
            <div>
              <p className="opacity-70 text-xs uppercase">Members Covered</p>
              <p className="font-bold text-lg">4</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1 opacity-80">
              <span>Used: {formatINR(used)}</span>
              <span>{pct}% utilised</span>
            </div>
            <Progress value={pct} className="h-2 bg-white/30 [&>div]:bg-white" />
          </div>
        </div>

        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
            {[
              { label: 'Room Rent Limit', value: '₹5,000 / day' },
              { label: 'Co-Pay', value: '0%' },
              { label: 'Pre-Hospitalisation', value: '30 days' },
              { label: 'Post-Hospitalisation', value: '60 days' },
              { label: 'Day Care Procedures', value: 'Covered' },
              { label: 'Maternity Benefit', value: '₹50,000' },
            ].map(item => (
              <div key={item.label}>
                <p className="text-xs text-gray-400 uppercase tracking-wide">{item.label}</p>
                <p className="font-semibold text-gray-800 mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>

          <Separator className="my-5" />

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => toast.success('e-Policy Card downloaded successfully!')}
              variant="outline"
              className="gap-2"
            >
              <Download className="w-4 h-4" /> Download e-Policy Card
            </Button>
            <Button
              onClick={() => setRenewOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Renew Policy
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={renewOpen} onOpenChange={setRenewOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Renew Your Policy</DialogTitle>
            <DialogDescription>
              Your policy is valid until Dec 2027. Would you like to initiate early renewal?
            </DialogDescription>
          </DialogHeader>
          <div className="py-3 text-sm text-gray-600 space-y-2">
            <p>Plan: <strong>Family Floater Gold</strong></p>
            <p>Premium: <strong>₹18,500/year</strong> (incl. GST)</p>
            <p>New validity: <strong>Dec 2028</strong></p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenewOpen(false)}>Cancel</Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                setRenewOpen(false);
                toast.success('Policy renewal initiated! You will receive a payment link via email.');
              }}
            >
              Confirm Renewal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

// ── Submit New Claim ──────────────────────────────────────────────────────────
function SubmitClaimView() {
  const [form, setForm] = useState({
    hospitalName: '', claimType: 'Hospitalization', admissionDate: '',
    dischargeDate: '', billAmount: '', icdCode: '', notes: '',
  });
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [successOpen, setSuccessOpen] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  function handleChange(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function handleSubmit() {
    if (!form.hospitalName || !form.admissionDate || !form.billAmount) {
      toast.error('Please fill all required fields');
      return;
    }
    const id = `CLM-${rand5()}`;
    setGeneratedId(id);
    setSuccessOpen(true);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Submit New Claim</h1>
        <p className="text-gray-500 text-sm mt-1">Fill in reimbursement details and upload documents.</p>
      </div>

      <Card className="border-0 shadow-md">
        <CardContent className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Hospital Name <span className="text-red-500">*</span></Label>
              <Input placeholder="e.g. Apollo Hospitals" value={form.hospitalName} onChange={e => handleChange('hospitalName', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Claim Type</Label>
              <select
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.claimType}
                onChange={e => handleChange('claimType', e.target.value)}
              >
                <option>Hospitalization</option>
                <option>Day Care</option>
                <option>Maternity</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Admission Date <span className="text-red-500">*</span></Label>
              <Input type="date" value={form.admissionDate} onChange={e => handleChange('admissionDate', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Discharge Date</Label>
              <Input type="date" value={form.dischargeDate} onChange={e => handleChange('dischargeDate', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Bill Amount (₹) <span className="text-red-500">*</span></Label>
              <Input type="number" placeholder="0" value={form.billAmount} onChange={e => handleChange('billAmount', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>ICD-10 Code</Label>
              <Input placeholder="e.g. K35.2" value={form.icdCode} onChange={e => handleChange('icdCode', e.target.value)} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Additional Notes</Label>
            <textarea
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] resize-none"
              placeholder="Any additional information for the TPA..."
              value={form.notes}
              onChange={e => handleChange('notes', e.target.value)}
            />
          </div>

          {/* File upload drop zone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => {
              e.preventDefault(); setDragging(false);
              const names = Array.from(e.dataTransfer.files).map(f => f.name);
              setFiles(prev => [...prev, ...names]);
              toast.success(`${names.length} file(s) added`);
            }}
            onClick={() => {
              // simulate file pick
              const mock = `Document_${Date.now()}.pdf`;
              setFiles(prev => [...prev, mock]);
              toast.success('File added');
            }}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/40'}`}
          >
            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 font-medium">Drag & drop files or click to upload</p>
            <p className="text-xs text-gray-400 mt-1">Bills, discharge summary, prescriptions (PDF/JPG, max 10 MB)</p>
            {files.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2 justify-center">
                {files.map((f, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{f}</Badge>
                ))}
              </div>
            )}
          </div>

          <Button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 text-sm font-semibold gap-2">
            <Send className="w-4 h-4" /> Submit Claim
          </Button>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="max-w-sm text-center">
          <div className="flex justify-center pt-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-green-600" />
            </div>
          </div>
          <DialogHeader className="text-center items-center">
            <DialogTitle className="text-xl mt-3">Claim Received!</DialogTitle>
            <DialogDescription className="text-center space-y-1 mt-1">
              <span className="block font-bold text-gray-800 text-base">{generatedId}</span>
              <span className="block text-sm">Your claim has been submitted successfully.</span>
              <span className="block text-sm text-gray-500">Expected processing in 5–7 working days.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="justify-center mt-2">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                setSuccessOpen(false);
                setForm({ hospitalName: '', claimType: 'Hospitalization', admissionDate: '', dischargeDate: '', billAmount: '', icdCode: '', notes: '' });
                setFiles([]);
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

// ── Claim Tracker ──────────────────────────────────────────────────────────
function ClaimTrackerView({ claims }: { claims: any[] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Claim Tracker</h1>
        <p className="text-gray-500 text-sm mt-1">Track the real-time status of your claims.</p>
      </div>

      {claims.length === 0 && (
        <Card className="border-0 shadow-md">
          <CardContent className="py-16 text-center text-gray-400">No claims found for your account.</CardContent>
        </Card>
      )}

      <div className="space-y-5">
        {claims.map((c: any, idx: number) => {
          const steps = claimSteps(c.status);
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
            >
              <Card className="border-0 shadow-md overflow-hidden">
                <CardHeader className="bg-gray-50 border-b pb-3 pt-4 px-5">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <p className="font-mono text-xs text-gray-400">{c.id}</p>
                      <p className="font-semibold text-gray-900">{c.hospitalName ?? 'Hospital'}</p>
                    </div>
                    <Badge variant="outline" className={`text-xs ${getClaimStatusColor(c.status)}`}>{c.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-5">
                  {/* Stepper */}
                  <div className="flex items-center gap-0 mb-5">
                    {STEP_LABELS.map((label, i) => {
                      const state = steps[i];
                      return (
                        <div key={label} className="flex items-center flex-1 last:flex-none">
                          <div className="flex flex-col items-center gap-1">
                            {state === 'done' ? (
                              <CheckCircle2 className="w-6 h-6 text-green-500" />
                            ) : state === 'active' ? (
                              <div className="w-6 h-6 rounded-full border-2 border-blue-500 bg-blue-100 flex items-center justify-center">
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                              </div>
                            ) : (
                              <Circle className="w-6 h-6 text-gray-300" />
                            )}
                            <span className={`text-[10px] font-medium text-center leading-tight ${state === 'done' ? 'text-green-600' : state === 'active' ? 'text-blue-600' : 'text-gray-400'}`}>
                              {label}
                            </span>
                          </div>
                          {i < STEP_LABELS.length - 1 && (
                            <div className={`flex-1 h-0.5 mt-[-10px] mx-1 ${steps[i + 1] === 'pending' && state !== 'done' ? 'bg-gray-200' : 'bg-green-300'}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Claim details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-gray-50 rounded-lg p-3">
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Amount Claimed</p>
                      <p className="font-semibold">{formatINR(c.claimedAmount ?? c.amount ?? 0)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Amount Approved</p>
                      <p className="font-semibold">{formatINR(c.approvedAmount ?? 0)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Admission Date</p>
                      <p className="font-semibold">{c.admissionDate ?? '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Decision</p>
                      <p className="font-semibold">{c.tpaDecision ?? c.status ?? '—'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Network Hospitals ──────────────────────────────────────────────────────
function NetworkHospitalsView() {
  const [preAuthHosp, setPreAuthHosp] = useState<string | null>(null);
  const [paDiagnosis, setPaDiagnosis] = useState('');
  const [paDate, setPaDate] = useState('');
  const [paCost, setPaCost] = useState('');

  function handlePreAuth() {
    if (!paDiagnosis || !paDate || !paCost) {
      toast.error('Please fill all fields');
      return;
    }
    setPreAuthHosp(null);
    toast.success(`Pre-Auth Requested (PAR-${rand5()})`);
    setPaDiagnosis(''); setPaDate(''); setPaCost('');
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Network Hospitals</h1>
        <p className="text-gray-500 text-sm mt-1">Cashless treatment at 10,000+ empanelled hospitals nationwide.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {HOSPITALS.map((h, idx) => (
          <motion.div key={h.name} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.06 }}>
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-base">{h.name}</CardTitle>
                    <CardDescription className="text-xs mt-0.5">{h.specialty}</CardDescription>
                  </div>
                  <Badge variant="outline" className={`text-xs shrink-0 ${h.tier === 'Tier 1' ? 'border-indigo-200 bg-indigo-50 text-indigo-700' : 'border-purple-200 bg-purple-50 text-purple-700'}`}>
                    {h.tier}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Heart className="w-3.5 h-3.5 text-red-400" />
                  <span>{h.location}</span>
                </div>
                {h.cashless && (
                  <Badge className="bg-green-100 text-green-700 border-green-200 border text-xs">✓ Cashless Available</Badge>
                )}
                <Button
                  size="sm"
                  className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xs"
                  onClick={() => setPreAuthHosp(h.name)}
                >
                  Request Pre-Auth
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!preAuthHosp} onOpenChange={open => !open && setPreAuthHosp(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request Pre-Authorisation</DialogTitle>
            <DialogDescription>{preAuthHosp}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Patient Name</Label>
              <Input value="Vempati Vamshi Krishna" readOnly className="bg-gray-50" />
            </div>
            <div className="space-y-1.5">
              <Label>Diagnosis / Procedure</Label>
              <Input placeholder="e.g. Knee replacement" value={paDiagnosis} onChange={e => setPaDiagnosis(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Planned Admission Date</Label>
              <Input type="date" value={paDate} onChange={e => setPaDate(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Estimated Cost (₹)</Label>
              <Input type="number" placeholder="0" value={paCost} onChange={e => setPaCost(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreAuthHosp(null)}>Cancel</Button>
            <Button onClick={handlePreAuth} className="bg-blue-600 hover:bg-blue-700 text-white">Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

// ── Health Locker ──────────────────────────────────────────────────────────
function HealthLockerView() {
  const [viewDoc, setViewDoc] = useState<typeof HEALTH_DOCS[0] | null>(null);
  const [syncing, setSyncing] = useState(false);

  function handleSync() {
    setSyncing(true);
    toast.loading('Syncing records from ABDM…', { id: 'sync' });
    setTimeout(() => {
      setSyncing(false);
      toast.success('Records synced successfully!', { id: 'sync' });
    }, 2200);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Health Locker / ABDM</h1>
        <p className="text-gray-500 text-sm mt-1">Securely store and access your health records via ABDM PHR.</p>
      </div>

      {/* ABDM Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-teal-500 to-green-500 p-6 text-white flex items-center justify-between flex-wrap gap-4 shadow-lg">
        <div>
          <p className="font-bold text-lg flex items-center gap-2"><Lock className="w-5 h-5" /> ABDM Health Locker</p>
          <p className="text-sm opacity-80 mt-0.5">ABHA ID: 12-3456-7890-1234 · Linked &amp; Verified</p>
        </div>
        <Button
          onClick={handleSync}
          disabled={syncing}
          className="bg-white text-teal-700 hover:bg-teal-50 gap-2 font-semibold"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing…' : 'Sync Records'}
        </Button>
      </div>

      {/* Documents table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-base">My Health Documents ({HEALTH_DOCS.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {HEALTH_DOCS.map(doc => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell className="text-gray-500 text-sm">{doc.source}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">{doc.date}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" className="text-xs gap-1" onClick={() => setViewDoc(doc)}>
                      <FileText className="w-3.5 h-3.5" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Document viewer dialog */}
      <Dialog open={!!viewDoc} onOpenChange={open => !open && setViewDoc(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{viewDoc?.name}</DialogTitle>
            <DialogDescription>{viewDoc?.source} · {viewDoc?.date}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="flex gap-4 text-sm">
              <div>
                <span className="text-xs text-gray-400 uppercase">Type</span>
                <p className="font-medium">{viewDoc?.type}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400 uppercase">Source</span>
                <p className="font-medium">{viewDoc?.source}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400 uppercase">Date</span>
                <p className="font-medium">{viewDoc?.date}</p>
              </div>
            </div>
            <Separator />
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
              {viewDoc?.summary}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDoc(null)}>Close</Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
              onClick={() => { toast.success('Document downloaded'); setViewDoc(null); }}
            >
              <Download className="w-4 h-4" /> Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

// ── Support ────────────────────────────────────────────────────────────────
function SupportView() {
  const [grievanceReason, setGrievanceReason] = useState('Dispute AI Deduction');
  const [grievanceText, setGrievanceText] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState(MOCK_CHAT);

  function handleGrievance() {
    if (!grievanceText) { toast.error('Please describe your issue'); return; }
    toast.success('Grievance submitted! Ticket GRV-' + rand5() + ' raised.');
    setGrievanceText('');
  }

  function handleChat() {
    if (!chatInput.trim()) return;
    const userMsg = { from: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { from: 'bot', text: 'Thank you for your query. Our agent will be with you shortly. Reference: TKT-' + rand5() }]);
    }, 900);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Support</h1>
        <p className="text-gray-500 text-sm mt-1">We're here to help 24/7.</p>
      </div>

      {/* Emergency banner */}
      <div className="rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 p-5 text-white flex items-center gap-4 shadow-lg">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <Phone className="w-6 h-6" />
        </div>
        <div>
          <p className="font-bold text-lg">Emergency Helpline</p>
          <p className="text-2xl font-extrabold tracking-wide">1-800-123-456</p>
          <p className="text-xs opacity-80 mt-0.5">Available 24 × 7 · Toll Free</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Grievance form */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><AlertCircle className="w-4 h-4 text-amber-500" /> Raise a Grievance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Reason</Label>
              <select
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={grievanceReason}
                onChange={e => setGrievanceReason(e.target.value)}
              >
                <option>Dispute AI Deduction</option>
                <option>Claim Status Inquiry</option>
                <option>Pre-Auth Denied</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <textarea
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none"
                placeholder="Describe your issue in detail…"
                value={grievanceText}
                onChange={e => setGrievanceText(e.target.value)}
              />
            </div>
            <Button onClick={handleGrievance} className="w-full bg-amber-500 hover:bg-amber-600 text-white gap-2">
              <Send className="w-4 h-4" /> Submit Grievance
            </Button>
          </CardContent>
        </Card>

        {/* Live chat */}
        <Card className="border-0 shadow-md flex flex-col">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><MessageCircle className="w-4 h-4 text-blue-500" /> Live Chat Support</CardTitle>
            <CardDescription className="text-xs">Chat with our virtual assistant</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 flex-1">
            <ScrollArea className="flex-1 min-h-[200px] max-h-[240px] pr-2">
              <div className="space-y-2">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${msg.from === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex gap-2 mt-auto">
              <Input
                placeholder="Type a message…"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleChat()}
                className="flex-1"
              />
              <Button size="icon" onClick={handleChat} className="bg-blue-600 hover:bg-blue-700 text-white shrink-0">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Root component
// ---------------------------------------------------------------------------
export default function PatientPortal() {
  const [activeView, setActiveView] = useState('dashboard');
  const { claims } = useStore();

  const userClaims = claims.filter((c: any) => c.patientId === CURRENT_USER_ID);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView claims={userClaims} />;
      case 'my-policies': return <MyPoliciesView />;
      case 'submit-claim': return <SubmitClaimView />;
      case 'claim-tracker': return <ClaimTrackerView claims={userClaims} />;
      case 'network-hospitals': return <NetworkHospitalsView />;
      case 'health-locker': return <HealthLockerView />;
      case 'support': return <SupportView />;
      default: return <DashboardView claims={userClaims} />;
    }
  };

  return (
    <AppLayout
      navGroups={NAV_GROUPS}
      activeItem={activeView}
      onNavigate={setActiveView}
      portalTitle="Patient Portal"
      userLabel="Vempati Vamshi Krishna"
      userSub="ID: HS-89302"
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeView} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-6 md:p-8 max-w-5xl mx-auto"
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </AppLayout>
  );
}
