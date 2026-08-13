<script setup lang="ts">
import { reactive } from 'vue'

export interface TaskFormPayload {
  title: string
  description?: string
  assignee?: string
}

defineProps<{
  disabled?: boolean
}>()

const emit = defineEmits<{
  createTask: [payload: TaskFormPayload]
}>()

const form = reactive({
  title: '',
  description: '',
  assignee: ''
})

function onSubmit(): void {
  if (!form.title.trim()) {
    return
  }

  emit('createTask', {
    title: form.title.trim(),
    description: form.description.trim() || undefined,
    assignee: form.assignee.trim() || undefined
  })

  form.title = ''
  form.description = ''
  form.assignee = ''
}
</script>

<template>
  <section class="card">
    <h2>Create Task</h2>

    <p v-if="disabled" class="hint-text">Select a project to create tasks.</p>

    <form class="task-form" @submit.prevent="onSubmit">
      <label>
        <span>Title</span>
        <input
          v-model="form.title"
          type="text"
          placeholder="Enter task title"
          :disabled="disabled"
        />
      </label>

      <label>
        <span>Description</span>
        <textarea
          v-model="form.description"
          rows="4"
          placeholder="Enter task description"
          :disabled="disabled"
        />
      </label>

      <label>
        <span>Assignee</span>
        <input
          v-model="form.assignee"
          type="text"
          placeholder="Enter assignee"
          :disabled="disabled"
        />
      </label>

      <button type="submit" :disabled="disabled">Add Task</button>
    </form>
  </section>
</template>

<style scoped>
.hint-text {
  margin: 0 0 16px;
  color: #6b7280;
  font-size: 14px;
}

button:disabled,
input:disabled,
textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
