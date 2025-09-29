import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('image') as Blob
  if (!file) return NextResponse.json({ error: 'Нет файла' }, { status: 400 })

  const data = new FormData()
  data.append('image', file)

  try {
    const res = await axios.post('https://api.imageban.ru/v1/', data, {
      headers: {
        'Authorization': 'Bearer LJYlL7s74D55EdPGwkZN9w7zKTRmVPENyuw',
        'Content-Type': 'multipart/form-data'
      }
    })
    return NextResponse.json(res.data)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Ошибка загрузки' }, { status: 500 })
  }
}
