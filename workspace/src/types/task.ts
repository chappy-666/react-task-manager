export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: string
  updatedAt: string
  priority: 'low' | 'high'
  urgency: 'normal' | 'urgent'
  completedAt: string | null
}
