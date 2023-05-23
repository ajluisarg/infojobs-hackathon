import { getCategories } from '@/app/services/dictionary'
import { NextResponse } from 'next/server'

export async function GET() {
  const categories = await getCategories()
  return NextResponse.json(categories)
}
