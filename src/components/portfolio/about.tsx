import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { FadeIn, ScrollReveal, StaggerContainer, StaggerItem } from '../animations'

export function About() {
  const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL'] },
    { category: 'Tools & Others', items: ['Git', 'Docker', 'AWS', 'Figma', 'Jest', 'Cypress'] }
  ]

  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <FadeIn delay={0.2}>
          <h1 className="text-4xl font-bold text-center mb-12">About Me</h1>
        </FadeIn>
        
        {/* Personal Info */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <FadeIn delay={0.4}>
              <h2 className="text-2xl font-semibold mb-6">Hello, I'm John</h2>
            </FadeIn>
            <div className="space-y-4 text-muted-foreground">
              <FadeIn delay={0.6}>
                <p>
                  I'm a passionate full-stack developer with over 5 years of experience creating 
                  digital solutions that make a difference. My journey in tech started with a 
                  curiosity about how things work, which led me to pursue computer science and 
                  eventually specialize in web development.
                </p>
              </FadeIn>
              <FadeIn delay={0.8}>
                <p>
                  I believe in writing clean, maintainable code and creating user experiences 
                  that are both beautiful and functional. When I'm not coding, you can find me 
                  exploring new technologies, contributing to open-source projects, or enjoying 
                  the great outdoors.
                </p>
              </FadeIn>
              <FadeIn delay={1.0}>
                <p>
                  I'm always excited to take on new challenges and collaborate with teams that 
                  share my passion for innovation and quality.
                </p>
              </FadeIn>
            </div>
          </div>
          
          <FadeIn delay={0.4} direction="right">
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Profile Photo</span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Skills */}
        <ScrollReveal>
          <div>
            <h2 className="text-2xl font-semibold text-center mb-8">Skills & Technologies</h2>
            <StaggerContainer>
              <div className="grid md:grid-cols-3 gap-6">
                {skills.map((skillGroup, index) => (
                   <StaggerItem key={index}>
                     <Card>
                       <CardHeader>
                         <CardTitle className="text-lg">{skillGroup.category}</CardTitle>
                       </CardHeader>
                       <CardContent>
                         <div className="flex flex-wrap gap-2">
                           {skillGroup.items.map((skill, skillIndex) => (
                             <span
                               key={skillIndex}
                               className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                             >
                               {skill}
                             </span>
                           ))}
                         </div>
                       </CardContent>
                     </Card>
                   </StaggerItem>
                 ))}
              </div>
            </StaggerContainer>
          </div>
        </ScrollReveal>

        {/* Values */}
        <ScrollReveal>
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-center mb-8">What I Value</h2>
            <StaggerContainer>
              <div className="grid md:grid-cols-3 gap-6">
                <StaggerItem>
                   <Card className="text-center">
                     <CardHeader>
                       <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                         <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                         </svg>
                       </div>
                       <CardTitle>Quality</CardTitle>
                     </CardHeader>
                     <CardContent>
                       <CardDescription>
                         I believe in delivering high-quality work that stands the test of time and provides real value.
                       </CardDescription>
                     </CardContent>
                   </Card>
                 </StaggerItem>

                 <StaggerItem>
                   <Card className="text-center">
                     <CardHeader>
                       <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                         <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                         </svg>
                       </div>
                       <CardTitle>Innovation</CardTitle>
                     </CardHeader>
                     <CardContent>
                       <CardDescription>
                         I'm always exploring new technologies and approaches to solve problems more effectively.
                       </CardDescription>
                     </CardContent>
                   </Card>
                 </StaggerItem>

                 <StaggerItem>
                   <Card className="text-center">
                     <CardHeader>
                       <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                         <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                           </svg>
                         </div>
                         <CardTitle>Collaboration</CardTitle>
                       </CardHeader>
                       <CardContent>
                         <CardDescription>
                           I thrive in collaborative environments where diverse perspectives lead to better solutions.
                         </CardDescription>
                       </CardContent>
                     </Card>
                   </StaggerItem>
                </div>
              </StaggerContainer>
            </div>
          </ScrollReveal>
      </div>
    </div>
  )
}