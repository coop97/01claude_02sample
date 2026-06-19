import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import TextField from '../../components/common/TextField'
import Button from '../../components/common/Button'

const schema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요').email('올바른 이메일 형식이 아닙니다'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
})

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (values) => {
    setServerError('')
    try {
      await signIn(values)
      navigate('/login-success', { replace: true })
    } catch (err) {
      setServerError(err.message === 'Invalid login credentials' ? '이메일 또는 비밀번호가 올바르지 않습니다.' : err.message)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-section">
      <h1 className="mb-8 text-display-lg font-bold text-ink">로그인</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="email"
          label="이메일"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <TextField
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호"
          error={errors.password?.message}
          {...register('password')}
        />
        {serverError && <p className="text-sm text-error">{serverError}</p>}
        <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        계정이 없으신가요?{' '}
        <Link to="/signup" className="font-semibold text-primary">
          회원가입
        </Link>
      </p>
    </div>
  )
}
