import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import HowToPlay from './components/HowTopPlay';
import {HouseDoorFill, InfoCircleFill, }from 'react-bootstrap-icons';
import CardsDeck from './components/CardsDeck';


function App() {
  return (
    <div className="App">
        <BrowserRouter>

        {/* nav bar= home icon and info*/}
        <nav class= 'navbar-expand-md'>
        <Link to="/">< HouseDoorFill onClick="" color="white" size={25}></HouseDoorFill></Link>
       &emsp;<Link to="/HowToPlay"><InfoCircleFill color="white" size={25}></InfoCircleFill></Link>
        </nav>

        <Switch>
            <Route exact path="/" component={CardsDeck} />
            <Route path="/HowToPlay"><HowToPlay/></Route>
        </Switch>
        
        </BrowserRouter>
    </div>
  );
}

export default App;
