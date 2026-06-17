import { supabase } from '../lib/supabase'

export async function getProfile(id) {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function updateProfile(id, { name, phone }) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ name, phone })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function listProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function updateRole(id, role) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}
