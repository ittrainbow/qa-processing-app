import { ButtonGroup, Modal, TextField, Stack, Button } from '@mui/material'
import { observer } from 'mobx-react'

import { TChange, TTicket, TTicketProps } from '../types/types'
import { ticketsStore, usersStore } from '../mobx'
import { Dropdown } from '../UI/Dropdown'
import { useStyles } from '../helpers'

export const Ticket = observer(({ ticket, modalOpen, onClose, creating, setTicket }: TTicketProps) => {
  const { issue, description, solution, severity, problem, status } = ticket
  const { submitTicket, createTicket, deleteTicket } = ticketsStore
  const { user } = usersStore
  const classes = useStyles()

  const submitHandler = () => {
    const updater = (user.id || 0).toString()
    const newTicket: TTicket = { ...ticket, updater, updated: new Date().getTime() }
    creating ? createTicket(newTicket) : submitTicket(newTicket)
    onClose()
  }

  const deleteHandler = () => {
    if (window.confirm('Delete ticket?')) deleteTicket(ticket)
    onClose()
  }

  const onChange = (e: TChange, field: string) => setTicket({ ...ticket, [field]: e.target.value })

  return (
    <Modal className={classes.modal} open={modalOpen} onClose={onClose}>
      <Stack className={classes.ticket} direction="column" spacing={2} sx={{ p: 2, pt: 4 }}>
        <TextField label="Issue" value={issue} size="small" onChange={(e) => onChange(e, 'issue')} />
        <TextField label="Description" value={description} multiline onChange={(e) => onChange(e, 'description')} />
        <TextField label="Solution" value={solution} multiline rows={4} onChange={(e) => onChange(e, 'solution')} />
        <Stack justifyContent="center" alignItems="center" direction="row" spacing={1}>
          <Dropdown label="Severity" value={severity} onChange={(e: TChange) => onChange(e, 'severity')} />
          <Dropdown label="Problem" value={problem} onChange={(e: TChange) => onChange(e, 'problem')} />
          <Dropdown label="Status" value={status} onChange={(e: TChange) => onChange(e, 'status')} />
        </Stack>
        <ButtonGroup variant="text" fullWidth={true}>
          <Button disabled={!status || !problem || !severity || !issue || !user.name} onClick={submitHandler}>
            Submit
          </Button>
          <Button onClick={onClose}>Discard</Button>
          {user.admin && !creating && (
            <Button onClick={deleteHandler} disabled={!user}>
              Delete
            </Button>
          )}
        </ButtonGroup>
      </Stack>
    </Modal>
  )
})
