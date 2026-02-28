'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CMEPage() {
  const [cmes, setCmes] = useState([])
  const [title, setTitle] = useState('')
  const [credits, setCredits] = useState('')
  const [provider, setProvider] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadCMEs()
  }, [])

  async function loadCMEs() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }

    const { data } = await supabase
      .from('cme_records')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    
    setCmes(data || [])
    setLoading(false)
  }

  async function addCME() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('cme_records').insert({
      user_id: user.id,
      title: title,
      credits: parseInt(credits),
      provider: provider
    })
    
    setTitle('')
    setCredits('')
    setProvider('')
    loadCMEs()
  }

  async function deleteCME(id) {
    await supabase.from('cme_records').delete().eq('id', id)
    loadCMEs()
  }

  const totalCredits = cmes.reduce((sum, cme) => sum + cme.credits, 0)

  if (loading) {
    return <div className="text-center p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/dashboard" className="text-xl font-bold text-blue-600">
            ← Back to Dashboard
          </Link>
          <h1 className="text-xl font-semibold">CME Tracker</h1>
          <div></div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-lg font-semibold mb-2">Total Credits</h2>
          <p className="text-4xl font-bold text-blue-600">{totalCredits}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">Add New CME</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Course title"
              className="w-full p-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Credits"
                className="p-2 border rounded"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
              />
              <input
                type="text"
                placeholder="Provider (optional)"
                className="p-2 border rounded"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
              />
            </div>
            <button
              onClick={addCME}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add CME
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold p-4 border-b">Your CME Records</h2>
          {cmes.length > 0 ? (
            <div className="divide-y">
              {cmes.map((cme) => (
                <div key={cme.id} className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{cme.title}</h3>
                    <p className="text-sm text-gray-600">
                      {cme.credits} credits • {cme.provider || 'No provider'} • {cme.date_completed}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteCME(cme.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="p-4 text-gray-500">No CME records yet. Add your first one!</p>
          )}
        </div>
      </div>
    </div>
  )
}
