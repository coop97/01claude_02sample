import { NavLink, Outlet } from 'react-router-dom'
import Breadcrumb from '../../components/layout/Breadcrumb'

const items = [
  { to: '/company', label: '회사소개', end: true },
  { to: '/company/ceo', label: 'CEO 인사말' },
  { to: '/company/vision', label: '비전' },
  { to: '/company/history', label: '연혁' },
  { to: '/company/location', label: '오시는 길' },
]

function linkClass({ isActive }) {
  return `block rounded-sm px-4 py-2.5 text-sm font-semibold ${
    isActive ? 'bg-primary-disabled text-primary' : 'text-muted hover:bg-surface-soft hover:text-ink'
  }`
}

export default function CompanyLayout() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-section">
      <Breadcrumb items={[{ label: '회사소개' }]} />
      <div className="grid gap-10 md:grid-cols-[200px_1fr]">
        <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
          {items.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
