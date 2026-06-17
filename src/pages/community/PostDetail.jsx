import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getPost, incrementViewCount, deletePost } from '../../services/postService'
import { useAuth } from '../../context/useAuth'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Spinner from '../../components/common/Spinner'

export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAdmin } = useAuth()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const viewed = useRef(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- id 변경 시 즉시 스피너를 보여주기 위한 의도적 동기 setState
    setLoading(true)
    getPost(id)
      .then(async (data) => {
        setPost(data)
        if (!viewed.current) {
          viewed.current = true
          await incrementViewCount(id, data.view_count)
        }
      })
      .catch(() => setPost(null))
      .finally(() => setLoading(false))
  }, [id])

  const canManage = post && user && (post.author_id === user.id || isAdmin)

  const handleDelete = async () => {
    if (!confirm('게시글을 삭제하시겠습니까?')) return
    await deletePost(id)
    navigate('/community')
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-section">
        <Spinner />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-section text-center">
        <p className="text-body-md text-muted">게시글을 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-section">
      <Breadcrumb items={[{ label: '커뮤니티', to: '/community' }, { label: post.title }]} />

      <div className="border-b border-hairline pb-6">
        <div className="mb-2 flex items-center gap-2">
          {post.is_notice && <Badge variant="notice">공지</Badge>}
          <h1 className="text-display-md font-bold text-ink">{post.title}</h1>
        </div>
        <div className="flex gap-3 text-caption text-muted">
          <span>{post.author_name || '익명'}</span>
          <span>{new Date(post.created_at).toLocaleString()}</span>
          <span>조회 {post.view_count + 1}</span>
        </div>
      </div>

      <div className="whitespace-pre-line py-8 text-body-md text-body">{post.content}</div>

      <div className="flex justify-between border-t border-hairline pt-6">
        <Link to="/community">
          <Button variant="secondary">목록으로</Button>
        </Link>
        {canManage && (
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => navigate(`/community/${id}/edit`)}>
              수정
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              삭제
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
