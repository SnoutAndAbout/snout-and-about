import { Link } from "react-router-dom"

const Navbar = ()=> {
  const token = localStorage.getItem("token")
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div>
      <nav>
        <h1>Snout And About</h1>
        <ul>
          <li><div><Link to="/">Home</Link></div></li>
          <li>{token ? <Link to="/account">Account</Link>:<Link to="/Login">Login</Link>}</li>
          <li>{token ? <p id="logout-btn" onClick={handleLogout}>Logout</p> : <></>}</li>
      </ul>
      </nav>
    </div>
  )
}

export default Navbar