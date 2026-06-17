import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { createInquiry } from '../../services/inquiryService'
import { getProduct } from '../../services/productService'
import Breadcrumb from '../../components/layout/Breadcrumb'
import TextField from '../../components/common/TextField'
import Button from '../../components/common/Button'

const schema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요'),
})

export default function InquiryWrite() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const productId = searchParams.get('productId') || null
  const [productName, setProductName] = useState('')
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (productId) getProduct(productId).then((p) => setProductName(p.name)).catch(() => {})
  }, [productId])

  const onSubmit = async (values) => {
    setServerError('')
    try {
      await createInquiry({ ...values, user_id: user.id, product_id: productId })
      navigate('/inquiries')
    } catch (err) {
      setServerError(err.message)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-section">
      <Breadcrumb items={[{ label: '온라인문의', to: '/inquiries' }, { label: '문의작성' }]} />
      <h1 className="mb-2 text-display-lg font-bold text-ink">문의작성</h1>
      {productName && <p className="mb-8 text-body-sm text-muted">제품: {productName}</p>}

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <TextField id="title" label="제목" error={errors.title?.message} {...register('title')} />
        <TextField
          id="content"
          label="내용"
          textarea
          rows={8}
          error={errors.content?.message}
          {...register('content')}
        />
        {serverError && <p className="text-sm text-error">{serverError}</p>}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? '등록 중...' : '문의 등록'}
        </Button>
      </form>
    </div>
  )
}
