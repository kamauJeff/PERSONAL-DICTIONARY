import { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "./components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./components/ui/card";


const queryClient = new QueryClient();

function DictionarySearch() {
  const [word, setWord] = useState("");

  // Query function
  const fetchDefinition = async () => {
    if (!word.trim()) throw new Error("Please enter a word");

    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!res.ok) throw new Error("Word not found");

    const data = await res.json();
    return data[0]?.meanings[0]?.definitions[0]?.definition || "No definition found.";
  };

  // React Query hook
  const { data: definition, error, isError, isFetching, refetch } = useQuery({
    queryKey: ["dictionary", word],
    queryFn: fetchDefinition,
    enabled: false, 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch(); // trigger query manually
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-100">
      <Card className="w-full max-w-md bg-gradient-to-br from-indigo-50 to-white border-indigo-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Personal Dictionary</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
            <input
              type="text"
              placeholder="Discover definition instantly.."
              className="w-full rounded border border-gray-300 p-2"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
            <Button type="submit" className="w-full">SEARCH</Button>
          </form>

          {isFetching && <div className="mt-6 text-center text-blue-500">Loading...</div>}
          {isError && <div className="mt-6 text-center text-red-500">{(error as Error).message}</div>}
          {definition && (
            <div className="mt-6 text-center">
              <h2 className="font-semibold">Result:</h2>
              <p>{definition}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DictionarySearch />
    </QueryClientProvider>
  );
}

export default App;
