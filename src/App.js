import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles/app.css'
import './styles/tailwind.css'
import { Home } from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { auth } from './config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Alert } from './components/Shared';

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    <Alert message={"Please Login First"}/>
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace/>;
  }

  return children;
};

function App() {
  return (
    <div className="App pt-[4vh]">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
            } />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
