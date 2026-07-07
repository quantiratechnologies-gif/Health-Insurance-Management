import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Brain,
  Building2,
  ShieldAlert,
  CheckCircle,
  Clock,
  TrendingDown,
} from 'lucide-react';
import { toast } from 'sonner';

import { AppLayout, NavGroup } from '../components/AppLayout';
import { useStore, Claim } from '../store/useStore';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// ─── Types ────────────────────────────────────────────────────────────────────

type ActiveView =
  | 'dashboard'
  | 'claims-queue'
  | 'ai-engine'
  | 'provider-network'
  | 'fraud-engine';

interface RejectDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string, remarks: string) => void;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

const navGroups: NavGroup[] = [
  {
    title: 'ADJUDICATION',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'claims-queue', label: 'Claims Queue', icon: FileText },
      { id: 'ai-engine', label: 'AI Prediction Engine', icon: Brain },
    ],
  },
  {
    title: 'NETWORK & FRAUD',
    items: [
      { id: 'provider-network', label: 'Provider Network', icon: Building2 },
      { id: 'fraud-engine', label: 'Fraud Engine', icon: ShieldAlert },
    ],
  },
];

// ─── Static data ────────────────────────────────────────────────────────────────

const HOSPITALS = [
  { name: 'Apollo Hospitals', tier: 1, city: 'Hyderabad', status: 'Active', sla: 98, beds: 500, speciality: 'Multi-Speciality', empanelled: '2018-03-12' },
  { name: 'Fortis Healthcare', tier: 1, city: 'Bangalore', status: 'Active', sla: 96, beds: 350, speciality: 'Cardiac & Oncology', empanelled: '2017-07-22' },
  { name: 'City Care Clinic', tier: 3, city: 'Hyderabad', status: 'Probation', sla: 82, beds: 80, speciality: 'General', empanelled: '2021-01-09' },
  { name: 'KIMS Hospital', tier: 1, city: 'Hyderabad', status: 'Active', sla: 97, beds: 430, speciality: 'Neuro & Ortho', empanelled: '2019-11-15' },
];

const FRAUD_ALERTS = [
  {
    id: 'f1',
    severity: 'warning' as const,
    title: 'High Frequency ICD A09 Claims',
    hospital: 'City Care Clinic',
    description: 'ICD code A09 (Diarrhoea & Gastroenteritis) claims spiked 300% in the last 7 days — significantly above the network average.',
    affectedClaims: 14,
    claims: ['CLM-0023', 'CLM-0031', 'CLM-0045', 'CLM-0051'],
  },
  {
    id: 'f2',
    severity: 'error' as const,
    title: 'Duplicate Bill Numbers Detected',
    hospital: 'City Care Clinic',
    description: 'Multiple claims submitted with identical bill numbers across different patient records — potential fraud pattern.',
    affectedClaims: 6,
    claims: ['CLM-0012', 'CLM-0018'],
  },
  {
    id: 'f3',
    severity: 'warning' as const,
    title: 'Room Rent Over-Billing Pattern',
    hospital: 'Fortis Healthcare',
    description: 'Room rent billed exceeds policy sub-limit by 220% on average across 9 recent admissions.',
    affectedClaims: 9,
    claims: ['CLM-0007', 'CLM-0019', 'CLM-0033'],
  },
];

