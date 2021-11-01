import React, { Suspense, lazy } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import Home from './components/Home/Home';
// import Navbar from './components/Navbar/Navbar';
// import Auth from './components/Auth/Auth';
// import Exhibition from './components/Exhibition/Exhibition';

const Exhibition = lazy(() => import('./components/Exhibition/Exhibition'));
const Home = lazy(() => import('./components/Home/Home'));
const Navbar = lazy(() => import('./components/Navbar/Navbar'));
const Auth = lazy(() => import('./components/Auth/Auth'));

const App = () => (
  <BrowserRouter>
  <Suspense fallback={null}>
    <Container maxWidth="lg">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/exhibition" exact component={Exhibition} />
      </Switch>
    </Container>
    </Suspense>
  </BrowserRouter>
);

export default App;