// Chat.jsx
import { useState } from 'react';

export const Chat = ({ lobby }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        setMessages([...messages, newMessage]);
        setNewMessage('');
    };

    return (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Chat - {lobby}</h3>
            <div className="h-60 overflow-y-auto mb-4 p-2 bg-white border rounded">
                {messages.map((message, index) => (
                    <div key={index} className="mb-2">
                        <span className="font-medium">User:</span> {message}
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="p-2 border rounded flex-1"
                    placeholder="Type a message"
                />
                <button onClick={handleSendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Send</button>
            </div>
        </div>
    );
};
