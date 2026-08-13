export interface Project {
  id: number
  name: string
  description: string | null
}

export interface CreateProjectRequest {
  name: string
  description?: string
}
