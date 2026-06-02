import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  const logoData = readFileSync(join(process.cwd(), 'public/logos/zero-code-logo-transparent-red.png'))
  const base64 = logoData.toString('base64')
  
  return new ImageResponse(
    (
      <div
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img 
          src={`data:image/png;base64,${base64}`} 
          style={{ width: '90%', height: '90%', objectFit: 'contain' }} 
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
