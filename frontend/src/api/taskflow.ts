import type { CreateProjectRequest, Project } from '@/types/project'
import type { CreateTaskRequest, Task, TaskStatus } from '@/types/task'

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options)

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed: ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export function getProjects(): Promise<Project[]> {
  return request<Project[]>('/api/projects')
}

export function createProject(payload: CreateProjectRequest): Promise<Project> {
  return request<Project>('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
}

export function getTasksByProject(projectId: number): Promise<Task[]> {
  return request<Task[]>(`/api/tasks/project/${projectId}`)
}

export function createTask(payload: CreateTaskRequest): Promise<Task> {
  return request<Task>('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
}

export function updateTaskStatus(taskId: number, status: TaskStatus): Promise<Task> {
  return request<Task>(`/api/tasks/${taskId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  })
}

export function deleteTask(taskId: number): Promise<void> {
  return request<void>(`/api/tasks/${taskId}`, { method: 'DELETE' })
}
