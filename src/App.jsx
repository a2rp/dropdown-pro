import DropdownPro from './dropdownPro'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return (
        <>
            <DropdownPro />
            <ToastContainer
                position="top-right"
                theme="dark"
                autoClose={2500}
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover
                draggable
                toastStyle={{
                    background: "rgba(255,255,255,0.07)",
                    color: "#e8eaed",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
                }}
                progressStyle={{
                    background: "linear-gradient(90deg, var(--brand), var(--brand-2))",
                }}

            />
        </>
    )
}

export default App

