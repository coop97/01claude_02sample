import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { updateProfile } from '../../services/profileService'
import TextField from '../../components/common/TextField'
import Button from '../../components/common/Button'
import Breadcrumb from '../../components/layout/Breadcrumb'

const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  phone: z.string().optional(),
})

export default function MyPage() {
  const { user, profile, refreshProfile } = useAuth()
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    values: { name: profile?.name || '', phone: profile?.phone || '' },
  })

  const onSubmit = async (values) => {
    setMessage('')
    await updateProfile(user.id, values)
    await refreshProfile()
    setMessage('저장되었습니다.')
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-section">
      <Breadcrumb items={[{ label: '마이페이지' }]} />
      <h1 className="mb-8 text-display-lg font-bold text-ink">마이페이지</h1>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <TextField id="email" label="이메일" value={profile?.email || ''} disabled readOnly />
        <TextField id="name" label="이름" error={errors.name?.message} {...register('name')} />
        <TextField id="phone" label="전화번호" placeholder="010-0000-0000" error={errors.phone?.message} {...register('phone')} />
        {message && <p className="text-sm text-success">{message}</p>}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? '저장 중...' : '저장'}
        </Button>
      </form>

      <div className="mt-10 border-t border-hairline pt-6">
        <Link to="/inquiries" className="text-sm font-semibold text-primary">
          내 문의 내역 보기 →
        </Link>
      </div>
    </div>
  )
}
