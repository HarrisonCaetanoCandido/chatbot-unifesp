import { BrowserRouter, Routes, Route } from 'react-router';
import Chat from './pages/chat/Chat';
import TermsOfUse from './pages/terms-of-use/TermsOfUse';
import PrivacyPolicy from './pages/privacy-policy/PrivacyPolicy';
import { Toaster } from 'react-hot-toast';

export default function App() {
    return (
        <>
            <Toaster position="bottom-right" reverseOrder={false} />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Chat />} />
                    <Route path="/termos-de-uso" element={<TermsOfUse />} />
                    <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}