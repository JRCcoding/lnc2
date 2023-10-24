import * as React from 'react'
import Navbar from './components/Navbar'
import { Button, Paper } from '@mui/material'
import ImageGallery from './components/ImageGallery'
import { db } from '../firebase'
import { getDocs, collection } from 'firebase/firestore'
import ContactForm from './components/ContactForm'

export default function Home() {
  const [cakes, setCakes] = React.useState([])
  React.useEffect(() => {
    const fetchCakes = async () => {
      const cakesRef = collection(db, 'cakes')
      const querySnapshot = await getDocs(cakesRef)
      const cakesData = querySnapshot.docs.map((doc) => doc.data())
      cakesData.forEach((cake) => {
        cake.createdAt = new Date(cake.createdAt)
      })

      // Sort cakes by createdAt timestamp
      cakesData.sort((a, b) => b.createdAt - a.createdAt)
      setCakes(cakesData)
    }
    fetchCakes()
  }, [])
  const [showMore, setShowMore] = React.useState(false)
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
            <ImageGallery
              category='Recent'
              products={cakes.slice(0, showMore ? 10 : 3)}
            />
            <Button
              sx={{ width: '100%' }}
              onClick={() => setShowMore(!showMore)}
            >
              Show {showMore ? 'less' : 'more'}
            </Button>
            {/* <ImageGallery category='Smash Cakes' /> */}
          </Paper>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
