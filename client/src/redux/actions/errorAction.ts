export const CHANGE_ERROR = "CHANGE_ERROR"

export const changeError = (value: string) => {
    return{
        type: CHANGE_ERROR,
        payload: value
    }
}