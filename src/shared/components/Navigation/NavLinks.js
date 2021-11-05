import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import { AuthContext } from '../../context/Auth-context';

import "./NavLinks.css";


const NavLinks = props => {
    const auth = useContext(AuthContext);
    return (<ul className = "nav-links">
        <li>
            <NavLink to = "/" exact>USERS</NavLink>
        </li>
        {auth.isLoggedIn &&<li>
            <NavLink to = {`/${auth.userId}/places`}>MY PLACES</NavLink>
        </li>}
        {auth.isLoggedIn &&<li>
            <NavLink to = "/places/new">ADD PLACES</NavLink>
        </li>}
        {!auth.isLoggedIn &&<li>
            <NavLink to = "/auth">AUTHENTICATE</NavLink>
        </li>}
        {auth.isLoggedIn&& <li>
            <button onClick= {auth.logout}>LOG OUT</button>
            </li>}
    </ul>);
};

export default NavLinks;