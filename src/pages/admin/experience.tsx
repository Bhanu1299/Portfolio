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

interface Experience {
  _id?: string
  company: string
  position: string
  duration: string
  description: string
  technologies: string[]
  location?: string
  current: boolean
}

interface ExperiencePageProps {
  initialExperience: Experience[]
}

export default function ExperiencePage({ initialExperience }: ExperiencePageProps) {
  const [experiences, setExperiences] = useState<Experience[]>(Array.isArray(initialExperience) ? initialExperience : [])
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [formData, setFormData] = useState<Experience>({
    company: '',
    position: '',
    duration: '',
    description: '',
    technologies: [],
    location: '',
    current: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const method = isEditing ? 'PUT' : 'POST'
    const url = isEditing ? `/api/experience/${isEditing}` : '/api/experience'
    
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
        const updatedExperience = await response.json()
        
        if (isEditing) {
          setExperiences(experiences.map(exp => exp._id === isEditing ? updatedExperience : exp))
        } else {
          setExperiences([...experiences, updatedExperience])
        }
        
        resetForm()
      }
    } catch (error) {
      console.error('Error saving experience:', error)
    }
  }

  const handleEdit = (experience: Experience) => {
    setFormData(experience)
    setIsEditing(experience._id || null)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      try {
        const response = await fetch(`/api/experience/${id}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          setExperiences(experiences.filter(exp => exp._id !== id))
        }
      } catch (error) {
        console.error('Error deleting experience:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      duration: '',
      description: '',
      technologies: [],
      location: '',
      current: false
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
            <h1 className="text-3xl font-bold">Manage Experience</h1>
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
                <CardTitle>{isEditing ? 'Edit Experience' : 'Add New Experience'}</CardTitle>
                <CardDescription>
                  {isEditing ? 'Update experience information' : 'Add a new work experience'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="Jan 2020 - Present"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="San Francisco, CA"
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
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="current"
                      checked={formData.current}
                      onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="current">Current Position</Label>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button type="submit">
                      {isEditing ? 'Update Experience' : 'Add Experience'}
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

          {/* Experience List */}
          <FadeIn>
            <Card>
              <CardHeader>
                <CardTitle>Current Experience</CardTitle>
                <CardDescription>Manage your work experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {experiences.map((experience) => (
                    <div key={experience._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{experience.position}</h3>
                          <p className="text-sm text-muted-foreground">{experience.company}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(experience)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(experience._id!)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {experience.duration} • {experience.location}
                      </p>
                      <p className="text-sm mb-2">
                        {experience.description.substring(0, 100)}...
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {experience.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      {experience.current && (
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          Current
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
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/experience`)
      const experiences = response.ok ? await response.json() : []
      
      return {
        props: {
          initialExperience: Array.isArray(experiences) ? experiences : [],
        },
      }
    } catch (error) {
      return {
        props: {
          initialExperience: [],
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