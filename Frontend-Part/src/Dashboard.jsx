import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(
`import java.util.*;

public class Main {
  public static void main(String[] args) {
    System.out.println("Hello CodePrep");
  }
}`
      );
      // const [language1 , setLanguage1] = useState('python');
      // const [code1, setCode1] = useState(`
      //   print('Hello)`);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [theme, setTheme] = useState("dark");

  const getExtension = () => {
    if (language === "cpp") return { ext: ".cpp", lang: cpp() };
    if (language === "java") return { ext: ".java", lang: java() };
    return { ext: ".py", lang: python() };
  };

  const handleDownload = () => {
    const { ext } = getExtension();
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `code${ext}`;
    a.click();
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const runCode = async () => {
    setOutput("Running...");

    try {
      const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": "7ca500ca7bmshc13224d1cc2aa3ep187a60jsn39d8b5cc2749",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          body: JSON.stringify({
            source_code: code,
            language_id: language === "java" ? 62 : language === "cpp" ? 54 : 71,
            stdin: input,
          }),
        }
      );
      const data = await response.json();

      if (data.stdout) {
        setOutput(data.stdout);
      } else if (data.compile_output) {
        setOutput(data.compile_output);
      } else if (data.stderr) {
        setOutput(data.stderr);
      } else {
        setOutput("Unknown error occurred.");
      }
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  const { lang } = getExtension();

  return (
    <div className={`vh-100 d-flex flex-column ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
      {/* Navbar */}
      <nav className={`navbar ${theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"} px-4 py-2`}>
        <span className="navbar-brand mb-0 h1">Code Editor</span>

        <div className="d-flex align-items-center gap-3">
          <select
            className={`form-select ${theme === "dark" ? "bg-secondary text-white border-0" : ""}`}
            style={{ width: "120px" }}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>

          <button className="btn btn-success" onClick={runCode}>
            Run
          </button>

          <div className="dropdown">
            <button
              className={`btn ${theme === "dark" ? "btn-secondary" : "btn-outline-secondary"} dropdown-toggle`}
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ⋮
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
              <li>
                <button className="dropdown-item" onClick={handleDownload}>
                  Download File
                </button>
              </li>
            </ul>
          </div>

          <button
            className={`btn ${theme === "dark" ? "btn-outline-light" : "btn-outline-dark"}`}
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </nav>

      {/* Editor */}
      <div className="flex-grow-1 overflow-hidden">
        <CodeMirror
          value={code}
          height="60vh"
          theme={theme === "dark" ? "dark" : "light"}
          extensions={[lang]}
          onChange={(value) => setCode(value)}
          style={{ fontSize: "1.1rem" }}
        />
      </div>

      {/* Input */}
      <div className={`p-3 ${theme === "dark" ? "bg-secondary text-white" : "bg-light text-dark"}`}>
        <label htmlFor="stdinInput" className="form-label">
          Standard Input (stdin):
        </label>
        <textarea
          id="stdinInput"
          className="form-control"
          rows="4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter input for your program here"
        />
      </div>

      {/* Output */}
      <div
        className={`p-3 ${theme === "dark" ? "bg-dark text-success" : "bg-white text-success"} overflow-auto`}
        style={{ height: "15vh", fontFamily: "monospace", whiteSpace: "pre-wrap" }}
      >
        <strong>Output:</strong>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

