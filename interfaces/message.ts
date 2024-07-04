export interface IMessage {
    senderId?: string
    message?: string
    response?: string
    adminView?: boolean
    userView?: boolean

    createdAt?: Date
    updatedAt?: Date
}