import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Subscription} from "../models/Itemtypes";
import {DataGrid, GridColDef, GridRowSelectionModel} from '@mui/x-data-grid';
import {subscriptionApiUrl} from "../config";
import {Button} from "@mui/material";
import {SubscriptionForm} from "./SubscriptionForm";
import Box from "@mui/material/Box";

const columns: GridColDef[] = [
    {field: 'arrivalCity', headerName: 'Arrival City', width: 200},
    {field: 'departureCity', headerName: 'Departure City', width: 200},
    {
        field: 'priceThreshold',
        headerName: 'Price',
        type: 'number',
        width: 120,
    },
];

export function SubscriptionManager(props: { deviceToken: string }) {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        if (props.deviceToken) {
            fetchSubscriptions();
        }
    }, [props.deviceToken]);

    const fetchSubscriptions = async () => {
        try {
            const deviceToken: string = props.deviceToken;
            const response = await axios.get(subscriptionApiUrl, {
                params: {deviceToken}
            });
            setSubscriptions(response.data);
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
        }
    };

    const handleDeleteSubscriptionsByIds = async () => {
        try {
            const params = new URLSearchParams();
            params.append('ids', selectedIds.join(','));
            params.append('deviceToken', props.deviceToken);
            await axios.delete(subscriptionApiUrl, {params});
            setSelectedIds([]);
            fetchSubscriptions();
        } catch (error) {
            console.error('Error deleting subscriptions:', error);
        }
    };

    const handleSubscriptionCreated = () => {
        fetchSubscriptions();
    };

    const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
        setSelectedIds(selectionModel as string[]);
    };

    return (
        <div>
            <SubscriptionForm deviceToken={props.deviceToken} onSubscriptionCreated={handleSubscriptionCreated}/>
            <Box sx={{pt: 2}}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteSubscriptionsByIds()}
                    disabled={selectedIds.length === 0}
                >
                    Delete Selected
                </Button>
                <Box  sx={{pt: 1}}>
                    <DataGrid
                        rows={subscriptions}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {page: 0, pageSize: 5},
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        onRowSelectionModelChange={handleSelectionChange}
                    />
                </Box>
            </Box>
        </div>
    );
}

export default SubscriptionManager;