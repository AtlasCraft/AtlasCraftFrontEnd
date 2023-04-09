import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid';

export default function EditScreen() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': {
              m: 1,
              width: '85vw',
              background: 'white',
            },
          }}
          noValidate
          autoComplete="off"
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <TextField id="mapname" label="Name" variant="filled" hiddenLabel />
            <Button
              variant="contained"
              href="#"
              sx={{
                'align-self': 'center',
              }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              href="#"
              sx={{ 'align-self': 'center' }}
            >
              Download
            </Button>
          </Stack>
        </Box>
      </div>
      <div style={{ height: '75vh' }}>
        <Stack direction="row" height="100%">
          <div
            style={{
              width: '75%',
              background: 'gray',
              height: '100%',
            }}
          >
            Map
          </div>
          <div style={{ width: '25%', background: 'white' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="Edit Tabs">
                  <Tab label="Edit" value="1" />
                  <Tab label="Properties" value="2" />
                  <Tab label="Upload" value="3" />
                  <Tab label="Help" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box sx={{ width: '100%' }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6}>
                      <p>1</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p>2</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p>3</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p>4</p>
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>
              <TabPanel value="2">Item Two</TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
          </div>
        </Stack>
      </div>
      <div>
        <Stack
          direction="row"
          height="100%"
          justifyContent="space-between"
          style={{ background: 'rgb(192,192,192)' }}
        >
          <p>Comments</p>
          <Button variant="contained" href="#" sx={{ 'align-self': 'center' }}>
            View
          </Button>
        </Stack>
      </div>
    </div>
  );
}
