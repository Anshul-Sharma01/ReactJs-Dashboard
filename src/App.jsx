import { useTheme } from './context/ThemeContext.jsx';
import './App.css';
import Users from './Components/Users';
import Statistics from './Components/Statistics';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useState } from 'react';

function App() {
  const { darkMode, toggleTheme } = useTheme();
  const [currentView, setCurrentView] = useState('users'); 

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex">
        <aside className="w-1/4 bg-blue-600 dark:bg-blue-800 text-white p-6">
          <h1 className="text-xl font-bold mb-6">Dashboard</h1>
          <nav className="space-y-2">
            <button
              onClick={() => setCurrentView('users')}
              className={`block px-4 py-2 rounded-md font-semibold ${
                currentView === 'users'
                  ? 'bg-blue-500'
                  : 'bg-transparent hover:bg-blue-500'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setCurrentView('statistics')}
              className={`block px-4 py-2 rounded-md font-semibold ${
                currentView === 'statistics'
                  ? 'bg-blue-500'
                  : 'bg-transparent hover:bg-blue-500'
              }`}
            >
              Statistics
            </button>
          </nav>
        </aside>

        <div className="flex-1 flex flex-col">

          <header className="bg-blue-600 dark:bg-blue-800 p-4 flex justify-between items-center shadow-lg">
            <button
              onClick={toggleTheme}
              className="text-white flex items-center justify-center p-2 rounded-full bg-gray-700 dark:bg-gray-500 hover:bg-gray-600"
            >
              {darkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
            </button>
          </header>

          <main className="flex-grow p-6">
            {currentView === 'users' ? <Users /> : <Statistics />}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
