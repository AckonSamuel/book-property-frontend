// CreateMeetingForm.js
import React, { useState } from 'react';
import {
  Paper, TextField, Button, Grid, FormControl,
  InputLabel, Select
} from '@mui/material';
import { API_CONFIG } from '../config/api';

export const CreateMeetingForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    slot_id: '',
    start_time: '',
    end_time: '',
    duration: 30,
    participant: '',
    user_id: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/meetings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Time Slot</InputLabel>
              <Select
                value={formData.slot_id}
                onChange={(e) => setFormData({ ...formData, slot_id: e.target.value })}
              >
                {/* Populate with available slots */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Participant Email"
              type="email"
              value={formData.participant}
              onChange={(e) => setFormData({ ...formData, participant: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Create Meeting
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};