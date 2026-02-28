import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-cyan-500">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-2xl font-bold text-white">Healthcare OS</h1>
          <div className="space-x-4">
            <Link href="/login" className="text-white hover:underline">
              Login
            </Link>
            <Link 
              href="/signup" 
              className="bg-white text-blue-600 px-4 py-2 rounded-lg"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-5xl font-bold mb-6">
            From License Renewal to Gulf Job Offer
          </h2>
          <p className="text-xl mb-8">
            One dashboard for Indian healthcare professionals targeting Gulf countries
          </p>
          <Link 
            href="/signup" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold inline-block"
          >
            Start Free → Takes 2 minutes
          </Link>

          <div className="grid grid-cols-3 gap-4 mt-16">
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-3xl mb-2">📋</div>
              <div>DHA Approved</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-3xl mb-2">⚕️</div>
              <div>MOH Compatible</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-3xl mb-2">📄</div>
              <div>HAAD Ready</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
