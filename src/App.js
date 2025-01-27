import React, {Component} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {NavbarComponent} from "./Components";
import {Home, Sukses} from "./pages";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/sukses" Component={Sukses} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}
