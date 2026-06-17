import { NavLink, Outlet } from 'react-router-dom'

const items = [
  { to: '/admin', label: '대시보드', end: true },
  { to: '/admin/users', label: '회원관리' },
  { to: '/admin/products', label: '제품관리' },
  { to: '/admin/posts', label: '게시판관리' },
  { to: '/admin/inquiries', label: '문의관리' },
  { to: '/admin/settings', label: '사이트설정' },
]

function linkClass({ isActive }) {
  return `relative block rounded-sm px-4 py-2.5 text-sm font-semibold ${
    isActive ? 'bg-white text-primary' : 'text-muted hover:bg-white/60 hover:text-ink'
  }`
}

export default function AdminLayout() {
  return (
    <div className="mx-auto flex max-w-[1200px] gap-8 px-4 py-section">
      <aside className="w-60 shrink-0 rounded-md bg-surface-strong p-3">
        <nav className="flex flex-col gap-1">
          {items.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  )
}
