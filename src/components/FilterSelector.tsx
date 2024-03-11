import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import {ClearFilterComponent} from "./ClearFilterComponent";

export function FilterSelector(props: {
    filterLabel: string,
    filterName: string,
    filterValues: any[],
    onChange: (event) => void,
    onRemoveFilter: (filterName) => void
}) {
    const [selectedValue, setSelectedValue] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setSelectedValue(event.target.value as string);
    };
    const handleClearMenuValue = () => {
        selectedValue !== "" && setSelectedValue("");
    };
    return (
        <FormControl size="small">
            <Stack direction="row">
                <InputLabel id={props.filterName}>{props.filterLabel}</InputLabel>
                <Select autoWidth
                        sx={{minWidth: 150}}
                        name={props.filterName}
                        id={props.filterName}
                        value={selectedValue}
                        label={props.filterLabel}
                        onChange={e => {
                            handleChange(e);
                            props.onChange(e)
                        }}
                >
                    {props.filterValues.map((value) => (
                        <MenuItem key={value} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
                <Box onClick={handleClearMenuValue}>
                    <ClearFilterComponent filterName={props.filterName} onRemoveFilter={props.onRemoveFilter}
                                          isValueSelected={selectedValue !== ""}/>
                </Box>
            </Stack>
        </FormControl>
    );

}