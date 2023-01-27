import React, {useEffect, useState} from 'react';
import './css/darkMode.css';

const Header = () => {

    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);


    return (
        <header>
            <button onClick={toggleTheme} type={theme === 'dark' ? 'dark-btn' : ''}>Toggle Theme</button>
            <div className="header-container">
                <h1>Meme Editor</h1>
            </div>
        </header>
    );
}

export {Header};
