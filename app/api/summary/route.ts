import { generateSummary } from '../../../lib/summary'
import { AuditResult } from '../../../lib/types'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const result: AuditResult = await req.json()
    const summary = await generateSummary(result)
    return NextResponse.json({ summary })
  } catch {
    return NextResponse.json(
      { summary: 'Unable to generate summary at this time.' },
      { status: 500 }
    )
  }
}