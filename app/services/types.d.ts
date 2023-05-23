export type Offer = Readonly<{
  id: string
  title: string
  province: Category
  city: string
  link: string
  category: Category
  contractType: Category
  subcategory: Category
  salaryMin: Category
  salaryMax: Category
  salaryPeriod: Category
  experienceMin: Category
  workDay: Category
  study: Category
  teleworking?: Category
  published: Date
  updated: Date
  author: Author
  requirementMin: string
  bold: boolean
  applications: string
  executive: boolean
  salaryDescription: string
  multiProvince: boolean
}>

export type OfferDetail = {
  title: string
  id: string
  state: number
  creationDate: string
  updateDate: string
  city: string
  externalUrlForm: string
  blocked: boolean
  applications: number
  province: Category
  experienceMin: Category
  category: Category
  subcategory: Category
  studiesMin: Category
  residence: Category
  country: Category
  contractType: Category
  journey: Category
  subSegment: number
  profile: Profile
  cityPD: number
  zipCode: string
  latitude: number
  longitude: number
  exactLocation: boolean
  department: string
  vacancies: number
  minRequirements: string
  description: string
  desiredRequirements: string
  commissions: string
  contractDuration: string
  referenceId: string
  detailedStudiesId: number
  studying: boolean
  showPay: boolean
  multiProvince: boolean
  maxPay: Pay
  minPay: Pay
  schedule: string
  jobLevel: Category
  staffInCharge: Category
  hasKillerQuestions: number
  hasOpenQuestions: number
  upsellings: Upsellings
  epreselec: boolean
  fiscalAddress: string
  shouldAskExportConsent: boolean
  exportConsentName: string
  link: string
  active: boolean
  archived: boolean
  deleted: boolean
  disponibleForFullVisualization: boolean
  availableForVisualization: boolean
  skillsList: SkillsList[]
  salaryDescription: string
}

export type OfferExtended = Offer & { detail: OfferDetail; cityImage?: string }

type Author = Readonly<{
  id: string
  privateId: number
  name: string
  uri: string
  logoUrl: string
  corporateResponsive: boolean
  showCorporativeHeader: boolean
}>

type Category = Readonly<{
  id: number
  value: string
}>

type Pay = {
  amount: number
  amountId: number
  periodId: number
  periodValue: string
  amountValue: string
}

type Profile = {
  id: string
  name: string
  description: string
  province: Category
  web: string
  numberWorkers: number
  url: string
  logoUrl?: string
  corporateWebsiteUrl: string
  websiteUrl: string
  hidden: boolean
  typeIndustry: Category
  country: Category
  corporateResponsive: boolean
  showCorporativeHeader: boolean
  clientId: number
  followable: boolean
}

type SkillsList = {
  skill: string
}

type Upsellings = {
  highlightHomeMonth: boolean
  highlightHomeWeek: boolean
  highlightSubcategory: boolean
  highlightLogo: boolean
  highlightColor: boolean
  highlightUrgent: boolean
  highlightStandingOffer: boolean
}

export type Dictionary = ReadonlyArray<{
  id: number
  value: string
  order: number
  key: string
}>
