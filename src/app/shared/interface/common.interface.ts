export interface IdiscountRequest{
    date:string,
    name:string,
    title:string,
    description:string,
    imagePath:string,
}
export interface IDiscountResponce extends IdiscountRequest{
    id:number|string
}

export interface ICategoryRequest{
    name:string,
    path:string,
    imagePath:string
}
export interface ICategoryResponce extends ICategoryRequest{
    id:number | string
}

export interface IProductRequest{
    name:string,
    category:ICategoryRequest,
    path:string,
    ingredients:string,
    weight:string,
    price:number,
    imagePath:string,
    count: number
}
export interface IProductResponce extends IProductRequest{
    id:number|string
}

export interface ILogin{
    email:string,
    password:string
}