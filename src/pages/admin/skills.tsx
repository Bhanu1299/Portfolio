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

interface Skill {
  _id?: string
  name: string
  category: string
  level: number
  description?: string
  icon?: string
}

interface SkillsPageProps {
  initialSkills: Skill[]
}

export default function SkillsPage({ initialSkills }: SkillsPageProps) {
  const [skills, setSkills] = useState<Skill[]>(Array.isArray(initialSkills) ? initialSkills : [])
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [formData, setFormData] = useState<Skill>({
    name: '',
    category: '',
    level: 1,
    description: '',
    icon: ''
  })

  const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Languages', 'Other']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const method = isEditing ? 'PUT' : 'POST'
    const url = isEditing ? `/api/skills/${isEditing}` : '/api/skills'
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        const updatedSkill = await response.json()
        
        if (isEditing) {
          setSkills(skills.map(skill => skill._id === isEditing ? updatedSkill : skill))
        } else {
          setSkills([...skills, updatedSkill])
        }
        
        resetForm()
      }
    } catch (error) {
      console.error('Error saving skill:', error)
    }
  }

  const handleEdit = (skill: Skill) => {
    setFormData(skill)
    setIsEditing(skill._id || null)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        const response = await fetch(`/api/skills/${id}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          setSkills(skills.filter(skill => skill._id !== id))
        }
      } catch (error) {
        console.error('Error deleting skill:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      level: 1,
      description: '',
      icon: ''
    })
    setIsEditing(null)
  }

  const getLevelText = (level: number) => {
    switch (level) {
      case 1: return 'Beginner'
      case 2: return 'Intermediate'
      case 3: return 'Advanced'
      case 4: return 'Expert'
      case 5: return 'Master'
      default: return 'Unknown'
    }
  }

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Manage Skills</h1>
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
                <CardTitle>{isEditing ? 'Edit Skill' : 'Add New Skill'}</CardTitle>
                <CardDescription>
                  {isEditing ? 'Update skill information' : 'Add a new skill to your portfolio'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Skill Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="level">Skill Level (1-5)</Label>
                    <select
                      id="level"
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md"
                      required
                    >
                      <option value={1}>1 - Beginner</option>
                      <option value={2}>2 - Intermediate</option>
                      <option value={3}>3 - Advanced</option>
                      <option value={4}>4 - Expert</option>
                      <option value={5}>5 - Master</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="icon">Icon (optional)</Label>
                    <Input
                      id="icon"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="e.g., react, javascript, python"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description (optional)</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      placeholder="Brief description of your experience with this skill"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button type="submit">
                      {isEditing ? 'Update Skill' : 'Add Skill'}
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

          {/* Skills List */}
          <FadeIn>
            <Card>
              <CardHeader>
                <CardTitle>Current Skills</CardTitle>
                <CardDescription>Manage your skills by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 max-h-96 overflow-y-auto">
                  {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                    <div key={category}>
                      <h3 className="font-semibold text-lg mb-3 text-primary">{category}</h3>
                      <div className="space-y-2">
                        {categorySkills.map((skill) => (
                          <div key={skill._id} className="border rounded-lg p-3">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-medium">{skill.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Level {skill.level} - {getLevelText(skill.level)}
                                </p>
                              </div>
                              <div className="flex space-x-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEdit(skill)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDelete(skill._id!)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                            {skill.description && (
                              <p className="text-sm text-muted-foreground">
                                {skill.description}
                              </p>
                            )}
                            <div className="flex items-center mt-2">
                              <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((level) => (
                                  <div
                                    key={level}
                                    className={`w-3 h-3 rounded-full ${
                                      level <= skill.level
                                        ? 'bg-primary'
                                        : 'bg-muted'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
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
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/skills`)
      const skills = response.ok ? await response.json() : []
      
      return {
        props: {
          initialSkills: Array.isArray(skills) ? skills : [],
        },
      }
    } catch (error) {
      return {
        props: {
          initialSkills: [],
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