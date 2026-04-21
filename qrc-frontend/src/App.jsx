import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import QRPage from "./pages/QRPage";
import RequestsPage from "./pages/RequestsPage";
import ChatPage from "./pages/ChatPage";
import FeedPage from "./pages/FeedPage";
import CreatePostPage from "./pages/CreatPostPage";
import Homepage from './pages/HomePage'
import ProtectedRoute from "./components/ProtectedRoute";
import PublicProfilePage from "./pages/PublicProfilePage";
import ConnectionsPage from "./pages/ConnectionsPage";
import QRScanner from "./pages/QRScanner";
import { Toaster } from "react-hot-toast";
import { useLoading } from "./context/LoadingContext";
import PageLoader from "./components/PageLoader";

function App() {

  const { loading } = useLoading();
  
  return (
  <>

  <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111827",
            color: "#fff",
            border: "1px solid #374151",
          },
        }}
      />

      {loading && <PageLoader />}

    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
       <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />
      {/* <Route path="/user/:id" element={<ProtectedRoute>
        <PublicProfilePage />
      </ProtectedRoute>} /> */}
      <Route path="/profile/:id" element={<PublicProfilePage />} />


      <Route path="/qr" element={
        <ProtectedRoute>
          <QRPage />
        </ProtectedRoute>
      } />
      <Route path="/scan" element={
        <ProtectedRoute>
          <QRScanner />
        </ProtectedRoute>
      } />

      <Route path="/requests" element={
        <ProtectedRoute>
          <RequestsPage />
        </ProtectedRoute>
      } />
      <Route path="/connections" element={<ConnectionsPage />} />

      <Route path="/chat" element={
        <ProtectedRoute>
          <ChatPage />
        </ProtectedRoute>
      } />
      <Route path="/chat/:id" element={
        <ProtectedRoute>
          <ChatPage />
        </ProtectedRoute>
      } />

      <Route path="/feed" element={
        <ProtectedRoute>
          <FeedPage />
        </ProtectedRoute>
      } />

      <Route path="/create-post" element={
        <ProtectedRoute>
          <CreatePostPage />
        </ProtectedRoute>
      } />
    </Routes>

    </>
    
    
  );
}

export default App;