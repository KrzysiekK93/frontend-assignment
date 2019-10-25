import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loader() {
  return (
    <div className="text-center">
      <CircularProgress color="secondary" />
    </div>
  );
}