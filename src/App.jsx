import { Bold } from "lucide-react";
import Routing from "./router/Routing";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1a0a0a",
            color: "#fff",
            border: "1px solid rgba(220,38,38,0.4)",
            boxShadow: "0 0 20px rgba(220,38,38,0.2)",
            borderRadius: "12px",
            fontFamily: "'Rajdhani', sans-serif",
            letterSpacing: "0.03em",
          },
          success: {
            iconTheme: { primary: "#dc2626", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#ff4444", secondary: "#fff" },
          },
        }}
      />
      <Routing />
    </>
  );
}

export default App;