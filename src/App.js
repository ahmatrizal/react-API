import React, { Component } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import Navbar from '../src/components/NavbarComponent'
import {Home,Sukses} from './pages/Index'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
          <main>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/sukses" component={Sukses} exact />

            </Switch>
          </main>
      </BrowserRouter>

    )
  }
}
