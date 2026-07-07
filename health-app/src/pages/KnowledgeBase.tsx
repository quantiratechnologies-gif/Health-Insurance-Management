import { FileText, CheckCircle2, ShieldAlert, Users, User, HeartPulse, ShieldHalf, Baby, Building2, TrendingUp, Scale, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AppLayout, NavGroup } from "../components/AppLayout"

export default function KnowledgeBase() {
  const navGroups: NavGroup[] = [
    {
      title: "DOCUMENTATION",
      items: [
        { label: "Knowledge Base", icon: FileText, active: true }
      ]
    }
  ]

  return (
    <AppLayout title="Knowledge Base" navGroups={navGroups}>
      <ScrollArea className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-8 h-[calc(100vh-4rem)]">
        <Tabs defaultValue="intro" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-8">
            <TabsTrigger value="intro">Introduction</TabsTrigger>
            <TabsTrigger value="types">Insurance Types</TabsTrigger>
            <TabsTrigger value="flows">Claims Flows</TabsTrigger>
            <TabsTrigger value="decision">STP Logic</TabsTrigger>
            <TabsTrigger value="cases">Case Studies</TabsTrigger>
            <TabsTrigger value="tpa">TPA Functions</TabsTrigger>
          </TabsList>
          
          {/* Introduction Tab */}
          <TabsContent value="intro" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2"><FileText className="text-primary" /> What is Health Insurance?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground leading-relaxed space-y-4">
                  <p>It is a financial tool that provides coverage for medical expenses. It acts as a formal contract between the <strong>Insured</strong> and the <strong>Insurer</strong>.</p>
                  <h4 className="font-bold text-foreground">Key Medical Expenses Covered:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Cost of Medicines & Prescription Drugs</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Surgery & Day Care Treatments</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Room Rent (ICU & Standard)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Doctors Consultation</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Ambulance Charges</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-primary text-foreground">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Core Benefits</CardTitle>
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
                  <Card className="bg-white/10 border-white/20">
                    <CardContent className="p-4">
                      <p className="font-bold text-sm mb-1 text-yellow-700 dark:text-yellow-300">Tax Benefits (Section 80D)</p>
                      <p className="text-xs text-primary-foreground/90">Avail up to <strong>₹25,000/-</strong> standard deduction. Benefit increases to <strong>₹50,000/-</strong> if the insured or family members are above 60 years of age.</p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Types Tab */}
          <TabsContent value="types">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Types of Health Insurance</CardTitle>
                <CardDescription>Understanding the different plans available.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <Card className="bg-muted">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded bg-primary/20 text-primary flex items-center justify-center mb-4"><User className="w-5 h-5" /></div>
                    <h3 className="font-bold text-lg mb-2">1. Individual Insurance</h3>
                    <p className="text-sm text-muted-foreground mb-3">Covers a single person (Age 18-65).</p>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Covers Hospitalization</li>
                      <li>Includes Surgery & Room Rent</li>
                      <li>Covers Day care treatment</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-muted">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded bg-primary/20 text-primary flex items-center justify-center mb-4"><Users className="w-5 h-5" /></div>
                    <h3 className="font-bold text-lg mb-2">2. Family Floater</h3>
                    <p className="text-sm text-muted-foreground mb-3">Single plan covers the entire family.</p>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Sum insured is shared</li>
                      <li>Covers listed beneficiaries</li>
                      <li>Cost-effective for families</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-muted border-l-4 border-l-error">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded bg-error-muted text-error flex items-center justify-center mb-4"><HeartPulse className="w-5 h-5" /></div>
                    <h3 className="font-bold text-lg mb-2">3. Critical Illness</h3>
                    <p className="text-sm text-muted-foreground mb-3">For diseases like Heart, Kidney, Cancer, Stroke.</p>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Requires min 30-day survival period</li>
                      <li>Pays a Lumpsum amount</li>
                      <li>Policy cancels after payout</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-muted">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded bg-warning-muted text-warning flex items-center justify-center mb-4"><User className="w-5 h-5" /></div>
                    <h3 className="font-bold text-lg mb-2">4. Senior Citizen</h3>
                    <p className="text-sm text-muted-foreground mb-3">Designed for individuals above 60 years.</p>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>High medical cost protection</li>
                      <li>Covers hospitalization & domiciliary</li>
                      <li>Mitigates age-related financial stress</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-muted">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded bg-primary/20 text-primary flex items-center justify-center mb-4"><Building2 className="w-5 h-5" /></div>
                    <h3 className="font-bold text-lg mb-2">5. Group Health</h3>
                    <p className="text-sm text-muted-foreground mb-3">Provided by companies for employees.</p>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>No waiting period for pre-existing</li>
                      <li>Option to add family members</li>
                      <li>High organizational value</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-muted">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded bg-secondary/20 text-secondary flex items-center justify-center mb-4"><Baby className="w-5 h-5" /></div>
                    <h3 className="font-bold text-lg mb-2">6. Maternity Plan</h3>
                    <p className="text-sm text-muted-foreground mb-3">Specialized delivery & care coverage.</p>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Covers Normal & C-section</li>
                      <li>Pre & post-natal care</li>
                      <li>New born expenses & vaccines</li>
                    </ul>
                  </CardContent>
                </Card>

              </CardContent>
            </Card>
          </TabsContent>

          {/* Flows Tab */}
          <TabsContent value="flows" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-t-4 border-t-primary">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Cashless Claim Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Insured directly goes to a network hospital. The insurer deals with the hospital directly and covers expenses up to the policy limit.</p>
                  <Card className="bg-muted">
                    <CardContent className="p-4">
                      <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
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
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-secondary">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Reimbursement Claim Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Insured pays upfront at a non-network hospital. Insured raises a claim by submitting all actual expense documents.</p>
                  <Card className="bg-muted">
                    <CardContent className="p-4">
                      <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Decision Tab */}
          <TabsContent value="decision" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2"><CheckCircle2 className="text-success" /> STP Decision Logic & Rejections</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ul className="space-y-6 text-muted-foreground">
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 font-bold text-sm text-foreground">1</div>
                    <div><strong>Policy Validity Check:</strong><br/>Is the policy Active or Expired? If invalid &rarr; <span className="text-error font-bold">Reject</span>.</div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 font-bold text-sm text-foreground">2</div>
                    <div><strong>Coverage Check:</strong><br/>Is the treatment covered under the specific plan terms? If not covered &rarr; <span className="text-error font-bold">Reject</span>.</div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 font-bold text-sm text-foreground">3</div>
                    <div><strong>Medical Necessity Check:</strong><br/>Was the hospitalization medically required? If cosmetic/unnecessary &rarr; <span className="text-error font-bold">Reject</span>.</div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-success-muted flex items-center justify-center shrink-0 font-bold text-sm text-success"><CheckCircle2 className="w-4 h-4" /></div>
                    <div className="font-medium text-foreground"><strong>Final Approval:</strong><br/>Approve claim & settle. Issue payment.</div>
                  </li>
                </ul>
                
                <Card className="bg-error-muted border-error-border">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-error-foreground mb-4 flex items-center gap-2"><ShieldAlert className="w-5 h-5" /> Common Reasons for Rejection</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-error-foreground">
                      <li>Policy not active / Lapsed policy</li>
                      <li>Incomplete or incorrect documents</li>
                      <li>Waiting period not completed</li>
                      <li>Late claim intimation</li>
                      <li>Pre-existing disease not disclosed</li>
                      <li>Treatment not covered under policy</li>
                      <li>Non-medical / Cosmetic treatment</li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How a Rejected Claim Can Be Approved</CardTitle>
                <CardDescription>Steps for appealing administrative rejections.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-muted"><CardContent className="p-4 text-sm"><strong>Submit missing documents</strong> like discharge summary, original bills, or lab reports.</CardContent></Card>
                  <Card className="bg-muted"><CardContent className="p-4 text-sm"><strong>Verify details:</strong> Ensure all customer demographic and policy details match correctly.</CardContent></Card>
                  <Card className="bg-muted"><CardContent className="p-4 text-sm"><strong>Doctor Justification:</strong> Provide additional clinical notes proving medical necessity.</CardContent></Card>
                  <Card className="bg-muted"><CardContent className="p-4 text-sm"><strong>Correct Billing:</strong> Have the hospital correct billing mistakes and resubmit the claim.</CardContent></Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cases Tab */}
          <TabsContent value="cases">
             <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2"><Scale className="text-primary" /> Interactive Case Studies</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Approval Case */}
                <Card className="border-success-border overflow-hidden">
                  <div className="bg-success-muted p-4 border-b border-success-border flex justify-between items-center">
                    <h3 className="font-bold text-success-foreground text-lg">Case 1: Approval</h3>
                    <Badge variant="outline" className="bg-success-muted text-success-foreground hover:bg-success-muted/80 border-none">CASHLESS</Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 text-xs text-muted-foreground mb-6 gap-y-2">
                      <div><strong>Patient:</strong> Vempati Vamshi Krishna</div>
                      <div><strong>Insurer:</strong> Star Health</div>
                      <div><strong>Policy:</strong> Individual (₹10L)</div>
                      <div><strong>Active:</strong> 2024 to 2027</div>
                      <div><strong>Condition:</strong> Inguinal Hernia</div>
                    </div>
                    
                    <h4 className="font-bold text-sm text-foreground border-b border-border mb-3 pb-1">Why was it approved?</h4>
                    <ul className="text-xs text-muted-foreground space-y-2 mb-6">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-success" /> Policy is Active</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-success" /> Waiting period completed (24 Months)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-success" /> Medical Necessity Established</li>
                    </ul>

                    <Card className="bg-muted">
                      <CardContent className="p-4">
                        <div className="flex justify-between text-sm mb-1"><span>Total Bill</span> <strong>₹3,50,000</strong></div>
                        <div className="flex justify-between text-sm text-success font-bold"><span>Payout</span> <strong>₹3,20,000</strong></div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>

                {/* Reject Case */}
                <Card className="border-error-border overflow-hidden">
                  <div className="bg-error-muted p-4 border-b border-error-border flex justify-between items-center">
                    <h3 className="font-bold text-error-foreground text-lg">Case 2: Rejection</h3>
                    <Badge variant="outline" className="bg-error-muted text-error-foreground hover:bg-error-muted/80 border-none">REIMBURSEMENT</Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 text-xs text-muted-foreground mb-6 gap-y-2">
                      <div><strong>Patient:</strong> Vempati Vamshi Krishna</div>
                      <div><strong>Insurer:</strong> Star Health</div>
                      <div><strong>Policy:</strong> Individual (₹10L)</div>
                      <div><strong className="text-error">Active:</strong> 08/06/2025 to 2027</div>
                      <div><strong>Condition:</strong> Inguinal Hernia</div>
                    </div>
                    
                    <h4 className="font-bold text-sm text-foreground border-b border-border mb-3 pb-1">Why was it rejected?</h4>
                    <Card className="bg-error-muted border-error-border text-error-foreground mb-6">
                      <CardContent className="p-3 text-xs font-medium">
                        <strong>Critical Failure:</strong> Waiting period not completed. 
                        <br/><br/>The policy started on 08/06/2025 and the claim date is 15/06/2026. Only 12 months have passed, but Hernia requires a <strong>24 Month</strong> waiting period.
                      </CardContent>
                    </Card>

                    <Card className="bg-muted">
                      <CardContent className="p-4">
                        <div className="flex justify-between text-sm mb-1"><span>Total Bill</span> <strong>₹3,50,000</strong></div>
                        <div className="flex justify-between text-sm text-error font-bold"><span>Payout</span> <strong>₹0</strong></div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>

              </CardContent>
            </Card>
          </TabsContent>

          {/* TPA Tab */}
          <TabsContent value="tpa">
             <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2"><Settings className="text-primary" /> Third Party Administrator (TPA)</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Card className="bg-secondary/10 border-secondary/20 mb-6">
                    <CardContent className="p-6 text-secondary font-medium text-sm">
                      A TPA is an organization authorized by insurance companies to manage and process health insurance claims on their behalf. They act as the vital intermediary between the Policyholder, the Hospital, and the Insurance Company.
                    </CardContent>
                  </Card>
                  <h4 className="font-bold text-foreground mb-4">Core Functions of a TPA</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" /> Receives Pre-Authorization requests from Hospitals.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" /> Verifies policy details, coverage, and patient eligibility.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" /> Reviews present and past medical records and documents.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" /> Assists insurer in evaluating claims.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" /> Maintains relationships with network hospitals.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" /> Facilitates seamless cashless treatment.</li>
                  </ul>
                </div>
                
                <Card className="bg-muted">
                  <CardContent className="p-8">
                    <h4 className="font-bold text-foreground mb-6">The Flow of TPA Operations</h4>
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-muted text-muted-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          1
                        </div>
                        <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                          <CardContent className="p-4">
                            <div className="font-bold text-foreground">Hospital Request</div>
                            <div className="text-xs text-muted-foreground mt-1">Pre-Authorization request sent to TPA.</div>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-muted text-muted-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          2
                        </div>
                        <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                          <CardContent className="p-4">
                            <div className="font-bold text-foreground">Verification</div>
                            <div className="text-xs text-muted-foreground mt-1">TPA verifies details and waiting periods.</div>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-muted text-muted-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          3
                        </div>
                        <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                          <CardContent className="p-4">
                            <div className="font-bold text-foreground">Insurer Decision</div>
                            <div className="text-xs text-muted-foreground mt-1">Insurer approves or rejects.</div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </ScrollArea>
    </AppLayout>
  )
}
