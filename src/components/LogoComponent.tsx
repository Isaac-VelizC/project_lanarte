import logoSrc from "@/assets/logo/logo.svg";
import { Link } from "react-scroll";

const LogoComponent = () => {
  return (
    <Link to="home" className="flex items-center space-x-2 lg:space-x-4 cursor-pointer">
      <img src={logoSrc} alt="Lana&Arte" className="h-16" />
      <h1 className="flex font-semibold text-3xl">
        Lana <span className="text-lg">&</span>
        <span className="text-primary">Arte</span>
      </h1>
    </Link>
  );
};

export default LogoComponent;
