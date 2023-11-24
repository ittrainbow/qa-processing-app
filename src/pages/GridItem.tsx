import { Button, Stack, Grid, Typography } from '@mui/material'
import moment from 'moment/moment'
import { toJS } from 'mobx'

import { useStyles, iconHelper, textHelper } from '../helpers'
import { usersStore, ticketsStore } from '../mobx'
import { TGridItemProps } from '../types/types'
import { defaultUser } from '../types/initials'

const { tickets } = ticketsStore

export const GridItem = ({ ticket, filter, onClick }: TGridItemProps) => {
  const { issue, created, creator, id, severity, status, problem, updated, updater } = ticket
  const { users } = usersStore
  const classes = useStyles()

  const getName = (id: number | string) => {
    const gotUsers: boolean = !!toJS(users).length
    const findUser = toJS(users).find((user) => user.id === Number(id)) || defaultUser
    const name = gotUsers ? findUser.name : 'unknown user'
    return name
  }

  const isotime = (timestamp: number) => moment(timestamp).format().substring(0, 16).replace(/T/g, ' ')

  const viewTickethandler = () => id && onClick(tickets[id])

  return filter !== 'open' || status !== 'done' ? (
    <Grid item key={updated} className={classes.card}>
      <Stack spacing={1} height={210} className={classes.gridItem}>
        <Typography variant="h6">Ticket #{Number(id)}</Typography>
        <Stack minHeight={40}>
          <Typography variant="body2">{issue.length > 70 ? issue.substring(0, 70) + '{...}' : issue}</Typography>
        </Stack>
        <Stack spacing={1} direction="row">
          <Stack>{iconHelper(severity, status)}</Stack>
          <Stack direction="column">
            <Typography fontSize={13}>Class:</Typography>
            <Typography fontSize={13}>Status:</Typography>
          </Stack>
          <Stack>
            <Typography fontSize={13}>{problem === 'ui' ? 'UI' : 'Functional'}</Typography>
            <Typography fontSize={13} color={status === 'totest' ? 'green' : 'black'} fontWeight={600}>
              {textHelper(status)}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Stack direction="column">
            <Typography fontSize={13}>Created:</Typography>
            <Typography fontSize={13}>Edited:</Typography>
          </Stack>
          <Stack direction="column">
            <Typography fontSize={13}>
              {isotime(Number(created))} by {getName(creator)}
            </Typography>
            <Typography fontSize={13}>
              {isotime(Number(updated))} by {getName(updater)}
            </Typography>
          </Stack>
        </Stack>
        <Button onClick={viewTickethandler}>View ticket</Button>
      </Stack>
    </Grid>
  ) : null
}
