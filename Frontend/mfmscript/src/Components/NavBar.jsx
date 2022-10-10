import React from 'react';
import './NavBarStyle.css';

function NavBar(){
    return (
        <>
        <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            </ul>
            <ul className="navbar-nav ">
            <li className="nav-item">
                <a className="nav-link" href="#">
                <i className="fa fa-bell">
                    <span className="badge badge-info">11</span>
                </i>
                Test
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">
                <i className="fa fa-globe">
                    <span className="badge badge-success">11</span>
                </i>
                Test
                </a>
            </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
        </nav>
        </>
    )
}

export default NavBar