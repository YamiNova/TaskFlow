<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProjectList from '@/components/ProjectList.vue'
import TaskBoard from '@/components/TaskBoard.vue'
import TaskForm from '@/components/TaskForm.vue'
import {
  createProject,
  createTask,
  deleteTask,
  getProjects,
  getTasksByProject,
  updateTaskStatus
} from '@/api/taskflow'
import type { Project } from '@/types/project'
import type { Task, TaskStatus } from '@/types/task'
import type { TaskFormPayload } from '@/components/TaskForm.vue'

const projects = ref<Project[]>([])
const selectedProjectId = ref<number | null>(null)
const tasks = ref<Task[]>([])
const loading = ref(false)
const errorMessage = ref('')

async function loadProjects(): Promise<void> {
  loading.value = true
  errorMessage.value = ''

  try {
    projects.value = await getProjects()

    const firstProject = projects.value[0]
    if (!selectedProjectId.value && firstProject) {
      selectedProjectId.value = firstProject.id
      await loadTasks()
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to load projects'
  } finally {
    loading.value = false
  }
}

async function loadTasks(): Promise<void> {
  if (!selectedProjectId.value) {
    tasks.value = []
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    tasks.value = await getTasksByProject(selectedProjectId.value)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to load tasks'
  } finally {
    loading.value = false
  }
}

async function handleCreateProject(payload: { name: string; description?: string }): Promise<void> {
  loading.value = true
  errorMessage.value = ''

  try {
    const created = await createProject(payload)
    projects.value = [...projects.value, created]
    selectedProjectId.value = created.id
    await loadTasks()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to create project'
  } finally {
    loading.value = false
  }
}

async function handleSelectProject(projectId: number): Promise<void> {
  selectedProjectId.value = projectId
  await loadTasks()
}

async function handleCreateTask(payload: TaskFormPayload): Promise<void> {
  if (!selectedProjectId.value) {
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    await createTask({
      ...payload,
      projectId: selectedProjectId.value
    })
    await loadTasks()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to create task'
  } finally {
    loading.value = false
  }
}

async function handleChangeStatus(taskId: number, status: TaskStatus): Promise<void> {
  loading.value = true
  errorMessage.value = ''

  try {
    await updateTaskStatus(taskId, status)
    await loadTasks()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to update task status'
  } finally {
    loading.value = false
  }
}

async function handleDeleteTask(taskId: number): Promise<void> {
  loading.value = true
  errorMessage.value = ''

  try {
    await deleteTask(taskId)
    await loadTasks()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to delete task'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  void loadProjects()
})
</script>

<template>
  <main class="page">
    <section class="hero">
      <h1>TaskFlow</h1>
      <p>A minimal task collaboration system for QA and development workflows.</p>
    </section>

    <p v-if="loading" class="info-text">Loading...</p>
    <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

    <div class="layout">
      <ProjectList
        :projects="projects"
        :selected-project-id="selectedProjectId"
        @create-project="handleCreateProject"
        @select-project="handleSelectProject"
      />

      <div class="task-panel">
        <TaskForm :disabled="!selectedProjectId" @create-task="handleCreateTask" />
        <TaskBoard
          :tasks="tasks"
          @change-status="handleChangeStatus"
          @delete-task="handleDeleteTask"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.task-panel {
  display: grid;
  gap: 24px;
}
</style>
