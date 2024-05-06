'use client'
import React, { useState, useEffect, useContext } from 'react';

// Создаем контекст для предоставления ширины окна
const WindowWidthContext = React.createContext();

// Компонент-поставщик ширины окна
const WindowWidthProvider = ({ children }) => {
    const [width, setWidth] = useState(null);

    useEffect(() => {
        // Проверяем, что код выполняется на клиентской стороне
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setWidth(window.innerWidth);
            };

            // Здесь вы можете установить начальное значение ширины окна
            setWidth(window.innerWidth);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return (
        <WindowWidthContext.Provider value={width}>
            {children}
        </WindowWidthContext.Provider>
    );
}

// Кастомный хук для получения ширины окна
function useWindowWidth() {
    return useContext(WindowWidthContext);
}

export { WindowWidthProvider, useWindowWidth };
