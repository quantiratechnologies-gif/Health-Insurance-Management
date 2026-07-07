import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { AppLayout, NavGroup } from "../components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LayoutDashboard,
  Sliders,
  BarChart2,
  ShieldCheck,
  Users,
  TerminalSquare,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type AdminSection =
  | "dashboard"
  | "rules"
  | "analytics"
  | "approvals"
  | "tpa"
  | "audit";

type LogStatus = "Success" | "Warning" | "Error" | "Info";

interface SystemLog {
  timestamp: string;
  service: string;
  event: string;
  status: LogStatus;
}

interface Hospital {
  id: string;
  name: string;
  location: string;
  type: string;
  appliedDate: string;
}

interface TPAUser {
  id: string;
  name: string;
  role: string;
  claimsProcessed: number;
  lastActive: string;
  status: "Active" | "Suspended";
}

interface AuditLog {
  id: string;
  ts: string;
  level: "ERROR" | "WARN" | "INFO";
  module: string;
  message: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const SYSTEM_LOGS: SystemLog[] = [
  { timestamp: "12:01:04", service: "ClaimsEngine", event: "Auto-approval triggered for Claim #CL-9821", status: "Success" },
  { timestamp: "12:02:11", service: "AuthService", event: "JWT token refreshed for TPA user suresh@tpa.in", status: "Info" },
  { timestamp: "12:03:28", service: "PolicyValidator", event: "Policy expiry detected for PHN-20045", status: "Warning" },
  { timestamp: "12:04:55", service: "NetworkCheck", event: "Hospital connectivity verified: Sunshine Hospitals", status: "Success" },
  { timestamp: "12:06:02", service: "ClaimsEngine", event: "High-risk score 87 flagged for Claim #CL-9823", status: "Warning" },
  { timestamp: "12:07:19", service: "DBConnector", event: "Connection pool exhausted — retrying in 5s", status: "Error" },
  { timestamp: "12:08:33", service: "STPProcessor", event: "Batch of 14 claims processed in 1.1s avg", status: "Success" },
  { timestamp: "12:09:47", service: "APIGateway", event: "Rate limit reached for endpoint /api/claims/list", status: "Warning" },
];

const HOSPITALS: Hospital[] = [
  { id: "h1", name: "Sunshine Hospitals", location: "Hyderabad", type: "Multi-Specialty", appliedDate: "2026-06-28" },
  { id: "h2", name: "Rainbow Children's Hospital", location: "Bangalore", type: "Pediatrics", appliedDate: "2026-07-01" },
  { id: "h3", name: "LifeCare Center", location: "Chennai", type: "General", appliedDate: "2026-07-03" },
];

const TPA_USERS: TPAUser[] = [
  { id: "t1", name: "Suresh Reddy", role: "Lead Adjudicator", claimsProcessed: 234, lastActive: "2026-07-07 11:40", status: "Active" },
  { id: "t2", name: "Priya Mehta", role: "Senior Adjudicator", claimsProcessed: 189, lastActive: "2026-07-07 10:15", status: "Active" },
  { id: "t3", name: "Arvind Kumar", role: "Junior Adjudicator", claimsProcessed: 98, lastActive: "2026-07-06 17:30", status: "Active" },
  { id: "t4", name: "Deepa Nair", role: "Senior Adjudicator", claimsProcessed: 211, lastActive: "2026-07-05 09:20", status: "Suspended" },
  { id: "t5", name: "Rajesh Sharma", role: "Lead Adjudicator", claimsProcessed: 305, lastActive: "2026-07-07 12:00", status: "Active" },
];

const AUDIT_LOGS: AuditLog[] = [
  { id: "a1", ts: "2026-07-07 12:01:04", level: "INFO", module: "AuthService", message: "User suresh@tpa.in logged in successfully." },
  { id: "a2", ts: "2026-07-07 12:02:18", level: "INFO", module: "ClaimsEngine", message: "Auto-approval triggered: CL-9821, amount ₹38,500." },
  { id: "a3", ts: "2026-07-07 12:03:29", level: "WARN", module: "PolicyValidator", message: "Policy PHN-20045 expires in 3 days — flagged for renewal." },
  { id: "a4", ts: "2026-07-07 12:04:55", level: "INFO", module: "NetworkCheck", message: "Hospital empanelment verified: Sunshine Hospitals (Tier 2)." },
  { id: "a5", ts: "2026-07-07 12:06:02", level: "WARN", module: "ClaimsEngine", message: "High-risk score 87 detected for claim CL-9823. Forwarded to adjudicator." },
  { id: "a6", ts: "2026-07-07 12:07:19", level: "ERROR", module: "DBConnector", message: "Connection pool exhausted. Max connections: 100. Retrying in 5s." },
  { id: "a7", ts: "2026-07-07 12:08:01", level: "ERROR", module: "DBConnector", message: "Retry attempt 1/3 failed. Upstream DB unreachable at 10.0.0.5:5432." },
  { id: "a8", ts: "2026-07-07 12:08:33", level: "INFO", module: "STPProcessor", message: "Batch processed: 14 claims, avg time 1.1s, all within SLA." },
  { id: "a9", ts: "2026-07-07 12:09:47", level: "WARN", module: "APIGateway", message: "Rate limit hit on /api/claims/list. Throttling client 192.168.1.45." },
  { id: "a10", ts: "2026-07-07 12:10:22", level: "INFO", module: "RuleEngine", message: "Configuration reload triggered by admin@system. New threshold: ₹50,000." },
  { id: "a11", ts: "2026-07-07 12:11:05", level: "ERROR", module: "ClaimsEngine", message: "Claim CL-9825 rejected: member not found in active policy list." },
  { id: "a12", ts: "2026-07-07 12:12:44", level: "INFO", module: "AuthService", message: "Session expired for user priya@tpa.in. Token invalidated." },
];

const MONTHLY_VOLUME = [
  { month: "Jan", value: 312 },
  { month: "Feb", value: 278 },
  { month: "Mar", value: 405 },
  { month: "Apr", value: 389 },
  { month: "May", value: 467 },
  { month: "Jun", value: 521 },
];

// ─── Nav Config ───────────────────────────────────────────────────────────────

const NAV_GROUPS: NavGroup[] = [
  {
    title: "PLATFORM CONFIG",
    items: [
      { id: "dashboard", label: "Platform Dashboard", icon: LayoutDashboard },
      { id: "rules", label: "Rule Engine Settings", icon: Sliders },
      { id: "analytics", label: "Platform Analytics", icon: BarChart2 },
    ],
  },
  {
    title: "USERS & AUDIT",
    items: [
      { id: "approvals", label: "Provider Approvals", icon: ShieldCheck },
      { id: "tpa", label: "TPA Accounts", icon: Users },
      { id: "audit", label: "System Audit Logs", icon: TerminalSquare },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function statusBadge(status: LogStatus) {
  const map: Record<LogStatus, { cls: string; label: string }> = {
    Success: { cls: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30", label: "Success" },
    Warning: { cls: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30", label: "Warning" },
    Error: { cls: "bg-red-500/20 text-red-300 border border-red-500/30", label: "Error" },
    Info: { cls: "bg-slate-500/20 text-slate-300 border border-slate-500/30", label: "Info" },
  };
  const { cls, label } = map[status];
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${cls}`}>
      {label}
    </span>
  );
}

function auditLevelColor(level: AuditLog["level"]) {
  if (level === "ERROR") return "text-red-400";
  if (level === "WARN") return "text-yellow-400";
  return "text-emerald-400";
}

function generateCredentials(hospitalName: string) {
  const slug = hospitalName.toLowerCase().replace(/\s+/g, "-").slice(0, 12);
  const pass = "HS_" + Math.random().toString(36).toUpperCase().slice(2, 8);
  return { username: `hospital-${slug}`, password: pass };
}

// ─── KPI Card ────────────────────────────────────────────────────────────────

function KPICard({
  title,
  value,
  sub,
  accent,
  delay,
}: {
  title: string;
  value: string;
  sub: string;
  accent: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 flex flex-col gap-2 hover:border-white/20 transition-colors"
    >
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
      <p className={`text-3xl font-bold ${accent}`}>{value}</p>
      <p className="text-xs text-slate-500">{sub}</p>
    </motion.div>
  );
}

// ─── Platform Dashboard ───────────────────────────────────────────────────────

function PlatformDashboard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const clockStr = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;
  const dateStr = time.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* Live Clock */}
      <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-6 flex items-center gap-6">
        <div>
          <p className="text-xs text-indigo-400 uppercase tracking-widest mb-1">System Clock</p>
          <p className="font-mono text-5xl font-bold text-indigo-300 tabular-nums">{clockStr}</p>
          <p className="text-sm text-slate-400 mt-1">{dateStr}</p>
        </div>
        <div className="ml-auto flex flex-col items-end gap-1">
          <span className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            System Online
          </span>
          <span className="text-xs text-slate-500">All services operational</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="System Uptime" value="99.99%" sub="Last 30 days" accent="text-emerald-400" delay={0.05} />
        <KPICard title="Active TPA Sessions" value="42" sub="Current live sessions" accent="text-sky-400" delay={0.1} />
        <KPICard title="STP Avg Processing" value="1.2s" sub="Straight-through processing" accent="text-violet-400" delay={0.15} />
        <KPICard title="API Health" value="100%" sub="All endpoints green" accent="text-emerald-400" delay={0.2} />
      </div>

      {/* Activity Logs Table */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">System Activity Logs</h3>
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Timestamp</th>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Event</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_LOGS.map((log, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-t border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-slate-400 text-xs">{log.timestamp}</td>
                  <td className="px-4 py-3 text-slate-300 font-medium">{log.service}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs max-w-xs truncate">{log.event}</td>
                  <td className="px-4 py-3">{statusBadge(log.status)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Rule Engine Settings ─────────────────────────────────────────────────────

function RuleEngineSettings() {
  const [autoApproval, setAutoApproval] = useState(50000);
  const [riskThreshold, setRiskThreshold] = useState(65);
  const [coPay, setCoPay] = useState(0);
  const [networkCheck, setNetworkCheck] = useState(true);
  const [policyCheck, setPolicyCheck] = useState(true);
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-xl space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-5">
        <h3 className="text-lg font-semibold text-white">Rule Engine Configuration</h3>

        <div className="space-y-1">
          <Label className="text-slate-300 text-sm">Auto-Approval Threshold (₹)</Label>
          <Input
            type="number"
            value={autoApproval}
            onChange={(e) => setAutoApproval(Number(e.target.value))}
            className="bg-white/5 border-white/15 text-white focus:ring-indigo-500"
          />
          <p className="text-xs text-slate-500">Claims below this amount are auto-approved if all other checks pass.</p>
        </div>

        <div className="space-y-1">
          <Label className="text-slate-300 text-sm">High Risk Score Threshold (0–100)</Label>
          <Input
            type="number"
            min={0}
            max={100}
            value={riskThreshold}
            onChange={(e) => setRiskThreshold(Number(e.target.value))}
            className="bg-white/5 border-white/15 text-white focus:ring-indigo-500"
          />
          <p className="text-xs text-slate-500">Claims with a risk score above this threshold are flagged for manual review.</p>
        </div>

        <div className="space-y-1">
          <Label className="text-slate-300 text-sm">Co-Pay Percentage Override (%)</Label>
          <Input
            type="number"
            min={0}
            max={100}
            value={coPay}
            onChange={(e) => setCoPay(Number(e.target.value))}
            className="bg-white/5 border-white/15 text-white focus:ring-indigo-500"
          />
          <p className="text-xs text-slate-500">Set to 0 to use policy-level co-pay. Any value overrides all policies.</p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <div className="flex items-center gap-3">
            <Checkbox
              id="networkCheck"
              checked={networkCheck}
              onCheckedChange={(v) => setNetworkCheck(Boolean(v))}
              className="border-white/30 data-[state=checked]:bg-indigo-500"
            />
            <Label htmlFor="networkCheck" className="text-slate-300 text-sm cursor-pointer">
              Network Check — verify hospital empanelment before approval
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              id="policyCheck"
              checked={policyCheck}
              onCheckedChange={(v) => setPolicyCheck(Boolean(v))}
              className="border-white/30 data-[state=checked]:bg-indigo-500"
            />
            <Label htmlFor="policyCheck" className="text-slate-300 text-sm cursor-pointer">
              Policy Validity Check — reject claims from expired policies
            </Label>
          </div>
        </div>

        <Button
          onClick={() => setOpen(true)}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold mt-2"
        >
          Save Configuration
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-slate-900 border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-emerald-400 text-lg">✓ Configuration Saved</DialogTitle>
            <DialogDescription className="text-slate-400 text-sm">
              The following settings have been applied to the Rule Engine:
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2 text-sm font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">auto_approval_threshold</span>
              <span className="text-indigo-300">₹{autoApproval.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">risk_score_threshold</span>
              <span className="text-yellow-300">{riskThreshold}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">copay_override_pct</span>
              <span className="text-sky-300">{coPay}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">network_check_enabled</span>
              <span className={networkCheck ? "text-emerald-400" : "text-red-400"}>{String(networkCheck)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">policy_validity_check</span>
              <span className={policyCheck ? "text-emerald-400" : "text-red-400"}>{String(policyCheck)}</span>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} className="bg-emerald-600 hover:bg-emerald-500 text-white">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Platform Analytics ───────────────────────────────────────────────────────

const maxVol = Math.max(...MONTHLY_VOLUME.map((d) => d.value));

interface BarChartItem {
  label: string;
  pct: number;
  color: string;
}

function BarChart({ data }: { data: BarChartItem[] }) {
  return (
    <div className="flex items-end gap-4 h-36">
      {data.map((d) => (
        <div key={d.label} className="flex flex-col items-center gap-2 flex-1">
          <span className="text-xs text-slate-300 font-semibold">{d.pct}%</span>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${d.pct}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`w-full rounded-t-lg ${d.color}`}
            style={{ minHeight: 8 }}
          />
          <span className="text-xs text-slate-400 text-center leading-tight">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function PlatformAnalytics() {
  const claimsData: BarChartItem[] = [
    { label: "Auto-Approved", pct: 65, color: "bg-emerald-500" },
    { label: "Flagged", pct: 20, color: "bg-yellow-500" },
    { label: "Rejected", pct: 15, color: "bg-red-500" },
  ];

  const portalData: BarChartItem[] = [
    { label: "Patient Portal", pct: 45, color: "bg-indigo-500" },
    { label: "Hospital Portal", pct: 30, color: "bg-violet-500" },
    { label: "TPA Portal", pct: 25, color: "bg-sky-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Claims by Status */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-5">Claims by Status</h3>
          <BarChart data={claimsData} />
        </div>

        {/* Portal Usage */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-5">Portal Usage Breakdown</h3>
          <BarChart data={portalData} />
        </div>
      </div>

      {/* Monthly Volume */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-5">Monthly Claims Volume (2026)</h3>
        <div className="flex items-end gap-3 h-40">
          {MONTHLY_VOLUME.map((d, i) => (
            <div key={d.month} className="flex flex-col items-center gap-2 flex-1">
              <span className="text-xs text-sky-300 font-semibold">{d.value}</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.value / maxVol) * 100}%` }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
                className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 to-sky-400"
                style={{ minHeight: 8 }}
              />
              <span className="text-xs text-slate-400">{d.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Provider Approvals ───────────────────────────────────────────────────────

function ProviderApprovals() {
  const [hospitals, setHospitals] = useState<Hospital[]>(HOSPITALS);
  const [approveTarget, setApproveTarget] = useState<Hospital | null>(null);
  const [rejectTarget, setRejectTarget] = useState<Hospital | null>(null);
  const [tier, setTier] = useState("2");
  const [rejectReason, setRejectReason] = useState("");

  const creds = approveTarget ? generateCredentials(approveTarget.name) : null;

  const handleApprove = () => {
    if (!approveTarget) return;
    setHospitals((prev) => prev.filter((h) => h.id !== approveTarget.id));
    const name = approveTarget.name;
    setApproveTarget(null);
    toast.success(`Provider Approved and Credentials Sent to ${name}`);
  };

  const handleReject = () => {
    if (!rejectTarget) return;
    setHospitals((prev) => prev.filter((h) => h.id !== rejectTarget.id));
    const name = rejectTarget.name;
    setRejectTarget(null);
    toast.error(`Application rejected: ${name}`);
    setRejectReason("");
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Applied Date</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {hospitals.map((h) => (
                <motion.tr
                  key={h.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-t border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-3 text-white font-medium">{h.name}</td>
                  <td className="px-4 py-3 text-slate-400">{h.location}</td>
                  <td className="px-4 py-3 text-slate-400">{h.type}</td>
                  <td className="px-4 py-3 text-slate-400 font-mono text-xs">{h.appliedDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs"
                        onClick={() => {
                          setTier("2");
                          setApproveTarget(h);
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="text-xs"
                        onClick={() => {
                          setRejectReason("");
                          setRejectTarget(h);
                        }}
                      >
                        Reject
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
            {hospitals.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500 text-sm">
                  No pending provider applications.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Approve Dialog */}
      <Dialog open={!!approveTarget} onOpenChange={(o) => { if (!o) setApproveTarget(null); }}>
        <DialogContent className="bg-slate-900 border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-emerald-400">Approve Provider Empanelment</DialogTitle>
            <DialogDescription className="text-slate-400">
              Confirm empanelment for{" "}
              <span className="text-white font-semibold">{approveTarget?.name}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-slate-300 text-sm mb-1.5 block">Network Tier</Label>
              <Select value={tier} onValueChange={setTier}>
                <SelectTrigger className="bg-white/5 border-white/15 text-white">
                  <SelectValue placeholder="Select Tier" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10 text-white">
                  <SelectItem value="1">Tier 1 — Premium Network</SelectItem>
                  <SelectItem value="2">Tier 2 — Standard Network</SelectItem>
                  <SelectItem value="3">Tier 3 — Basic Network</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {creds && (
              <div>
                <Label className="text-slate-300 text-sm mb-1.5 block">Generated Credentials</Label>
                <div className="rounded-xl bg-slate-800 border border-white/10 p-4 font-mono text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">username</span>
                    <span className="text-indigo-300">{creds.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">password</span>
                    <span className="text-emerald-300">{creds.password}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  These credentials will be emailed to the provider's registered contact.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setApproveTarget(null)}
              className="text-slate-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button onClick={handleApprove} className="bg-emerald-600 hover:bg-emerald-500 text-white">
              Confirm & Send Credentials
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={!!rejectTarget} onOpenChange={(o) => { if (!o) setRejectTarget(null); }}>
        <DialogContent className="bg-slate-900 border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-red-400">Reject Provider Application</DialogTitle>
            <DialogDescription className="text-slate-400">
              Provide a reason for rejecting{" "}
              <span className="text-white font-semibold">{rejectTarget?.name}</span>
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label className="text-slate-300 text-sm mb-1.5 block">Rejection Reason</Label>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              placeholder="e.g. Incomplete documentation, facility not meeting standards..."
              className="w-full rounded-xl bg-white/5 border border-white/15 text-white text-sm p-3 resize-none focus:outline-none focus:ring-2 focus:ring-red-500/50 placeholder:text-slate-600"
            />
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setRejectTarget(null)}
              className="text-slate-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button onClick={handleReject} className="bg-red-600 hover:bg-red-500 text-white">
              Reject Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── TPA Accounts ─────────────────────────────────────────────────────────────

function TPAAccounts() {
  const [users, setUsers] = useState<TPAUser[]>(TPA_USERS);
  const [addOpen, setAddOpen] = useState(false);
  const [suspendTarget, setSuspendTarget] = useState<TPAUser | null>(null);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("Junior Adjudicator");
  const [newAccess, setNewAccess] = useState("Standard");

  const handleAddUser = () => {
    const user: TPAUser = {
      id: `t${Date.now()}`,
      name: newName || "New User",
      role: newRole,
      claimsProcessed: 0,
      lastActive: "—",
      status: "Active",
    };
    setUsers((prev) => [...prev, user]);
    setAddOpen(false);
    setNewName("");
    setNewEmail("");
    setNewRole("Junior Adjudicator");
    setNewAccess("Standard");
    toast.success(`TPA user ${user.name} added successfully.`);
  };

  const handleSuspend = () => {
    if (!suspendTarget) return;
    const name = suspendTarget.name;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === suspendTarget.id ? { ...u, status: "Suspended" } : u
      )
    );
    setSuspendTarget(null);
    toast.warning(`${name}'s account has been suspended.`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => setAddOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white"
        >
          + Add TPA User
        </Button>
      </div>

      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Claims Processed</th>
              <th className="px-4 py-3 text-left">Last Active</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-t border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="px-4 py-3 text-white font-medium">{u.name}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{u.role}</td>
                <td className="px-4 py-3 text-sky-300 font-mono">{u.claimsProcessed}</td>
                <td className="px-4 py-3 text-slate-400 text-xs font-mono">{u.lastActive}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      u.status === "Active"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-red-500/20 text-red-300 border border-red-500/30"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {u.status === "Active" && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="text-xs"
                      onClick={() => setSuspendTarget(u)}
                    >
                      Suspend
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="bg-slate-900 border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-indigo-400">Add TPA User</DialogTitle>
            <DialogDescription className="text-slate-400">
              Create a new TPA adjudicator account.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-slate-300 text-sm mb-1 block">Full Name</Label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Kiran Rao"
                className="bg-white/5 border-white/15 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-300 text-sm mb-1 block">Email Address</Label>
              <Input
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="e.g. kiran@tpa.in"
                className="bg-white/5 border-white/15 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-300 text-sm mb-1 block">Role</Label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger className="bg-white/5 border-white/15 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10 text-white">
                  <SelectItem value="Junior Adjudicator">Junior Adjudicator</SelectItem>
                  <SelectItem value="Senior Adjudicator">Senior Adjudicator</SelectItem>
                  <SelectItem value="Lead Adjudicator">Lead Adjudicator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-slate-300 text-sm mb-1 block">Access Level</Label>
              <Select value={newAccess} onValueChange={setNewAccess}>
                <SelectTrigger className="bg-white/5 border-white/15 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10 text-white">
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Elevated">Elevated</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setAddOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button onClick={handleAddUser} className="bg-indigo-600 hover:bg-indigo-500 text-white">
              Create Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend Confirm Dialog */}
      <Dialog open={!!suspendTarget} onOpenChange={(o) => { if (!o) setSuspendTarget(null); }}>
        <DialogContent className="bg-slate-900 border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-yellow-400">Suspend Account</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to suspend{" "}
              <span className="text-white font-semibold">{suspendTarget?.name}</span>? They will
              lose access immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setSuspendTarget(null)}
              className="text-slate-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button onClick={handleSuspend} className="bg-yellow-600 hover:bg-yellow-500 text-white">
              Yes, Suspend
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── System Audit Logs ────────────────────────────────────────────────────────

function SystemAuditLogs() {
  const [filter, setFilter] = useState<"All" | "Errors" | "Warnings" | "Info">("All");
  const [logs, setLogs] = useState<AuditLog[]>(AUDIT_LOGS);
  const [clearOpen, setClearOpen] = useState(false);

  const filtered = logs.filter((l) => {
    if (filter === "All") return true;
    if (filter === "Errors") return l.level === "ERROR";
    if (filter === "Warnings") return l.level === "WARN";
    if (filter === "Info") return l.level === "INFO";
    return true;
  });

  const tabs: Array<"All" | "Errors" | "Warnings" | "Info"> = [
    "All",
    "Errors",
    "Warnings",
    "Info",
  ];

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-1 bg-white/5 rounded-xl p-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === t
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-white/15 text-slate-300 hover:bg-white/10 hover:text-white text-xs"
            onClick={() => toast.success("Audit logs exported as audit-logs.csv")}
          >
            Export Logs
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="text-xs"
            onClick={() => setClearOpen(true)}
          >
            Clear Logs
          </Button>
        </div>
      </div>

      {/* Terminal-style log viewer */}
      <ScrollArea className="h-[480px] rounded-2xl border border-white/10 bg-[#0d1117]">
        <div className="p-4 space-y-1">
          <AnimatePresence>
            {filtered.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.02 }}
                className="font-mono text-xs leading-relaxed flex gap-3"
              >
                <span className="text-slate-600 whitespace-nowrap">{log.ts}</span>
                <span className={`font-bold w-14 shrink-0 ${auditLevelColor(log.level)}`}>
                  [{log.level}]
                </span>
                <span className="text-violet-400 shrink-0">{log.module}:</span>
                <span className="text-emerald-300">{log.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <p className="text-slate-600 text-xs font-mono text-center py-8">
              // No logs matching filter
            </p>
          )}
        </div>
      </ScrollArea>

      {/* Clear Confirm Dialog */}
      <Dialog open={clearOpen} onOpenChange={setClearOpen}>
        <DialogContent className="bg-slate-900 border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-red-400">Clear All Logs</DialogTitle>
            <DialogDescription className="text-slate-400">
              This will permanently delete all {logs.length} audit log entries. This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setClearOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-500 text-white"
              onClick={() => {
                setLogs([]);
                setClearOpen(false);
                toast.error("All audit logs have been cleared.");
              }}
            >
              Clear All Logs
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const sectionTitles: Record<AdminSection, string> = {
  dashboard: "Platform Dashboard",
  rules: "Rule Engine Settings",
  analytics: "Platform Analytics",
  approvals: "Provider Approvals",
  tpa: "TPA Accounts",
  audit: "System Audit Logs",
};

const sectionDescriptions: Record<AdminSection, string> = {
  dashboard: "Live system status, KPIs and activity log",
  rules: "Configure auto-approval rules and thresholds",
  analytics: "Claims distribution, monthly volume and portal usage",
  approvals: "Review and empanel new hospitals",
  tpa: "Manage TPA adjudicator accounts and access",
  audit: "Full audit trail of platform events",
};

export default function AdminPortal() {
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");

  return (
    <AppLayout
      navGroups={NAV_GROUPS}
      activeItem={activeSection}
      onNavChange={(id: string) => setActiveSection(id as AdminSection)}
      portalTitle="Super Admin Console"
      userRole="Platform Administrator"
    >
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Page Header */}
        <motion.div
          key={`${activeSection}-header`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-white">{sectionTitles[activeSection]}</h1>
          <p className="text-slate-400 text-sm mt-1">{sectionDescriptions[activeSection]}</p>
        </motion.div>

        {/* Section Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === "dashboard" && <PlatformDashboard />}
            {activeSection === "rules" && <RuleEngineSettings />}
            {activeSection === "analytics" && <PlatformAnalytics />}
            {activeSection === "approvals" && <ProviderApprovals />}
            {activeSection === "tpa" && <TPAAccounts />}
            {activeSection === "audit" && <SystemAuditLogs />}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
