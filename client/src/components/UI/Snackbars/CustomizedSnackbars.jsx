import React, { forwardRef } from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';

import { getAlert } from '../../../redux/features/alertMessageSlice';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ children }) {
  const snackbar = useSelector((state) => state.alertMessage.value);

  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(getAlert({ isOpened: false }));
  };

  return (
    <>
      <Snackbar
        open={snackbar.isOpened}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        key={snackbar.message}
      >
        <Alert onClose={handleClose} severity={snackbar.type} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      {children}
    </>
  );
}
