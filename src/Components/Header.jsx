import { useEffect,useState } from "react";
import MoonIcon from "./icons/MoonIcon";
import IconSun from "./icons/IconSun";

const initialStateDarkMode = localStorage.getItem("theme")==="dark"

const Header = () => {
    const [darkMode, setDarkMode] = useState(initialStateDarkMode);

    useEffect(()=>{
      if(darkMode){
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme","dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme","light");
      }
    },[darkMode]);

    return (
      <header className="container mx-auto px-4 pt-8 ">
        {/* md:max-w-xl */}
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold uppercase tracking-[0.3em] text-white">
            My ToDo App
          </h1>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <IconSun></IconSun> : <MoonIcon></MoonIcon>}
          </button>
        </div>
      </header>
   );
}
export default Header;