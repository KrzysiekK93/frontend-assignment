import React from 'react';
import { Hidden  } from '@material-ui/core';
import Loader from '../../../shared/Loader';

const Content = (props) => {
  const renderData = () => props.data.map(item => {
    const style = {
      backgroundImage: `url(${item.image})`
    };
    return (
        <article key={item.id} className="article">
          {item.image ? (
            <div className="photo" style={style}>
              {/* Originally I wanted to use img but for visual reasons I decided on background-image */}
            </div>
          ) : (
            <div className="photo">
              <p>No photo</p>
            </div>
          )}
          
          <div className="content">
            <header>
              <h2>{item.title}</h2>
              <p>{item.date}</p>
            </header>
            {/* I used ready-made solutions to hide elements on the page provided by mateialUi */}
            <Hidden smDown>
              <p>{item.preamble}</p>
            </Hidden>
          </div>
        </article>
        )
      }
  );

  return (
    <div>
        {props.isError && <p className="error-title">Something went wrong, please try reload the page</p>}
        {props.isLoading ? (
        <Loader />
        ) : (
            renderData()
        )}
    </div>
  )
};

export default Content;