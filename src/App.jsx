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


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}>
            <Route index element={<Dashboard />} />
            <Route path="all-books" element={<Allbooks />} />
            <Route path="all-books/:id" element={<BookDetails />} />
            <Route path="webinar" element={<Webinar />} />
            <Route path="webinar/:id" element={<WebinarDetails />} />
            <Route path="lectures" element={<Lectures />} />
            <Route path="profile-settings" element={<ProfileSettings/>} />
            <Route path="subscription-plans" element={<SubscriptionPlans/>} />
            <Route path="/lectures/:id" element={ <VideoPlayer/> }/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
