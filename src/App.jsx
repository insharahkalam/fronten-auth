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
            background: "#0b0b0f",
            color: "#fff",
            border: "1px solid #7f1d1d",
            fontFamily: "serif",
            font:'Bold',
            fontSize:"16px"
          },
          success: {
            iconTheme: {
              primary: "#7f1d1d",
              secondary: "#fff",
            },
          },
          error: {
            style: {
              border: "1px solid #7f1d1d",
            },
          },
        }}
      />
      <Routing />
    </>
  );
}

export default App;