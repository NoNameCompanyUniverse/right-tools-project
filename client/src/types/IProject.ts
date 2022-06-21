import {IUserMin} from "./IUser";

interface IParticipant {
    id: number,
    username: string,
    online: boolean,
    last_login: string,
    photo: string
}

interface IProjectBuf {
    id: number,
    picture: string,
    name: string,
    description: string
}

export interface IProject extends IProjectBuf {
    participants: IParticipant[],
    admin: number,
}

export interface IProjectFull extends IProjectBuf {
    admin: IUserMin
}