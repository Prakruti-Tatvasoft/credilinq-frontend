import { Link } from "@mui/material";
import Image from "next/image";
import Logo from "../public/logo.svg";

function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="header-wrap">
          <Link className="logo">
            <Image src={Logo} alt=""></Image>
          </Link>
          <h1>SME HealthCheck - Get started</h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
