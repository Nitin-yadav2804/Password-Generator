import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_{}[]:;<>,./?";
    for (let i = 0; i < length; i++) {
      const randomIdx = Math.floor(Math.random() * str.length);
      pass += str[randomIdx];
      setPassword(pass);
    }
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  return (
    <>
      <div className="flex justify-center w-full h-screen bg-black">
        <div className="bg-gray-400 p-10 rounded-4xl shadow-lg my-5 w-150 h-fit flex flex-col items-center">
          <h1 className="text-blue-700 font-bold text-4xl mb-5">
            Password Generator
          </h1>
          <div className="flex justify-end-safe border-2 border-gray-900 rounded-2xl w-110 h-10 mb-5">
            <input
              className="p-1 outline-0 w-90"
              type="text"
              value={password}
              readOnly
            />
            <button
              onClick={() => {
                window.navigator.clipboard.writeText(password);
                alert("Password copied to clipboard!");
              }}
              className="bg-blue-700 text-black text-center font-bold p-1 rounded-r-2xl h-full w-20 cursor-pointer hover:bg-blue-600"
            >
              Copy
            </button>
          </div>
          <div className="flex gap-4">
            <input
              type="range"
              min={4}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <span className="text-gray-900">Length: {length}</span>
            <div className="flex gap-1">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <span className="text-gray-900">Numbers</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <span className="text-gray-900">Characters</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
