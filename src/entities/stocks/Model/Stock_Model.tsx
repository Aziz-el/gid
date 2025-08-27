import React from 'react'

import {Agency} from '@/entities/agencies/Model/Agency_Model'
import axios from 'axios'
export interface Stock  {
    title:string,
    agency:Agency,
}


export default async function get_Stocks () :Promise<Stock[]>{
  let data = await axios.get("https://dff9a02614421063.mokky.dev/Agency")
  let result= data.data
  return result
}