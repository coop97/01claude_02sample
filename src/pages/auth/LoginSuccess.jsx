import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import Button from '../../components/common/Button'

export default function LoginSuccess() {
  const { profile } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-md px-4 py-section text-center">
      <div className="mb-6 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <svg
            className="h-8 w-8 text-on-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h1 className="mb-3 text-display-lg font-bold text-ink">로그인 완료</h1>
      <p className="mb-8 text-body-md text-muted">
        {profile?.name ? (
          <>
            <span className="font-semibold text-ink">{profile.name}</span>님, 환영합니다!
          </>
        ) : (
          '환영합니다!'
        )}
      </p>

      <Button className="w-full" onClick={() => navigate('/')}>
        홈으로 이동
      </Button>
    </div>
  )
}
