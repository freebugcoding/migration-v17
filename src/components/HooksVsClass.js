import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { InnerBoxWrapper } from './HooksVsClass.styles';


export default function HooksVsClass({title, hookComponent: Hook, classComponent: Class}) {
    const [ isFunctional, setFunctional ] = useState(true); 


    useEffect(() => {
        const handleUserEnterPress = (e) =>  e.key === 'Enter' && setFunctional(!isFunctional)
        window.addEventListener('keydown', handleUserEnterPress);
        return () => {
            window.removeEventListener('keydown', handleUserEnterPress);
        }
    }, [isFunctional])
    
    return (
        <Box marginTop={5}>
            <Grid container spacing={10} textAlign={"center"} marginBottom={10}>
                <Grid item xs={6}>
                    <Button variant="contained" disabled={!isFunctional} onClick={() => setFunctional(false)}>use class component</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" disabled={isFunctional} onClick={() => setFunctional(true)}>use functional component</Button>
                </Grid>
            </Grid>
            <InnerBoxWrapper>
                <Typography fontSize={25} textAlign={"center"} color={"#1565C0"}>{isFunctional ? "FUNCTIONAL COMPONENT" : "CLASS COMPONENT"}</Typography>
                <Typography fontSize={22} textAlign={"center"} marginBottom={10} color={"#1565C0"}>({title})</Typography>
                {isFunctional ? <Hook/> : <Class/>}
            </InnerBoxWrapper>
        </Box>
    )
}
