
export interface IUserBuf  {
    id: number,
    online: boolean,
    last_login: string,
    photo: string | null,
    username: string,
    email: string,
    subdivision: {
        id: number,
        name: string
    }
}
export interface IUser extends IUserBuf{
    phone: string,
    first_name: string,
    last_name: string,
    description: string,
    date_birth: string,
    is_staff: boolean,
}

export interface IUserMin extends IUserBuf {
    full_name: string
}

