import { useEffect } from 'react'
import { Button, Stack, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'

import { appStore, projectsStore, ticketsStore } from '../mobx'
import { useStyles } from '../helpers'

export const ProjectsList = observer(() => {
  const navigate = useNavigate()
  const classes = useStyles()
  const { setHeaderOpen } = appStore
  const { setTickets } = ticketsStore
  const { projects } = projectsStore

  const onClickHandler = (projectid: string) => {
    navigate(`/projects/${projectid}`)
  }

  useEffect(() => {
    setTickets([])
    setHeaderOpen(true) // eslint-disable-next-line
  }, [])

  return (
    <Grid container mt={6} pl={2} spacing={2}>
      {projects?.map((el) => {
        const { description, name, projectid } = el
        return (
          <Grid item key={description} className={classes.card}>
            <Stack spacing={2} className={classes.gridItem}>
              <Typography variant="h5">{name}</Typography>
              <Typography variant="subtitle1" className={classes.descriptionItem}>
                {description}
              </Typography>
              <Button onClick={() => onClickHandler(projectid)}>See App</Button>
            </Stack>
          </Grid>
        )
      })}
    </Grid>
  )
})
