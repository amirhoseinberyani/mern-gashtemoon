import { TableCell } from '@mui/material'
import React from 'react'
import './styles/index.css'
import ArrowDownward from '@mui/icons-material/ArrowDownward'
import ArrowUpward from '@mui/icons-material/ArrowUpward'

interface TableHeaderFieldTypes {
  item: any
  setSortFiled: (value: string) => void
  setSortType: (value: string) => void
  sortField: string
  sortType: string
}

export default function TableHeaderField({
  item,
  setSortFiled,
  setSortType,
  sortField,
  sortType,
}: TableHeaderFieldTypes) {
  return (
    <TableCell
      className='tableCell'
      align='center'
      onClick={() => {
        if (sortField === item.key) {
          setSortType(sortType === 'DESC' ? 'ASC' : 'DESC')
        } else {
          setSortFiled(item.key)
        }
      }}
    >
      <div className='tabelHeaderField'>
        <span> {item.text}</span>
        {sortField === item.key ? (
          sortType === 'ASC' ? (
            <ArrowDownward fontSize='small' className='sortIcon' />
          ) : (
            <ArrowUpward fontSize='small' className='sortIcon' />
          )
        ) : null}
      </div>
    </TableCell>
  )
}
