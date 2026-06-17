import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import TextField from '../../components/common/TextField'
import Button from '../../components/common/Button'

const schema = z
  .object({
    name: z.string().min(1, '이름을 입력해주세요'),
    email: z.string().min(1, '이메일을 입력해주세요').email('올바른 이메일 형식이 아닙니다'),
    password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  })

export default function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const [done, setDone] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async ({ name, email, password }) => {
    setServerError('')
    try {
      await signUp({ name, email, password })
      setDone(true)
    } catch (err) {
      setServerError(err.message)
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-md px-4 py-section text-center">
        <h1 className="mb-4 text-display-lg font-bold text-ink">가입이 완료되었습니다</h1>
        <p className="mb-8 text-body-md text-body">이메일 인증 후 로그인해주세요.</p>
        <Button onClick={() => navigate('/login')} className="w-full">
          로그인으로 이동
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-section">
      <h1 className="mb-8 text-display-lg font-bold text-ink">회원가입</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <TextField id="name" label="이름" placeholder="홍길동" error={errors.name?.message} {...register('name')} />
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
          placeholder="8자 이상"
          error={errors.password?.message}
          {...register('password')}
        />
        <TextField
          id="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          error={errors.passwordConfirm?.message}
          {...register('passwordConfirm')}
        />
        {serverError && <p className="text-sm text-error">{serverError}</p>}
        <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
          {isSubmitting ? '가입 중...' : '회원가입'}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        이미 계정이 있으신가요?{' '}
        <Link to="/login" className="font-semibold text-primary">
          로그인
        </Link>
      </p>
    </div>
  )
}
