import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary px-sm-5">
        <ul className="navbar-nav align-items-center ">
          <li className="nav-item ml-5">
            <Link to="/" className="nav-link">
              <button>go to products</button>
            </Link>
          </li>
        </ul>

        <Link className="ml-auto" to="/cart">
          <button>
            <span className="mr-2">
              <i className="fas fa-cart-plus" />
            </span>
            my cart
          </button>
        </Link>
      </nav>
    );
  }
}
/*

these are called styled components.. they are way of implementing css to components in a better way..
 i don't know why these are not working as expected so i am leaving them as of now.


const navwrapper = styled.nav`
  background: var(--mainBlue);
  .navlink {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;
*/
