import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'

export default function SignupSuccess() {
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

      <h1 className="mb-3 text-display-lg font-bold text-ink">회원가입 완료</h1>
      <p className="mb-8 text-body-md text-muted">
        가입이 완료되었습니다.
        <br />
        이메일 인증 후 로그인해주세요.
      </p>

      <div className="flex flex-col gap-3">
        <Button className="w-full" onClick={() => navigate('/')}>
          홈으로 이동
        </Button>
        <Button variant="outline" className="w-full" onClick={() => navigate('/login')}>
          로그인으로 이동
        </Button>
      </div>
    </div>
  )
}
