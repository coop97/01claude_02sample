const variants = {
  notice: 'bg-accent-soft text-accent',
  pending: 'bg-surface-strong text-ink',
  answered: 'bg-green-50 text-success',
  admin: 'bg-primary-disabled text-primary',
}

export default function Badge({ variant = 'notice', children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${variants[variant]}`}
    >
      {children}
    </span>
  )
}
