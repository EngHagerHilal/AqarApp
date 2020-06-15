export interface Post {
    id?: number,
    post_name?: string,
    desc?: string,
    created_at?: Date | string,
    updated_at?: Date | string,
    allImages?: string[],
    price?: number,
    address?: string,
    phone?: string,
    email?: string,
    user_id?:number,
    username?:string,
    status?:string,
    type?:string,
    imgCount?:number,
    mainImage?:string
}