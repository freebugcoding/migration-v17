import { Alert, Backdrop, Button, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { Component } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default class UsersListClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            isLoading: false,
            isError: false,
            maxEntries: 5,
            warning: undefined
        }
    }

    increment = () => this.setState({ maxEntries:  this.state.maxEntries === 10 ? this.state.maxEntries : this.state.maxEntries + 1 })

    decrement = () => this.setState({ maxEntries:  this.state.maxEntries === 1 ? this.state.maxEntries : this.state.maxEntries - 1 })

    handleKeyUpAndDown= (e) => {
        if(e.key === 'a') {
            this.increment()
        }
        if(e.key === 'd') {
            this.decrement()
        }
    }

    // fetch data on mount and register event listener
    componentDidMount() {
        this.setState({ isLoading: true, isError: false })
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(resp => this.setState({users: resp.data, isLoading: false, isError: false}))
        .catch(() => this.setState({users: [], isLoading: false, isError: true}));

        window.addEventListener('keydown', this.handleKeyUpAndDown)
    }

    // show warning on update when max entries has max (10) or has min (1)
    componentDidUpdate(prevProps, prevState) {
        const {maxEntries} = this.state;
        if(maxEntries !== prevState.maxEntries) {
            if(maxEntries === 10){
                this.setState({ warning: 'you have reached the maximum number of entries'})
            } else if(maxEntries === 1 ) {
                this.setState({ warning: 'you have reached the minimum number of entries'})
            } else if((prevState.maxEntries === 10 || prevState.maxEntries === 1)){
                this.setState({ warning: undefined })
            }
        }
    }

    // clear eventlistner before unmount
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyUpAndDown)

    }  

    render() {
        const {users, isLoading, isError, maxEntries, warning} = this.state;
        return (
            <Box>
                <Box border={`1px solid #1a78dd`} borderRadius={"10px"} padding="10px" boxShadow={`#1a78dd 0px 2px 8px`}>
                {warning && <Alert severity='warning'>{warning}</Alert>}
                <Grid container spacing={10}>
                    <Grid item xs={6}>
                        <Button size='large' fullWidth variant="outlined" onClick={this.increment}>increment rows (use A key)</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button size='large' fullWidth variant="outlined" onClick={this.decrement}>decrement rows (use D key)  </Button>
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
import React, { Component } from 'react'

export default class UsersListClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            isLoading: false,
            isError: false,
            maxEntries: 5,
            warning: undefined
        }
    }

    increment = () => this.setState({ maxEntries:  this.state.maxEntries === 10 ? this.state.maxEntries : this.state.maxEntries + 1 })

    decrement = () => this.setState({ maxEntries:  this.state.maxEntries === 1 ? this.state.maxEntries : this.state.maxEntries - 1 })

    handleKeyUpAndDown= (e) => {
        if(e.key === 'a') {
            this.increment()
        }
        if(e.key === 'd') {
            this.decrement()
        }
    }

    // fetch data on mount and register event listener
    componentDidMount() {
        this.setState({ isLoading: true, isError: false })
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(resp => this.setState({users: resp.data, isLoading: false, isError: false}))
        .catch(() => this.setState({users: [], isLoading: false, isError: true}));

        window.addEventListener('keydown', this.handleKeyUpAndDown)
    }

    // show warning on update when max entries has max (10) or has min (1)
    componentDidUpdate(prevProps, prevState) {
        const {maxEntries} = this.state;
        if(maxEntries !== prevState.maxEntries) {
            if(maxEntries === 10){
                this.setState({ warning: 'you have reached the maximum number of entries'})
            } else if(maxEntries === 1 ) {
                this.setState({ warning: 'you have reached the minimum number of entries'})
            } else if((prevState.maxEntries === 10 || prevState.maxEntries === 1)){
                this.setState({ warning: undefined })
            }
        }
    }

    // clear eventlistner before unmount
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyUpAndDown)

    }  

    render() {
        const {users, isLoading, isError, maxEntries, warning} = this.state;
        return (<Box>
                {warning && <Alert severity='warning'>{warning}</Alert>}
                <Grid container>
                    <Grid item xs={6}>
                        <Button onClick={this.increment}>increment rows (use up arrow)</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={this.decrement}>decrement rows (use down arrow)  </Button>
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
            )
    }
}`}
        </SyntaxHighlighter>
            </Box>
          );
    }
}
