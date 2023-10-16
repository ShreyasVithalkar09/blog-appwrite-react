import BlogLogo from "../assets/bloglogo.svg";

function Logo() {
  return (
    <div className="font-bold">
      <img src={BlogLogo} alt="logo" width="30" />
    </div>
  );
}

export default Logo;
