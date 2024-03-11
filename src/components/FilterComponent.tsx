import React, {useEffect, useState} from "react";
import {FilterSelector} from "./FilterSelector";
import Stack from "@mui/material/Stack";

const chartDataServiceURI = process.env.REACT_APP_CHART_DATA_URI;

function FilterComponent(props: {
    updateFilter: (key, value) => void,
    removeFilterProperty: (keyToRemove) => void
}) {
    const [arrivalCities, setArrivalCities] = useState([]);
    const [departureCities, setDepartureCities] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch(chartDataServiceURI + 'fetchArrivalCities')
            .then(response => response.json())
            .then(data => setArrivalCities(data))
            .catch((error) => console.log("Error fetching chart data from ", chartDataServiceURI, error));
        fetch(chartDataServiceURI + 'fetchDepartureCities')
            .then(response => response.json())
            .then(data => setDepartureCities(data));
        fetch(chartDataServiceURI + 'fetchCountries')
            .then(response => response.json())
            .then(data => setCountries(data));
    }, []);

    const handleInputChange = (event) => {
        props.updateFilter(event.target.name, event.target.value);
    };
    const handleRemoveClick = (filterName) => {
        props.removeFilterProperty(filterName);
    };

    return (
        <Stack direction="row" spacing={2} sx={{pl: 2}}>
            <FilterSelector filterLabel="Arrival City" onChange={handleInputChange} filterValues={arrivalCities}
                            onRemoveFilter={handleRemoveClick} filterName="arrivalCity"/>
            <FilterSelector filterLabel="Departure City" onChange={handleInputChange} filterValues={departureCities}
                            onRemoveFilter={handleRemoveClick} filterName="departureCity"/>
            <FilterSelector filterLabel="Country" onChange={handleInputChange} filterValues={countries}
                            onRemoveFilter={handleRemoveClick} filterName="country"/>
        </Stack>
    );
}

export default FilterComponent;