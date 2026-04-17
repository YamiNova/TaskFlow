<script setup lang="ts">
import type { Task, TaskStatus } from '@/types/task'

defineProps<{
  tasks: Task[]
}>()

const emit = defineEmits<{
  changeStatus: [taskId: number, status: TaskStatus]
  deleteTask: [taskId: number]
}>()

const statusOptions: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE']
</script>

<template>
  <section class="card">
    <h2>Task List</h2>

    <div class="table-wrapper">
      <table class="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Assignee</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Action</th>
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
                  {{ status }}
                </option>
              </select>
            </td>
            <td>{{ new Date(task.createdAt).toLocaleString() }}</td>
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
