import { useState } from "react";
import axios from "axios";

type ServerStatus = "idle" | "checking" | "online" | "offline";

function App() {
  const [mainServerStatus, setMainServerStatus] =
    useState<ServerStatus>("idle");

  const [aiServerStatus, setAiServerStatus] =
    useState<ServerStatus>("idle");

  const apiUrl = import.meta.env.VITE_API_URL;

  const checkMainServer = async () => {
    setMainServerStatus("checking");

    try {
      await axios.get(`${apiUrl}/`);
      setMainServerStatus("online");
    } catch {
      setMainServerStatus("offline");
    }
  };

  const checkAiServer = async () => {
    setAiServerStatus("checking");

    try {
      await axios.get(`${apiUrl}/ai-service`);
      setAiServerStatus("online");
    } catch {
      setAiServerStatus("offline");
    }
  };

  const getStatusText = (status: ServerStatus) => {
    switch (status) {
      case "checking":
        return "Checking...";
      case "online":
        return "Online";
      case "offline":
        return "Offline";
      default:
        return "Not checked";
    }
  };

  const getStatusClass = (status: ServerStatus) => {
    switch (status) {
      case "online":
        return "text-green-600";
      case "offline":
        return "text-red-600";
      case "checking":
        return "text-yellow-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Server Status
        </h1>

        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">
                Main Server
              </h2>

              <span
                className={`font-medium ${getStatusClass(
                  mainServerStatus
                )}`}
              >
                {getStatusText(mainServerStatus)}
              </span>
            </div>

            <button
              onClick={checkMainServer}
              disabled={mainServerStatus === "checking"}
              className="cursor-pointer w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {mainServerStatus === "checking"
                ? "Checking..."
                : "Check Main Server"}
            </button>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">
                AI Server
              </h2>

              <span
                className={`font-medium ${getStatusClass(aiServerStatus)}`}
              >
                {getStatusText(aiServerStatus)}
              </span>
            </div>

            <button
              onClick={checkAiServer}
              disabled={aiServerStatus === "checking"}
              className="cursor-pointer w-full rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {aiServerStatus === "checking"
                ? "Checking..."
                : "Check AI Server"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;