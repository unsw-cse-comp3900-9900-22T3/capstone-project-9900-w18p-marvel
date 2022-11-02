import * as React from 'react';
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { updateTask } from '../api/task';


interface CalenderPickerProps {
    taskID: string;

}


export const CalenderPicker = ({
    taskID,

}: CalenderPickerProps) => {
    console.log('checkkkk')
    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    );

    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);

    };


    useEffect(() => {
        updateTask(
            taskID,
            null,
            null,
            value,
            null,
            null
        )
    }, [value])

    return (
        <div className={`bg-white-100 h-18 pt-2 rounded-[8px]`}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>

                <DesktopDatePicker
                    label="Date"
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}

                />


            </LocalizationProvider>
        </div>
    );
};






