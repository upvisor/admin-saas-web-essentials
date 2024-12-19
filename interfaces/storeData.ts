export interface IStoreData {
    _id?: string
    name: string
    nameContact: string
    email: string
    phone?: string
    address?: string
    departament?: string
    region?: string
    city?: string
    schedule?: ISchedule
    logo?: string
    logoWhite: string
    instagram?: string
    facebook?: string
    tiktok?: string
    whatsapp?: string
}

export interface ISchedule {
    monday: {
        state: boolean
        open: string
        close: string
    }
    tuesday: {
        state: boolean
        open: string
        close: string
    }
    wednesday: {
        state: boolean
        open: string
        close: string
    }
    thursday: {
        state: boolean
        open: string
        close: string
    }
    friday: {
        state: boolean
        open: string
        close: string
    }
    saturday: {
        state: boolean
        open: string
        close: string
    }
    sunday: {
        state: boolean
        open: string
        close: string
    }
}