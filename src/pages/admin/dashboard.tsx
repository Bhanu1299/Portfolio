import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth/next'
import { signOut, useSession } from 'next-auth/react'
import { authOptions } from '../api/auth/[...nextauth]'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'
import Link from 'next/link'

export default function AdminDashboard() {
  const { data: session } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const dashboardCards = [
    {
      title: 'Projects',
      description: 'Manage portfolio projects',
      href: '/admin/projects',
      icon: '🚀'
    },
    {
      title: 'Experience',
      description: 'Update work experience',
      href: '/admin/experience',
      icon: '💼'
    },
    {
      title: 'Skills',
      description: 'Manage skills and technologies',
      href: '/admin/skills',
      icon: '⚡'
    },
    {
      title: 'Contact Messages',
      description: 'View and respond to messages',
      href: '/admin/contacts',
      icon: '📧'
    },
    {
      title: 'Users',
      description: 'Manage user accounts',
      href: '/admin/users',
      icon: '👥'
    },
    {
      title: 'Settings',
      description: 'Configure site settings',
      href: '/admin/settings',
      icon: '⚙️'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <FadeIn delay={0.1}>
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {session?.user?.name || session?.user?.email}
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline">View Site</Button>
              </Link>
              <Button onClick={handleSignOut} variant="destructive">
                Sign Out
              </Button>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <FadeIn delay={0.3}>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
            <p className="text-muted-foreground">
              Manage your portfolio content and settings
            </p>
          </div>
        </FadeIn>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardCards.map((card, index) => (
              <StaggerItem key={card.title}>
                <Link href={card.href}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{card.icon}</span>
                        <div>
                          <CardTitle className="text-lg">{card.title}</CardTitle>
                          <CardDescription>{card.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Manage {card.title}
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* Quick Stats */}
        <FadeIn delay={0.6}>
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-6">Quick Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Total Projects</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">25</div>
                  <div className="text-sm text-muted-foreground">Skills Listed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">8</div>
                  <div className="text-sm text-muted-foreground">New Messages</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">3</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </FadeIn>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const session = await getServerSession(context.req, context.res, authOptions)
    
    // Check if user is authenticated and has admin role
    if (!session?.user?.isActive || session?.user?.role !== 'admin') {
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false
        }
      }
    }
    
    // Clean session object to avoid serialization errors
    const cleanSession = {
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name || null,
        role: session.user.role,
        isActive: session.user.isActive,
        image: (session.user as any).image || null
      },
      expires: session.expires
    }

    return {
      props: {
        session: cleanSession
      }
    }
  } catch (error) {
    // Handle build-time errors gracefully
    console.warn('Build-time authentication check failed:', error)
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false
      }
    }
  }
}