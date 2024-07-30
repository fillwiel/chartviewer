import * as React from 'react';
import {useEffect, useState} from 'react';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

export function DateSelector(props: {
    updateDateFilter: (dateFilter: any) => void
}) {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [dateFilter, setDateFilter] = useState({});

    useEffect(() => {
        if (startDate && endDate) {
            setDateFilter({
                date: {
                    $gt: {$date: startDate},
                    $lte: {$date: endDate}
                }
            });
        } else if (startDate) {
            setDateFilter({
                date: {
                    $gt: {$date: startDate}
                }
            });
        } else if (endDate) {
            setDateFilter({
                date: {
                    $lte: {$date: endDate}
                }
            });
        } else {
            setDateFilter({});
        }
    }, [startDate, endDate]);

    useEffect(() =>
        props.updateDateFilter(dateFilter), [dateFilter, props]);

    const handleStartDateChange = (date) => {
        setStartDate(date ? dayjs(date).toISOString() : "");
    };
    const handleEndDateChange = (date) => {
        setEndDate(date ? dayjs(date).toISOString() : "");
    };
    const handleClearMenuValue = () => {
        setStartDate(null);
        setEndDate(null);
    };

    function ClearFilterButton() {
        const isValueSelected = startDate || endDate;
        if (isValueSelected) {
            return (
                <IconButton aria-label="delete" onClick={handleClearMenuValue}>
                    <DeleteIcon/>
                </IconButton>
            )
        } else {
            return (
                <IconButton aria-label="delete" disabled color="primary">
                    <DeleteIcon/>
                </IconButton>
            )
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction="row" spacing={1} sx={{pt: 1}}>
                <DatePicker sx={{width: 200}} value={startDate} onChange={handleStartDateChange}
                            label="Flight From"
                            format="DD/MM/YYYY" slotProps={{textField: {size: 'small'}}}/>
                <DatePicker sx={{width: 200}} value={endDate} onChange={handleEndDateChange}
                            label="Flight Unil"
                            format="DD/MM/YYYY" slotProps={{textField: {size: 'small'}}}/>
                <ClearFilterButton/>
            </Stack>
        </LocalizationProvider>
    );

}