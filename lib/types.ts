export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  updated_at: string
}

export interface EventType {
  id: string
  user_id: string
  title: string
  description: string | null
  slug: string
  duration: number
  is_active: boolean
  created_at: string
}

export interface Availability {
  id: string
  user_id: string
  day_of_week: number
  start_time: string
  end_time: string
  created_at: string
}

export interface Booking {
  id: string
  event_type_id: string
  interviewer_id: string
  candidate_name: string
  candidate_email: string
  start_time: string
  end_time: string
  status: "confirmed" | "cancelled"
  created_at: string
}
