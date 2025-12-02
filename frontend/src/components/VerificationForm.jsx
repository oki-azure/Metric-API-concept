import { useState } from "react";

export default function VerificationForm({ onSuccess }) {
    const [idNumber, setIdNumber] = useState("");
    const [referenceId, setReferenceId] = useState("");
    const [purpose, setPurpose] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            purpose,
            branch_name: "Accra - HQ",
            id_number: idNumber,
            referenceid: referenceId,
        };

        const clientKey = "ohqwfaqHkpBYFwI90lPV";
        const secretKey = "KazvBAKv9onzFWUPZ7ocaHg0Ndwr5HaPUaL2xuIy4HaLj";
        const encodedAuth = btoa(`${clientKey}:${secretKey}`);

        const res = await fetch(
            "https://service-prod.metric.africa/api/fingerprint/initiate_finger_verification_sdk",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-AUTH": encodedAuth,
                },
                body: JSON.stringify(body),
            }
        );

        const data = await res.json();
        if (data?.data?.token) {
            onSuccess(data.data.token);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ghana-card ID number
                </label>
                <input
                    type="text"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    required
                    pattern="^GHA-00\d{7}-\d$"
                    placeholder="GHA-000000000-X"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reference number
                </label>
                <input
                    type="text"
                    value={referenceId}
                    onChange={(e) => setReferenceId(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose
                </label>
                <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    <option value="" disabled>
                        Select an option
                    </option>
                    <option>ID verification</option>
                    <option>Account Opening</option>
                    <option>Deposit</option>
                    <option>Withdrawal</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
                Submit
            </button>
        </form>
    );
}