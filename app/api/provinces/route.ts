import { getProvinces } from '@/app/services/dictionary'
import { NextResponse } from 'next/server'

export async function GET() {
  const categories = await getProvinces()
  return NextResponse.json(categories)
}
