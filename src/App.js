import { Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <div>
        <Typography fontSize={45} textAlign={"center"} marginBottom={3} color={"#328ff2"}>  <img src="logo512.png" alt="react hook" width = "45px"/> Choose one Hook to display example</Typography>
        <BrowserRouter>
        <Grid container spacing={40}>
        {routes?.map(route =>  <Grid item xs= {4}>
                                <Link to={route.path}>
                                  <Card sx={{ maxWidth: 345 }} >
                                    <CardActionArea>
                                      <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                          {route.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                          {route.description}
                                        </Typography>
                                      </CardContent>
                                    </CardActionArea>
                                  </Card>
                               </Link>
                               </Grid>)}
      </Grid>
          <Routes>
            {routes?.map(({ path, element: Element}) => <Route path={path} element={<Element/>}/>)}
          </Routes>
        </BrowserRouter>,
    </div>
  );
}

export default App;
