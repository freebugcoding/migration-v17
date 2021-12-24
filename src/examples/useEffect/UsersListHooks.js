import { Alert, Backdrop, Button, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function UsersListHooks() {
    
        const [usersInfo, setUsersInfo] = useState({
            users: [],
            isLoading: false,
            isError: false,
        })

        const {users, isLoading, isError} = usersInfo

        const [maxEntries, setMaxEntries] = useState(5)
        const [warning, setWarning] = useState();

        const prevMaxEntries = useRef(maxEntries)

        const increment = (maxEnt) => () => setMaxEntries(maxEnt === 10 ? maxEnt : maxEnt + 1 )

        const decrement = (maxEnt) => () => setMaxEntries(maxEnt === 1 ? maxEnt : maxEnt - 1 )

        // equivalent to component did mount to fetch data
        useEffect(() => {
            setUsersInfo({ isLoading: true, isError: false })
            axios.get('https://jsonplaceholder.typicode.com/users')
            .then(resp => setUsersInfo({users: resp.data, isLoading: false, isError: false}))
            .catch(() => setUsersInfo({users: [], isLoading: false, isError: true}));
        }, [])

       

        // another component this method will be triggered with maxEntries change to remove old listener with previous obsolete increment function
        useEffect(() => {
            const handleKeyUpAndDown= (e) => {
                if(e.key === 'a') {
                    increment(maxEntries)()
                }
                if(e.key === 'd') {
                    decrement(maxEntries)()
                }
            }
            window.addEventListener('keydown', handleKeyUpAndDown)

            return () => {
                // when used with empty array dependencies it is equivalent to componentWill Unmount
                window.removeEventListener('keydown', handleKeyUpAndDown)
            }
        }, [maxEntries])


        // this method will run every time the value of maxEntries is changed
        // to store previous value of max entry we use a ref to store it
        useEffect(() => {
            if(maxEntries === 10){
                setWarning('you have reached the maximum number of entries')
            } else if(maxEntries === 1 ) {
                setWarning('you have reached the minimum number of entries')
            } else if((prevMaxEntries !== 10 || prevMaxEntries !== 1)){
                setWarning(undefined)
            }
            prevMaxEntries.current = maxEntries
        }, [maxEntries])

        return (
            <Box>
                <Box border={`1px solid #1a78dd`} borderRadius={"10px"} padding="10px" boxShadow={`#1a78dd 0px 2px 8px`}>
                {warning && <Alert severity='warning'>{warning}</Alert>}
                <Grid container spacing={10}>
                    <Grid item xs={6}>
                        <Button size='large' fullWidth variant="outlined" onClick={increment(maxEntries)}>increment rows (use A key)</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button size='large' fullWidth variant="outlined" onClick={decrement(maxEntries)}>decrement rows (use D key)  </Button>
                    </Grid>
                </Grid>
                {isError && <Alert severity="error">An error occured please try later</Alert>}
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>name</TableCell>
                        <TableCell>user name</TableCell>
                        <TableCell>email</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {users?.slice(0, maxEntries).map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Box>
            <Typography marginTop={10} fontSize={40} textAlign={"center"} color="#1565C0" fontWeight={700}>Code (click enter to switch component)</Typography>
        <SyntaxHighlighter language='javascript' style={dark}>
            {`import { Alert, Backdrop, Button, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useRef } from 'react'

export default function UsersListHooks() {
    
        const [usersInfo, setUsersInfo] = useState({
            users: [],
            isLoading: false,
            isError: false,
        })
        const [maxEntries, setMaxEntries] = useState(5)
        const [warning, setWarning] = useState();

        const prevMaxEntries = useRef(maxEntries)

        const increment = (maxEnt) => () => setMaxEntries(maxEnt === 10 ? maxEnt : maxEnt + 1 )

        const decrement = (maxEnt) => () => setMaxEntries(maxEnt === 1 ? maxEnt : maxEnt - 1 )

        // equivalent to component did mount to fetch data
        useEffect(() => {
            setUsersInfo({ isLoading: true, isError: false })
            axios.get('https://jsonplaceholder.typicode.com/users')
            .then(resp => setUsersInfo({users: resp.data, isLoading: false, isError: false}))
            .catch(() => setUsersInfo({users: [], isLoading: false, isError: true}));
        }, [])

        // another component this method will be triggered with maxEntries change to remove old listener with previous obsolete increment function

        useEffect(() => {
            const handleKeyUpAndDown= (e) => {
                if(e.key === 'a') {
                    increment(maxEntries)()
                }
                if(e.key === 'd') {
                    decrement(maxEntries)()
                }
            }
            window.addEventListener('keydown', handleKeyUpAndDown)

            return () => {
                // when used with empty array dependencies it is equivalent to componentWill Unmount
                window.removeEventListener('keydown', handleKeyUpAndDown)
            }
        }, [maxEntries])


        // this method will run every time the value of maxEntries is changed
        // to store previous value of max entry we use a ref to store it
        useEffect(() => {
            if(maxEntries === 10){
                setMaxEntries('you have reached the maximum number of entries')
            } else if(maxEntries === 1 ) {
                setMaxEntries('you have reached the minimum number of entries')
            } else if((prevMaxEntries === 10 || prevMaxEntries === 1)){
                setMaxEntries(undefined)
            }
            prevMaxEntries.current = maxEntries
        }, [maxEntries])

        return (
            <Box>
                <Box>
                {warning && <Alert severity='warning'>{warning}</Alert>}
                <Grid container>
                    <Grid item xs={6}>
                        <Button onClick={increment(maxEntries)}>increment rows (use up arrow)</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={decrement(maxEntries)}>decrement rows (use down arrow)  </Button>
                    </Grid>
                </Grid>
                {isError && <Alert severity="error">An error occured please try later</Alert>}
                <Backdrop open={isLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <TableContainer component={Paper}>
                    <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>name</TableCell>
                        <TableCell>user name</TableCell>
                        <TableCell>email</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {users?.slice(0, maxEntries).map((row) => (
                        <TableRow
                        key={row.name}
                        >
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Box>
        </Box>)
}`}
        </SyntaxHighlighter>
            </Box>
          );
}
