import { Route, Router, Set } from '@redwoodjs/router'

import StandardLayout from 'src/layouts/StandardLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={StandardLayout}>
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
