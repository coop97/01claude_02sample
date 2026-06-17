import { supabase } from '../lib/supabase'

export async function createInquiry(values) {
  const { data, error } = await supabase.from('inquiries').insert(values).select().single()
  if (error) throw error
  return data
}

export async function listMyInquiries(userId) {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*, product:products(name)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function listAllInquiries() {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*, product:products(name), user:profiles(name, email)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getInquiry(id) {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*, product:products(name), user:profiles(name, email)')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function answerInquiry(id, answer) {
  const { data, error } = await supabase
    .from('inquiries')
    .update({ answer, status: 'answered', answered_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteInquiry(id) {
  const { error } = await supabase.from('inquiries').delete().eq('id', id)
  if (error) throw error
}
