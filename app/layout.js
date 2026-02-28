import './globals.css'

export const metadata = {
  title: 'Healthcare OS',
  description: 'Career Migration Tool for Healthcare Professionals',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
