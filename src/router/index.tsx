import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { observer } from 'mobx-react'

import { ProjectsList, Project, Home, Login, Signup, Reset, Profile, UserPage } from '../pages'

type RouterProps = {
  children?: React.ReactNode
}

export const Router = observer(({ children }: RouterProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<Project />} />
        <Route path="/projects/:id" element={<Project />} />
      </Routes>
      {children}
    </BrowserRouter>
  )
})
