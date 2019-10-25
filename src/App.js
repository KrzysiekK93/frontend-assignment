import React, { useEffect, useState } from 'react';
import Content from './components/content/Content';
import { Grid, Container, Hidden  } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function App() {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState();
    const [state, setState] = React.useState({
        fashion: true,
        sport: true,
      });
    
    const handleChange = (name) => (event) => {
        setState({ ...state, [name]: event.target.checked });
    };

    const handleSortUp = () => {
        const sortData = articles;
        sortData.sort((a,b) => {
            debugger;
            if (a.date > b.date) {
                return -1;
            }
            if (b.date > a.date) {
                return 1;
            }
            return 0;
        })
        setArticles(sortData)
    }

    const handleSortDown = () => {
        const sortData = articles;
        sortData.sort((a,b) => {
            debugger;
            if (a.date < b.date) {
                return -1;
            }
            if (b.date < a.date) {
                return 1;
            }
            return 0;
        })
        setArticles(sortData)
    }

    const fetchSportArticles = fetch("http://localhost:6010/articles/sports").then(response => { 
        return response.json()
    });

    const fetchFashionArticles = fetch("http://localhost:6010/articles/fashion").then(response => {
        return response.json()
    });

    const filterData = () => {
        if (!checkboxes.sport) {
            let fashion = props.data.filter(el => {
                return el.category == 'fashion'
            })
            setFarticles(fashion)
        } else if (!checkboxes.fashion) {
            let sport = props.data.filter(el => {
                return el.category == 'sport'
            })
            setFarticles(sport)
        } else {
          setFarticles(props.data)
        }
      }
    
    useEffect(() => {
        let combinedData = {"sports":{}, "fashion":{}};
        let allArticles = [];
        Promise.all([fetchSportArticles, fetchFashionArticles])
        .then(values => {
            combinedData["sports"] = values[0];
            combinedData["fashion"] = values[1];
            for (let el in combinedData) {
                allArticles.push(...combinedData[el].articles);
            }
            setArticles(allArticles);
            return allArticles;
        })
        .catch(error => {
            console.log(error);
            setError(error)
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
                    <Content data={articles} state={state} error={error}/>
                </Grid>
            </Grid>
        </Container>
    )
}