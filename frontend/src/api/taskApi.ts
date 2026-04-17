import type { CreateTaskRequest, Task } from '@/types/task'

const USE_MOCK = true

let mockTasks: Task[] = [
  {
    id: 1,
    title: 'Set up frontend project',
    description: 'Initialize Vue 3 + TypeScript + Vite project',
    assignee: 'Alice',
    status: 'DONE',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Build task board page',
    description: 'Create task form and task table',
    assignee: 'Bob',
    status: 'IN_PROGRESS',
    createdAt: new Date().toISOString()
  }
]

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchTasks(): Promise<Task[]> {
  if (USE_MOCK) {
    await sleep(200)
    return [...mockTasks]
  }

  const response = await fetch('/api/tasks')
  if (!response.ok) {
    throw new Error('Failed to fetch tasks')
  }

  return (await response.json()) as Task[]
}

export async function createTask(payload: CreateTaskRequest): Promise<Task> {
  if (USE_MOCK) {
    await sleep(200)

    const newTask: Task = {
      id: Date.now(),
      title: payload.title,
      description: payload.description,
      assignee: payload.assignee,
      status: payload.status,
      createdAt: new Date().toISOString()
    }

    mockTasks = [newTask, ...mockTasks]
    return newTask
  }

  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    throw new Error('Failed to create task')
  }

  return (await response.json()) as Task
}

export async function updateTaskStatus(taskId: number, status: Task['status']): Promise<Task> {
  if (USE_MOCK) {
    await sleep(150)

    const task = mockTasks.find((item) => item.id === taskId)
    if (!task) {
      throw new Error('Task not found')
    }

    task.status = status
    return { ...task }
  }

  const response = await fetch(`/api/tasks/${taskId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
  })

  if (!response.ok) {
    throw new Error('Failed to update task status')
  }

  return (await response.json()) as Task
}

export async function deleteTask(taskId: number): Promise<void> {
  if (USE_MOCK) {
    await sleep(150)
    mockTasks = mockTasks.filter((item) => item.id !== taskId)
    return
  }

  const response = await fetch(`/api/tasks/${taskId}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Failed to delete task')
  }
}
