import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { FadeIn, StaggerContainer, StaggerItem } from '../animations'

interface LandingProps {
  onNavigate: (section: 'landing' | 'about' | 'projects' | 'contact') => void
}

export function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              John Doe
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Full Stack Developer & UI/UX Designer
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Passionate about creating beautiful, functional, and user-centered digital experiences.
              I specialize in modern web technologies and love bringing ideas to life through code.
            </p>
          </FadeIn>
          <FadeIn delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => onNavigate('projects')}>
                View My Work
              </Button>
              <Button variant="outline" size="lg" onClick={() => onNavigate('contact')}>
                Get In Touch
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl font-bold text-center mb-12">What I Do</h2>
          </FadeIn>
          <StaggerContainer>
            <div className="grid md:grid-cols-3 gap-8">
              <StaggerItem>
                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <CardTitle>Frontend Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Creating responsive and interactive user interfaces with React, Next.js, and modern CSS frameworks.
                    </CardDescription>
                  </CardContent>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    </div>
                    <CardTitle>Backend Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Building robust APIs and server-side applications with Node.js, Express, and database technologies.
                    </CardDescription>
                  </CardContent>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                      </svg>
                    </div>
                    <CardTitle>UI/UX Design</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Designing intuitive and aesthetically pleasing user experiences with attention to detail and usability.
                    </CardDescription>
                  </CardContent>
                </Card>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl font-bold mb-6">Ready to work together?</h2>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your ideas to life.
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <Button size="lg" onClick={() => onNavigate('contact')}>
              Start a Conversation
            </Button>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}