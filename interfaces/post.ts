export interface IPost {
    _id?: string
    title: string
    description?: string
    content: [{ type: string, html: string, content: string, image: string }],
    state: boolean
    image?: string
    titleSeo?: string
    descriptionSeo?: string

    createdAt?: Date
    updatedAt?: Date
}