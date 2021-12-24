import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { Box } from "@mui/system";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default class ColoredCounterClass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            isColored: false
        }
        this.renderCount = React.createRef(0);
    }
    
    render(){
        const { count, isColored } = this.state;
        const counterColor = isColored ? '#ff7a2d' : '#1a78dd';
        this.renderCount.current = this.renderCount.current + 1;
        return(<Box>
                <Box border={`1px solid ${counterColor}`} borderRadius={"10px"} padding="10px" boxShadow={`${counterColor} 0px 2px 8px`}>
                    <Grid container spacing={10} textAlign={"center"}>
                        <Grid item xs={4}>
                            <Button size='large' fullWidth variant="outlined" onClick={() => this.setState({ count: count + 1 })}>increment</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button size='large' fullWidth variant="outlined" onClick={() => this.setState({ count: count - 1 })}>decrement</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button size='large' fullWidth variant="outlined" onClick={() => this.setState({ isColored: !isColored})}>change color</Button>
                        </Grid>
                        <Grid item xs={6} margin="auto">
                            <Typography fontSize={35} color={counterColor}>{`count is: ${count}`}</Typography>
                        </Grid>
                        <Grid item xs={6} margin="auto">
                            <Typography fontSize={35}>{`number of renders: ${this.renderCount.current}`}</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Typography marginTop={10} fontSize={40} textAlign={"center"} color="#1565C0" fontWeight={700}>Code (click enter to switch component)</Typography>
        <SyntaxHighlighter language='javascript' style={dark}>
            {`import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { Box } from "@mui/system";

export default class ColorCounterClass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            isColored: false
        }
        this.renderCount = React.createRef(0);
    }
    
    render(){
        const { count, isColored } = this.state;
        const counterColor = isColored ? '#ff7a2d' : '#1a78dd';
        this.renderCount.current = this.renderCount.current + 1;
        return(<Box border={\`1px solid \${counterColor}\`} boxShadow={\`\${counterColor} 0px 2px 8px\`}>
                    <Grid container>
                        <Grid item>
                            <Button onClick={() => this.setState({ count: count + 1 })}>increment</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => this.setState({ count: count - 1 })}>decrement</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => this.setState({ isColored: !isColored})}>change color</Button>
                        </Grid>
                        <Grid item>
                            <Typography color={counterColor}>{\`count is: \${count}\`}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>{\`number of renders: \${this.renderCount.current}\`}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            )
    }
}`}
        </SyntaxHighlighter>
            </Box>
        )
}
}
