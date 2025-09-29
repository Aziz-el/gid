
import { Agency } from '@/entities/agencies/Model/Agency_Model'
import axios from 'axios'
export interface Stock  {
    id:number,
    title:string,
    desc:string,
    tour_id: number,
}


export default async function get_Stocks () :Promise<Stock[]>{
  let data = await axios.get<Stock[]>("https://dff9a02614421063.mokky.dev/Stock")
  let result :Stock[]= data.data
  return result
}