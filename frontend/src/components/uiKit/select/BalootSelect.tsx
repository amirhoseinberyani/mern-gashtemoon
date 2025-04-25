import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import React from 'react'

interface BalootSelectProps {
  options: any[]
  labelKey: string
  valueKey: string | number
  label?: string
}
export default function BalootSelect({ options, labelKey, valueKey, label }: BalootSelectProps) {
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='demo-multiple-name-label'>{label}</InputLabel>
        <Select
          labelId='demo-multiple-name-label'
          id='demo-multiple-name'
          //   multiple
          //   value={personName}
          //   onChange={handleChange}
          //   input={<OutlinedInput label={label} />}
          //   MenuProps={MenuProps}
        >
          {options?.map((name) => (
            <MenuItem key={valueKey} value={labelKey}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
