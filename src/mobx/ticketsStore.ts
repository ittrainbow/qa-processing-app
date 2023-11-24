import { makeObservable, observable, action, toJS } from 'mobx'
import axios from 'axios'

import { TTicket } from '../types/types'
import { appStore } from './appStore'

const { setLoading, handleError } = appStore

class TicketsStoreClass {
  tickets: TTicket[] = []

  constructor() {
    makeObservable(this, {
      tickets: observable,
      setTickets: action,
      getTickets: action,
      submitTicket: action,
      createTicket: action,
      deleteTicket: action
    })
  }

  setTickets: (data: TTicket[]) => void = (data) => (this.tickets = data)

  getTickets: (id: string) => void = async (id) => {
    await axios
      .get(`http://localhost:5000/api/projects/${id}`)
      .then((response) => response.data)
      .then((data) => {
        return data.map((el: TTicket) => {
          const createdAt = Number(el.createdAt)
          const updatedAt = Number(el.updatedAt)

          return { ...el, createdAt, updatedAt }
        })
      })
      .then((data) => this.setTickets(data))
      .catch((error) => handleError(error))
      .finally(() => setLoading(false))
  }

  submitTicket: (ticket: TTicket) => void = async (ticket) => {
    setLoading(true)
    const updateIndex = this.tickets.findIndex((el: TTicket) => el.id === ticket.id)
    const updateTickets: TTicket[] = toJS(this.tickets)
    updateTickets[updateIndex] = ticket
    await axios
      .put(`http://localhost:5000/api/projects/updateticket`, ticket)
      .then(() => this.setTickets(updateTickets))
      .catch((error) => handleError(error))
      .finally(() => setLoading(false))
  }

  createTicket: (ticket: TTicket) => void = async (ticket) => {
    setLoading(true)
    const lastId: number = await axios
      .get(`http://localhost:5000/api/projects/tickets/getlast`)
      .then((response) => response.data)
    ticket.id = lastId + 1
    await axios
      .post(`http://localhost:5000/api/projects/createticket`, ticket)
      .then(() => this.setTickets(this.tickets.concat(ticket)))
      .catch((error) => handleError(error))
      .finally(() => setLoading(false))
  }

  deleteTicket: (ticket: TTicket) => void = async (ticket) => {
    setLoading(true)
    const { id } = ticket
    const updateTickets: TTicket[] = toJS(this.tickets).filter((ticket: TTicket) => ticket.id !== id)
    await axios
      .post(`http://localhost:5000/api/projects/deleteticket`, ticket)
      .then(() => this.setTickets(updateTickets))
      .catch((error) => handleError(error))
      .finally(() => setLoading(false))
  }
}

export const ticketsStore = new TicketsStoreClass()
