export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'

export interface Task {
  id: number
  title: string
  description: string | null
  assignee: string | null
  status: TaskStatus
  createdAt: string
}

export interface CreateTaskRequest {
  title: string
  description?: string
  assignee?: string
  projectId: number
}

export interface UpdateTaskStatusRequest {
  status: TaskStatus
}
