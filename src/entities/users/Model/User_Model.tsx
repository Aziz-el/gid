import { Tour } from "@/entities/tours/Model/Tour_Model";

export interface User {
    id:number,
    fullName:string,
    age:number,
    email:string,
    number:string,
    family_type:string,
    favorites:Tour[],

}