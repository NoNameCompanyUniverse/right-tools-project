export interface IUser {
    id: number,
    firstname: string,
    lastname: string,
    login: string,
    email: string,
    tel: string,
    status: string,
    avatar: string,
    banner: string,
    tags: Array<{id: number, value: string}>
}