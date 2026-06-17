import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { listPosts } from '../../services/postService'
import { useAuth } from '../../context/useAuth'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import TextField from '../../components/common/TextField'
import Spinner from '../../components/common/Spinner'

export default function PostList() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const page = Number(searchParams.get('page') || '1')

  const [data, setData] = useState({ posts: [], total: 0, pageSize: 10 })
  const [loading, setLoading] = useState(true)
  const [keyword, setKeyword] = useState(search)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 검색/페이지 변경 시 즉시 스피너를 보여주기 위한 의도적 동기 setState
    setLoading(true)
    listPosts({ search, page })
      .then(setData)
      .finally(() => setLoading(false))
  }, [search, page])

  const totalPages = Math.max(1, Math.ceil(data.total / data.pageSize))

  const submitSearch = (e) => {
    e.preventDefault()
    setSearchParams({ search: keyword, page: '1' })
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-section">
      <Breadcrumb items={[{ label: '커뮤니티' }]} />
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-display-lg font-bold text-ink">커뮤니티</h1>
        {isAuthenticated && <Button onClick={() => navigate('/community/new')}>글쓰기</Button>}
      </div>

      <form onSubmit={submitSearch} className="mb-6 flex gap-2">
        <TextField
          id="search"
          placeholder="제목 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="max-w-sm"
        />
        <Button type="submit" variant="secondary">
          검색
        </Button>
      </form>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="rounded-md border border-hairline">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-strong text-title-sm text-ink">
                  <th className="px-4 py-3 text-left">제목</th>
                  <th className="hidden px-4 py-3 text-left sm:table-cell">작성자</th>
                  <th className="hidden px-4 py-3 text-left sm:table-cell">작성일</th>
                  <th className="hidden px-4 py-3 text-right sm:table-cell">조회수</th>
                </tr>
              </thead>
              <tbody>
                {data.posts.map((post) => (
                  <tr
                    key={post.id}
                    onClick={() => navigate(`/community/${post.id}`)}
                    className={`cursor-pointer border-t border-hairline hover:bg-surface-soft ${
                      post.is_notice ? 'bg-surface-soft' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {post.is_notice && <Badge variant="notice">공지</Badge>}
                        <span className="text-body-md text-ink">{post.title}</span>
                      </div>
                      <p className="mt-1 text-caption text-muted sm:hidden">
                        {post.author_name || '익명'} · {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="hidden px-4 py-3 text-body-sm text-muted sm:table-cell">
                      {post.author_name || '익명'}
                    </td>
                    <td className="hidden px-4 py-3 text-body-sm text-muted sm:table-cell">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="hidden px-4 py-3 text-right text-body-sm text-muted sm:table-cell">
                      {post.view_count}
                    </td>
                  </tr>
                ))}
                {data.posts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-body-sm text-muted">
                      게시글이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setSearchParams({ search, page: String(p) })}
                className={`h-9 w-9 rounded-sm text-sm font-semibold ${
                  p === page ? 'bg-primary text-on-primary' : 'text-ink hover:bg-surface-soft'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
