import { useState, useEffect } from 'react'
import { Button, Stack, Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'

import { appStore, usersStore, ticketsStore } from '../mobx'
import { sortHelper, blankTicket } from '../helpers'
import { TChange, TTicket } from '../types/types'
import { GridItem, Ticket } from '.'
import { Dropdown } from '../UI'

export const Project = observer(() => {
  const { tickets, getTickets } = ticketsStore
  const { setHeaderOpen } = appStore
  const { user, token } = usersStore
  const { id = '' } = useParams()

  const [queue, setQueue] = useState<TTicket[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [tempTicket, setTempTicket] = useState<TTicket>({} as TTicket)
  const [filter, setFilter] = useState<string>('all')
  const [sort, setSort] = useState<string>('updatedesc')
  const [creating, setCreating] = useState<boolean>(false)

  useEffect(() => {
    if (tickets.length && id) {
      setHeaderOpen(false)
      setQueue(tickets)
    } else {
      getTickets(id)
    } // eslint-disable-next-line
  }, [tickets])

  const createTicket = () => {
    setCreating(true)
    const date = new Date().getTime()
    if (user) {
      const userid = user.id || 0
      const ticket: TTicket = {
        ...blankTicket,
        createdAt: date,
        updatedAt: date,
        projectid: id,
        creator: userid,
        updater: userid
      }
      setTempTicket(ticket)
      setModalOpen(true)
    }
  }

  const openModalHandler = (value: TTicket) => {
    setTempTicket(value)
    setModalOpen(true)
  }

  const closeModalHandler = () => {
    setCreating(false)
    setModalOpen(false)
  }

  const drawModal = () =>
    modalOpen && (
      <Ticket
        tempTicket={tempTicket}
        modalOpen={modalOpen}
        onClose={closeModalHandler}
        setTicket={setTempTicket}
        creating={creating}
      />
    )

  const filterHandler = (e: TChange) => {
    const { value } = e.target
    setFilter(value)
  }

  const sortHandler = (e: TChange) => {
    const { value } = e.target
    setSort(value)
    const newQueue = sortHelper(tickets, value)
    setQueue(newQueue)
  }

  const filterDropDown = () => <Dropdown label="Filter" value={filter} onChange={filterHandler} />
  const sortDropDown = () => <Dropdown label="Sort" value={sort} onChange={sortHandler} />

  return (
    <Stack mb={2} ml={2}>
      <Stack direction="row" ml={6} spacing={1}>
        <Stack width={210}>{filterDropDown()}</Stack>
        <Stack width={210}>{sortDropDown()}</Stack>
      </Stack>
      <Button onClick={createTicket} disabled={!token}>
        Create ticket
      </Button>
      <Grid container spacing={2}>
        {queue.map((el: TTicket) => (
          <GridItem el={el} key={el.issue} filter={filter} handler={openModalHandler} tickets={tickets} />
        ))}
      </Grid>
      {drawModal()}
    </Stack>
  )
})
