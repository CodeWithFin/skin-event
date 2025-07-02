import { NextRequest, NextResponse } from 'next/server'

// Simple placeholder image API for demonstration
export async function GET(
  request: NextRequest,
  { params }: { params: { dimensions: string } }
) {
  const dimensions = params.dimensions
  const [width, height] = dimensions.split('x').map(Number)
  
  // In production, you'd return actual placeholder images
  // For now, redirect to a placeholder service
  return NextResponse.redirect(`https://via.placeholder.com/${width}x${height}/F4C2C2/6B3F27?text=Vitapharm+Beauty`)
}
