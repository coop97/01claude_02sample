import { Link } from 'react-router-dom'

export default function Breadcrumb({ items }) {
  return (
    <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={item.label} className="flex items-center gap-2">
            {item.to && !isLast ? (
              <Link to={item.to} className="hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-ink' : ''}>{item.label}</span>
            )}
            {!isLast && <span>›</span>}
          </span>
        )
      })}
    </nav>
  )
}
