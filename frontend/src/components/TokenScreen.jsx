import QRCode from "react-qr-code";
import { useState } from "react";

export default function TokenScreen({ token }) {
    const [showToken, setShowToken] = useState(false);
    
    const copyToken = () => {
        navigator.clipboard.writeText(token);
        alert("Token copied to clipboard!");
    };

    return (
        <div className="space-y-6 text-center">
            <div className="flex justify-center">
                <QRCode value={token} size={180} />
            </div>

            <div className="mt-4">
                <button
                    onClick={() => setShowToken(!showToken)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    {showToken ? "Hide Token" : "Show Token"}
                </button>

                {showToken && (
                    <p className="mt-3 text-lg font-mono bg-gray-100 border rounded-lg p-3 inline-block">
                        {token}
                    </p>
                )}
            </div>


            <button
                onClick={copyToken}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition"
            >
                Copy Token
            </button>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                Deep Link (Coming Soon)
            </button>
        </div>
    );
}