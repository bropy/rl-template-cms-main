import { NextResponse } from 'next/server'

// your custom endpoint
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ data: {} })
}
