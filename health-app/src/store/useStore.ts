import { create } from 'zustand'

export type ClaimStatus = 'Pending TPA' | 'Auto-Approved' | 'Flagged' | 'Rejected' | 'Manual-Approved'

export interface Claim {
  id: string
  patientId: string
  patientName: string
  treatment: string
  cost: number
  status: ClaimStatus
  date: string
  hospital: string
  ruleTriggered?: string
  score?: number
}

export interface Policy {
  id: string
  patientName: string
  planName: string
  totalSumInsured: number
  availableBalance: number
  status: 'Active' | 'Inactive' | 'Lapsed'
}

interface AppState {
  policies: Policy[]
  claims: Claim[]
  submitClaim: (claim: Omit<Claim, 'id' | 'status' | 'date' | 'ruleTriggered' | 'score'>) => void
  resolveClaim: (id: string, action: 'Approve' | 'Reject') => void
}

export const useStore = create<AppState>((set) => ({
  policies: [
    {
      id: 'HS-89302',
      patientName: 'Vempati Vamshi Krishna',
      planName: 'Arogya Sanjeevani',
      totalSumInsured: 500000,
      availableBalance: 420000,
      status: 'Active'
    },
    {
      id: 'HS-11234',
      patientName: 'Sunita Sharma',
      planName: 'Family Floater Plus',
      totalSumInsured: 1000000,
      availableBalance: 1000000,
      status: 'Active'
    },
    {
      id: 'HS-55312',
      patientName: 'Rajesh Kumar',
      planName: 'Basic Health',
      totalSumInsured: 200000,
      availableBalance: 50000,
      status: 'Lapsed'
    }
  ],
  claims: [
    {
      id: 'CLM-98231',
      patientId: 'HS-89302',
      patientName: 'Vempati Vamshi Krishna',
      treatment: 'Appendectomy',
      cost: 45000,
      status: 'Auto-Approved',
      date: 'Oct 12, 2025',
      hospital: 'Apollo Hospitals, Jubilee Hills',
      ruleTriggered: 'Standard ICD-10 Match',
      score: 95
    }
  ],
  
  submitClaim: (newClaimData) => set((state) => {
    const newId = `CLM-${Math.floor(10000 + Math.random() * 90000)}`
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    
    // STP ENGINE LOGIC
    let status: ClaimStatus = 'Pending TPA'
    let ruleTriggered = 'Processing...'
    let score = 50

    const policy = state.policies.find(p => p.id === newClaimData.patientId)

    if (!policy) {
      status = 'Rejected'
      ruleTriggered = 'Policy ID not found'
      score = 0
    } else if (policy.status !== 'Active') {
      status = 'Rejected'
      ruleTriggered = `Policy is ${policy.status}`
      score = 10
    } else if (newClaimData.cost > policy.availableBalance) {
      status = 'Rejected'
      ruleTriggered = 'Cost exceeds available sum insured limit'
      score = 20
    } else if (newClaimData.cost > 200000) {
      status = 'Flagged'
      ruleTriggered = 'High cost treatment (Manual Review Required)'
      score = 70
    } else {
      status = 'Auto-Approved'
      ruleTriggered = 'Standard Clean Claim'
      score = 98
    }

    const claim: Claim = {
      ...newClaimData,
      id: newId,
      date: today,
      status,
      ruleTriggered,
      score
    }

    // If auto-approved, automatically deduct from balance
    let updatedPolicies = state.policies
    if (status === 'Auto-Approved') {
      updatedPolicies = state.policies.map(p => 
        p.id === claim.patientId ? { ...p, availableBalance: p.availableBalance - claim.cost } : p
      )
    }

    return {
      claims: [claim, ...state.claims],
      policies: updatedPolicies
    }
  }),

  resolveClaim: (id, action) => set((state) => {
    let costToDeduct = 0
    let patientId = ''

    const updatedClaims = state.claims.map(c => {
      if (c.id === id) {
        if (action === 'Approve') {
          costToDeduct = c.cost
          patientId = c.patientId
          return { ...c, status: 'Manual-Approved' as ClaimStatus }
        } else {
          return { ...c, status: 'Rejected' as ClaimStatus }
        }
      }
      return c
    })

    let updatedPolicies = state.policies
    if (action === 'Approve' && patientId) {
      updatedPolicies = state.policies.map(p => 
        p.id === patientId ? { ...p, availableBalance: p.availableBalance - costToDeduct } : p
      )
    }

    return { claims: updatedClaims, policies: updatedPolicies }
  })
}))
