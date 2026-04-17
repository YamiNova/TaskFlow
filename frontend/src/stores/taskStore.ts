import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { createTask, deleteTask, fetchTasks, updateTaskStatus } from '@/api/taskApi'
import type { CreateTaskRequest, Task, TaskStatus } from '@/types/task'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const errorMessage = ref('')

  const todoTasks = computed(() => tasks.value.filter((task) => task.status === 'TODO'))
  const inProgressTasks = computed(() => tasks.value.filter((task) => task.status === 'IN_PROGRESS'))
  const doneTasks = computed(() => tasks.value.filter((task) => task.status === 'DONE'))

  async function loadTasks(): Promise<void> {
    loading.value = true
    errorMessage.value = ''

    try {
      tasks.value = await fetchTasks()
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  async function addTask(payload: CreateTaskRequest): Promise<void> {
    loading.value = true
    errorMessage.value = ''

    try {
      const created = await createTask(payload)
      tasks.value = [created, ...tasks.value]
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  async function changeTaskStatus(taskId: number, status: TaskStatus): Promise<void> {
    loading.value = true
    errorMessage.value = ''

    try {
      const updated = await updateTaskStatus(taskId, status)
      tasks.value = tasks.value.map((task) => (task.id === taskId ? updated : task))
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  async function removeTask(taskId: number): Promise<void> {
    loading.value = true
    errorMessage.value = ''

    try {
      await deleteTask(taskId)
      tasks.value = tasks.value.filter((task) => task.id !== taskId)
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  return {
    tasks,
    loading,
    errorMessage,
    todoTasks,
    inProgressTasks,
    doneTasks,
    loadTasks,
    addTask,
    changeTaskStatus,
    removeTask
  }
})
