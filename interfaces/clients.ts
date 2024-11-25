export interface IClient {
  _id?: string
  firstName?: string
  lastName?: string
  email: string
  phone?: string
  funnels?: IFunnelClient[]
  services?: IServiceClient[]
  forms?: IFormClient[]
  meetings?: IMeetingClient[]
  tags?: string[]
  emails?: IEmailClient[]
  data?: { name: string, value: string }[]

  createdAt?: Date
  updatedAt?: Date
}

export interface IClientTag {
  _id: string
  tag: string
}

export interface IClientData {
  name: string
  data: string
}

export interface IFunnelClient {
  funnel: string
  step: string
}

export interface IServiceClient {
  service: string
  step?: string
  plan?: string
  price?: string
  payStatus?: string
}

export interface IFormClient {
  form: string
}

export interface IMeetingClient {
  meeting: string
}

export interface IEmailClient {
  id: string
  automatizationId?: string
  subject: string
  opened: boolean
  clicked: boolean
}