import React, { useState, useEffect } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Typography, Dialog,
  DialogActions, DialogContent, DialogContentText,
  DialogTitle, TextField, Button, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { API_CONFIG } from '../config/api';
import axios from 'axios';
import { AvailableSlotsCalendar } from './AvailableSlotsCalendar';
import { timezones } from '../utils/timezone';

export const MeetingsList = ({ userId }) => {
  const [meetings, setMeetings] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    date: '',
    slot_id: '',
    user_id: userId,
    participant: '',
    timezone: '',
    description: ''
  });

  const fetchMeetings = async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/users/${userId}/meetings`);
    const data = await response.json();
    setMeetings(data.meetings);
  };

  useEffect(() => {
    fetchMeetings();
  }, [userId]);

  const handleOpenEdit = (meeting) => {
    setSelectedMeeting(meeting);
    setFormData({
      id: meeting.id,
      title: meeting.title,
      date: meeting.date,
      slot_id: meeting.slot_id,
      user_id: meeting.user_id,
      participant: meeting.participant,
      timezone: meeting.timezone,
      description: meeting.description
    });
    setSelectedSlot({ slotId: meeting.slot_id, date: meeting.date });
    setOpenEdit(true);
  };

  const handleSlotSelect = (slotData) => {
    setFormData((prevData) => ({
      ...prevData,
      slot_id: slotData.slotId,
      date: slotData.date
    }));
    setSelectedSlot(slotData);
  };

  const handleOpenDelete = (meeting) => {
    setSelectedMeeting(meeting);
    setOpenDelete(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleEditSubmit = async () => {
    const updatedMeeting = {
      ...formData,
      user_id: selectedMeeting.organizer_id,
      date: new Date(formData.date).toISOString().split('T')[0],
    };
  
    try {
      const res = await axios.put(`${API_CONFIG.BASE_URL}/meetings/${selectedMeeting.id}`, updatedMeeting);
      
      if (res.status === 200) {
        console.log("Meeting updated successfully");
        // Here you can handle the response as needed, for example:
        // - updating the state with the new meeting details
        // - notifying the user of the successful update
      } else {
        console.log("Failed to update meeting");
        // Handle any non-success response status here
      }
    } catch (error) {
      console.error("Error updating meeting:", error);
      // Handle the error here, for example:
      // - displaying an error message to the user
    }
  
    console.log(updatedMeeting);
    // Perform any additional actions after the API call, for example:
    setOpenEdit(false); // Close the edit modal
    fetchMeetings(); // Refresh the list of meetings
  };
  

  const handleDeleteSubmit = async () => {
    try {
      const res = await axios.delete(`${API_CONFIG.BASE_URL}/meetings/${selectedMeeting.id}`);
      
      if (res.status === 200) {
        console.log("Meeting delted successfully");
        // Here you can handle the response as needed, for example:
        // - updating the state with the new meeting details
        // - notifying the user of the successful update
      } else {
        console.log("Failed to delete meeting");
        // Handle any non-success response status here
      }
    } catch (error) {
      console.error("Error updating meeting:", error);
      // Handle the error here, for example:
      // - displaying an error message to the user
    }
    setOpenDelete(false);
    fetchMeetings(); // Refresh the list of meetings
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <TableContainer component={Paper} className="shadow-md rounded-lg overflow-hidden">
      <Typography variant="h6" className="p-4 bg-blue-600 text-white">Your Meetings</Typography>
      <Table>
        <TableHead className="bg-gray-100">
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Time Zone</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Participant</TableCell>
            <TableCell>Organizer</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meetings.map((meeting) => (
            <TableRow key={meeting.id} className="hover:bg-gray-100">
              <TableCell>{meeting.title}</TableCell>
              <TableCell>{new Date(meeting.date).toLocaleDateString()}</TableCell>
              <TableCell>{`${meeting.start_time} - ${meeting.end_time}`}</TableCell>
              <TableCell>{meeting.timezone}</TableCell>
              <TableCell>{`${meeting.duration} mins`}</TableCell>
              <TableCell>{meeting.participant_name}</TableCell>
              <TableCell>{meeting.organizer_name}</TableCell>
              <TableCell>{meeting.description}</TableCell>
              <TableCell>
                <IconButton size="small" className="text-blue-600 hover:text-blue-800" onClick={() => handleOpenEdit(meeting)}><Edit /></IconButton>
                <IconButton size="small" className="text-red-600 hover:text-red-800" onClick={() => handleOpenDelete(meeting)}><Delete /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Meeting</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please update the meeting details.
          </DialogContentText>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={formData.title}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="timezone-label">Timezone</InputLabel>
            <Select
              labelId="timezone-label"
              name="timezone"
              value={formData.timezone}
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
          <AvailableSlotsCalendar userId={formData.participant} onSlotSelect={handleSlotSelect} selectedSlot={selectedSlot} timezone={formData.timezone}/>
          
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={formData.description}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Meeting</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the meeting "{selectedMeeting?.title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteSubmit} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};
