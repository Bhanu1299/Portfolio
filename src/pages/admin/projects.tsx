import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { FadeIn } from '@/components/animations'

interface Project {
  _id?: string
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  featured: boolean
}

interface ProjectsPageProps {
  initialProjects: Project[]
}

export default function ProjectsPage({ initialProjects }: ProjectsPageProps) {
  const [projects, setProjects] = useState<Project[]>(Array.isArray(initialProjects) ? initialProjects : [])
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    technologies: [],
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
    featured: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const method = isEditing ? 'PUT' : 'POST'
    const url = isEditing ? `/api/projects/${isEditing}` : '/api/projects'
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          technologies: formData.technologies.filter(tech => tech.trim() !== '')
        }),
      })
      
      if (response.ok) {
        const updatedProject = await response.json()
        
        if (isEditing) {
          setProjects(projects.map(p => p._id === isEditing ? updatedProject : p))
        } else {
          setProjects([...projects, updatedProject])
        }
        
        resetForm()
      }
    } catch (error) {
      console.error('Error saving project:', error)
    }
  }

  const handleEdit = (project: Project) => {
    setFormData(project)
    setIsEditing(project._id || null)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          setProjects(projects.filter(p => p._id !== id))
        }
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: [],
      githubUrl: '',
      liveUrl: '',
      imageUrl: '',
      featured: false
    })
    setIsEditing(null)
  }

  const handleTechnologiesChange = (value: string) => {
    setFormData({
      ...formData,
      technologies: value.split(',').map(tech => tech.trim())
    })
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Manage Projects</h1>
            <Button onClick={() => window.location.href = '/admin/dashboard'}>
              Back to Dashboard
            </Button>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <FadeIn>
            <Card>
              <CardHeader>
                <CardTitle>{isEditing ? 'Edit Project' : 'Add New Project'}</CardTitle>
                <CardDescription>
                  {isEditing ? 'Update project information' : 'Create a new portfolio project'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                    <Input
                      id="technologies"
                      value={formData.technologies.join(', ')}
                      onChange={(e) => handleTechnologiesChange(e.target.value)}
                      placeholder="React, TypeScript, Node.js"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="liveUrl">Live URL</Label>
                    <Input
                      id="liveUrl"
                      type="url"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="featured">Featured Project</Label>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button type="submit">
                      {isEditing ? 'Update Project' : 'Add Project'}
                    </Button>
                    {isEditing && (
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Projects List */}
          <FadeIn>
            <Card>
              <CardHeader>
                <CardTitle>Current Projects</CardTitle>
                <CardDescription>Manage your portfolio projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {projects.map((project) => (
                    <div key={project._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{project.title}</h3>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(project)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(project._id!)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {project.description.substring(0, 100)}...
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      {project.featured && (
                        <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                          Featured
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const session = await getServerSession(context.req, context.res, authOptions)
    
    if (!session || session.user.role !== 'admin' || !session.user.isActive) {
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      }
    }

    try {
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/projects`)
      const projects = response.ok ? await response.json() : []
      
      return {
        props: {
          initialProjects: Array.isArray(projects) ? projects : [],
        },
      }
    } catch (error) {
      return {
        props: {
          initialProjects: [],
        },
      }
    }
  } catch (error) {
    console.warn('Build-time authentication check failed:', error)
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false
      }
    }
  }
}