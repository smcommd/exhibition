import { cache } from 'react'

import { getSupabaseServerClient } from '@/app/lib/supabase/server'
import { resolveAssetUrl } from '@/app/lib/utils/asset-url'
import type { Designer, StudioKey } from '@/app/lib/types'
import { designers as fallbackDesigners } from '@/app/lib/data/designers'
import { getProfileImageMeta, realStudentData } from '@/app/lib/data/student-data'

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
  innovation_thumbnail_path?: string | null
  innovation_detail_path?: string | null
  convergence_thumbnail_path?: string | null
  convergence_detail_path?: string | null
}

const emailByStudentNumber = realStudentData.reduce<Record<string, string>>((acc, student) => {
  acc[student.studentNumber] = student.email
  return acc
}, {})

const DESIGNER_SELECT =
  'id,name,major,studio,profile_image,profile_blur_data_url,profile_width,profile_height,bio,email,instagram,website,interview1,interview2,student_number,innovation_thumbnail_path,innovation_detail_path,convergence_thumbnail_path,convergence_detail_path'

function mergeDesignersByStudent(designers: Designer[]): Designer[] {
  const merged = new Map<string, Designer>()

  designers.forEach((designer) => {
    const key = designer.student_number || `id-${designer.id}`
    const existing = merged.get(key)

    if (!existing) {
      merged.set(key, { ...designer })
      return
    }

    const studioSet = new Set<StudioKey>([...existing.studios, ...designer.studios])

    merged.set(key, {
      ...existing,
      studios: Array.from(studioSet),
      innovation_thumbnail_path: existing.innovation_thumbnail_path || designer.innovation_thumbnail_path,
      innovation_detail_path: existing.innovation_detail_path || designer.innovation_detail_path,
      convergence_thumbnail_path: existing.convergence_thumbnail_path || designer.convergence_thumbnail_path,
      convergence_detail_path: existing.convergence_detail_path || designer.convergence_detail_path,
    })
  })

  return Array.from(merged.values())
}

function mapDesigner(row: SupabaseDesignerRow): Designer {
  const studiosRaw = Array.isArray(row.studios)
    ? (row.studios.filter(Boolean) as StudioKey[])
    : row.studio
      ? [row.studio]
      : []
  const normalizedStudios = Array.from(new Set<StudioKey>(studiosRaw))
  const defaultStudios: StudioKey[] = ['혁신디자인스튜디오', '융합디자인스튜디오']
  const studios: StudioKey[] = normalizedStudios.length ? normalizedStudios : defaultStudios

  const normalizedEmail =
    (row.email && row.email.trim()) ||
    (row.student_number ? emailByStudentNumber[row.student_number] : '') ||
    ''

  const fallbackProfileMeta = getProfileImageMeta(row.student_number || undefined, row.name)
  const resolvedProfileImage = resolveAssetUrl(row.profile_image || '') || fallbackProfileMeta.src
  const resolvedProfileWidth = row.profile_width ?? fallbackProfileMeta.width
  const resolvedProfileHeight = row.profile_height ?? fallbackProfileMeta.height
  const resolvedBlurData = row.profile_blur_data_url || fallbackProfileMeta.blurDataURL

  return {
    id: row.id,
    name: row.name,
    major: row.major || '커뮤니케이션디자인',
    studios,
    profile_image: resolvedProfileImage,
    profile_blur_data_url: resolvedBlurData || undefined,
    profile_width: resolvedProfileWidth || undefined,
    profile_height: resolvedProfileHeight || undefined,
    bio: row.bio || '',
    email: normalizedEmail,
    instagram: row.instagram || undefined,
    website: row.website || undefined,
    interview1: row.interview1 || '',
    interview2: row.interview2 || '',
    student_number: row.student_number || undefined,
    innovation_thumbnail_path: row.innovation_thumbnail_path
      ? resolveAssetUrl(row.innovation_thumbnail_path)
      : undefined,
    innovation_detail_path: row.innovation_detail_path
      ? resolveAssetUrl(row.innovation_detail_path)
      : undefined,
    convergence_thumbnail_path: row.convergence_thumbnail_path
      ? resolveAssetUrl(row.convergence_thumbnail_path)
      : undefined,
    convergence_detail_path: row.convergence_detail_path
      ? resolveAssetUrl(row.convergence_detail_path)
      : undefined,
  }
}

export async function fetchDesigners(): Promise<Designer[]> {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return mergeDesignersByStudent(fallbackDesigners)
  }

  const { data, error } = await supabase
    .from('designers')
    .select(DESIGNER_SELECT)
    .order('id')

  if (error || !data) {
    console.warn('[fetchDesigners] Falling back to local data', error?.message)
    return mergeDesignersByStudent(fallbackDesigners)
  }

  const mapped = (data as SupabaseDesignerRow[]).map(mapDesigner)
  return mergeDesignersByStudent(mapped)
}

export const fetchDesignersCached = cache(fetchDesigners)

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
