import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";


import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import Kereses from "./sajatosztalyok/Kereses"
import Etel from "./sajatosztalyok/Eteltabla"
import Torles from "./sajatosztalyok/Torles"
import Recept from "./sajatosztalyok/Recepttabla"
import Recepttorles from "./sajatosztalyok/Recepttorles"
import Etelfeltoltes from "./sajatosztalyok/Etelfelvitel"
import Kezdolap from "./sajatosztalyok/Kezdolap"

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      
      <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="Kezdolap">
        
        PG Fitfood
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/Etelfeltoltes"} className="nav-link">
                Ételfeltöltés
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/Kereses"} className="nav-link">
                Keresés
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/Etel"} className="nav-link">
                Ételek
              </Link>
            </li>

              <li className="nav-item">
                <Link to={"/Recept"} className="nav-link">
                  Receptek
                </Link>
              </li>
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Torles"} className="nav-link">
                  Admin étel törlés
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/Recepttorles"} className="nav-link">
                  Admin recept törlés
                </Link>
              </li>
            )}
          </div>
        </Nav>
        <Nav>
        {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>

        
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />

            <Route path="/Recepttorles" component={Recepttorles} />
            
            <Route path="/Torles" component={Torles} />

            <Route path="/Kereses" component={Kereses} />
            <Route path="/Etel" component={Etel} />
            <Route path="/Recept" component={Recept} />
            <Route path="/Etelfeltoltes" component={Etelfeltoltes} />
            <Route path="/Kezdolap" component={Kezdolap} />


            

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
