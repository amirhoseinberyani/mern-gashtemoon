import React, { useEffect, useState, useContext } from 'react'
import TableHeaderField from './TableHeaderField'
import { IconButton, TableContainer, Table } from '@mui/material'
import { TableHead, TableRow, TableCell } from '@mui/material'
import { TableBody, Paper, Grid } from '@mui/material'
import { Typography, LinearProgress } from '@mui/material'
import EditIcon from '@mui/icons-material/EditRounded'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Alert, Pagination } from '@mui/material'
import './styles/index.css'
import { FetchContext } from '../../../contexts/fetchContext'
import { MyButton } from '../button'

interface MyTableTypes {
  cols: {
    key: string
    text: string
    type?: string
    field?: string
    showInFilter?: boolean
    showInTable?: boolean
    options?: any[]
  }[]
  apiUrl: string
  pageSize?: number
  id?: string
  editClick?: (item: any) => void
  createClick?: () => void
  reload?: boolean
  info?: boolean
  Size?: number
  actions?: (item?: any) => any
  queries?: { text: string; field: any }[]
  title?: string
  createBtnTitle?: string
  HideDeleteIcon?: boolean
  getRowColor?: (item: any) => string
}

export default function MyTable({
  cols,
  apiUrl,
  editClick,
  createClick,
  reload,
  pageSize,
  title,
  id,
  Size,
  createBtnTitle,
  HideDeleteIcon,
  actions,
  queries,
  info,
  getRowColor,
}: MyTableTypes) {
  const { request } = useContext(FetchContext)
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [pagesCount, setPagesCount] = useState<number>(pageSize ? pageSize : 3)
  const [size, setSize] = useState<number>(1)
  const [page, setPage] = useState<number>(1)
  const [conditions, setConditions] = useState<any[]>([])
  const [applyFilter, setApplyFilter] = useState<number>(0)
  const [sortField, setSortFiled] = useState<string>('')
  const [sortType, setSortType] = useState<string>('ASC')
  const [open, setOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<any>({})
  const [filterLength, setFilterLength] = useState<boolean>(false)

  const getAllData: () => void = () => {
    setError(false)
    setLoading(true)
    // var formattedConditions = "";
    // conditions.forEach((cond) => {
    //   formattedConditions += `&${cond.key}=${cond.value}`;
    // });
    let url = `${apiUrl}?Page=${page}&Count=${Size ? Size : 20}`
    if (queries && queries.length > 0) {
      queries.forEach((item) => {
        url = url + `&${item.text}=${item.field}`
      })
    }
    if (conditions.length > 0) {
      conditions.forEach((item) => {
        if (typeof item.value === 'string') {
          url = url + `&${item.key}=${item.value}`
        } else {
          url = url + `&${item.key}=${item.value.value}`
        }
      })
    }
    if (sortField) {
      url = url + `&sort=${sortField} ${sortType}`
    }
    request(url, 'GET').then(({ status, data }) => {
      if (status === 200) {
        setData(data.data.friends)
        setSize(data.response.size)
        setPagesCount(data.response.pages)
      } else {
        setError(true)
      }
      setLoading(false)
    })
  }
  useEffect(() => {
    getAllData()
  }, [sortField, sortType, page, applyFilter, reload])

  useEffect(() => {
    let show = cols.find((col) => {
      return col.showInFilter || col.showInFilter === undefined
    })
    show && setShowFilter(true)
  }, [])

  const toggleInfo = (item: any) => {
    setOpen(!open)
    setSelectedRow(item)
  }

  useEffect(() => {
    cols.forEach((col) => {
      if (!col.showInFilter || col.showInFilter === true) {
        setFilterLength(true)
      }
    })
  }, [])

  return (
    <>
      {/* {error ? (
        <Alert severity="error">در ارتباط با سرور خطایی رخ داده است!</Alert>
      ) : null} */}
      {loading ? <LinearProgress color='secondary' /> : <div className='noLoadingDiv' />}
      <TableContainer component={Paper}>
        <Grid className='titlteGrid'>
          <Typography>{title ? title : ''}</Typography>
          {createClick && (
            <Grid>
              <MyButton
                label={createBtnTitle ? createBtnTitle : 'جدید'}
                variant='contained'
                size='small'
                color='primary'
                onClick={createClick}
              />
            </Grid>
          )}
        </Grid>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell className='tableCell' align='center'>
                #
              </TableCell>
              {cols.map((item) => {
                if (item.showInTable === false) {
                  return null
                } else {
                  if (item.type === 'array') {
                    return (
                      <TableHeaderField
                        key={item.key}
                        setSortFiled={() => {}}
                        sortType={sortType}
                        sortField={sortField}
                        setSortType={setSortType}
                        item={item}
                      />
                    )
                  } else {
                    return (
                      <TableHeaderField
                        key={item.key}
                        setSortFiled={setSortFiled}
                        sortType={sortType}
                        sortField={sortField}
                        setSortType={setSortType}
                        item={item}
                      />
                    )
                  }
                }
              })}
              {actions || !HideDeleteIcon ? (
                <TableCell className='tableCell' align='center'>
                  عملیات
                </TableCell>
              ) : null}
            </TableRow>
          </TableHead>

          <TableBody className='tableBody'>
            {data.map((item, index) => (
              <TableRow
                style={{
                  backgroundColor: getRowColor
                    ? getRowColor(item)
                    : index % 2 === 0
                    ? 'white'
                    : 'lightGray',
                }}
                className='tableRow'
                key={item._id}
              >
                <TableCell align='center'>{size * (page - 1) + index + 1}</TableCell>
                {cols.map((col) => {
                  var formatedVal = ''
                  if (col.type === 'array' && col.field) {
                    formatedVal =
                      item[col.key] !== undefined
                        ? item[col.key]?.length !== 0
                          ? col.field === 'length'
                            ? item[col.key].length
                            : item[col.key][0][col.field]
                          : '---'
                        : '---'
                  } else if (col.type === 'select' && col.options) {
                    col.options.forEach((opt) => {
                      if (opt.value === item[col.key]) {
                        formatedVal = opt.text
                      }
                    })
                    if (formatedVal === '') {
                      formatedVal = '---'
                    }
                  } else if (col.type === 'price') {
                    formatedVal =
                      col.key !== undefined
                        ? col.key !== ''
                          ? item[col.key].toLocaleString()
                          : '---'
                        : '---'
                  } else {
                    formatedVal =
                      item[col.key] !== undefined
                        ? item[col.key] !== ''
                          ? item[col.key]
                          : '---'
                        : '---'
                  }
                  return col.showInTable === false ? null : (
                    <TableCell
                      key={col.key}
                      style={{
                        padding: actions || !HideDeleteIcon ? 0 : '10px 0 10px 0',
                      }}
                      align='center'
                    >
                      {formatedVal}
                    </TableCell>
                  )
                })}
                {editClick || actions || !HideDeleteIcon ? (
                  <TableCell align='center'>
                    <div className='actionCell'>
                      {/* {actions && <MoreIcon item={item} actions={actions} />} */}
                      {info ? (
                        <IconButton onClick={() => toggleInfo(item)}>
                          <InfoOutlinedIcon color='primary' />
                        </IconButton>
                      ) : null}
                      {editClick ? (
                        <IconButton onClick={() => editClick(item)}>
                          <EditIcon color='primary' />
                        </IconButton>
                      ) : null}
                      {/* {HideDeleteIcon ? null : (
                        <DeleteCell
                          {...{
                            item,
                            setLoading,
                            apiUrl,
                            getAllData,
                            setError,
                            id,
                          }}
                        />
                      )} */}
                    </div>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='paginationDiv'>
        {pagesCount > 1 ? (
          <Pagination
            onChange={(e, page) => {
              setPage(page)
            }}
            color='secondary'
            variant='outlined'
            shape='rounded'
            count={pagesCount}
          />
        ) : null}
      </div>
    </>
  )
}
