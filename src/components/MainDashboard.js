import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import { MeetingsList } from './MeetingsList';
import { AvailableSlotsCalendar } from './AvailableSlotsCalendar';
import { UsersList } from './UsersList';

export const MainDashboard = () => {
  const userId = "1"; // Replace with auth context

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Left Container: Meetings List and Available Slots Calendar */}
        <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
          <Box>
            <MeetingsList userId={userId} />
            <Box mt={3}>
              <AvailableSlotsCalendar userId={userId} />
            </Box>
          </Box>
        </Grid>

        {/* Right Container: User List */}
        <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
          <UsersList  userId={userId}/>
        </Grid>
      </Grid>
    </Container>
  );
};
