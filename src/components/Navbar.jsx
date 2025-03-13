import { Link } from "react-router-dom"

const Navbar = ()=> {
  const token = localStorage.getItem("token")
  return (
    <div>
      <nav>
        <h1>Snout And About</h1>
        <ul>
     <li><Link to="/">Home</Link></li>
      <li><Link to="/City">City</Link></li>
      <li><Link to="/Registration"></Link></li>
     <li>{token ? <Link to="/Account">Account</Link>:<Link to="/Login">Login</Link>}</li>
      </ul>
      </nav>
    </div>
  )
}

export default Navbar