import React, { useEffect, useState } from 'react';
import Articles from './articles/Articles';

export default function Content(props) {
  const [contentState, setContentState] = useState([]);

  const filterData = () => {
    if (props.state.sport === false && props.state.fashion === true) {
      let fashion = props.data.filter(el => {
          return el.category == 'fashion'
      })
      setContentState(fashion)
    } else if (props.state.fashion === false && props.state.sport === true) {
      let sport = props.data.filter(el => {
          return el.category == 'sport'
      })
      setContentState(sport)
    } else if (props.state.fashion === false && props.state.fashion === false) {
      setContentState([])
    } else {
      setContentState(props.data)
    } 
  }

  useEffect(() => {
    filterData();
  }, [props]);

  return (
    <div>
      <Articles data={contentState} isLoading={props.isLoading} isError={props.isError}/>
    </div>
  )
};