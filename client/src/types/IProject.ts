
interface IParticipant {
    id: number,
    username: string,
    online: boolean,
    last_login: string,
    photo: string
}

export interface IProject {
    id: number,
    picture: string,
    name: string,
    participants: IParticipant[],
    admin: number
}