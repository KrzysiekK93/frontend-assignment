import React, { useEffect, useState } from 'react';
import Content from './components/content/Content';
import { Grid, Container, Hidden, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';

export default function App() {
    const [articles, setArticles] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [sortUp, setSortUp] = useState(false);
    const [sortDown, setSortDown] = useState(false);
    const [state, setState] = useState({
        fashion: true,
        sport: true,
    });
    const [isData, setIsData] = useState(false);
    const dataSpec = [
      {"januar": "January"},
      {"februar": "February"},
      {"oktober": "October"},
      {"mai": "May"},
      {"september": "September"},
      {"desember": "December"},
      {"november": "November"},
    ]
    
    const handleChange = (name) => (event) => {
        setState({ ...state, [name]: event.target.checked });
    };

    const handleSortUp = () => {
        setSortUp(true);
        setSortDown(false);
    }

    const handleSortDown = () => {
        setSortDown(true);
        setSortUp(false);
    }

    const fetchSportArticles = fetch("http://localhost:6010/articles/sports").then(response => { 
        return response.json()
    });

    const fetchFashionArticles = fetch("http://localhost:6010/articles/fashion").then(response => {
        return response.json()
    });

    const prepareData = (param) => {
        if (param && param.length > 0 && !isData){
          setIsData(true);
          param.forEach(item => {
            let date = item.date.split(" ");
            let month = date[1];
            let monthEng = dataSpec.filter(el => {
              return el[month];
            })[0][month];
            return item.date = `${date[0]} ${monthEng} ${date[2]}`;
          })
          return param;
        }
      }

    useEffect(() => {
        let combinedData = {"sports":{}, "fashion":{}};
        let allArticles = [];
        setIsLoading(true);
        Promise.all([fetchSportArticles, fetchFashionArticles])
        .then(values => {
            combinedData["sports"] = values[0];
            combinedData["fashion"] = values[1];
            for (let el in combinedData) {
                allArticles.push(...combinedData[el].articles);
            }
            return allArticles;
        })
        .then(data => {
            setArticles(prepareData(data));
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error);
            setIsError(true)
        });
    }, []);

    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Hidden xsDown>
                    <Grid item xs={12} sm={12} md={12} lg={12} className="d-flex justify-end">
                        <h4>Sort by date</h4>
                        <span className="sort-wrapper">
                            <div className="up" onClick={handleSortUp}></div>
                            <div className="down" onClick={handleSortDown}></div>
                        </span>
                    </Grid>
                </Hidden>

                <Grid item xs={12} sm={12} md={2} lg={2}>
                    <div className="d-flex justyfy-sb-sm">
                        <h4>Data sources</h4>
                        <Hidden smUp>
                            <div className="d-flex">
                                <h4>Sort by date</h4>
                                <span className="sort-wrapper">
                                    <div className="up" onClick={handleSortUp}></div>
                                    <div className="down" onClick={handleSortDown}></div>
                                </span>
                            </div>
                        </Hidden>
                    </div>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                            <Checkbox 
                                checked={state.fashion} 
                                onChange={handleChange('fashion')} 
                                value="fashion" />
                            }
                            label="Fashion"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={state.sport}
                                onChange={handleChange('sport')}
                                value="sport"
                            />
                            }
                            label="Sport"
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={12} md={10} lg={10}>
                    <Content data={articles} state={state} isLoading={isLoading} isError={isError} sortUp={sortUp} sortDown={sortDown}/>
                </Grid>
            </Grid>
        </Container>
    )
}