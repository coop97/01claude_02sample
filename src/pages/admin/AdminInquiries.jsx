import { useEffect, useState } from 'react'
import { listAllInquiries, answerInquiry } from '../../services/inquiryService'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import TextField from '../../components/common/TextField'
import Spinner from '../../components/common/Spinner'

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [openId, setOpenId] = useState(null)
  const [answerDraft, setAnswerDraft] = useState('')
  const [saving, setSaving] = useState(false)

  const load = () => listAllInquiries().then(setInquiries).finally(() => setLoading(false))

  useEffect(() => {
    load()
  }, [])

  const openInquiry = (inq) => {
    setOpenId(openId === inq.id ? null : inq.id)
    setAnswerDraft(inq.answer || '')
  }

  const submitAnswer = async (id) => {
    setSaving(true)
    try {
      await answerInquiry(id, answerDraft)
      await load()
      setOpenId(null)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="mb-8 text-display-lg font-bold text-ink">문의관리</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-3">
          {inquiries.map((inq) => (
            <div key={inq.id} className="rounded-md border border-hairline">
              <button
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                onClick={() => openInquiry(inq)}
              >
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <Badge variant={inq.status === 'answered' ? 'answered' : 'pending'}>
                      {inq.status === 'answered' ? '답변완료' : '대기중'}
                    </Badge>
                    <span className="text-body-md text-ink">{inq.title}</span>
                  </div>
                  <p className="text-caption text-muted">
                    {inq.user?.name || inq.user?.email} ·{' '}
                    {inq.product?.name ? `제품: ${inq.product.name} · ` : ''}
                    {new Date(inq.created_at).toLocaleString()}
                  </p>
                </div>
                <span className="text-muted">{openId === inq.id ? '▲' : '▼'}</span>
              </button>
              {openId === inq.id && (
                <div className="border-t border-hairline px-5 py-4">
                  <p className="mb-4 whitespace-pre-line text-body-sm text-body">{inq.content}</p>
                  <TextField
                    id={`answer-${inq.id}`}
                    label="답변"
                    textarea
                    rows={5}
                    value={answerDraft}
                    onChange={(e) => setAnswerDraft(e.target.value)}
                  />
                  <Button className="mt-3" disabled={saving} onClick={() => submitAnswer(inq.id)}>
                    {saving ? '저장 중...' : '답변 등록'}
                  </Button>
                </div>
              )}
            </div>
          ))}
          {inquiries.length === 0 && <p className="text-body-sm text-muted">등록된 문의가 없습니다.</p>}
        </div>
      )}
    </div>
  )
}
