import React, { useState, useEffect } from 'react';
import {
  Grid, Card, CardContent, Button, 
} from '@mui/material';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { API_CONFIG } from '../config/api';

export const AvailableSlotsCalendar = ({ userId, onSlotSelect, selectedSlot, timezone }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    const workingdate = selectedDate ? selectedDate : selectedSlot?.date;
    console.log(selectedDate, userId, selectedSlot, timezone);
    if (workingdate) {
      const fetchSlots = async () => {
        const dateObj = new Date(workingdate);  // Ensure workingdate is a Date object
        const date = dateObj.toISOString().split('T')[0];
        let url = `${API_CONFIG.BASE_URL}/users/${userId}/available-slots?start_date=${date}&end_date=${date}`;
  
        if (timezone) {
          url += `&timezone=${timezone}`;
        }
  
        const response = await fetch(url);
        const data = await response.json();
        setAvailability(data.availability);
      };
      fetchSlots();
    }
  }, [selectedDate, userId, selectedSlot?.date, timezone]);
  
  const handleSlotSelect = (slot, date) => {
    onSlotSelect({ slotId: slot.id, date });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DatePicker
          label="Select Date"
          defaultValue={selectedSlot?.date ? dayjs(selectedSlot.date) : null}
          value={selectedDate}
          onChange={(newDate) => {
            console.log(newDate);
            setSelectedDate(newDate);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        {availability.map((day) => (
          <Card key={day.date} sx={{ mt: 2 }}>
            <CardContent>
              <Grid container spacing={1}>
                {day.available_slots.map((slot) => (
                  <Grid item xs={6} md={4} key={slot.id}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => handleSlotSelect(slot, day.date)}
                      style={{
                        backgroundColor: selectedSlot && selectedSlot.slotId === slot.id ? '#1976d2' : 'white',
                        color: selectedSlot && selectedSlot.slotId === slot.id ? 'white' : 'black'
                      }}
                    >
                      {slot.start_time} - {slot.end_time}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
};

