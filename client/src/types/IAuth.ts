export interface IAuth {
    id: number,
    photo: string,
    username: string,
    full_name: string,
    is_staff: boolean,
    subdivision: {
        id: number,
        name: string
    }
}