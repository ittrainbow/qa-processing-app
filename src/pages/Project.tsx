import { useState, useEffect } from 'react'
import { Button, Stack, Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'

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
      setQueue(sortHelper(tickets, sort))
    } else {
      getTickets(id)
    } // eslint-disable-next-line
  }, [tickets])

  const createTicket = () => {
    setCreating(true)

    if (user) {
      const date = new Date().getTime()
      const userid = (user.id || 0).toString()
      const fillTicket = { created: date, updated: date, projectid: id, creator: userid, updater: userid }
      const ticket: TTicket = Object.assign(blankTicket, fillTicket)
      setTempTicket(ticket)
      setModalOpen(true)
    }
  }

  const openHandler = (value: TTicket) => {
    setTempTicket(value)
    setModalOpen(true)
  }

  const closeHandler = () => {
    setCreating(false)
    setModalOpen(false)
  }

  const filterHandler = (e: TChange) => {
    const { value } = e.target
    setFilter(value)
  }

  const sortHandler = (e: TChange) => {
    const { value } = e.target
    setSort(value)
    setQueue(sortHelper(tickets, value))
  }

  return (
    <Stack mb={2} ml={2}>
      <Stack direction="row" ml={6} spacing={1}>
        <Stack>
          <Dropdown label="Filter" value={filter} onChange={filterHandler} />
        </Stack>
        <Stack>
          <Dropdown label="Sort" value={sort} onChange={sortHandler} />
        </Stack>
      </Stack>
      <Button onClick={createTicket} disabled={!token}>
        Create ticket
      </Button>
      <Grid container spacing={2}>
        {queue.map((el: TTicket) => {
          const ticket = toJS(el)
          return <GridItem ticket={ticket} key={ticket.issue} filter={filter} onClick={() => openHandler(ticket)} />
        })}
      </Grid>
      {modalOpen && (
        <Ticket
          ticket={tempTicket}
          modalOpen={modalOpen}
          onClose={closeHandler}
          setTicket={setTempTicket}
          creating={creating}
        />
      )}
    </Stack>
  )
})