const REJECT_REASONS = [
  'Duplicate Claim',
  'Policy Expired',
  'Benefit Not Covered',
  'Investigation Required',
  'Over-coding Detected',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatRupees(amount: number): string {
  const lakh = amount / 100000;
  return `₹${lakh.toFixed(1)}L`;
}

function riskColor(score: number): string {
  if (score >= 75) return 'destructive';
  if (score >= 45) return 'warning';
  return 'secondary';
}

function statusDot(status: string): string {
  if (status === 'Auto-Approved') return 'bg-green-500';
  if (status === 'Rejected') return 'bg-red-500';
  return 'bg-yellow-400';
}

// ─── RejectDialog ─────────────────────────────────────────────────────────────

const RejectDialog = ({ open, onClose, onConfirm }: RejectDialogProps) => {
  const [reason, setReason] = useState(REJECT_REASONS[0]);
  const [remarks, setRemarks] = useState('');

  const handleConfirm = () => {
    onConfirm(reason, remarks);
    setReason(REJECT_REASONS[0]);
    setRemarks('');
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reject Claim</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="reject-reason">Rejection Reason</Label>
            <select
              id="reject-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {REJECT_REASONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="reject-remarks">Remarks</Label>
            <Textarea
              id="reject-remarks"
              placeholder="Add internal remarks for audit trail..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={handleConfirm}>Confirm Reject</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ─── Sub-views ────────────────────────────────────────────────────────────────

interface ViewProps {
  pendingClaims: Claim[];
  allClaims: Claim[];
  resolveClaim: (id: string, action: 'Approve' | 'Reject') => void;
}

// Dashboard View
const DashboardView = ({ pendingClaims, allClaims, resolveClaim }: ViewProps) => {
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [rejectOpen, setRejectOpen] = useState(false);

  const totalProcessed = allClaims.filter((c: Claim) => c.status !== 'Pending TPA').length;

  const amountSaved = allClaims
    .filter((c: Claim) => c.status === 'Rejected')
    .reduce((sum: number, c: Claim) => sum + (c.cost ?? 0), 0);

  const kpis = [
    { label: 'Pending Queue', value: pendingClaims.length, icon: Clock, color: 'text-yellow-400' },
    { label: 'Processed Today', value: totalProcessed, icon: CheckCircle, color: 'text-green-400' },
    { label: 'Amount Saved', value: formatRupees(amountSaved || 3400000), icon: TrendingDown, color: 'text-blue-400' },
    { label: 'Avg Decision', value: '2.4 min', icon: Brain, color: 'text-purple-400' },
  ];

  const openReject = (id: string) => {
    setSelectedClaimId(id);
    setRejectOpen(true);
  };

  const handleRejectConfirm = (reason: string) => {
    if (!selectedClaimId) return;
    resolveClaim(selectedClaimId, 'Reject');
    toast.error(`Claim ${selectedClaimId} rejected — ${reason}`);
    setRejectOpen(false);
    setSelectedClaimId(null);
  };

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
                <div>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Live Feed */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              Live Adjudication Feed
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[480px]">
              <div className="space-y-0 divide-y divide-border px-6">
                {allClaims.map((claim: Claim) => (
                  <motion.div
                    key={claim.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-4 py-4"
                  >
                    {/* Timeline dot */}
                    <div className="mt-1.5 flex-shrink-0">
                      <span className={`block h-3 w-3 rounded-full ${statusDot(claim.status)}`} />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-sm">{claim.id}</span>
                        <span className="text-xs text-muted-foreground">
                          {claim.hospital ?? 'Unknown Hospital'}
                        </span>
                        <Badge
                          variant={
                            claim.status === 'Auto-Approved'
                              ? 'default'
                              : claim.status === 'Rejected'
                              ? 'destructive'
                              : 'secondary'
                          }
                          className="text-[10px]"
                        >
                          {claim.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {claim.treatment ?? claim.treatment ?? '—'} •{' '}
                        ₹{(claim.cost ?? 0).toLocaleString('en-IN')}
                      </p>

                      {claim.status === 'Pending TPA' && (
                        <div className="flex gap-2 pt-1">
                          <Button
                            size="sm"
                            className="h-7 bg-green-600 px-3 text-xs hover:bg-green-700"
                            onClick={() => {
                              resolveClaim(claim.id, 'Approve');
                              toast.success(`Claim ${claim.id} approved`);
                            }}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 border-red-500 px-3 text-xs text-red-500 hover:bg-red-50"
                            onClick={() => openReject(claim.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* AI Risk Scores */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">AI Risk Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[440px]">
              <div className="space-y-3">
                {pendingClaims.map((claim) => {
                  const score = claim.score ?? Math.floor(Math.random() * 90 + 10);
                  return (
                    <div
                      key={claim.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div>
                        <p className="text-xs font-semibold">{claim.id}</p>
                        <p className="text-[11px] text-muted-foreground">
                          ₹{(claim.cost ?? 0).toLocaleString('en-IN')}
                        </p>
                      </div>
                      <Badge
                        variant={
                          score >= 75
                            ? 'destructive'
                            : score >= 45
                            ? 'outline'
                            : 'secondary'
                        }
                        className="tabular-nums"
                      >
                        {score}%
                      </Badge>
                    </div>
                  );
                })}
                {pendingClaims.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-8">
                    No pending claims
                  </p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <RejectDialog
        open={rejectOpen}
        onClose={() => { setRejectOpen(false); setSelectedClaimId(null); }}
        onConfirm={handleRejectConfirm}
      />
    </div>
  );
};

// Claims Queue View
const ClaimsQueueView = ({ pendingClaims, resolveClaim }: ViewProps) => {
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [rejectOpen, setRejectOpen] = useState(false);

  const openReject = (id: string) => {
    setSelectedClaimId(id);
    setRejectOpen(true);
  };

  const handleRejectConfirm = (reason: string) => {
    if (!selectedClaimId) return;
    resolveClaim(selectedClaimId, 'Reject');
    toast.error(`Claim ${selectedClaimId} rejected — ${reason}`);
    setRejectOpen(false);
    setSelectedClaimId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Claims Queue</h2>
        <Badge variant="secondary">{pendingClaims.length} pending</Badge>
      </div>

      <Card>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Hospital</TableHead>
                  <TableHead>Treatment</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Trigger Rule</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingClaims.map((claim) => {
                  const score = claim.score ?? 55;
                  return (
                    <TableRow key={claim.id}>
                      <TableCell className="font-mono text-xs">{claim.id}</TableCell>
                      <TableCell className="text-sm">{claim.patientName ?? '—'}</TableCell>
                      <TableCell className="text-sm">{claim.hospital ?? '—'}</TableCell>
                      <TableCell className="text-sm">{claim.treatment ?? claim.treatment ?? '—'}</TableCell>
                      <TableCell className="text-sm">
                        ₹{(claim.cost ?? 0).toLocaleString('en-IN')}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={riskColor(score) as 'destructive' | 'secondary' | 'outline'}
                          className="tabular-nums"
                        >
                          {score}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {claim.ruleTriggered ?? 'High Value'}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="h-7 bg-green-600 px-3 text-xs hover:bg-green-700"
                            onClick={() => {
                              resolveClaim(claim.id, 'Approve');
                              toast.success(`Claim ${claim.id} approved`);
                            }}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 border-red-500 px-3 text-xs text-red-500 hover:bg-red-50"
                            onClick={() => openReject(claim.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {pendingClaims.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                      All caught up! No pending claims in queue.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <RejectDialog
        open={rejectOpen}
        onClose={() => { setRejectOpen(false); setSelectedClaimId(null); }}
        onConfirm={handleRejectConfirm}
      />
    </div>
  );
};

// AI Prediction Engine View
const AIPredictionView = () => {
  const [amount, setAmount] = useState('');
  const [icdCode, setIcdCode] = useState('');
  const [tier, setTier] = useState('1');
  const [age, setAge] = useState('');
  const [result, setResult] = useState<null | {
    action: string;
    confidence: number;
    riskFactors: string[];
    explanation: string;
  }>(null);
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    setLoading(true);
    setTimeout(() => {
      const amt = parseFloat(amount) || 0;
      let action = 'Auto-Approve';
      let riskFactors: string[] = [];
      let explanation = '';

      if (amt > 200000) {
        action = 'Reject';
        riskFactors = ['Amount exceeds policy limit', 'High-value outlier', 'Requires senior review'];
        explanation =
          'The claimed amount significantly exceeds typical benchmarks for the indicated procedure. Model flags this as a potential over-coding or inflated billing scenario.';
      } else if (amt >= 50000) {
        action = 'Flag for Review';
        riskFactors = ['Moderate risk score', 'ICD-10 mismatch risk', 'Tier consideration'];
        explanation =
          'Claim falls in the intermediate risk band. AI recommends manual adjudicator review before processing. ICD code alignment with billed services should be verified.';
      } else {
        action = 'Auto-Approve';
        riskFactors = ['Low claim value', 'Standard ICD code'];
        explanation =
          'Claim parameters are well within expected bounds. Historical data shows high approval rate for similar claims. No anomalous patterns detected.';
      }

      if (parseInt(tier) === 3) riskFactors.push('Tier-3 hospital (higher risk)');
      if (parseInt(age) > 65) riskFactors.push('Senior patient — elevated risk');

      setResult({ action, confidence: 94.2, riskFactors, explanation });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 rounded-xl border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950/30"
      >
        <Brain className="h-8 w-8 text-purple-500 flex-shrink-0" />
        <div>
          <p className="font-semibold text-purple-700 dark:text-purple-300">
            HealthSure AI Model v3.2
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-400">
            Trained on 2M+ claims • Gradient Boosting + Neural Network ensemble • Updated weekly with new fraud signals
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Claim Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="ai-amount">Claim Amount (₹)</Label>
              <input
                id="ai-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 75000"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ai-icd">ICD-10 Code</Label>
              <input
                id="ai-icd"
                type="text"
                value={icdCode}
                onChange={(e) => setIcdCode(e.target.value)}
                placeholder="e.g. K80.5"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ai-tier">Hospital Tier</Label>
              <select
                id="ai-tier"
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="1">Tier 1</option>
                <option value="2">Tier 2</option>
                <option value="3">Tier 3</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ai-age">Patient Age</Label>
              <input
                id="ai-age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 45"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <Button
              className="w-full gap-2"
              onClick={analyze}
              disabled={loading || !amount}
            >
              <Brain className="h-4 w-4" />
              {loading ? 'Analyzing...' : 'Analyze with AI'}
            </Button>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="text-base">Prediction Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground">Recommended Action:</span>
                  <Badge
                    variant={
                      result.action === 'Auto-Approve'
                        ? 'default'
                        : result.action === 'Reject'
                        ? 'destructive'
                        : 'outline'
                    }
                    className="text-sm"
                  >
                    {result.action}
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground">AI Confidence:</span>
                  <span className="font-bold text-purple-600">{result.confidence}%</span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-sm font-medium text-muted-foreground">Risk Factors:</span>
                  <div className="flex flex-wrap gap-2">
                    {result.riskFactors.map((rf) => (
                      <Badge key={rf} variant="outline" className="text-xs">
                        {rf}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-sm font-medium text-muted-foreground">Model Explanation:</span>
                  <p className="rounded-lg bg-muted p-3 text-sm leading-relaxed">{result.explanation}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Provider Network View
const ProviderNetworkView = () => {
  const [selectedHospital, setSelectedHospital] = useState<(typeof HOSPITALS)[0] | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Provider Network</h2>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hospital</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>SLA Compliance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {HOSPITALS.map((h) => (
                <TableRow key={h.name}>
                  <TableCell className="font-medium">{h.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">Tier {h.tier}</Badge>
                  </TableCell>
                  <TableCell>{h.city}</TableCell>
                  <TableCell>
                    <Badge
                      variant={h.status === 'Active' ? 'default' : 'destructive'}
                    >
                      {h.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-semibold ${
                        h.sla >= 95
                          ? 'text-green-600'
                          : h.sla >= 90
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {h.sla}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedHospital(h)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Hospital Detail Dialog */}
      <Dialog
        open={!!selectedHospital}
        onOpenChange={(v) => { if (!v) setSelectedHospital(null); }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedHospital?.name}</DialogTitle>
          </DialogHeader>
          {selectedHospital && (
            <div className="space-y-3 py-2">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Tier', value: `Tier ${selectedHospital.tier}` },
                  { label: 'City', value: selectedHospital.city },
                  { label: 'Status', value: selectedHospital.status },
                  { label: 'SLA Compliance', value: `${selectedHospital.sla}%` },
                  { label: 'Bed Capacity', value: `${selectedHospital.beds} beds` },
                  { label: 'Speciality', value: selectedHospital.speciality },
                  { label: 'Empanelled Since', value: selectedHospital.empanelled },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-muted p-3">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedHospital(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Fraud Engine View
const FraudEngineView = () => {
  const [selectedAlert, setSelectedAlert] = useState<(typeof FRAUD_ALERTS)[0] | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <ShieldAlert className="h-6 w-6 text-red-500" />
        <h2 className="text-xl font-bold">Fraud Detection Engine</h2>
      </div>

      <div className="space-y-4">
        {FRAUD_ALERTS.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card
              className={`border-l-4 ${
                alert.severity === 'error'
                  ? 'border-l-red-500'
                  : 'border-l-yellow-400'
              }`}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={alert.severity === 'error' ? 'destructive' : 'outline'}
                        className={
                          alert.severity === 'warning'
                            ? 'border-yellow-400 text-yellow-600'
                            : ''
                        }
                      >
                        {alert.severity === 'error' ? 'HIGH RISK' : 'WARNING'}
                      </Badge>
                      <span className="font-semibold">{alert.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <div className="flex items-center gap-4 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{alert.hospital}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {alert.affectedClaims} affected claims
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-shrink-0"
                    onClick={() => setSelectedAlert(alert)}
                  >
                    Investigate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Investigate Dialog */}
      <Dialog
        open={!!selectedAlert}
        onOpenChange={(v) => { if (!v) setSelectedAlert(null); }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Investigation: {selectedAlert?.title}</DialogTitle>
          </DialogHeader>
          {selectedAlert && (
            <div className="space-y-3 py-2">
              <p className="text-sm text-muted-foreground">{selectedAlert.description}</p>
              <div>
                <p className="mb-2 text-sm font-semibold">Affected Claims</p>
                <div className="space-y-2">
                  {selectedAlert.claims.map((claimId) => (
                    <div
                      key={claimId}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <span className="font-mono text-sm">{claimId}</span>
                      <Badge variant="outline" className="text-xs">Under Review</Badge>
                    </div>
                  ))}
                  {selectedAlert.affectedClaims > selectedAlert.claims.length && (
                    <p className="text-center text-xs text-muted-foreground">
                      + {selectedAlert.affectedClaims - selectedAlert.claims.length} more claims in full report
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedAlert(null)}>Close</Button>
            <Button
              variant="destructive"
              onClick={() => {
                toast.error(`Investigation initiated for: ${selectedAlert?.title}`);
                setSelectedAlert(null);
              }}
            >
              Escalate to Fraud Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

export default function TPAPortal() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const { claims, resolveClaim } = useStore();

  const pendingClaims = useMemo(
    () => claims.filter((c) => c.status === 'Pending TPA'),
    [claims],
  );

  const viewProps: ViewProps = {
    pendingClaims,
    allClaims: claims,
    resolveClaim,
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView {...viewProps} />;
      case 'claims-queue':
        return <ClaimsQueueView {...viewProps} />;
      case 'ai-engine':
        return <AIPredictionView />;
      case 'provider-network':
        return <ProviderNetworkView />;
      case 'fraud-engine':
        return <FraudEngineView />;
      default:
        return null;
    }
  };

  return (
    <AppLayout
      navGroups={navGroups}
      activeItem={activeView}
      onNavChange={(id) => setActiveView(id as ActiveView)}
      portalTitle="TPA Adjudication Portal"
    >
      <motion.div
        key={activeView}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="p-6"
      >
        {renderView()}
      </motion.div>
    </AppLayout>
  );
}
