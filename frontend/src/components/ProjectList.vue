<script setup lang="ts">
import { reactive } from 'vue'
import type { CreateProjectRequest } from '@/types/project'
import type { Project } from '@/types/project'

defineProps<{
  projects: Project[]
  selectedProjectId: number | null
}>()

const emit = defineEmits<{
  createProject: [payload: CreateProjectRequest]
  selectProject: [projectId: number]
}>()

const form = reactive<CreateProjectRequest>({
  name: '',
  description: ''
})

function onSubmit(): void {
  if (!form.name.trim()) {
    return
  }

  emit('createProject', {
    name: form.name.trim(),
    description: form.description?.trim() || undefined
  })

  form.name = ''
  form.description = ''
}
</script>

<template>
  <section class="card">
    <h2>Projects</h2>

    <form class="task-form" @submit.prevent="onSubmit">
      <label>
        <span>Name</span>
        <input v-model="form.name" type="text" placeholder="Project name" />
      </label>

      <label>
        <span>Description</span>
        <textarea v-model="form.description" rows="3" placeholder="Project description" />
      </label>

      <button type="submit">Create Project</button>
    </form>

    <ul class="project-list">
      <li
        v-for="project in projects"
        :key="project.id"
        :class="{ active: project.id === selectedProjectId }"
        @click="emit('selectProject', project.id)"
      >
        <strong>{{ project.name }}</strong>
        <p>{{ project.description || 'No description' }}</p>
      </li>

      <li v-if="projects.length === 0" class="empty-item">No projects yet.</li>
    </ul>
  </section>
</template>

<style scoped>
.project-list {
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
}

.project-list li {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
}

.project-list li.active {
  border-color: #111827;
  background: #f9fafb;
}

.project-list p {
  margin: 4px 0 0;
  color: #6b7280;
  font-size: 14px;
}

.empty-item {
  cursor: default;
  color: #6b7280;
  text-align: center;
}
</style>
