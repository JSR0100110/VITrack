import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

export default function Home() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [driverEmail, setDriverEmail] = useState('');
  const [driverPassword, setDriverPassword] = useState('');

  function handleUserLogin() {
    console.log('Logging in as user with email:', userEmail, 'and password:', userPassword);
    // Implement your user login logic here
    navigate('/user');
  }

  function handleDriverLogin() {
    console.log('Logging in as driver with email:', driverEmail, 'and password:', driverPassword);
    // Implement your driver login logic here
    navigate('/driver');
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '60vh',
        }}
      >
        <div style={{ width: '100%' }}>
          <Typography style={{ textAlign: 'center' }} variant='h3'>
            Welcome to VITrack
          </Typography>
        </div>
        <div style={{ width: '70%' }}>
          <Card>
            <CardContent>
              <Stack direction='row' alignItems='center' gap={1}>
                <PersonIcon fontSize='large' />
                <Typography gutterBottom variant='h4' component='div'>
                  User Login
                </Typography>
              </Stack>
              <TextField
                label='Email'
                variant='outlined'
                fullWidth
                margin='normal'
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <TextField
                label='Password'
                variant='outlined'
                fullWidth
                margin='normal'
                type='password'
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <Button onClick={handleUserLogin} variant='contained' fullWidth>
                Login
              </Button>
            </CardContent>
          </Card>
        </div>
        <div style={{ width: '70%' }}>
          <Card>
            <CardContent>
              <Stack direction='row' alignItems='center' gap={1}>
                <LocalShippingIcon fontSize='large' />
                <Typography gutterBottom variant='h4' component='div'>
                  Driver Login
                </Typography>
              </Stack>
              <TextField
                label='Email'
                variant='outlined'
                fullWidth
                margin='normal'
                value={driverEmail}
                onChange={(e) => setDriverEmail(e.target.value)}
              />
              <TextField
                label='Password'
                variant='outlined'
                fullWidth
                margin='normal'
                type='password'
                value={driverPassword}
                onChange={(e) => setDriverPassword(e.target.value)}
              />
              <Button onClick={handleDriverLogin} variant='contained' fullWidth>
                Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
