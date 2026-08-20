import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Chat from './Chat.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;