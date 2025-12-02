import { useState } from "react";
import VerificationForm from "./components/VerificationForm.jsx";
import TokenScreen from "./components/TokenScreen.jsx";

function App() {
    const [token, setToken] = useState(null);

    return (
        <div className="flex w-full max-w-md flex-col gap-8 rounded-2xl bg-white p-8 shadow-lg overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-8 bg-white rounded-xl shadow-lg">
                {!token ? (
                    <VerificationForm onSuccess={setToken} />
                ) : (
                    <TokenScreen token={token} />
                )}
            </div>
        </div>
    );
}

export default App;