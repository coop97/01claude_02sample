const history = [
  { year: '2026', desc: '회사소개 홈페이지 오픈' },
  { year: '2024', desc: '신규 제품 라인업 출시' },
  { year: '2021', desc: '본사 이전' },
  { year: '2018', desc: '회사 설립' },
]

export default function History() {
  return (
    <article>
      <h1 className="mb-6 text-display-md font-bold text-ink">연혁</h1>
      <ol className="flex flex-col gap-6 border-l border-hairline pl-6">
        {history.map((h) => (
          <li key={h.year} className="relative">
            <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-primary" />
            <p className="text-title-sm font-bold text-primary">{h.year}</p>
            <p className="mt-1 text-body-md text-body">{h.desc}</p>
          </li>
        ))}
      </ol>
    </article>
  )
}
