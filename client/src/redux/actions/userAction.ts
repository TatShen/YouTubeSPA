export const UPDATE_USER = "UPDATE_USER"

export type IRequest = {
    request: string
    name: string
    sort?:string | null
    limit: number
}

export type IUser = {
    id: number,
    login: string,
    requests:IRequest[]
}

export const getUser = (value: IRequest) => {
    return {
        type: UPDATE_USER,
        payload: value
    }
}

