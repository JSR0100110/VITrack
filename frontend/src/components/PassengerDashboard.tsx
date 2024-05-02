import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { IPassenger, PassengerStatus } from '../types';
import { updatePassengerStatus } from '../api';

type Props = {
  passengerData: IPassenger;
  setPassengerData: any;
};
const statusDisplayName: Record<PassengerStatus, string> = {
  [PassengerStatus.driverAssociateAssigned]: 'Driver Assigned',
  [PassengerStatus.pickupLocationReached]: 'Reached Pick up location',
  [PassengerStatus.dropLocationReached]: 'Reached Drop location',
  [PassengerStatus.transporting]: 'Transporting',
  [PassengerStatus.dropped]: 'Dropped',
  [PassengerStatus.requested]: 'Requested',
  [PassengerStatus.cancelled]: 'Cancelled',
};

type UpdateAction = {
  actionName: string;
  statusToUpdate: PassengerStatus;
};

const PassengerDashboard = (props: Props) => {
  const { passengerData: passengerData, setPassengerData: setPassengerData } = props;
  // Function to determine the next status action based on current status
  const updateAction = (): UpdateAction => {
    const currentStatus: PassengerStatus = passengerData.status;
    const pickupLocationReached = {
      actionName: statusDisplayName[PassengerStatus.pickupLocationReached],
      statusToUpdate: PassengerStatus.pickupLocationReached,
    };
    const transporting = {
      actionName: statusDisplayName[PassengerStatus.transporting],
      statusToUpdate: PassengerStatus.transporting,
    };
    const dropLocationReached = {
      actionName: statusDisplayName[PassengerStatus.dropLocationReached],
      statusToUpdate: PassengerStatus.dropLocationReached,
    };
    const dropped = {
      actionName: statusDisplayName[PassengerStatus.dropped],
      statusToUpdate: PassengerStatus.dropped,
    };
    let returnObj: UpdateAction;
    switch (currentStatus) {
      case PassengerStatus.driverAssociateAssigned:
        returnObj = pickupLocationReached;
        break;
      case PassengerStatus.pickupLocationReached:
        returnObj = transporting;
        break;
      case PassengerStatus.transporting:
        returnObj = dropLocationReached;
        break;
      case PassengerStatus.dropLocationReached:
        returnObj = dropped;
        break;
      default:
        returnObj = dropped;
        break;
    }
    return returnObj;
  };

  const onPassengerStatusUpdate = async (statusToUpdate: PassengerStatus) => {
    const updatedPassengerData = await updatePassengerStatus(
      passengerData._id,
      statusToUpdate
    );
    setPassengerData(updatedPassengerData.data);
  };
  return (
    <>
      {passengerData._id ? (
        <div>
          <div
            style={{
              padding: '20px 40px',
            }}
          >
            <Card>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  Passenger details
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  <Stack spacing={0.5}>
                    {/* <Typography variant='body1'>
                      <strong>Id</strong>: {passengerData?._id}
                    </Typography> */}
                    <Typography variant='body1'>
                      <strong>
                        Status: {statusDisplayName[passengerData.status]}
                      </strong>
                    </Typography>
                  </Stack>
                  <Divider />
                </Box>
              </CardContent>
            </Card>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '10px',
            }}
          >
            <Button
              variant='contained'
              size='large'
              onClick={async () => {
                await onPassengerStatusUpdate(updateAction().statusToUpdate);
              }}
            >
              {updateAction().actionName}
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default PassengerDashboard;
