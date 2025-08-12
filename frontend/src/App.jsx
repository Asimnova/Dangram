import { Routes, Route } from 'react-router-dom';
import Signup from './pages/SignUp';
import Signin from './pages/SignIn';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home/*" element={<Home />} /> {/* Use * for nested routes */}
    </Routes>
  );
}

export default App;