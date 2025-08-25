import Head from 'next/head'
import { PortfolioLayout } from '../components/portfolio/portfolio-layout'
import SEOHead from '@/components/seo/seo-head'

export default function Home() {
  return (
    <>
      <SEOHead
        title="Home"
        description="Professional portfolio showcasing full-stack development projects, skills, and experience in modern web technologies including React, Next.js, TypeScript, and Node.js."
        keywords="full stack developer, web developer, react, next.js, typescript, node.js, mongodb, portfolio, javascript, frontend, backend"
        type="website"
        author="John Doe"
      />
      
      <PortfolioLayout />
    </>
  )
}