import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer' // Import the Drawer component
import Image from 'next/image'
import { Menu, MenuItem } from '@mui/material'
import { useRouter } from 'next/router'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const router = useRouter()

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ flexGrow: 1, height: 100 }}>
      <AppBar
        position='sticky'
        sx={{
          backgroundColor: 'var(--orange)',
          minHeight: 100,
          justifyContent: 'center',
          borderBottom: '1px solid black',
        }}
      >
        <Toolbar color='green'>
          <Image
            src='/logo.png'
            alt='LNC Treats Logo'
            height={120}
            width={120}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              border: '1px solid black',
              top: -15,
            }}
            onClick={() => router.push('/')}
          />
          <Button
            color='inherit'
            sx={{
              marginLeft: 'auto',
              fontSize: '1.1rem',
              color: 'black',
              fontWeight: 'bolder',
              fontFamily: 'Pacifico',
            }}
            onClick={handleClick}
          >
            {drawerOpen === true ? <MenuOpenIcon /> : <MenuIcon />}
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {['Home', 'Cakes', 'Cupcakes / Cake Pops'].map((item, index) => (
              <div key={index}>
                <MenuItem
                  sx={{
                    backgroundColor: 'var(--purple)',
                    color: 'white',
                    textAlign: 'right',
                  }}
                  onClick={() =>
                    router.push(
                      // `/${item.split(' ')[0]}`
                      item === 'Home' ? '/' : item.split(' ')[0]
                    )
                  }
                >
                  {item}
                </MenuItem>
              </div>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer anchor='left' open={drawerOpen} onClose={toggleDrawer}>
        {/* Content for the side drawer */}
        <div
          style={{
            background: 'var(--purple)',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Add your links, buttons, or other content here */}
          <Button
            onClick={toggleDrawer}
            sx={{ color: '#ffff', marginBottom: 5 }}
          >
            Close Drawer
          </Button>
          <Button sx={{ color: '#ffff' }}>Cakes</Button>
          <Button sx={{ color: '#ffff' }}>Cupcakes/Cake Pops</Button>
        </div>
      </Drawer>
      <Image
        src='/spider-web.png'
        height={100}
        width={100}
        alt='100'
        style={{ marginTop: -5 }}
      />
      <Image
        src='/spider.png'
        height={100}
        width={100}
        alt='100'
        style={{
          position: 'absolute',
          right: 0,
          top: 150,
        }}
      />
      <Image
        src='/spider-web.png'
        height={100}
        width={100}
        alt='100'
        style={{ float: 'right', transform: 'scaleX(-1)', marginTop: -5 }}
      />
    </Box>
  )
}
