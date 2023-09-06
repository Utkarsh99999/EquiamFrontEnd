import './globals.css'
export const metadata = {
  title: 'Equiam',
  description: 'A next js app created by utkarsh singh tiwari',
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
