import React, {useEffect, useState} from 'react';
import Chart from "./components/Chart";
import './App.css';
import FilterComponent from "./components/FilterComponent";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {DateSelector} from "./components/DateSelector";

const defaultTheme = createTheme();

function App() {
    const [locationFilter, setLocationFilter] = useState({});
    const [dateFilter, setDateFilter] = useState({});
    const [totalFilter, setTotalFilter] = useState({});

    useEffect(() => {
        setTotalFilter({$and: [dateFilter, locationFilter]});
    }, [locationFilter, dateFilter]);
    const updateFilter = (key : string, value : object) => {
        setLocationFilter(prevFilter => ({
            ...prevFilter, // Spread existing properties
            [key]: value, // Override or add new property
        }));
    };
    const removeFilterProperty = (keyToRemove : string) => {
        const newFilter = {...locationFilter};
        delete newFilter[keyToRemove];
        setLocationFilter(newFilter);
    };
    const updateDateFilter = (dateFilter : any) => {
        setDateFilter(dateFilter);
    };
    return (
        <ThemeProvider theme={defaultTheme}>
                <Chart height={window.innerHeight - 150} width={window.innerWidth} filter={totalFilter}
                       chartId={'060074e7-5d42-46b0-82a2-1251220eaacd'}/>
                <FilterComponent updateFilter={updateFilter} removeFilterProperty={removeFilterProperty}/>
                <DateSelector updateDateFilter={updateDateFilter}/>
        </ThemeProvider>
    );
}

export default App;
