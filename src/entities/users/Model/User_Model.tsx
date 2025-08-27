import { Tour } from "@/entities/tours/Model/Tour_Model";

export interface User {
    img:string,
    fullname:string,
    age:number,
    email:string,
    phone:string,
    family_type:string,
    favorites:Tour[],

}