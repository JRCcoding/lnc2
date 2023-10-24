import React, { useState } from 'react'
import { TextField } from '@mui/material'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handlePhoneNumberChange = (e) => {
    const { name, value } = e.target
    const formattedValue = formatPhoneNumber(value)
    setFormData({ ...formData, [name]: formattedValue })
  }

  const formatPhoneNumber = (phoneNumber) => {
    // Remove all non-numeric characters
    const cleaned = phoneNumber.replace(/\D/g, '')

    // Apply formatting: (###)###-####
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return `(${match[1]})${match[2]}-${match[3]}`
    }

    return cleaned
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 200) {
        // Email sent successfully
        console.log('Email sent successfully')
        // Reset the form or show a success message
      } else {
        // Handle the error, e.g., display an error message
        console.error('Email sending failed')
      }
    } catch (error) {
      console.error(error)
    }
  }
  const [isMobile, setIsMobile] = React.useState(true)
  React.useEffect(() => {
    if (window.innerWidth >= 501) setIsMobile(false)
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--orange)',
        marginTop: 5,
        borderRadius: 5,
        color: '#ffffff',
      }}
    >
      <h1 style={{ textAlign: 'center', paddingTop: '25px' }}>Contact Me</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--orange)',
          color: '#ffffff',
          gap: 10,
          padding: isMobile ? '25px 50px' : '25px 150px',
        }}
      >
        <TextField
          name='name'
          id='name'
          label='Name'
          variant='standard'
          value={formData.name}
          onChange={handleChange}
          required
        />

        <TextField
          name='number'
          id='number'
          label='Number'
          variant='standard'
          value={formData.number}
          onChange={handlePhoneNumberChange}
          required
          inputProps={{ inputMode: 'numeric', pattern: '[0-9, (, ), -]*' }}
        />

        <TextField
          name='message'
          id='message'
          label='Message'
          variant='standard'
          value={formData.message}
          onChange={handleChange}
          required
        />

        <input
          type='submit'
          value='Submit'
          style={{
            backgroundColor: 'var(--purple)',
            color: 'white',
            borderRadius: '15px',
            border: '0',
            textShadow: '1px 2px 10px black',
            padding: 5,
            fontSize: '1.3rem',
            marginTop: '25px',
          }}
        />
      </form>
    </div>
  )
}
