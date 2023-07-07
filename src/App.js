import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles/app.css'
import './styles/tailwind.css'
import './styles/styles.scss'
import './App.css'
import { Home } from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { auth } from './client/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Alert } from './components/Shared';
import { Navbar } from './components/Navbar';
import { ChatRoom } from './components/ChatRoom';

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!user) {
    <Alert message={"Please Login First"}/>
    return <Navigate to="/login" replace/>;
  }
  return(
    <>
      <Navbar />
      {children}
    </>
  );
};

function App() {
  return (
    <div className="App pt-[4vh]">
      <BrowserRouter>
        {/* <ProtectedRoute>
          <Navbar />
        </ProtectedRoute> */}
        <Routes>
          <Route exact path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
            } />
            <Route exact path="/chats" element={
            <ProtectedRoute>
              <ChatRoom />
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
