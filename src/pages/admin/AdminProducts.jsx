import { useEffect, useState } from 'react'
import {
  listAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from '../../services/productService'
import TextField from '../../components/common/TextField'
import Button from '../../components/common/Button'
import Spinner from '../../components/common/Spinner'

const emptyForm = { name: '', category: '', description: '', price: '', image_url: '', is_active: true }

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  const load = () => listAllProducts().then(setProducts).finally(() => setLoading(false))

  useEffect(() => {
    load()
  }, [])

  const startEdit = (p) => {
    setEditingId(p.id)
    setForm({
      name: p.name,
      category: p.category || '',
      description: p.description || '',
      price: p.price ?? '',
      image_url: p.image_url || '',
      is_active: p.is_active,
    })
  }

  const resetForm = () => {
    setEditingId(null)
    setForm(emptyForm)
  }

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadProductImage(file)
      setForm((f) => ({ ...f, image_url: url }))
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    const values = { ...form, price: form.price === '' ? null : Number(form.price) }
    try {
      if (editingId) {
        await updateProduct(editingId, values)
      } else {
        await createProduct(values)
      }
      resetForm()
      load()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('제품을 삭제하시겠습니까?')) return
    await deleteProduct(id)
    load()
  }

  return (
    <div>
      <h1 className="mb-8 text-display-lg font-bold text-ink">제품관리</h1>

      <form onSubmit={handleSubmit} className="mb-10 grid gap-4 rounded-md border border-hairline p-6 shadow-card sm:grid-cols-2">
        <TextField
          id="name"
          label="제품명"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <TextField
          id="category"
          label="카테고리"
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
        />
        <TextField
          id="price"
          label="가격"
          type="number"
          value={form.price}
          onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-ink">이미지</label>
          <input type="file" onChange={handleFile} disabled={uploading} className="text-body-sm" />
        </div>
        <TextField
          id="description"
          label="설명"
          textarea
          className="sm:col-span-2"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
        />
        <label className="flex items-center gap-2 text-sm font-semibold text-ink sm:col-span-2">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
          />
          공개 (제품소개 페이지에 노출)
        </label>
        <div className="flex gap-2 sm:col-span-2">
          <Button type="submit" disabled={saving || uploading}>
            {editingId ? '수정 저장' : '등록'}
          </Button>
          {editingId && (
            <Button type="button" variant="secondary" onClick={resetForm}>
              취소
            </Button>
          )}
        </div>
      </form>

      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto rounded-md border border-hairline">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-strong text-title-sm text-ink">
                <th className="px-4 py-3 text-left">이름</th>
                <th className="px-4 py-3 text-left">카테고리</th>
                <th className="px-4 py-3 text-left">가격</th>
                <th className="px-4 py-3 text-left">공개</th>
                <th className="px-4 py-3 text-right">관리</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-hairline">
                  <td className="px-4 py-3 text-body-sm text-ink">{p.name}</td>
                  <td className="px-4 py-3 text-body-sm text-muted">{p.category || '-'}</td>
                  <td className="px-4 py-3 text-body-sm text-muted">
                    {p.price != null ? Number(p.price).toLocaleString() : '-'}
                  </td>
                  <td className="px-4 py-3 text-body-sm text-muted">{p.is_active ? 'Y' : 'N'}</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="text" onClick={() => startEdit(p)} className="mr-3">
                      수정
                    </Button>
                    <Button variant="text" className="text-error" onClick={() => handleDelete(p.id)}>
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
