export interface IAutomatization {
    _id?: string
    startType: string
    startValue: string
    name: string
    automatization: IEmailAutomatization[]
}

export interface IEmailAutomatization {
    affair: string
    title: string
    paragraph: string
    buttonText: string
    condition?: string[]
    url: string
    number?: number
    time?: string
    date?: Date
}