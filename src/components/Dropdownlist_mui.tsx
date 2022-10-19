import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Dropdownlist_mui() {
    const [Status, setStatus] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 160 }}>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 160 }}>
                <InputLabel id="task_status">Status</InputLabel>
                <Select
                    labelId="task_status-label"
                    id="task_status"
                    value={Status}
                    label="Status"
                    onChange={handleChange}
                >
                    <MenuItem value={0}>In Progress!</MenuItem>
                    <MenuItem value={1}>Complete!</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}