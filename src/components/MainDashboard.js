import React, { useState } from 'react';
import {
  Card, Box, Typography, Dialog,
  DialogActions, DialogContent, CardContent, Grid,
  DialogTitle, TextField, Paper, FormGroup, FormControlLabel, Checkbox, Button, MenuItem, Select, FormControl, InputLabel, ImageList, ImageListItem
} from '@mui/material';
import 'react-multi-carousel/lib/styles.css';
import Review from './review/Review';

const FjApartApartmentIntro = () => {
  const checkboxesData = [
    { label: 'Executive Stays', defaultChecked: true, required: false, disabled: false, color: 'red-500' },
    { label: 'Affordable Stays', defaultChecked: true, required: false, disabled: false, color: 'green-500' },
    { label: 'Work Stays', defaultChecked: true, required: false, disabled: false, color: 'gray-400' }
  ];

  const reviews = [
    [
      {
        name: "Random Name #1",
        description: "Probably the most random thing you have ever seen!"
      },
      {
        name: "Random Name #2",
        description: "Hello World!"
      },
      {
        name: "Random Name #3",
        description: "Another random thing!"
      }
    ]
  ]
  const scheckboxesData = [
    { label: 'Executive Stays', defaultChecked: true, required: false, disabled: false, color: 'red-500' },
    { label: 'Affordable Stays', defaultChecked: true, required: false, disabled: false, color: 'green-500' },
    { label: 'Work Stays', defaultChecked: true, required: false, disabled: false, color: 'gray-400' }
  ];
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4
    }
  };
  return (
    <div className="w-full">

      <Typography variant="h6" className="font-bold">
        Fjord Apartments
      </Typography>
      <Typography variant="p" className="text-sm">
        The Forge serviced Apartments are fully furnished short term stays, catering to business travellers, leisure travellers and professional contractors
        seeking flexible, home-like accomodations. Apartments are in high-demand areas, offering amenities like kitchens, Wi-Fi and all kitchen essentials, making them a convenient alternative to hotels.
      </Typography>
      <div className="flex space-x-4 mt-8 justify-center">
        <FormGroup row>
          {
            checkboxesData.map((checkbox, index) => (
              <FormControlLabel key={index} control={
                <Checkbox
                  readOnly
                  checked
                  className={`w-4 h-4 text-${checkbox.color}`}
                  style={{ transform: 'scale(0.8)' }} />}
                label={<span className="text-sm text-${checkbox.color}">
                  {checkbox.label
                  }</span>} />))
          }
        </FormGroup>
      </div>
      <div className="flex space-x-4 mt-4 mb-8 justify-center">
        <FormGroup row>
          {
            scheckboxesData.map((checkbox, index) => (
              <FormControlLabel key={index} control={
                <Checkbox
                  readOnly
                  checked
                  className={`w-4 h-4 text-${checkbox.color}`}
                  style={{ transform: 'scale(0.8)' }} />}
                label={<span className="text-sm text-${checkbox.color}">
                  {checkbox.label
                  }</span>} />))
          }
        </FormGroup>
      </div>

      <Typography variant="body1" className="text-md text-center mb-8 font-bold">
        See what Previous guests are saying
      </Typography>

       <Review />
    </div>
  )
};

const BookingForm = () => (
  <Box className="space-y-4 p-4">
    <Typography variant="h6" className="font-bold">Book Now</Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          select
          fullWidth
          variant="outlined"
          label="Select Property"
          className="py-2"
        >
          <MenuItem value="Property 1">Property 1</MenuItem>
          <MenuItem value="Property 2">Property 2</MenuItem>
          <MenuItem value="Property 3">Property 3</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          select
          fullWidth
          variant="outlined"
          label="Select Add-Ons"
          className="py-2"
        >
          <MenuItem value="Add-On 1">Add-On 1</MenuItem>
          <MenuItem value="Add-On 2">Add-On 2</MenuItem>
          <MenuItem value="Add-On 3">Add-On 3</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="Number of Guests"
          type="number"
          className="py-2"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          select
          fullWidth
          variant="outlined"
          label="Include Kids?"
          className="py-2"
        >
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="Check-in Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          className="py-2"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="Check-out Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          className="py-2"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="Cost of Stay"
          type="number"
          className="py-2"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="Add-Ons Cost"
          type="number"
          className="py-2"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="Additional Details"
          multiline
          rows={1}
          className="py-2"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="Total Cost"
          multiline
          readOnly
          value={400}
          rows={1}
          className="py-2"
        />
      </Grid>
    </Grid>
  </Box>
);


// Component: Payment Gateway
const PaymentGateway = () => (
  <Box className="flex flex-col items-center h-screen">
    <Typography variant="h4" className="font-bold mb-4">Payment Gateway UI</Typography>
  </Box>
);

// Component: Payment Confirmation
const PaymentConfirmation = () => (
  <Box className="flex flex-col items-center justify-center h-screen text-center">
    <Typography variant="h4" className="font-bold mb-4">Payment Confirmation</Typography>
    <Typography className="mb-4">Your Payment is Successful!</Typography>
    <Typography className="text-gray-600 mb-6">
      Your payment will proceed in 30 mins. If any problem arises, please chat with our customer service.
    </Typography>
    <div className="space-x-4">
      <Button variant="outlined" className="px-6 py-2">Check Details</Button>
      <Button variant="contained" className="bg-black text-white px-6 py-2">Close</Button>
    </div>
  </Box>
);

// Main Component

const BookingModal = () => {
  const [step, setStep] = useState(0);

  const modalView = [
    <FjApartApartmentIntro />,
    <BookingForm />,
    <PaymentGateway />,
    <PaymentConfirmation />
  ];

  const buttonLabels = [
    "Book Now",
    "Next",
    "Pay"
  ];

  const handleNext = () => {
    if (step < modalView.length - 1) {
      setStep(step + 1);
    }
  };

  const itemData = [
    {
      img: 'https://tse3.mm.bing.net/th?id=OIP.KuLCWOY1aj-kplQuqWiMuAHaE8&pid=Api',
      title: 'Breakfast',
    },
    {
      img: 'https://tse4.mm.bing.net/th?id=OIP.EBz1Pcpw1AD0pNFACwtTXgHaEc&pid=Api',
      title: 'Burger',
    },
    {
      img: 'https://tse2.mm.bing.net/th?id=OIP.kMv6A0yW71j3z1tRpWxXjgHaE6&pid=Api',
      title: 'Camera',
    },
    {
      img: 'https://tse3.mm.bing.net/th?id=OIP.j2jDyhBI5sbjtVYudRptlgHaFj&pid=Api',
      title: 'Coffee',
    },
  ];

  return (
    <Box className="p-4">
      <Box className="p-4">
        <Dialog open={true} maxWidth="lg" fullWidth>
          <DialogTitle></DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <ImageList cols={2} rowHeight={150} sx={{ gap: 2, marginTop: 4 }}>
                  {itemData.map((item) => (
                    <ImageListItem key={item.img} sx={{ marginTop: 2 }}>
                      <img
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                        style={{ width: '185px', height: '185px', borderRadius: '12px' }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
              <Grid item xs={12} md={7} className="h-96 overflow-auto" sx={{ marginTop: 1 }}>
                {modalView[step]}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button sx={{ background: 'black', color: 'white', marginRight: 30, }} onClick={handleNext}>
              {buttonLabels[step]}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default BookingModal;
