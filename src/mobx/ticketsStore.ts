import { makeObservable, observable, action, toJS } from 'mobx'
import axios from 'axios'

import { TTicket } from '../types/types'
import { appStore } from './appStore'
import { render } from '../url'

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
      deleteTicket: action,
      trimAts: action
    })
  }

  trimAts: (value: TTicket) => TTicket = (value) => {
    // delete value.createdAt
    // delete value.updatedAt
    return value
  }

  setTickets: (data: TTicket[]) => void = (data) => (this.tickets = data)

  getTickets: (id: string) => void = async (id) => {
    setLoading(true)
    await axios
      .get(`${render}/api/tickets/${id}`)
      .then((response) => response.data)
      .then((data) => data.map((el: TTicket) => this.trimAts(el)))
      .then((data) => this.setTickets(data))
      .catch((error) => handleError(error))
      .finally(() => setLoading(false))
  }

  submitTicket: (ticket: TTicket) => void = async (ticket) => {
    console.log(201, ticket)
    setLoading(true)
    const updateIndex = this.tickets.findIndex((el: TTicket) => el.id === ticket.id)
    const updateTickets: TTicket[] = toJS(this.tickets)
    updateTickets[updateIndex] = ticket
    await axios
      .put(`${render}/api/tickets/update`, ticket)
      .then(() => this.setTickets(updateTickets))
      .catch((error) => handleError(error))
      .finally(() => setLoading(false))
  }

  createTicket: (ticket: TTicket) => void = async (ticket) => {
    console.log(202, ticket)
    setLoading(true)
    await axios
      .post(`${render}/api/tickets/create`, ticket)
      .then((response) => response.data)
      .then((ticket) => this.trimAts(ticket))
      .then((ticket) => this.setTickets(this.tickets.concat(ticket)))
      .catch((error) => handleError(error))
      .finally(() => setLoading(false))
  }

  deleteTicket: (ticket: TTicket) => void = async (ticket) => {
    setLoading(true)
    const { id } = ticket
    const updateTickets: TTicket[] = toJS(this.tickets).filter((ticket: TTicket) => ticket.id !== id)
    await axios
      .post(`${render}/api/tickets/delete`, ticket)
      .then(() => this.setTickets(updateTickets))
      .catch((error) => handleError(error))
      .finally(() => setLoading(false))
  }
}

export const ticketsStore = new TicketsStoreClass()
