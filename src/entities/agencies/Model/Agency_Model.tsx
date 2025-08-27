import axios from "axios";

export interface Agency {
  img:string,
  rating:number,
  name:string,
  fullname_Of_owner:string,
  email:string,
  number:string,
  city_of_their_main_building:string,
  adress_of_their_main_building:string,
  description:string,
}

export default async function get_Agencies (limit:number,page:number) :Promise<Agency[]>{
  let data = await axios.get("https://dff9a02614421063.mokky.dev/Agency",{
    params:{
      limit:limit,
      page:page,
    }
  })
  let result= data.data
  return result
}