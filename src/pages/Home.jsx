import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listProducts } from '../services/productService'
import { listLatestPosts } from '../services/postService'
import Button from '../components/common/Button'
import Spinner from '../components/common/Spinner'

export default function Home() {
  const [products, setProducts] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([listProducts(), listLatestPosts(5)])
      .then(([productData, postData]) => {
        setProducts(productData.slice(0, 4))
        setPosts(postData)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <section className="bg-surface-soft px-4 py-section text-center">
        <h1 className="text-display-xl font-bold text-ink">신뢰할 수 있는 기술 파트너</h1>
        <p className="mx-auto mt-4 max-w-xl text-body-md text-body">
          고객의 문제를 해결하는 제품과 서비스를 제공합니다.
        </p>
        <Link to="/inquiries/new">
          <Button className="mt-8">문의하기</Button>
        </Link>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-section">
        <h2 className="mb-3 text-display-md font-bold text-ink">회사소개</h2>
        <p className="mb-6 max-w-2xl text-body-md text-body">
          우리 회사는 기술로 더 나은 가치를 만들어가는 기업입니다.
        </p>
        <Link to="/company" className="text-sm font-semibold text-primary">
          자세히 보기 →
        </Link>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-section">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-display-md font-bold text-ink">대표 제품</h2>
          <Link to="/products" className="text-sm font-semibold text-muted hover:text-ink">
            전체보기
          </Link>
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
            {products.length === 0 && <p className="text-body-sm text-muted">등록된 제품이 없습니다.</p>}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-section">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-display-md font-bold text-ink">최신 게시글</h2>
          <Link to="/community" className="text-sm font-semibold text-muted hover:text-ink">
            전체보기
          </Link>
        </div>
        <ul className="divide-y divide-hairline rounded-md border border-hairline">
          {posts.map((post) => (
            <li key={post.id}>
              <Link to={`/community/${post.id}`} className="flex justify-between px-5 py-4 hover:bg-surface-soft">
                <span className="text-body-md text-ink">{post.title}</span>
                <span className="text-caption text-muted">{new Date(post.created_at).toLocaleDateString()}</span>
              </Link>
            </li>
          ))}
          {posts.length === 0 && <li className="px-5 py-4 text-body-sm text-muted">등록된 게시글이 없습니다.</li>}
        </ul>
      </section>
    </div>
  )
}
