<script setup lang="ts">
import { onMounted } from 'vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskTable from '@/components/TaskTable.vue'
import { useTaskStore } from '@/stores/taskStore'
import type { CreateTaskRequest, TaskStatus } from '@/types/task'

const taskStore = useTaskStore()

onMounted(() => {
  void taskStore.loadTasks()
})

function handleCreateTask(payload: CreateTaskRequest): void {
  void taskStore.addTask(payload)
}

function handleChangeStatus(taskId: number, status: TaskStatus): void {
  void taskStore.changeTaskStatus(taskId, status)
}

function handleDeleteTask(taskId: number): void {
  void taskStore.removeTask(taskId)
}
</script>

<template>
  <main class="page">
    <section class="hero">
      <h1>TaskFlow Board</h1>
      <p>Manage tasks for your QA and development workflow.</p>
    </section>

    <section class="stats">
      <div class="stat-card">
        <span class="stat-label">TODO</span>
        <strong>{{ taskStore.todoTasks.length }}</strong>
      </div>
      <div class="stat-card">
        <span class="stat-label">IN PROGRESS</span>
        <strong>{{ taskStore.inProgressTasks.length }}</strong>
      </div>
      <div class="stat-card">
        <span class="stat-label">DONE</span>
        <strong>{{ taskStore.doneTasks.length }}</strong>
      </div>
    </section>

    <p v-if="taskStore.loading" class="info-text">Loading...</p>
    <p v-if="taskStore.errorMessage" class="error-text">{{ taskStore.errorMessage }}</p>

    <div class="layout">
      <TaskForm @submit="handleCreateTask" />
      <TaskTable
        :tasks="taskStore.tasks"
        @change-status="handleChangeStatus"
        @delete-task="handleDeleteTask"
      />
    </div>
  </main>
</template>
