import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { createPost, getPost, updatePost, uploadAttachment } from '../../services/postService'
import Breadcrumb from '../../components/layout/Breadcrumb'
import TextField from '../../components/common/TextField'
import Button from '../../components/common/Button'

const schema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요'),
})

export default function PostWrite() {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()
  const { user, profile, isAdmin } = useAuth()

  const [isNotice, setIsNotice] = useState(false)
  const [attachments, setAttachments] = useState([])
  const [uploading, setUploading] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (!isEdit) return
    getPost(id).then((post) => {
      reset({ title: post.title, content: post.content })
      setIsNotice(post.is_notice)
    })
  }, [id, isEdit, reset])

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const attachment = await uploadAttachment(file)
      setAttachments((prev) => [...prev, attachment])
    } catch (err) {
      setServerError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const removeAttachment = (name) => {
    setAttachments((prev) => prev.filter((a) => a.name !== name))
  }

  const onSubmit = async (values) => {
    setServerError('')
    const attachmentText = attachments.length
      ? `\n\n[첨부파일]\n${attachments.map((a) => a.url).join('\n')}`
      : ''
    try {
      if (isEdit) {
        await updatePost(id, { ...values, content: values.content + attachmentText, is_notice: isNotice })
        navigate(`/community/${id}`)
      } else {
        const post = await createPost({
          ...values,
          content: values.content + attachmentText,
          author_id: user.id,
          author_name: profile?.name || '익명',
          is_notice: isNotice,
        })
        navigate(`/community/${post.id}`)
      }
    } catch (err) {
      setServerError(err.message)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-section">
      <Breadcrumb items={[{ label: '커뮤니티', to: '/community' }, { label: isEdit ? '수정' : '글쓰기' }]} />
      <h1 className="mb-8 text-display-lg font-bold text-ink">{isEdit ? '게시글 수정' : '게시글 작성'}</h1>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <TextField id="title" label="제목" error={errors.title?.message} {...register('title')} />
        <TextField
          id="content"
          label="내용"
          textarea
          rows={12}
          error={errors.content?.message}
          {...register('content')}
        />

        <div>
          <p className="mb-1.5 text-sm font-semibold text-ink">파일첨부</p>
          <input type="file" onChange={handleFileChange} disabled={uploading} className="text-body-sm" />
          {uploading && <p className="mt-1 text-caption text-muted">업로드 중...</p>}
          {attachments.length > 0 && (
            <ul className="mt-2 flex flex-col gap-1">
              {attachments.map((a) => (
                <li key={a.name} className="flex items-center gap-2 text-body-sm text-muted">
                  {a.name}
                  <button type="button" onClick={() => removeAttachment(a.name)} className="text-error">
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {isAdmin && (
          <label className="flex items-center gap-2 text-sm font-semibold text-ink">
            <input type="checkbox" checked={isNotice} onChange={(e) => setIsNotice(e.target.checked)} />
            공지글로 등록
          </label>
        )}

        {serverError && <p className="text-sm text-error">{serverError}</p>}

        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '저장 중...' : '저장'}
          </Button>
          <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
            취소
          </Button>
        </div>
      </form>
    </div>
  )
}
