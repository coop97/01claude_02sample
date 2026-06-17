import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminListPosts, updatePost, deletePost } from '../../services/postService'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Spinner from '../../components/common/Spinner'

export default function AdminPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => adminListPosts().then(setPosts).finally(() => setLoading(false))

  useEffect(() => {
    load()
  }, [])

  const toggleNotice = async (post) => {
    await updatePost(post.id, { is_notice: !post.is_notice })
    load()
  }

  const handleDelete = async (id) => {
    if (!confirm('게시글을 삭제하시겠습니까?')) return
    await deletePost(id)
    load()
  }

  return (
    <div>
      <h1 className="mb-8 text-display-lg font-bold text-ink">게시판관리</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto rounded-md border border-hairline">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-strong text-title-sm text-ink">
                <th className="px-4 py-3 text-left">제목</th>
                <th className="px-4 py-3 text-left">작성자</th>
                <th className="px-4 py-3 text-left">작성일</th>
                <th className="px-4 py-3 text-right">관리</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-t border-hairline">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {post.is_notice && <Badge variant="notice">공지</Badge>}
                      <Link to={`/community/${post.id}`} className="text-body-sm text-ink hover:underline">
                        {post.title}
                      </Link>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-body-sm text-muted">{post.author_name || '-'}</td>
                  <td className="px-4 py-3 text-body-sm text-muted">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="text" onClick={() => toggleNotice(post)} className="mr-3">
                      {post.is_notice ? '공지 해제' : '공지 지정'}
                    </Button>
                    <Button variant="text" className="text-error" onClick={() => handleDelete(post.id)}>
                      삭제
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
