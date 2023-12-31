import { makeObservable, observable, action, autorun, computed } from 'mobx'
import axios from 'axios'

import { TProject } from '../types/types'
import { appStore } from './appStore'
import { nodeserver } from '../url'

const { handleError, setLoading } = appStore

class ProjectsStoreClass {
  projects: TProject[] = []

  constructor() {
    makeObservable(this, {
      projects: observable,
      setProjects: action,
      getProjects: action,
      hasProjects: computed
    })
    autorun(() => this.getProjects())
  }

  get hasProjects() {
    return !!this.projects.length
  }

  setProjects: (data: TProject[]) => void = (data) => (this.projects = data)

  getProjects: () => void = async () => {
    setLoading(true)
    await axios
      .get(`${nodeserver}/api/projects/getall`)
      .then((response) => response.data)
      .then((data) => data.sort((a: TProject, b: TProject) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0)))
      .then((data) => this.setProjects(data))
      .catch((error) => handleError(error))
      .finally(() => setLoading(false))
  }
}

export const projectsStore = new ProjectsStoreClass()
