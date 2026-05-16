import React from 'react'
import Hero from '../components/Hero'
import IdeaPool from '../components/IdeaPool'
import PlanningPhase from '../components/PlanningPhase'
import Execution from '../components/Execution'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Hero />
        <IdeaPool />
        <PlanningPhase />
        <Execution />
        <CTA />
        <Footer />
    </div>
  )
}

export default Home
