export interface ToastState {
    id: string,
    type: ToastTypes,
    message: string
}

export enum ToastTypes {
    Success,
    Info,
    Warning,
    Error
}