import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./components/ui/card";


function DictionarySearch() {
    const[word, setWord]=useState("")
    const[definition, setDefinition]=useState<string | null>(null)
    const[error, setError]=useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setDefinition(null)

        if(!word.trim()) {
            setError("Please enter a Word")
            return;
        }
        try {
            const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    )
    if (!res.ok) {
      throw new Error("Word not found")
    }
    const data = await res.json()

    const meaning = data[0]?.meanings[0]?.definitions[0]?.definition;
    setDefinition(meaning || "No definition found.")
            
        } catch (err: any) {
            setError(err.message)
            
        }
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-100">
        <Card className="w-full max-w-md bg-gradient-to-br from-indigo-50 to-white border-indigo-200 shadow-md">
        <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Personal Dictionary</CardTitle>
        </CardHeader>
        <CardContent>
        <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4">
            <input
            type="text"
            placeholder="Discover definition instantly.."
            className="w-full rounded border border-gray-300 p-2"
            value={word}
            onChange={(e)=> setWord(e.target.value)}
            />
            <Button type="submit" className="w-full">SEARCH</Button>
        </form>
        {error && (
          <div className="mt-6 text-center text-red-500">{error}</div>
        )}
        {definition &&(
          <div className="mt-6 text-center">
            <h2 className="font-semibold">Result:</h2>
            <p>{definition}</p>
          </div>
        )}

        </CardContent>
        </Card>
        </div>

    )
    
}


function App() {
    return(
        <DictionarySearch/>

    )

    
}
export default App