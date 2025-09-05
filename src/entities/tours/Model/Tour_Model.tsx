import axios from "axios"

export interface Tour{
    id:number,
    name:string,
    agency_id:number,
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
    tags:[],
    price:number,
    discount : number,
}
export default async function get_Tours (limit:number,page:number) :Promise<Tour[]> {
    let data = await axios.get("https://dff9a02614421063.mokky.dev/Tour",{
    params:{
      limit:limit,
      page:page,
    }
  })
  let result:Tour[]= data.data.items
  return result

}