import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { listProducts, listCategories } from '../../services/productService'
import Breadcrumb from '../../components/layout/Breadcrumb'
import TextField from '../../components/common/TextField'
import Spinner from '../../components/common/Spinner'

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listCategories().then(setCategories)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 검색/카테고리 변경 시 즉시 스피너를 보여주기 위한 의도적 동기 setState
    setLoading(true)
    listProducts({ search, category })
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [search, category])

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-section">
      <Breadcrumb items={[{ label: '제품소개' }]} />
      <h1 className="mb-8 text-display-lg font-bold text-ink">제품소개</h1>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <TextField
          id="search"
          placeholder="제품명 검색"
          defaultValue={search}
          className="sm:w-72"
          onChange={(e) => setSearchParams((p) => ({ ...Object.fromEntries(p), search: e.target.value }))}
        />
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setSearchParams((p) => ({ ...Object.fromEntries(p), category: '' }))}
            className={`whitespace-nowrap rounded-sm px-4 py-2 text-sm font-semibold ${
              !category ? 'bg-primary text-on-primary' : 'border border-border-strong text-ink'
            }`}
          >
            전체
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSearchParams((p) => ({ ...Object.fromEntries(p), category: c }))}
              className={`whitespace-nowrap rounded-sm px-4 py-2 text-sm font-semibold ${
                category === c ? 'bg-primary text-on-primary' : 'border border-border-strong text-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {products.map((p) => (
            <Link
              key={p.id}
              to={`/products/${p.id}`}
              className="rounded-md border border-hairline shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="aspect-square rounded-t-md bg-surface-soft">
                {p.image_url && (
                  <img src={p.image_url} alt={p.name} className="h-full w-full rounded-t-md object-cover" />
                )}
              </div>
              <div className="p-4">
                <p className="text-title-md font-semibold text-ink">{p.name}</p>
                <p className="mt-1 truncate text-body-sm text-muted">{p.description}</p>
              </div>
            </Link>
          ))}
          {products.length === 0 && <p className="text-body-sm text-muted">검색 결과가 없습니다.</p>}
        </div>
      )}
    </div>
  )
}
