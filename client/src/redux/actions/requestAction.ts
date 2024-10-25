export const ADD_REQUEST = "ADD_REQUEST"

export type IRequest = {
    request: string
    name: string
    sort?:string
    limit: number
}

export const addRequest = (value: IRequest) => {
    return {
        type: ADD_REQUEST,
        payload: value
    }
}

