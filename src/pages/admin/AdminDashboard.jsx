import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ users: 0, products: 0, posts: 0, pendingInquiries: 0 })

  useEffect(() => {
    async function load() {
      const [users, products, posts, pending] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('posts').select('id', { count: 'exact', head: true }),
        supabase.from('inquiries').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      ])
      setCounts({
        users: users.count || 0,
        products: products.count || 0,
        posts: posts.count || 0,
        pendingInquiries: pending.count || 0,
      })
    }
    load()
  }, [])

  const cards = [
    { label: '전체 회원', value: counts.users },
    { label: '등록 제품', value: counts.products },
    { label: '게시글', value: counts.posts },
    { label: '대기중 문의', value: counts.pendingInquiries },
  ]

  return (
    <div>
      <h1 className="mb-8 text-display-lg font-bold text-ink">관리자 대시보드</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-md border border-hairline p-6 shadow-card">
            <p className="text-body-sm text-muted">{c.label}</p>
            <p className="mt-2 text-display-md font-bold text-ink">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
