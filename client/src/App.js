import React, { Suspense, lazy } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('./components/Home/Home'));
const Navbar = lazy(() => import('./components/Navbar/Navbar'));
const Auth = lazy(() => import('./components/Auth/Auth'));
const Exhibition = lazy(() => import('./components/Exhibition/Exhibition'));

const App = () => (
  <BrowserRouter>
  <Suspense fallback={null}>
    <Container maxWidth="lg">
      <Navbar />
      <Switch>
        <Route path="/" exact render={props => <Home {...props} />}/>
        <Route path="/auth" exact render={props => <Auth {...props} />} />
        <Route path="/exhibition" exact render={props => <Exhibition {...props} />} />
      </Switch>
    </Container>
    </Suspense>
  </BrowserRouter>
);

export default App;