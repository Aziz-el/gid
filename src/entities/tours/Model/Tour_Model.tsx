import axios from "axios"

export interface Tour {
  id: number
  name: string
  agency_id: number
  img: string
  rating: number
  description?:string
  date?: {
    start_date: string
    end_date: string
  }
  start_date: string
  people_count: number
  location: {
    start_point: {
      start_time: string
      location: string
      addres: string
    }
    middle_points: {
      start_time: string
      location: string
      addres: string
    }[],
    end_point: {
      start_time: string
      location: string
      addres: string
    }
  }
  vehicle_type: string
  book_count: number
  tags: []
  price: number
  discount: number
}

export default async function get_Tours(limit: number, page: number, name: string) {
  const params: any = { limit, page }
  if (name && name.trim() !== "") {
    params.name = `*${name }`
  }

  const { data } = await axios.get("https://dff9a02614421063.mokky.dev/Tour", {
    params
  })

  return data
}

