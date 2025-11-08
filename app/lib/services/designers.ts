import { getSupabaseServerClient } from '@/app/lib/supabase/server'
import { resolveAssetUrl } from '@/app/lib/utils/asset-url'
import type { Designer, StudioKey } from '@/app/lib/types'
import { designers as fallbackDesigners } from '@/app/lib/data/designers'
import { realStudentData } from '@/app/lib/data/student-data'

type SupabaseDesignerRow = {
  id: number
  name: string
  major: string | null
  studio: StudioKey | null
  studios?: StudioKey[] | null
  profile_image: string | null
  profile_blur_data_url?: string | null
  profile_width?: number | null
  profile_height?: number | null
  bio: string | null
  email: string | null
  instagram: string | null
  website: string | null
  interview1: string | null
  interview2: string | null
  student_number: string | null
}

const emailByStudentNumber = realStudentData.reduce<Record<string, string>>((acc, student) => {
  acc[student.studentNumber] = student.email
  return acc
}, {})

const DESIGNER_SELECT =
  'id,name,major,studio,profile_image,profile_blur_data_url,profile_width,profile_height,bio,email,instagram,website,interview1,interview2,student_number'

function mapDesigner(row: SupabaseDesignerRow): Designer {
  const studiosRaw = Array.isArray(row.studios)
    ? (row.studios.filter(Boolean) as StudioKey[])
    : row.studio
      ? [row.studio]
      : []
  const normalizedStudios = Array.from(new Set<StudioKey>(studiosRaw))
  const defaultStudios: StudioKey[] = ['혁신디자인스튜디오', '융합디자인스튜디오']
  const studios: StudioKey[] = normalizedStudios.length > 1 ? normalizedStudios : defaultStudios

  const normalizedEmail =
    (row.email && row.email.trim()) ||
    (row.student_number ? emailByStudentNumber[row.student_number] : '') ||
    ''

  return {
    id: row.id,
    name: row.name,
    major: row.major || '커뮤니케이션디자인',
    studios,
    profile_image: resolveAssetUrl(row.profile_image || ''),
    profile_blur_data_url: row.profile_blur_data_url || undefined,
    profile_width: row.profile_width ?? undefined,
    profile_height: row.profile_height ?? undefined,
    bio: row.bio || '',
    email: normalizedEmail,
    instagram: row.instagram || undefined,
    website: row.website || undefined,
    interview1: row.interview1 || '',
    interview2: row.interview2 || '',
    student_number: row.student_number || undefined,
  }
}

export async function fetchDesigners(): Promise<Designer[]> {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return fallbackDesigners
  }

  const { data, error } = await supabase
    .from('designers')
    .select(DESIGNER_SELECT)
    .order('id')

  if (error || !data) {
    console.warn('[fetchDesigners] Falling back to local data', error?.message)
    return fallbackDesigners
  }

  return (data as SupabaseDesignerRow[]).map(mapDesigner)
}

export async function fetchDesignerById(id: number): Promise<Designer | null> {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return fallbackDesigners.find((designer) => designer.id === id) || null
  }

  const { data, error } = await supabase
    .from('designers')
    .select(DESIGNER_SELECT)
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.warn('[fetchDesignerById] Falling back to local data', error.message)
    return fallbackDesigners.find((designer) => designer.id === id) || null
  }

  if (!data) return null

  return mapDesigner(data as SupabaseDesignerRow)
}
