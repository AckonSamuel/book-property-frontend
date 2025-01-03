import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Event } from '@mui/icons-material';
import { API_CONFIG } from '../config/api';
import { AvailableSlotsCalendar } from './AvailableSlotsCalendar';
import { timezones } from '../utils/timezone';
import axios from 'axios';

export const UsersList = ({ userId }) => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [meetingDetails, setMeetingDetails] = useState({
    title: '',
    date: '',
    slot_id: '',
    user_id: userId,
    participant: '',
    timezone: '',
    description: '',
  });
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/users`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        const filteredUsers = data.users.filter(user => user.user_id !== userId); setUsers(filteredUsers || []);
        setUsers(filteredUsers || []);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
    setMeetingDetails({
      title: '',
      date: '',
      slot_id: '',
      user_id: userId,
      participant: user.user_id,
      timezone: '',
      description: '',
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setMeetingDetails({
      title: '',
      date: '',
      slot_id: '',
      user_id: userId,
      participant: '',
      timezone: '',
      description: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCreateMeeting = async () => {
    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}/meetings`, {
        ...meetingDetails,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 201) {
        throw new Error('Failed to create meeting');
      }

      // Handle successful meeting creation (e.g., show a success message or refresh the list)
      handleCloseDialog();
      window.location.reload();
    } catch (error) {
      console.error('Failed to create meeting:', error);
    }
  };


  const handleSlotSelect = (slotData) => {
    setMeetingDetails((prevData) => ({
      ...prevData,
      slot_id: slotData.slotId,
      date: slotData.date
    }));
    setSelectedSlot(slotData);
  };

  return (
    <Paper className="p-6 bg-gray-100 shadow-md">
      <Typography variant="h6" className="text-gray-800 font-semibold mb-4">
        Available Users
      </Typography>
      <Typography variant="p" className="text-gray-800 font-semibold mb-4">
        Click on the calender icon on each user to create a meeting
      </Typography>
      <List className="space-y-4">
        {users.map((user) => (
          <ListItem
            key={user.user_id}
            className="bg-white shadow-sm rounded-lg border border-gray-200"
          >
            <ListItemText
              primary={
                <Typography variant="h6" className="text-blue-600 mb-1">
                  {user.name}
                </Typography>
              }
              secondary={
                <div className="text-gray-600">
                  <Typography variant="body2">Email: {user.email}</Typography>
                  <Typography variant="body2" className="font-medium mt-2">
                    Available Days:
                  </Typography>
                  <ul className="list-disc list-inside">
                    {user.available_days.map((day, index) => (
                      <li key={index}>{day}</li>
                    ))}
                  </ul>
                  <Typography variant="body2" className="mt-2">
                    Work Hours: {user.work_hours.start} - {user.work_hours.end}
                  </Typography>
                </div>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                className="text-blue-600 hover:text-blue-800"
                onClick={() => handleOpenDialog(user)}
              >
                <Event />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Create New Meeting {selectedUser && ('with ' + selectedUser.name)}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Meeting Title"
                name="title"
                value={meetingDetails.title}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                name="description"
                value={meetingDetails.description}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                multiline
                rows={8} // Adjust the number of rows as needed
              />

            </Grid>
            <Grid item xs={12} md={6} sx={{ marginTop: 1 }}>
              <FormControl fullWidth margin="dense" sx={{ marginBottom: 3 }}>
                <InputLabel id="timezone-label">Timezone</InputLabel>
                <Select
                  labelId="timezone-label"
                  name="timezone"
                  value={meetingDetails.timezone}
                  onChange={handleInputChange}
                  label="Timezone"
                >
                  {timezones.map((timezone) => (
                    <MenuItem key={timezone.value} value={timezone.value}>
                      {timezone.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <AvailableSlotsCalendar userId={meetingDetails?.participant} onSlotSelect={handleSlotSelect} selectedSlot={selectedSlot} timezone={meetingDetails.timezone} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateMeeting} color="primary">
            Create Meeting
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
