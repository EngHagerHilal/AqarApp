export interface User {
    id?:number,
    name?:string,
    email?:string,
    password?:string,
    phone?:number,
    email_verified_at?:Date | string,
    api_token?:string,
    created_at?:Date | string,
    updated_at?:Date | string,
    status?:string,
    passwordResetCode?:any
}
