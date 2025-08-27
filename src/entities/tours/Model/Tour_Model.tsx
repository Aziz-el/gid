import { Agency } from "@/entities/agencies/Model/Agency_Model"
import axios from "axios"

export interface Tour{
    name:string,
    agency:Agency,
    img:string,
    rating:number,
    date:{
        start_date:string,
        end_date:string,
    },
    people_count:number,
    location:{
        start_point:string
        middle_points:String[],
        end_point:string
    },
    vehicle_type:string,
    book_count:number,
    tags:[]
}

export default async function get_Tours (limit:number,page:number) :Promise<Tour> {
    let data = await axios.get("https://dff9a02614421063.mokky.dev/Tour",{
    params:{
      limit:limit,
      page:page,
    }
  })
  let result= data.data
  return result

}