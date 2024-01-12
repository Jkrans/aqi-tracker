import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Navigation from "./components/Navigation"
import MainContent from "./components/MainContent"
import UserProfile from "./components/UserProfile";
import './App.css';

const ProtectedProfile = withAuthenticationRequired(UserProfile, {
  onRedirecting: () => <div>Loading...</div>, // Optional: display while redirecting to login
  // Other options can be added here
});

function App() {
  return (
    <div className="App">
      <Navigation />
      <Router>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/profile" element={<ProtectedProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
