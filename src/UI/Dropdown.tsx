import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { observer } from 'mobx-react'

import { TDropdownProps } from '../types/types'
import { lists } from '../helpers'

export const Dropdown = observer(({ label, onChange, width = 180, value }: TDropdownProps) => {
  const list = lists[`${label.toLowerCase()}List`] ?? []

  return (
    <FormControl sx={{ mt: 1, mb: 1, width: width + 32 }} size={'small'}>
      <InputLabel id={label}>{label}</InputLabel>
      <Select value={value} label={label} onChange={onChange}>
        {list.map((el) => {
          const { value, text } = el
          return (
            <MenuItem key={value} value={value}>
              {text}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
})
