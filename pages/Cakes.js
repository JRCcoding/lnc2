import React from 'react'
import Navbar from './components/Navbar'
import { Button, Paper } from '@mui/material'
import ImageGallery from './components/ImageGallery'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase'

const Cakes = () => {
  const [cakes, setCakes] = React.useState(null)
  React.useEffect(() => {
    const fetchCakes = async () => {
      const cakesRef = collection(db, 'cakes')
      const q = query(cakesRef, where('type', '==', 'cake'))
      const querySnapshot = await getDocs(q)
      const cakesData = querySnapshot.docs.map((doc) => doc.data())
      setCakes(cakesData)
    }
    fetchCakes()
  }, [])
  return (
    <div>
      <Navbar />
      <div
        style={{
          paddingTop: 150,
          paddingLeft: '5%',
          paddingRight: '5%',
          background: `url('/bg.png')`,
          minHeight: '150vh',
          backgroundSize: '150% auto',
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
          <ImageGallery category='Cakes' products={cakes} />
        </Paper>
      </div>
    </div>
  )
}

export default Cakes
