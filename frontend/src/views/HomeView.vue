<script setup>
import { ref, onMounted } from 'vue'
import ProjectList from '../components/ProjectList.vue'
import TaskForm from '../components/TaskForm.vue'
import TaskBoard from '../components/TaskBoard.vue'
import { getProjects, createProject, getTasksByProject, createTask, updateTaskStatus } from '../api/taskflow'

const projects = ref([])
const selectedProjectId = ref(null)
const tasks = ref([])

const loadProjects = async () => {
  const { data } = await getProjects()
  projects.value = data
  if (!selectedProjectId.value && data.length > 0) {
    selectedProjectId.value = data[0].id
    await loadTasks()
  }
}

const loadTasks = async () => {
  if (!selectedProjectId.value) return
  const { data } = await getTasksByProject(selectedProjectId.value)
  tasks.value = data
}

const handleCreateProject = async (payload) => {
  await createProject(payload)
  await loadProjects()
}

const handleSelectProject = async (projectId) => {
  selectedProjectId.value = projectId
  await loadTasks()
}

const handleCreateTask = async (payload) => {
  await createTask({ ...payload, projectId: selectedProjectId.value })
  await loadTasks()
}

const handleStatusChange = async ({ taskId, status }) => {
  await updateTaskStatus(taskId, status)
  await loadTasks()
}

onMounted(loadProjects)
</script>

<template>
  <div class="page">
    <h1>TaskFlow</h1>
    <p class="subtitle">A minimal task collaboration system</p>

    <div class="layout">
      <div class="panel left">
        <ProjectList
          :projects="projects"
          :selected-project-id="selectedProjectId"
          @create-project="handleCreateProject"
          @select-project="handleSelectProject"
        />
      </div>

      <div class="panel right">
        <TaskForm
          :disabled="!selectedProjectId"
          @create-task="handleCreateTask"
        />
        <TaskBoard
          :tasks="tasks"
          @change-status="handleStatusChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 24px;
  font-family: Arial, sans-serif;
}
.subtitle {
  color: #666;
}
.layout {
  display: flex;
  gap: 24px;
  margin-top: 24px;
}
.panel {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
}
.left {
  width: 320px;
}
.right {
  flex: 1;
}
body {
  margin: 0;
  background: #f7f7f7;
}
</style>
