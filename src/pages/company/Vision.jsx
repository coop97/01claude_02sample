const visions = [
  { title: '혁신', desc: '끊임없는 기술 혁신으로 새로운 가치를 창출합니다.' },
  { title: '신뢰', desc: '고객과의 신뢰를 최우선으로 생각합니다.' },
  { title: '성장', desc: '고객과 함께 지속적으로 성장합니다.' },
]

export default function Vision() {
  return (
    <article>
      <h1 className="mb-6 text-display-md font-bold text-ink">비전</h1>
      <p className="mb-8 text-body-md leading-relaxed text-body">
        우리는 기술로 더 나은 세상을 만들어가는 기업이 되고자 합니다.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {visions.map((v) => (
          <div key={v.title} className="rounded-md border border-hairline p-6 shadow-card">
            <h2 className="mb-2 text-title-md font-semibold text-ink">{v.title}</h2>
            <p className="text-body-sm text-muted">{v.desc}</p>
          </div>
        ))}
      </div>
    </article>
  )
}
