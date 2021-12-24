import { Button, Grid, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Box } from "@mui/system";

export default function ColoredCounterWithHooks() {
    const [ count, setCount ] = useState(0);
    const [ isColored, setColored ] = useState(false);
    const renderCount = useRef(0);
    renderCount.current = renderCount.current + 1;
    const counterColor = isColored ? '#ff7a2d' : '#1a78dd';
    return (<Box>
        <Box border={`1px solid ${counterColor}`} borderRadius={"10px"} padding="10px" boxShadow={`${counterColor} 0px 2px 8px`}>
            <Grid container spacing={10} textAlign={"center"} >
                <Grid item xs={4}>
                    <Button size='large' fullWidth variant="outlined" onClick={() => setCount( count + 1 )}>increment</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button size='large' fullWidth fontSize={40} variant="outlined" onClick={() => setCount( count - 1 )}>decrement</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button size='large' fullWidth fontSize={40} variant="outlined" onClick={() => setColored( !isColored )}>change count color</Button>
                </Grid>
                <Grid item xs={6}>
                    <Typography fontSize={35} color={counterColor}>{`count is: ${count}`}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography fontSize={35}>{`number of renders: ${renderCount.current}`}</Typography>
                </Grid>
            </Grid>
        </Box>
        <Box>
        <Typography marginTop={10} fontSize={40} textAlign={"center"} color="#1565C0" fontWeight={700}>Code (click enter to switch component)</Typography>
        <SyntaxHighlighter language='javascript' style={dark}>
                    {`import { Button, Grid, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'

export default function ColoredCounterWithHooks() {
    const [ count, setCount ] = useState(0);
    const [ isColored, setColored ] = useState(false);
    const renderCount = useRef(0);
    renderCount.current = renderCount.current + 1;
    return (<Box  border={\`1px solid \${counterColor}\`} boxShadow={\`\${counterColor} 0px 2px 8px\`}>
        <Grid container>
            <Grid item>
                <Button onClick={() => setCount( count + 1 )}>increment</Button>
            </Grid>
            <Grid item>
                <Button onClick={() => setCount( count - 1 )}>decrement</Button>
            </Grid>
            <Grid item>
                <Button onClick={() => setColored( !isColored )}>change count color</Button>
            </Grid>
            <Grid item>
                <Typography color={counterColor}>{\`count is: \${count}\`}</Typography>
            </Grid>
            <Grid item>
                <Typography>{\`number of renders: \${renderCount.current}\`}</Typography>
            </Grid>
        </Grid>
    </Box>)
}`}
                </SyntaxHighlighter>
        </Box>
    </Box>
        
    )
}