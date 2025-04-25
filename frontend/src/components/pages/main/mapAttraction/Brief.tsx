import React, { useContext, useEffect, useState } from 'react'
import { Button, Grid, Modal, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { API } from 'config'
import { translate, lang } from 'localization'
import { FetchContext } from '../../../../contexts/fetchContext'
import RawImage from '../../../common/rawImage/RawImage'
import './brief.css'
import BriefContent from './briefContent'

interface BriefProps {
  selectedProvince: any
  open: boolean
  onClose: Function
}

export default function Brief({ selectedProvince, open, onClose }: BriefProps) {
  return (
    <Modal open={open} onClose={() => onClose()}>
      <BriefContent selectedProvince={selectedProvince} />
    </Modal>
  )
}
