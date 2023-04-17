import { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import AuthContext from '../auth';
import { GlobalStoreContext } from '../store';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ErrorModal() {
  const { store } = useContext(GlobalStoreContext);
  const [open, setOpen] = useState(false);

  console.log('Load Modal');

  useEffect(() => {
    setOpen(store.err != null);
  }, [store.err]);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {store.err}
          </Alert>
          <Typography align="center">
            <Button onClick={store.hideErr}>Close</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
