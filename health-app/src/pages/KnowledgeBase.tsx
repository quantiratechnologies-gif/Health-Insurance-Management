import { BookOpen, FileText, CheckCircle2, ShieldAlert, ArrowRight, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom"

export default function KnowledgeBase() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center py-12 px-4">
      
      {/* Header */}
      <div className="max-w-4xl w-full mb-8 flex justify-between items-center">
        <Button variant="ghost" className="text-slate-500 hover:text-slate-900" onClick={() => navigate('/')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Knowledge Base</h1>
        </div>
      </div>

      <div className="max-w-4xl w-full">
        <Tabs defaultValue="intro" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="intro">Introduction</TabsTrigger>
            <TabsTrigger value="flowcharts">Flowcharts</TabsTrigger>
            <TabsTrigger value="decision">Decision Logic</TabsTrigger>
            <TabsTrigger value="rejection">Rejections & TPA</TabsTrigger>
          </TabsList>
          
          {/* Introduction Tab */}
          <TabsContent value="intro">
            <Card className="shadow-lg border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2"><FileText className="text-primary" /> Health Insurance Overview</CardTitle>
                <CardDescription>Understanding the basics of medical coverage.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-slate-600 leading-relaxed">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">What is Health Insurance?</h3>
                  <p>Health Insurance is a financial tool that provides financial coverage for Medical Expenses. It is a contract between the Insured and Insurer covering a wide-ranging medical expenses like the cost of Medicines, Surgery, Room Rent, Doctors Consultation, Ambulance Charges, etc.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-900">1. Individual Insurance</h4>
                    <p className="text-sm mt-1">Covers a single person. Age group is 18 to 65 Years. Covers Hospitalization Expenses including Surgery, Day care treatment, Room Rent, etc.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-900">2. Family Floater Insurance</h4>
                    <p className="text-sm mt-1">In a single plan, it covers the entire family. The sum insured is shared among the beneficiaries listed in the plan.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Flowcharts Tab */}
          <TabsContent value="flowcharts">
            <Card className="shadow-lg border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl">Claim Processing Flowcharts</CardTitle>
                <CardDescription>Visual representations of Cashless and Reimbursement flows.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                
                {/* Cashless Flow */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">Cashless Flow</Badge>
                  </h3>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 overflow-x-auto flex flex-col items-center gap-2">
                    <div className="bg-white px-4 py-2 rounded shadow-sm border border-slate-200 font-medium">Hospitalization</div>
                    <ArrowRight className="w-5 h-5 text-slate-400 rotate-90" />
                    <div className="bg-white px-4 py-2 rounded shadow-sm border border-slate-200 font-medium">Preauthorization Form given to TPA</div>
                    <ArrowRight className="w-5 h-5 text-slate-400 rotate-90" />
                    <div className="bg-white px-4 py-2 rounded shadow-sm border border-slate-200 font-medium">TPA checks Coverage & Balances</div>
                    <ArrowRight className="w-5 h-5 text-slate-400 rotate-90" />
                    <div className="flex gap-4">
                      <div className="bg-green-50 text-green-700 border-green-200 px-4 py-2 rounded shadow-sm border font-medium">Approved</div>
                      <div className="bg-red-50 text-red-700 border-red-200 px-4 py-2 rounded shadow-sm border font-medium">Rejected</div>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </TabsContent>

          {/* Decision Logic Tab */}
          <TabsContent value="decision">
            <Card className="shadow-lg border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2"><CheckCircle2 className="text-green-600" /> Claims Decision Flow</CardTitle>
                <CardDescription>How the STP Engine makes rules-based decisions.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 font-bold text-sm text-slate-900">1</div>
                    <p>First it will check the policy number format and Name of the patient.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 font-bold text-sm text-slate-900">2</div>
                    <p>Check the Policy status (Active or Inactive). If active it will check the Available sum insured limit.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 font-bold text-sm text-slate-900">3</div>
                    <p>Check for pre-existing diseases and waiting periods. Check sub-limits for room rent.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 font-bold text-sm text-green-700"><CheckCircle2 className="w-4 h-4" /></div>
                    <p className="font-medium text-slate-900">If all conditions are met, the STP automatically Approves the claim.</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rejections & TPA */}
          <TabsContent value="rejection">
            <Card className="shadow-lg border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2"><ShieldAlert className="text-red-500" /> Common Rejections & TPA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Common Reasons for Claim Rejection:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>Fake or forged documents (Fraud).</li>
                    <li>Claimed for unproven/experimental treatments.</li>
                    <li>Claiming during the waiting period.</li>
                    <li>Non-disclosure of Pre-existing diseases.</li>
                    <li>Policy was lapsed at the time of hospitalization.</li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-2">What is a Third Party Administrator (TPA)?</h3>
                  <p className="text-slate-600">A TPA is an intermediary between the Insurance company and the Policyholder. They are licensed by IRDAI to process claims, issue ID cards, and manage the network hospitals on behalf of the insurer.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  )
}
