import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import Button from '../common/Button'

const navItems = [
  { to: '/company', label: '회사소개' },
  { to: '/products', label: '제품소개' },
  { to: '/community', label: '커뮤니티' },
  { to: '/inquiries', label: '온라인문의' },
]

function navLinkClass({ isActive }) {
  return `text-[15px] font-semibold pb-1 border-b-2 transition-colors ${
    isActive ? 'border-primary text-ink' : 'border-transparent text-muted hover:text-ink'
  }`
}

export default function Header() {
  const { isAuthenticated, isAdmin, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
    setOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas">
      <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold text-ink">
          회사로고
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAdmin && (
            <Link to="/admin" className="text-sm font-semibold text-muted hover:text-ink">
              관리자
            </Link>
          )}
          {isAuthenticated ? (
            <>
              <Link to="/mypage" className="text-sm font-semibold text-ink">
                {profile?.name || '마이페이지'}
              </Link>
              <Button variant="secondary" className="h-9 px-4 text-sm" onClick={handleLogout}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-ink">
                로그인
              </Link>
              <Link to="/signup">
                <Button className="h-9 px-4 text-sm">회원가입</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="메뉴 열기"
        >
          <span className="text-2xl">{open ? '✕' : '☰'}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-hairline px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="text-base font-semibold text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            {isAdmin && (
              <Link to="/admin" className="text-base font-semibold text-ink" onClick={() => setOpen(false)}>
                관리자
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <Link to="/mypage" className="text-base font-semibold text-ink" onClick={() => setOpen(false)}>
                  마이페이지
                </Link>
                <button className="text-left text-base font-semibold text-ink" onClick={handleLogout}>
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-base font-semibold text-ink" onClick={() => setOpen(false)}>
                  로그인
                </Link>
                <Link to="/signup" className="text-base font-semibold text-ink" onClick={() => setOpen(false)}>
                  회원가입
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
