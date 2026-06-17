import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProduct } from '../../services/productService'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Button from '../../components/common/Button'
import Spinner from '../../components/common/Spinner'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- id 변경 시 즉시 스피너를 보여주기 위한 의도적 동기 setState
    setLoading(true)
    getProduct(id)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-section">
        <Spinner />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-section text-center">
        <p className="text-body-md text-muted">제품을 찾을 수 없습니다.</p>
        <Button variant="text" onClick={() => navigate('/products')} className="mt-4">
          목록으로
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-section">
      <Breadcrumb items={[{ label: '제품소개', to: '/products' }, { label: product.name }]} />

      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-square rounded-md bg-surface-soft">
          {product.image_url && (
            <img src={product.image_url} alt={product.name} className="h-full w-full rounded-md object-cover" />
          )}
        </div>
        <div>
          {product.category && (
            <p className="mb-2 text-body-sm font-semibold text-primary">{product.category}</p>
          )}
          <h1 className="mb-4 text-display-lg font-bold text-ink">{product.name}</h1>
          {product.price != null && (
            <p className="mb-6 text-title-md font-semibold text-ink">{Number(product.price).toLocaleString()}원</p>
          )}
          <p className="mb-8 whitespace-pre-line text-body-md text-body">{product.description}</p>
          <Link to={`/inquiries/new?productId=${product.id}`}>
            <Button>문의하기</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
