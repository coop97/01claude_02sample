import { supabase } from '../lib/supabase'

const PAGE_SIZE = 10

export async function listPosts({ search = '', page = 1 } = {}) {
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .order('is_notice', { ascending: false })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (search) query = query.ilike('title', `%${search}%`)

  const { data, error, count } = await query
  if (error) throw error
  return { posts: data, total: count, pageSize: PAGE_SIZE }
}

export async function adminListPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('is_notice', { ascending: false })
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function listLatestPosts(limit = 5) {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, created_at')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}

export async function getPost(id) {
  const { data, error } = await supabase.from('posts').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function incrementViewCount(id, currentCount) {
  const { error } = await supabase.from('posts').update({ view_count: currentCount + 1 }).eq('id', id)
  if (error) throw error
}

export async function createPost(values) {
  const { data, error } = await supabase.from('posts').insert(values).select().single()
  if (error) throw error
  return data
}

export async function updatePost(id, values) {
  const { data, error } = await supabase.from('posts').update(values).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deletePost(id) {
  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) throw error
}

export async function uploadAttachment(file) {
  const path = `${Date.now()}-${file.name}`
  const { error } = await supabase.storage.from('editor').upload(path, file)
  if (error) throw error
  const { data } = supabase.storage.from('editor').getPublicUrl(path)
  return { url: data.publicUrl, name: file.name }
}
