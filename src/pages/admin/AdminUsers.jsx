import { useEffect, useState } from 'react'
import { listProfiles, updateRole } from '../../services/profileService'
import { useAuth } from '../../context/useAuth'
import Spinner from '../../components/common/Spinner'

export default function AdminUsers() {
  const { user: currentUser } = useAuth()
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => listProfiles().then(setProfiles).finally(() => setLoading(false))

  useEffect(() => {
    load()
  }, [])

  const handleRoleChange = async (id, role) => {
    await updateRole(id, role)
    load()
  }

  return (
    <div>
      <h1 className="mb-8 text-display-lg font-bold text-ink">회원관리</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto rounded-md border border-hairline">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-strong text-title-sm text-ink">
                <th className="px-4 py-3 text-left">이름</th>
                <th className="px-4 py-3 text-left">이메일</th>
                <th className="px-4 py-3 text-left">가입일</th>
                <th className="px-4 py-3 text-left">권한</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => (
                <tr key={p.id} className="border-t border-hairline">
                  <td className="px-4 py-3 text-body-sm text-ink">{p.name || '-'}</td>
                  <td className="px-4 py-3 text-body-sm text-muted">{p.email}</td>
                  <td className="px-4 py-3 text-body-sm text-muted">
                    {new Date(p.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={p.role}
                      disabled={p.id === currentUser.id}
                      onChange={(e) => handleRoleChange(p.id, e.target.value)}
                      className="rounded-sm border border-border-strong px-2 py-1 text-body-sm"
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
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
