import { TList } from '../types/types'

export const lists: Record<string, TList> = {
  filterList: [
    { value: 'all', text: 'All' },
    { value: 'open', text: 'Open' }
  ],

  sortList: [
    { value: 'updateasc', text: 'Updated ascending' },
    { value: 'updatedesc', text: 'Updated descending' },
    { value: 'createasc', text: 'Created ascending' },
    { value: 'createdesc', text: 'Created descending' }
  ],

  severityList: [
    { value: 'high', text: 'High' },
    { value: 'avg', text: 'Avg' },
    { value: 'low', text: 'Low' }
  ],

  problemList: [
    { value: 'func', text: 'Functional' },
    { value: 'ui', text: 'UI' }
  ],

  statusList: [
    { value: 'new', text: 'New' },
    { value: 'work', text: 'Work' },
    { value: 'totest', text: 'To test' },
    { value: 'done', text: 'Done' }
  ]
}

export const blankTicket = {
  status: '',
  problem: '',
  severity: '',
  issue: '',
  description: '',
  solution: ''
}
