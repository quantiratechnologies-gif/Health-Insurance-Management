import { FileText, CheckCircle2, ShieldAlert, ArrowLeft, Users, User, HeartPulse, ShieldHalf, Baby, Building2, TrendingUp, Scale, Settings } from "lucide-react"
import { Logo } from "../components/Logo"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNavigate } from "react-router-dom"

export default function KnowledgeBase() {
  const navigate = useNavigate()

  return (
    <div className="h-screen bg-slate-50 text-slate-900 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full bg-white border-b border-slate-200 shrink-0">
        <div className="max-w-6xl mx-auto px-4 h-20 flex justify-between items-center">
          <Button variant="ghost" className="text-slate-500 hover:text-slate-900" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
          </Button>
          <div className="flex items-center gap-3">
            <Logo className="h-6 w-auto" />
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 border-l border-slate-200 pl-3 ml-1">Knowledge Base</h1>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-8">
        <Tabs defaultValue="intro" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-8 h-auto p-1 bg-slate-200/50">
            <TabsTrigger value="intro" className="py-2.5">Introduction</TabsTrigger>
            <TabsTrigger value="types" className="py-2.5">Insurance Types</TabsTrigger>
            <TabsTrigger value="flows" className="py-2.5">Claims Flows</TabsTrigger>
            <TabsTrigger value="decision" className="py-2.5">STP Logic</TabsTrigger>
            <TabsTrigger value="cases" className="py-2.5">Case Studies</TabsTrigger>
            <TabsTrigger value="tpa" className="py-2.5">TPA Functions</TabsTrigger>
          </TabsList>
          
          {/* Introduction Tab */}
          <TabsContent value="intro" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2"><FileText className="text-primary" /> What is Health Insurance?</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 leading-relaxed space-y-4">
                  <p>It is a financial tool that provides coverage for medical expenses. It acts as a formal contract between the <strong>Insured</strong> and the <strong>Insurer</strong>.</p>
                  <h4 className="font-bold text-slate-900">Key Medical Expenses Covered:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Cost of Medicines & Prescription Drugs</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Surgery & Day Care Treatments</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Room Rent (ICU & Standard)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Doctors Consultation</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Ambulance Charges</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-slate-200 bg-primary text-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Core Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="mt-1 bg-white/20 p-1.5 rounded"><TrendingUp className="w-4 h-4" /></div>
                      <div><strong>Deal with Rising Medical Costs</strong><p className="text-primary-foreground/80 text-sm">Protection against medical inflation.</p></div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1 bg-white/20 p-1.5 rounded"><ShieldHalf className="w-4 h-4" /></div>
                      <div><strong>Easy Cashless Claims</strong><p className="text-primary-foreground/80 text-sm">Direct settlement with network hospitals.</p></div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1 bg-white/20 p-1.5 rounded"><HeartPulse className="w-4 h-4" /></div>
                      <div><strong>Critical Illness Cover</strong><p className="text-primary-foreground/80 text-sm">Lump sum payouts for severe diseases.</p></div>
                    </div>
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                    <p className="font-bold text-sm mb-1 text-yellow-300">Tax Benefits (Section 80D)</p>
                    <p className="text-xs text-primary-foreground/90">Avail up to <strong>₹25,000/-</strong> standard deduction. Benefit increases to <strong>₹50,000/-</strong> if the insured or family members are above 60 years of age.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Types Tab */}
          <TabsContent value="types">
            <Card className="shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl">Types of Health Insurance</CardTitle>
                <CardDescription>Understanding the different plans available.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
                  <div className="w-10 h-10 rounded bg-blue-100 text-blue-600 flex items-center justify-center mb-4"><User className="w-5 h-5" /></div>
                  <h3 className="font-bold text-lg mb-2">1. Individual Insurance</h3>
                  <p className="text-sm text-slate-500 mb-3">Covers a single person (Age 18-65).</p>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>Covers Hospitalization</li>
                    <li>Includes Surgery & Room Rent</li>
                    <li>Covers Day care treatment</li>
                  </ul>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
                  <div className="w-10 h-10 rounded bg-purple-100 text-purple-600 flex items-center justify-center mb-4"><Users className="w-5 h-5" /></div>
                  <h3 className="font-bold text-lg mb-2">2. Family Floater</h3>
                  <p className="text-sm text-slate-500 mb-3">Single plan covers the entire family.</p>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>Sum insured is shared</li>
                    <li>Covers listed beneficiaries</li>
                    <li>Cost-effective for families</li>
                  </ul>
                </div>

                <div className="bg-slate-50 border border-slate-200 border-l-4 border-l-red-500 p-6 rounded-xl">
                  <div className="w-10 h-10 rounded bg-red-100 text-red-600 flex items-center justify-center mb-4"><HeartPulse className="w-5 h-5" /></div>
                  <h3 className="font-bold text-lg mb-2">3. Critical Illness</h3>
                  <p className="text-sm text-slate-500 mb-3">For diseases like Heart, Kidney, Cancer, Stroke.</p>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>Requires min 30-day survival period</li>
                    <li>Pays a Lumpsum amount</li>
                    <li>Policy cancels after payout</li>
                  </ul>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
                  <div className="w-10 h-10 rounded bg-orange-100 text-orange-600 flex items-center justify-center mb-4"><User className="w-5 h-5" /></div>
                  <h3 className="font-bold text-lg mb-2">4. Senior Citizen</h3>
                  <p className="text-sm text-slate-500 mb-3">Designed for individuals above 60 years.</p>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>High medical cost protection</li>
                    <li>Covers hospitalization & domiciliary</li>
                    <li>Mitigates age-related financial stress</li>
                  </ul>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
                  <div className="w-10 h-10 rounded bg-teal-100 text-teal-600 flex items-center justify-center mb-4"><Building2 className="w-5 h-5" /></div>
                  <h3 className="font-bold text-lg mb-2">5. Group Health</h3>
                  <p className="text-sm text-slate-500 mb-3">Provided by companies for employees.</p>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>No waiting period for pre-existing</li>
                    <li>Option to add family members</li>
                    <li>High organizational value</li>
                  </ul>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
                  <div className="w-10 h-10 rounded bg-pink-100 text-pink-600 flex items-center justify-center mb-4"><Baby className="w-5 h-5" /></div>
                  <h3 className="font-bold text-lg mb-2">6. Maternity Plan</h3>
                  <p className="text-sm text-slate-500 mb-3">Specialized delivery & care coverage.</p>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>Covers Normal & C-section</li>
                    <li>Pre & post-natal care</li>
                    <li>New born expenses & vaccines</li>
                  </ul>
                </div>

              </CardContent>
            </Card>
          </TabsContent>

          {/* Flows Tab */}
          <TabsContent value="flows" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-sm border-slate-200 border-t-4 border-t-blue-500">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-900">Cashless Claim Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 mb-4">Insured directly goes to a network hospital. The insurer deals with the hospital directly and covers expenses up to the policy limit.</p>
                  <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <li><strong>Hospitalization</strong> at Network Hospital.</li>
                    <li><strong>Intimation</strong> to Insurance desk.</li>
                    <li><strong>Pre-Authorization Request</strong> sent to TPA/Insurer.</li>
                    <li><strong>Verification</strong> by TPA/Insurer.</li>
                    <li><strong>Approved/Rejected</strong>. If approved...</li>
                    <li><strong>Treatment</strong> proceeds.</li>
                    <li><strong>Discharge</strong>.</li>
                    <li><strong>Bill & Claim</strong> sent to Insurer.</li>
                    <li><strong>Claim Approved</strong> and Settled directly with hospital.</li>
                  </ol>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-slate-200 border-t-4 border-t-purple-500">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-900">Reimbursement Claim Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 mb-4">Insured pays upfront at a non-network hospital. Insured raises a claim by submitting all actual expense documents.</p>
                  <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <li><strong>Hospitalization</strong> (Usually Non-Network).</li>
                    <li><strong>Treatment</strong> paid by patient.</li>
                    <li><strong>Discharge</strong> from hospital.</li>
                    <li><strong>Claim Intimation</strong> to Insurer.</li>
                    <li><strong>Document Collection</strong> (all original bills).</li>
                    <li><strong>Claim Submission</strong>.</li>
                    <li><strong>Verification</strong> by Insurer/TPA.</li>
                    <li><strong>Reimbursement</strong> amount transferred to patient account.</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center items-center gap-4 flex-wrap">
               <img src="/media__1783394750772.png" alt="Cashless Flow" className="max-w-[45%] rounded-xl shadow-sm border border-slate-200" onError={(e) => (e.currentTarget.style.display = 'none')} />
               <img src="/media__1783394761780.png" alt="Reimbursement Flow" className="max-w-[45%] rounded-xl shadow-sm border border-slate-200" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
          </TabsContent>

          {/* Decision Tab */}
          <TabsContent value="decision" className="space-y-6">
            <Card className="shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2"><CheckCircle2 className="text-green-600" /> STP Decision Logic & Rejections</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ul className="space-y-6 text-slate-600">
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 font-bold text-sm text-slate-900">1</div>
                    <div><strong>Policy Validity Check:</strong><br/>Is the policy Active or Expired? If invalid &rarr; <span className="text-red-500 font-bold">Reject</span>.</div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 font-bold text-sm text-slate-900">2</div>
                    <div><strong>Coverage Check:</strong><br/>Is the treatment covered under the specific plan terms? If not covered &rarr; <span className="text-red-500 font-bold">Reject</span>.</div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 font-bold text-sm text-slate-900">3</div>
                    <div><strong>Medical Necessity Check:</strong><br/>Was the hospitalization medically required? If cosmetic/unnecessary &rarr; <span className="text-red-500 font-bold">Reject</span>.</div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 font-bold text-sm text-green-700"><CheckCircle2 className="w-4 h-4" /></div>
                    <div className="font-medium text-slate-900"><strong>Final Approval:</strong><br/>Approve claim & settle. Issue payment.</div>
                  </li>
                </ul>
                
                <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                  <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2"><ShieldAlert className="w-5 h-5" /> Common Reasons for Rejection</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-red-800">
                    <li>Policy not active / Lapsed policy</li>
                    <li>Incomplete or incorrect documents</li>
                    <li>Waiting period not completed</li>
                    <li>Late claim intimation</li>
                    <li>Pre-existing disease not disclosed</li>
                    <li>Treatment not covered under policy</li>
                    <li>Non-medical / Cosmetic treatment</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle>How a Rejected Claim Can Be Approved</CardTitle>
                <CardDescription>Steps for appealing administrative rejections.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm"><strong>Submit missing documents</strong> like discharge summary, original bills, or lab reports.</li>
                  <li className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm"><strong>Verify details:</strong> Ensure all customer demographic and policy details match correctly.</li>
                  <li className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm"><strong>Doctor Justification:</strong> Provide additional clinical notes proving medical necessity.</li>
                  <li className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm"><strong>Correct Billing:</strong> Have the hospital correct billing mistakes and resubmit the claim.</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cases Tab */}
          <TabsContent value="cases">
             <Card className="shadow-sm border-slate-200 mb-6">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2"><Scale className="text-primary" /> Interactive Case Studies</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Approval Case */}
                <div className="border border-green-200 rounded-xl overflow-hidden">
                  <div className="bg-green-50 p-4 border-b border-green-100 flex justify-between items-center">
                    <h3 className="font-bold text-green-900 text-lg">Case 1: Approval</h3>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">CASHLESS</Badge>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 text-xs text-slate-600 mb-6 gap-y-2">
                      <div><strong>Patient:</strong> Vempati Vamshi Krishna</div>
                      <div><strong>Insurer:</strong> Star Health</div>
                      <div><strong>Policy:</strong> Individual (₹10L)</div>
                      <div><strong>Active:</strong> 2024 to 2027</div>
                      <div><strong>Condition:</strong> Inguinal Hernia</div>
                    </div>
                    
                    <h4 className="font-bold text-sm text-slate-900 mb-3 border-b border-slate-100 pb-1">Why was it approved?</h4>
                    <ul className="text-xs text-slate-600 space-y-2 mb-6">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" /> Policy is Active</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" /> Waiting period completed (24 Months)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" /> Medical Necessity Established</li>
                    </ul>

                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="flex justify-between text-sm mb-1"><span>Total Bill</span> <strong>₹3,50,000</strong></div>
                      <div className="flex justify-between text-sm text-green-700 font-bold"><span>Payout</span> <strong>₹3,20,000</strong></div>
                    </div>
                  </div>
                </div>

                {/* Reject Case */}
                <div className="border border-red-200 rounded-xl overflow-hidden">
                  <div className="bg-red-50 p-4 border-b border-red-100 flex justify-between items-center">
                    <h3 className="font-bold text-red-900 text-lg">Case 2: Rejection</h3>
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none">REIMBURSEMENT</Badge>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 text-xs text-slate-600 mb-6 gap-y-2">
                      <div><strong>Patient:</strong> Vempati Vamshi Krishna</div>
                      <div><strong>Insurer:</strong> Star Health</div>
                      <div><strong>Policy:</strong> Individual (₹10L)</div>
                      <div><strong className="text-red-600">Active:</strong> 08/06/2025 to 2027</div>
                      <div><strong>Condition:</strong> Inguinal Hernia</div>
                    </div>
                    
                    <h4 className="font-bold text-sm text-slate-900 mb-3 border-b border-slate-100 pb-1">Why was it rejected?</h4>
                    <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg text-xs font-medium mb-6">
                      <strong>Critical Failure:</strong> Waiting period not completed. 
                      <br/><br/>The policy started on 08/06/2025 and the claim date is 15/06/2026. Only 12 months have passed, but Hernia requires a <strong>24 Month</strong> waiting period.
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="flex justify-between text-sm mb-1"><span>Total Bill</span> <strong>₹3,50,000</strong></div>
                      <div className="flex justify-between text-sm text-red-600 font-bold"><span>Payout</span> <strong>₹0</strong></div>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </TabsContent>

          {/* TPA Tab */}
          <TabsContent value="tpa">
             <Card className="shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2"><Settings className="text-primary" /> Third Party Administrator (TPA)</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-blue-50 text-blue-900 p-6 rounded-xl border border-blue-100 mb-6 font-medium text-sm">
                    A TPA is an organization authorized by insurance companies to manage and process health insurance claims on their behalf. They act as the vital intermediary between the Policyholder, the Hospital, and the Insurance Company.
                  </div>
                  <h4 className="font-bold text-slate-900 mb-4">Core Functions of a TPA</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Receives Pre-Authorization requests from Hospitals.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Verifies policy details, coverage, and patient eligibility.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Reviews present and past medical records and documents.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Assists insurer in evaluating claims.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Maintains relationships with network hospitals.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Facilitates seamless cashless treatment.</li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-6">The Flow of TPA Operations</h4>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-200 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        1
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="font-bold text-slate-900">Hospital Request</div>
                        <div className="text-xs text-slate-500 mt-1">Pre-Authorization request sent to TPA.</div>
                      </div>
                    </div>
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-200 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        2
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="font-bold text-slate-900">Verification</div>
                        <div className="text-xs text-slate-500 mt-1">TPA verifies details and waiting periods.</div>
                      </div>
                    </div>
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-200 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        3
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="font-bold text-slate-900">Insurer Decision</div>
                        <div className="text-xs text-slate-500 mt-1">Insurer approves or rejects.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </ScrollArea>
    </div>
  )
}
