import { supabase } from '../lib/supabase'

export async function listProducts({ search = '', category = '' } = {}) {
  let query = supabase.from('products').select('*').eq('is_active', true).order('created_at', { ascending: false })
  if (search) query = query.ilike('name', `%${search}%`)
  if (category) query = query.eq('category', category)
  const { data, error } = await query
  if (error) throw error
  return data
}

export async function listAllProducts() {
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function listCategories() {
  const { data, error } = await supabase.from('products').select('category').not('category', 'is', null)
  if (error) throw error
  return [...new Set(data.map((d) => d.category))].filter(Boolean)
}

export async function getProduct(id) {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function createProduct(values) {
  const { data, error } = await supabase.from('products').insert(values).select().single()
  if (error) throw error
  return data
}

export async function updateProduct(id, values) {
  const { data, error } = await supabase.from('products').update(values).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteProduct(id) {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

export async function uploadProductImage(file) {
  const path = `${Date.now()}-${file.name}`
  const { error } = await supabase.storage.from('products').upload(path, file)
  if (error) throw error
  const { data } = supabase.storage.from('products').getPublicUrl(path)
  return data.publicUrl
}
