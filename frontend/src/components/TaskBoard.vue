<script setup lang="ts">
import { computed } from 'vue'
import type { Task, TaskStatus } from '@/types/task'
import { STATUS_LABELS, formatDateTime } from '@/utils/format'

const props = defineProps<{
  tasks: Task[]
}>()

const emit = defineEmits<{
  changeStatus: [taskId: number, status: TaskStatus]
  deleteTask: [taskId: number]
}>()

const statusOptions: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE']

const todoCount = computed(() => props.tasks.filter((task) => task.status === 'TODO').length)
const inProgressCount = computed(
  () => props.tasks.filter((task) => task.status === 'IN_PROGRESS').length
)
const doneCount = computed(() => props.tasks.filter((task) => task.status === 'DONE').length)

function statusLabel(status: TaskStatus): string {
  return STATUS_LABELS[status]
}
</script>

<template>
  <section class="card">
    <div class="board-header">
      <h2>Task Board</h2>
      <div class="board-stats">
        <span>To Do: {{ todoCount }}</span>
        <span>In Progress: {{ inProgressCount }}</span>
        <span>Done: {{ doneCount }}</span>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Assignee</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.id }}</td>
            <td>
              <div class="task-title">{{ task.title }}</div>
              <div class="task-desc">{{ task.description || 'No description' }}</div>
            </td>
            <td>{{ task.assignee || '-' }}</td>
            <td>
              <select
                :value="task.status"
                @change="
                  emit(
                    'changeStatus',
                    task.id,
                    ($event.target as HTMLSelectElement).value as TaskStatus
                  )
                "
              >
                <option v-for="status in statusOptions" :key="status" :value="status">
                  {{ statusLabel(status) }}
                </option>
              </select>
            </td>
            <td>{{ formatDateTime(task.createdAt) }}</td>
            <td>
              <button class="danger" @click="emit('deleteTask', task.id)">Delete</button>
            </td>
          </tr>

          <tr v-if="tasks.length === 0">
            <td colspan="6" class="empty-row">No tasks yet.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.board-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.board-header h2 {
  margin: 0;
}

.board-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: #6b7280;
  font-size: 14px;
}
</style>
