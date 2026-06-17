const variants = {
  primary:
    'bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active disabled:bg-primary-disabled disabled:cursor-not-allowed',
  secondary: 'bg-white text-ink border border-border-strong hover:bg-surface-soft',
  text: 'bg-transparent text-primary hover:underline px-0 h-auto',
  danger: 'bg-error text-white hover:opacity-90',
}

export default function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  children,
  ...props
}) {
  const base =
    variant === 'text'
      ? 'inline-flex items-center justify-center text-sm font-semibold transition-colors'
      : 'inline-flex items-center justify-center rounded-sm px-5 h-11 text-sm font-semibold transition-colors'

  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
