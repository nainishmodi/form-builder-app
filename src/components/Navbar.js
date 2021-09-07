import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink to="/" exact className="navbar-brand">
            Form Builder App
          </NavLink>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" exact activeClassName="active" className="nav-link">
                    Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/forms" exact activeClassName="active" className="nav-link">
                    Form Lists
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/formbuilder" exact activeClassName="active" className="nav-link">
                    Form Builder
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
