<script setup>
import { ref } from 'vue'

defineProps({
  projects: {
    type: Array,
    default: () => []
  },
  selectedProjectId: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['create-project', 'select-project'])

const name = ref('')
const description = ref('')

const submit = () => {
  if (!name.value.trim()) return
  emit('create-project', {
    name: name.value,
    description: description.value
  })
  name.value = ''
  description.value = ''
}
</script>

<template>
  <div>
    <h2>Projects</h2>

    <div class="form-block">
      <input v-model="name" placeholder="Project name" />
      <textarea v-model="description" placeholder="Project description" />
      <button @click="submit">Create Project</button>
    </div>

    <ul class="project-list">
      <li
        v-for="project in projects"
        :key="project.id"
        :class="{ active: project.id === selectedProjectId }"
        @click="emit('select-project', project.id)"
      >
        <strong>{{ project.name }}</strong>
        <p>{{ project.description }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.form-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}
.project-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.project-list li {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 8px;
  cursor: pointer;
}
.project-list li.active {
  border-color: #333;
  background: #f0f0f0;
}
.project-list p {
  margin: 4px 0 0;
  color: #666;
}
</style>
