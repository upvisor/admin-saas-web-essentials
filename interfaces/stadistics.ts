import { IClient } from "./clients"
import { IMeeting } from "./meeting"

export interface IStadistics {
    pages: any[]
    sessions: any[]
    leads: any[]
    meetings: IMeeting[]
    checkouts: any[]
    pays: any[]
    clients: IClient[]
}