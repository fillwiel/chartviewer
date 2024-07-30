import {useDataContext} from "../DataContext";
import Box from "@mui/material/Box";
import {Button, LinearProgress, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"
import {FilterSelector} from "./FilterSelector";
import React, {useState} from "react";
import axios from "axios";
import {Subscription} from "../models/Itemtypes";
import {subscriptionApiUrl} from "../config";
import {NumberInput} from "./util/NumberInput";

export function SubscriptionForm(props: {
    deviceToken: string,
    onSubscriptionCreated: () => void
}) {
    const {data, isLoading} = useDataContext();
    const [formData, setFormData] = useState<Subscription>({
        id: '',
        userId: 'guest',
        deviceToken: '',
        arrivalCity: '',
        departureCity: '',
        priceThreshold: null
    });

    const handleInputChange = (event) => {
        updateForm(event.target.name, event.target.value);
    };

    const handleRemoveClick = (filterName: string) => {
        removeFormSelector(filterName);
    };

    const updateForm = (key: string, value: any) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [key]: value,
        }));
    };

    const removeFormSelector = (keyToRemove: string) => {
        const newFilter = {...formData};
        delete newFilter[keyToRemove];
        setFormData(newFilter);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        updateForm('deviceToken', props.deviceToken);
        if (!formData.deviceToken) {
            console.error('Notification token has not been correctly configured for subscription form.');
            return;
        }
        try {
            await axios.post(subscriptionApiUrl, formData);
            props.onSubscriptionCreated();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const isFormValid = () => {
        return props.deviceToken && formData.priceThreshold && formData.priceThreshold > 0 && formData.arrivalCity;
    };

    return (
        <div>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                Subscribe for price drop notification
            </Typography>
            {isLoading ? (
                <Box>
                    <h5>Loading...</h5>
                    <LinearProgress/>
                </Box>
            ) : (
                <Grid container direction="row" wrap="wrap" spacing={2} sx={{pt: 1}}>
                    <Grid xs="auto">
                        <FilterSelector
                            filterLabel="Arrival City"
                            onChange={handleInputChange}
                            filterValues={data!.arrivalCities}
                            onRemoveFilter={handleRemoveClick}
                            filterName="arrivalCity"
                            required
                        />
                    </Grid>
                    <Grid xs="auto">
                        <FilterSelector
                            filterLabel="Departure City"
                            onChange={handleInputChange}
                            filterValues={data!.departureCities}
                            onRemoveFilter={handleRemoveClick}
                            filterName="departureCity"
                        />
                    </Grid>
                    <Grid xs="auto">
                        <NumberInput
                            aria-label="Price threshold input"
                            placeholder="Notify when price drops below..."
                            value={formData.priceThreshold}
                            onChange={(event, val) => updateForm('priceThreshold', val)}
                            required
                        />
                    </Grid>
                    <Grid xs="auto">
                        <Button onClick={handleSubmit} type="submit" variant="contained" color="primary"
                                disabled={!isFormValid()}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            )}
        </div>
    );
}