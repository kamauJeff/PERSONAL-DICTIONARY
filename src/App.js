import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "./components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./components/ui/card";
const queryClient = new QueryClient();
function DictionarySearch() {
    const [word, setWord] = useState("");
    // Query function
    const fetchDefinition = async () => {
        if (!word.trim())
            throw new Error("Please enter a word");
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!res.ok)
            throw new Error("Word not found");
        const data = await res.json();
        return data[0]?.meanings[0]?.definitions[0]?.definition || "No definition found.";
    };
    // React Query hook
    const { data: definition, error, isError, isFetching, refetch } = useQuery({
        queryKey: ["dictionary", word],
        queryFn: fetchDefinition,
        enabled: false,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        refetch(); // trigger query manually
    };
    return (_jsx("div", { className: "flex min-h-screen items-center justify-center bg-blue-100", children: _jsxs(Card, { className: "w-full max-w-md bg-gradient-to-br from-indigo-50 to-white border-indigo-200 shadow-md", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-center text-2xl font-bold", children: "Personal Dictionary" }) }), _jsxs(CardContent, { children: [_jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col items-center space-y-4", children: [_jsx("input", { type: "text", placeholder: "Discover definition instantly..", className: "w-full rounded border border-gray-300 p-2", value: word, onChange: (e) => setWord(e.target.value) }), _jsx(Button, { type: "submit", className: "w-full", children: "SEARCH" })] }), isFetching && _jsx("div", { className: "mt-6 text-center text-blue-500", children: "Loading..." }), isError && _jsx("div", { className: "mt-6 text-center text-red-500", children: error.message }), definition && (_jsxs("div", { className: "mt-6 text-center", children: [_jsx("h2", { className: "font-semibold", children: "Result:" }), _jsx("p", { children: definition })] }))] })] }) }));
}
function App() {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(DictionarySearch, {}) }));
}
export default App;
