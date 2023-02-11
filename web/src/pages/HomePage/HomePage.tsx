import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import TriggerPromptForm from 'src/components/TriggerPromptForm'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <TriggerPromptForm />
    </>
  )
}

export default HomePage
