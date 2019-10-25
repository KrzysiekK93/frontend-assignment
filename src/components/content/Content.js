import React, { useEffect, useState } from 'react';
import List from './List';

export default function Content(props) {
  const [contentState, setContentState] = useState([]);
  const sortFn = () => {
    if (props.sortUp === true && props.sortDown === false) {
      handleSortUp();
    } else if (props.sortUp === false && props.sortDown === true) {
      handleSortDown();
    } else {
      return;
    }
  }

  const handleSortUp = () => {
    let sortData = contentState;
    contentState.sort((a,b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    })
    setContentState(sortData)
  }

  const handleSortDown = () => {
    let sortData = contentState;
    sortData.sort((a,b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    setContentState(sortData)
  }

  useEffect(() => {
    setContentState(props.data)
    sortFn();
  }, [props]);

  return (
    <div>
      <List data={contentState} state={props.state} isLoading={props.isLoading} isError={props.isError}/>
    </div>
  )
};