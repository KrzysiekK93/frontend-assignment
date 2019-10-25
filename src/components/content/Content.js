import React from 'react';
import { Hidden  } from '@material-ui/core';

const Content = (props) => {
  const renderData = () => props.data.map(item => {
    const style = {
      backgroundImage: `url(${item.image})`
    };
    return (
        <article key={item.id} className="article">
          <div className="photo" style={style}>
            {/* Originally I wanted to use img but for visual reasons I decided on background-image */}
          </div>
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
        {renderData()}
    </div>
  )
};

export default Content;