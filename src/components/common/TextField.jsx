export default function TextField({ label, error, id, textarea = false, rows = 6, className = '', ...props }) {
  const Component = textarea ? 'textarea' : 'input'
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label}
        </label>
      )}
      <Component
        id={id}
        rows={textarea ? rows : undefined}
        className={`w-full rounded-sm border px-4 py-2.5 text-base text-ink placeholder:text-muted-soft outline-none transition-colors focus:border-2 focus:border-primary disabled:bg-surface-soft disabled:text-muted ${
          error ? 'border-error' : 'border-border-strong'
        } ${textarea ? 'min-h-40 resize-y' : 'h-11'}`}
        {...props}
      />
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  )
}
