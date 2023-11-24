import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  card: {
    transition: '.1s',
    width: '100%',
    maxWidth: 320,
    '&:hover': { transform: 'scale(1.04)' }
  },
  gridItem: {
    border: '2px solid lightgrey',
    borderRadius: '5px',
    padding: '10px',
    borderColor: '#aaa'
  },
  descriptionItem: {
    height: 75
  },
  modal: {
    paddingTop: 100
  },
  ticket: {
    textAlign: 'center',
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    backgroundColor: '#ddd',
    borderRadius: '10px',
    boxShadow: '24',
    width: '80%',
    maxWidth: 600
  }
})
