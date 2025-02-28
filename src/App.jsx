import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import PostDetails from "./pages/PostDetails";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
    );
}

export default App;
