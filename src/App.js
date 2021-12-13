import React, { useEffect, useState } from "react";


const App = () => {

    const [checked, setChecked] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
);


useEffect(() => {
    document
    .getElementsByTagName("HTML")[0]
    .setAttribute("data-theme", localStorage.getItem("theme"));
}, [!checked]);


const toggleThemeChange = () => {
    if (checked === false) {
    localStorage.setItem("theme", "dark");
    setChecked(true);
    } else {
    localStorage.setItem("theme", "light");
    setChecked(false);
    }
};

return (
    <div>
    <header>
    <div className="form-check form-switch">
    <input className="mt-3 form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
    defaultChecked={checked}
    onChange={() => toggleThemeChange()}
/>
</div>

    </header>
    </div>
);
};

export default App;