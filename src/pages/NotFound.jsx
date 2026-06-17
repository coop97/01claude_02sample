import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-section text-center">
      <h1 className="mb-4 text-display-xl font-bold text-ink">404</h1>
      <p className="mb-8 text-body-md text-muted">페이지를 찾을 수 없습니다.</p>
      <Link to="/">
        <Button>홈으로 이동</Button>
      </Link>
    </div>
  )
}
