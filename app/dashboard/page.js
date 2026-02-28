'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [cmeTotal, setCmeTotal] = useState(0)
  const [recentJobs, setRecentJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }

    setUser(user)

    // Get profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    
    setProfile(profile)

    // Get CME total
    const { data: cme } = await supabase
      .from('cme_records')
      .select('credits')
      .eq('user_id', user.id)
    
    const total = cme?.reduce((sum, item) => sum + item.credits, 0) || 0
    setCmeTotal(total)

    // Get recent jobs
    const { data: jobs } = await supabase
      .from('job_applications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(3)
    
    setRecentJobs(jobs || [])
    setLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return <div className="text-center p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Healthcare OS</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {profile?.full_name || user?.email}</span>
            <button 
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 mb-2">Total CME Credits</h3>
            <p className="text-3xl font-bold text-blue-600">{cmeTotal}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 mb-2">License Status</h3>
            <p className="text-green-600 font-semibold">✅ Active</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 mb-2">Current Plan</h3>
            <p className="text-purple-600 font-semibold">🌟 Free Trial</p>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link 
            href="/cme" 
            className="bg-white p-4 rounded-lg shadow text-center hover:shadow-md transition"
          >
            <div className="text-3xl mb-2">📚</div>
            <div>Add CME</div>
          </Link>
          
          <Link 
            href="/licenses" 
            className="bg-white p-4 rounded-lg shadow text-center hover:shadow-md transition"
          >
            <div className="text-3xl mb-2">📋</div>
            <div>Licenses</div>
          </Link>
          
          <Link 
            href="/jobs" 
            className="bg-white p-4 rounded-lg shadow text-center hover:shadow-md transition"
          >
            <div className="text-3xl mb-2">💼</div>
            <div>Job Tracker</div>
          </Link>
          
          <Link 
            href="/pricing" 
            className="bg-white p-4 rounded-lg shadow text-center hover:shadow-md transition"
          >
            <div className="text-3xl mb-2">⭐</div>
            <div>Upgrade</div>
          </Link>
        </div>

        {/* Recent Job Applications */}
        <h2 className="text-xl font-semibold mb-4">Recent Job Applications</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {recentJobs.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Hospital</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Applied Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentJobs.map((job) => (
                  <tr key={job.id}>
                    <td className="px-6 py-4">{job.hospital_name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        job.status === 'offer' ? 'bg-green-100 text-green-700' :
                        job.status === 'interview' ? 'bg-yellow-100 text-yellow-700' :
                        job.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{job.applied_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="p-4 text-gray-500">No job applications yet</p>
          )}
        </div>
      </div>
    </div>
  )
}
