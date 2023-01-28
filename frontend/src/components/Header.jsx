import logo from "../assets/wild_logo.png";

function Header() {
  return (
    <header className="w-full flex items-center justify-around border-solid border-b-2 h-16 bg-white">
      <img src={logo} alt="Wild" className="max-h-8 md:max-h-8 w-auto" />
      {/* stylish title here with a nice font and a nice color and a nice size and a
      nice shadow */}
      <h1 className="text-2xl md:text-4xl font-bold from-neutral-600 to-neutral-800">
        Les Argonautes
      </h1>
    </header>
  );
}

export default Header;
