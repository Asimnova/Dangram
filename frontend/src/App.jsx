import { Routes, Route } from 'react-router-dom';
import Signup from './pages/SignUp';
import Signin from './pages/SignIn';
import Home from './pages/Home';
import ExploreDetail from './pages/ExploreDetail';
import ReelCommentPage from "./components/ReelCommentPage";

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      {/* Home + Nested Routes */}
      <Route path="/home/*" element={<Home />} />

      {/* Dynamic Pages */}
      <Route path="/reel/:id" element={<ReelCommentPage />} />
      <Route path="/explore/:id" element={<ExploreDetail />} />

      {/* Fallback */}
      <Route path="*" element={<Signin />} />
    </Routes>
  );
}

export default App;
