/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import "./navbar.css"
import Profile from "../../../images/m header.png"


const Navbar = (props) => {
    return <div className="navbar__container">
        <div className="left__container__navbar">
            <h1>{props.navbarText}</h1>
        </div>

        <div className="right__container__navbar">
            <p>Jones Ferdinand</p>
            <img src={Profile} alt="" />
        </div>
    </div>;
}

export default Navbar