export interface ZipCodeData {
  code?: string;
  state: string;
  city: string;
}

export interface CompanyLogin {
  email: string,
  password: string
}

export interface ConditionZipCode {
  code: number
}

export interface AddTokenCard {
  TokenId: number,
  CompanyId: number
}

export interface AddEstimateAction {
  EstimateActionId: number,
  TradeId: number,
  customerId: string;
  paymentMethodId: string;

}

export interface AddProjectDetail {
  ProjectDetailId: number,
  TradeId: number
}

export interface CompanyStatus {
  CompanyId: number,
  status: boolean
}