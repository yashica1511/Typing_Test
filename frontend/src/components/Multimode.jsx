// App.jsx
import { useState } from 'react';
import { Chat } from './Chat'; // Separate component for chat functionality

const Multimode = () => {
    const [activeTab, setActiveTab] = useState('customization');

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
            <nav className="bg-blue-700 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <span className="text-white text-xl font-bold">Settings & Multiplayer</span>
                    <div>
                        <button onClick={() => setActiveTab('customization')} className={`p-2 ${activeTab === 'customization' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}>Customization</button>
                        <button onClick={() => setActiveTab('account')} className={`p-2 ${activeTab === 'account' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}>Account</button>
                        <button onClick={() => setActiveTab('multiplayer')} className={`p-2 ${activeTab === 'multiplayer' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}>Multiplayer</button>
                    </div>
                </div>
            </nav>
            <main className="container mx-auto p-6 flex-1">
                {activeTab === 'customization' && <Customization />}
                {activeTab === 'account' && <AccountSettings />}
                {activeTab === 'multiplayer' && <Multiplayer />}
            </main>
        </div>
    );
};

const Customization = () => {
    const [theme, setTheme] = useState('light');
    const [keyboardLayout, setKeyboardLayout] = useState('QWERTY');
    const [sound, setSound] = useState(true);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Customization</h2>
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Theme</label>
                <select value={theme} onChange={(e) => setTheme(e.target.value)} className="p-2 border rounded">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Keyboard Layout</label>
                <select value={keyboardLayout} onChange={(e) => setKeyboardLayout(e.target.value)} className="p-2 border rounded">
                    <option value="QWERTY">QWERTY</option>
                    <option value="AZERTY">AZERTY</option>
                    <option value="Dvorak">Dvorak</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Sound Effects</label>
                <input
                    type="checkbox"
                    checked={sound}
                    onChange={() => setSound(!sound)}
                    className="mr-2"
                />
                <span>Enable</span>
            </div>
        </div>
    );
};

const AccountSettings = () => {
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState('');

    const handleSave = () => {
        // Save profile and password logic here
        console.log('Profile and Password updated');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Profile Name</label>
                <input
                    type="text"
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    className="p-2 border rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2">New Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border rounded w-full"
                />
            </div>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save Changes</button>
        </div>
    );
};

const Multiplayer = () => {
    const [lobbyName, setLobbyName] = useState('');
    const [lobbies, setLobbies] = useState(['Lobby 1', 'Lobby 2']); // Example lobbies
    const [activeLobby, setActiveLobby] = useState(null);

    const createLobby = () => {
        setLobbies([...lobbies, lobbyName]);
        setLobbyName('');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Multiplayer</h2>
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Create or Join Lobby</label>
                <input
                    type="text"
                    value={lobbyName}
                    onChange={(e) => setLobbyName(e.target.value)}
                    className="p-2 border rounded w-full"
                    placeholder="Enter lobby name"
                />
                <button onClick={createLobby} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Create Lobby</button>
            </div>
            <div>
                <h3 className="text-xl font-bold mb-2">Available Lobbies</h3>
                <ul className="list-disc pl-5">
                    {lobbies.map((lobby, index) => (
                        <li key={index} className="mb-2">
                            <button
                                onClick={() => setActiveLobby(lobby)}
                                className="text-blue-500 hover:underline"
                            >
                                {lobby}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {activeLobby && <Chat lobby={activeLobby} />}
        </div>
    );
};

export default Multimode;
