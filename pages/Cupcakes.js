import React from 'react'
import Navbar from './components/Navbar'
import { Button, Paper } from '@mui/material'
import ImageGallery from './components/ImageGallery'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase'

const Cupcakes = () => {
  const [cupcakes, setCupcakes] = React.useState(null)
  const [cakepops, setCakepops] = React.useState(null)
  React.useEffect(() => {
    const fetchCupcakes = async () => {
      const cakesRef = collection(db, 'cakes')
      const q = query(cakesRef, where('type', '==', 'cupcake'))
      const querySnapshot = await getDocs(q)
      const cakesData = querySnapshot.docs.map((doc) => doc.data())
      setCupcakes(cakesData)
    }
    fetchCupcakes()

    const fetchCakepops = async () => {
      const cakesRef = collection(db, 'cakes')
      const q = query(cakesRef, where('type', '==', 'cakepop'))
      const querySnapshot = await getDocs(q)
      const cakesData = querySnapshot.docs.map((doc) => doc.data())
      cakesData.forEach((cake) => {
        cake.createdAt = new Date(cake.createdAt)
      })

      // Sort cakes by createdAt timestamp
      cakesData.sort((a, b) => b.createdAt - a.createdAt)
      setCakepops(cakesData)
    }
    fetchCakepops()
  }, [])
  const [isMobile, setIsMobile] = React.useState(true)
  React.useEffect(() => {
    if (window.innerWidth >= 501) setIsMobile(false)
  }, [])
  return (
    <div>
      <Navbar />
      <div
        style={{
          background: `url('/bg.png')`,
          minHeight: '150vh',
          backgroundSize: '150% auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: isMobile ? '88%' : '45%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Paper
            elevation={24}
            sx={{
              minHeight: '500px',
              border: '1px solid var(--orange)',
              padding: 2,
            }}
          >
            <ImageGallery category='Cupcakes' products={cupcakes} />
            <ImageGallery category='Cake Pops' products={cakepops} />
          </Paper>
        </div>
      </div>
    </div>
  )
}

export default Cupcakes
