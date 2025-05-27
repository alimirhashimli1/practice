import { useTheme } from "../../context/ThemeContext"

function ToggleApp() {
    const {theme, toggleTheme} = useTheme();


  return (
    <div className={`app ${theme}`}>
        <h1>{theme === "light" ? "Light Mode" : "Dark Mode"}</h1>
        <button onClick={toggleTheme} className="toggle-button">Change theme</button>
        <p>This theme preference is saved and persists on reload</p>
    </div>
  )
}

export default ToggleApp