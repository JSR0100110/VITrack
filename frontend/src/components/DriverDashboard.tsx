import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Passenger from './PassengerRequest';
import { socketEvents } from '../constants';
import { IdriverAssociate, IPassenger, PassengerStatus } from '../types';
import { updatePassengerStatus, updatePassengerDriverAssociate } from '../api';

type Props = {
  socket: any;
  setPassengerData: any;
};

const DriverDashboard = (props: Props) => {
  // @ts-ignore
  const [newPassengerRequest, setNewPassengerRequest] = useState<IPassenger>({});

  const email = sessionStorage.getItem('driverEmail') || '';
  const name = email.substring(0, email.indexOf('@'));
  const nameCaseCorrected = name.charAt(0).toUpperCase() + name.slice(1);

  useEffect(() => {
    props.socket.on(socketEvents.PASSENGER_CREATED, (data: any) => {
      setNewPassengerRequest(data);
    });
  }, []);

  const onAccept = async () => {
    await updatePassengerStatus(
      newPassengerRequest?._id,
      PassengerStatus.driverAssociateAssigned
    );
    const email = sessionStorage.getItem('driverEmail') || '';
    const PassengerData = await updatePassengerDriverAssociate(
      newPassengerRequest?._id,
      email
    );
    props.setPassengerData(PassengerData.data);
    // @ts-ignore
    setNewPassengerRequest({});
  };
  const onReject = () => {
    // @ts-ignore
    setNewPassengerRequest({});
  };
  return (
    <div
      style={{
        padding: '25px 40px',
      }}
    >
      <Card>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Driver Details
          </Typography>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Stack spacing={0.5}>
              <Typography variant='body2'>
                <strong>Email: </strong>
                {email}
              </Typography>
              <Typography variant='body2'>
                <strong>Name: </strong>
                {nameCaseCorrected}
              </Typography>
            </Stack>
          </Box>
        </CardContent>
      </Card>
      <div style={{ margin: '20px 0px' }}>
        {/* New Passenger Notification */}
        {newPassengerRequest._id ? (
          <Passenger onAccept={onAccept} onReject={onReject} />
        ) : null}
      </div>
    </div>
  );
};

export default DriverDashboard;
