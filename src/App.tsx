import React, {useEffect, useState} from 'react';
import Chart from "./components/Chart";
import './App.css';
import {DataProvider} from './DataContext';
import ChartFilter from "./components/ChartFilter";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {DateSelector} from "./components/DateSelector";
import {Paper, Typography} from "@mui/material";

const defaultTheme = createTheme();

const useChartFilter = (locationFilter: object, dateFilter: object) => {
    const [chartFilter, setChartFilter] = useState<object>({});

    useEffect(() => {
        setChartFilter({$and: [dateFilter, locationFilter]});
    }, [locationFilter, dateFilter]);

    return chartFilter;
};

function App() {
    const [locationFilter, setLocationFilter] = useState({});
    const [dateFilter, setDateFilter] = useState({});
    const chartFilter = useChartFilter(locationFilter, dateFilter);

    const updateFilter = (key: string, value: object) => {
        setLocationFilter(prevFilter => ({
            ...prevFilter,
            [key]: value,
        }));
    };
    const removeFilterProperty = (keyToRemove: string) => {
        const newFilter = {...locationFilter};
        delete newFilter[keyToRemove];
        setLocationFilter(newFilter);
    };
    const updateDateFilter = (dateFilter: object) => {
        setDateFilter(dateFilter);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Chart height={window.innerHeight - 150} width={window.innerWidth} filter={chartFilter}
                   chartId={'060074e7-5d42-46b0-82a2-1251220eaacd'}/>
            <DataProvider>
                <Paper elevation={4} sx={{m: 1, p: 2}}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Filter flights
                    </Typography>
                    <ChartFilter updateFilter={updateFilter} removeFilterProperty={removeFilterProperty}/>
                    <DateSelector updateDateFilter={updateDateFilter}/>
                </Paper>
            </DataProvider>
        </ThemeProvider>
    );
}

export default App;