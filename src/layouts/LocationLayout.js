import { Container } from '@mui/material'
import React from 'react'
import GoogleMapComponent from '../google_map/GoogleMapComponent'

export default function LocationLayout() {
  return (
    <div>
      <Container>
        <GoogleMapComponent />
      </Container>
    </div>
  )
}
