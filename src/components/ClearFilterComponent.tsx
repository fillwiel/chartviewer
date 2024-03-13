import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export function ClearFilterComponent(props: {
    isValueSelected: boolean,
    filterName: string,
    onRemoveFilter: (filterName: any) => void
}) {
    function ClearFilterButton() {
        if (props.isValueSelected) {
            return (
                <IconButton aria-label="delete" name={props.filterName}
                            onClick={() => {
                                props.onRemoveFilter(props.filterName)
                            }}>
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
        <ClearFilterButton/>
    );

}