import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { listMyInquiries } from '../../services/inquiryService'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Spinner from '../../components/common/Spinner'

export default function InquiryList() {
  const { user } = useAuth()
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [openId, setOpenId] = useState(null)

  useEffect(() => {
    listMyInquiries(user.id)
      .then(setInquiries)
      .finally(() => setLoading(false))
  }, [user.id])

  return (
    <div className="mx-auto max-w-3xl px-4 py-section">
      <Breadcrumb items={[{ label: '온라인문의' }]} />
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-display-lg font-bold text-ink">내 문의 내역</h1>
        <Link to="/inquiries/new">
          <Button>문의작성</Button>
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-3">
          {inquiries.map((inq) => (
            <div key={inq.id} className="rounded-md border border-hairline">
              <button
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpenId(openId === inq.id ? null : inq.id)}
              >
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <Badge variant={inq.status === 'answered' ? 'answered' : 'pending'}>
                      {inq.status === 'answered' ? '답변완료' : '대기중'}
                    </Badge>
                    <span className="text-body-md text-ink">{inq.title}</span>
                  </div>
                  <p className="text-caption text-muted">
                    {inq.product?.name ? `제품: ${inq.product.name} · ` : ''}
                    {new Date(inq.created_at).toLocaleString()}
                  </p>
                </div>
                <span className="text-muted">{openId === inq.id ? '▲' : '▼'}</span>
              </button>
              {openId === inq.id && (
                <div className="border-t border-hairline px-5 py-4">
                  <p className="whitespace-pre-line text-body-sm text-body">{inq.content}</p>
                  {inq.status === 'answered' ? (
                    <div className="mt-4 rounded-sm bg-surface-soft p-4">
                      <p className="mb-1 text-caption font-semibold text-muted">답변</p>
                      <p className="whitespace-pre-line text-body-sm text-ink">{inq.answer}</p>
                    </div>
                  ) : (
                    <p className="mt-4 text-caption text-muted">아직 답변이 등록되지 않았습니다.</p>
                  )}
                </div>
              )}
            </div>
          ))}
          {inquiries.length === 0 && <p className="text-body-sm text-muted">등록한 문의가 없습니다.</p>}
        </div>
      )}
    </div>
  )
}
