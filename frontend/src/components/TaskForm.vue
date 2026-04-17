<script setup lang="ts">
import { reactive } from 'vue'
import type { CreateTaskRequest, TaskStatus } from '@/types/task'

const emit = defineEmits<{
  submit: [payload: CreateTaskRequest]
}>()

const form = reactive<CreateTaskRequest>({
  title: '',
  description: '',
  assignee: '',
  status: 'TODO'
})

const statusOptions: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE']

function onSubmit(): void {
  if (!form.title.trim()) {
    return
  }

  emit('submit', {
    title: form.title.trim(),
    description: form.description.trim(),
    assignee: form.assignee.trim(),
    status: form.status
  })

  form.title = ''
  form.description = ''
  form.assignee = ''
  form.status = 'TODO'
}
</script>

<template>
  <section class="card">
    <h2>Create Task</h2>

    <form class="task-form" @submit.prevent="onSubmit">
      <label>
        <span>Title</span>
        <input v-model="form.title" type="text" placeholder="Enter task title" />
      </label>

      <label>
        <span>Description</span>
        <textarea
          v-model="form.description"
          rows="4"
          placeholder="Enter task description"
        />
      </label>

      <label>
        <span>Assignee</span>
        <input v-model="form.assignee" type="text" placeholder="Enter assignee" />
      </label>

      <label>
        <span>Status</span>
        <select v-model="form.status">
          <option v-for="status in statusOptions" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
      </label>

      <button type="submit">Add Task</button>
    </form>
  </section>
</template>
