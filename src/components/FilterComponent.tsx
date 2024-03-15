import React, {useEffect, useState} from "react";
import {FilterSelector} from "./FilterSelector";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {LinearProgress} from "@mui/material";

const chartDataServiceURI = process.env.REACT_APP_CHART_DATA_URI || "https://mongo-chart-fields-service.onrender.com/";

function FilterComponent(props: {
    updateFilter: (key: string, value: any) => void,
    removeFilterProperty: (keyToRemove: string) => void
}) {
    const [arrivalCities, setArrivalCities] = useState([]);
    const [departureCities, setDepartureCities] = useState([]);
    const [countries, setCountries] = useState([]);
    const [loadingFilters, setLoadingFilters] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(chartDataServiceURI);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
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
                setLoadingFilters(false);
            } catch (error) {
                setTimeout(fetchData, 5000); // Retry after 5 seconds
            }
        };
        fetchData().then(() => console.log("Fetching data from ", chartDataServiceURI));
    }, []);

    const handleInputChange = (event) => {
        props.updateFilter(event.target.name, event.target.value);
    };
    const handleRemoveClick = (filterName) => {
        props.removeFilterProperty(filterName);
    };

    return (
        <div>
            { loadingFilters ? (<Box sx={{pl: 2, pr: 2}}><h5> Loading filters... </h5><LinearProgress/></Box>) : (
                <Stack direction="row" spacing={2} sx={{pl: 2}}>
                        <FilterSelector filterLabel="Arrival City" onChange={handleInputChange}
                                        filterValues={arrivalCities}
                                        onRemoveFilter={handleRemoveClick} filterName="arrivalCity"/>
                        <FilterSelector filterLabel="Departure City" onChange={handleInputChange}
                                        filterValues={departureCities}
                                        onRemoveFilter={handleRemoveClick} filterName="departureCity"/>
                        <FilterSelector filterLabel="Country" onChange={handleInputChange} filterValues={countries}
                                        onRemoveFilter={handleRemoveClick} filterName="country"/>
                    </Stack>
            )}
        </div>
    );
}

export default FilterComponent;