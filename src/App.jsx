import "./App.css";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Allbooks from "./pages/Allbooks";
import Dashboard from "./components/Dashboard";
import Webinar from "./pages/Webinar";
import Lectures from "./pages/Lectures";
import WebinarDetails from "./pages/WebinarDetails";
import BookDetails from "./pages/BookDetails";
import ProfileSettings from "./pages/ProfileSettings";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import VideoPlayer from "./components/VideoPlayer";
import ReadBook from "./pages/ReadBook";
import AdminPanelLayout from "./pages/Admin Pages/Dashboard";
import Webinars from "./pages/Admin Pages/Webinar";
import VideoLecture from "./pages/Admin Pages/VideoLecture";
import Recordings from "./pages/Admin Pages/Recordings";
import Subscription from "./pages/Admin Pages/Subscription";
import Users from "./pages/Admin Pages/Users";
import BookCreation from "./pages/Admin Pages/BookCreation";
import Profile from "./pages/Admin Pages/Profile";
import Notifications from "./pages/Admin Pages/Notifications";
import AdminHomepage from "./pages/Admin Pages/Homepage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route index element={<Dashboard />} />
          <Route path="/all-books" element={<Allbooks />} />
          <Route path="/all-books/:id" element={<BookDetails />} />
          <Route path="/all-books/:id/read-book" element={<ReadBook />} />
          <Route path="/webinar" element={<Webinar />} />
          <Route path="/webinar/:id" element={<WebinarDetails />} />
          <Route path="/lectures" element={<Lectures />} />
          <Route path="/lectures/:id" element={<VideoPlayer />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/subscription-plans" element={<SubscriptionPlans />} />
        </Route>

        <Route path="/dashboard" element={<AdminPanelLayout />}>
        <Route index element={<AdminHomepage />} />
          <Route path="/dashboard/webinars" element={<Webinars />} />
          <Route path="/dashboard/video-lecture" element={<VideoLecture />} />
          <Route path="/dashboard/recordings" element={<Recordings />} />
          <Route path="/dashboard/subscription" element={<Subscription />} />
          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/book-creation" element={<BookCreation />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
