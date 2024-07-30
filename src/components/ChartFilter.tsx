import {FilterSelector} from "./FilterSelector";
import Box from "@mui/material/Box";
import {LinearProgress} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"
import {useDataContext} from "../DataContext";

function ChartFilter(props: {
    updateFilter: (key: string, value: any) => void,
    removeFilterProperty: (keyToRemove: string) => void
}) {
    const {data, isLoading} = useDataContext();

    const handleInputChange = (event) => {
        props.updateFilter(event.target.name, event.target.value);
    };
    const handleRemoveClick = (filterName: string) => {
        props.removeFilterProperty(filterName);
    };

    return (
        <div>
            {isLoading ? (<Box><h5> Loading... </h5><LinearProgress/></Box>) : (
                <Grid container direction="row" wrap="wrap" spacing={2} sx={{pt: 1}}>
                    <Grid xs="auto">
                        <FilterSelector filterLabel="Arrival City" onChange={handleInputChange}
                                        filterValues={data!.arrivalCities}
                                        onRemoveFilter={handleRemoveClick} filterName="arrivalCity"/>
                    </Grid>
                    <Grid xs="auto">
                        <FilterSelector filterLabel="Departure City" onChange={handleInputChange}
                                        filterValues={data!.departureCities}
                                        onRemoveFilter={handleRemoveClick} filterName="departureCity"/>
                    </Grid>
                    <Grid xs="auto">
                        <FilterSelector filterLabel="Country" onChange={handleInputChange}
                                        filterValues={data!.countries}
                                        onRemoveFilter={handleRemoveClick} filterName="country"/>
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

export default ChartFilter;