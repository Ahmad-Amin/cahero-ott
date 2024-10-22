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
import Subscription from "./pages/Admin Pages/Subscription";
import Users from "./pages/Admin Pages/Users";
import BookCreation from "./pages/Admin Pages/BookCreation";
import Profile from "./pages/Admin Pages/Profile";
import Notifications from "./pages/Admin Pages/Notifications";
import AdminHomepage from "./pages/Admin Pages/Homepage";
import CreateWebinar from "./pages/Admin Pages/CreateWebinar";
import ManageWebinar from "./pages/Admin Pages/ManageWebinar";
import RecordedWebinars from "./pages/Admin Pages/RecordedWebinars";
import CreateLecture from "./pages/Admin Pages/CreateLecture";
import CreateNewPlan from "./pages/Admin Pages/CreateNewPlan";
import ManagePlans from "./pages/Admin Pages/ManagePlans";
import CreateBook from "./pages/Admin Pages/CreateBook";
import ManageBook from "./pages/Admin Pages/ManageBook";
import CreateNotifications from "./pages/Admin Pages/CreateNotifications";
import EditLecture from "./pages/Admin Pages/EditLecture";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import ProtectedRoute from "./components/ProtectedRoute";
import WebinarStream from "./pages/Admin Pages/stream/WebinarStream";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoinStream from "./pages/stream/JoinStream";
import StreamPage from "./pages/stream/StreamPage";
import NotificationsUser from "./pages/notifications"
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />}>
              <Route index element={<Dashboard />} />
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/all-books" element={<Allbooks />} />
              <Route path="/all-books/:id" element={<BookDetails />} />
              <Route path="/all-books/:id/read-book" element={<ReadBook />} />
              <Route path="/webinar" element={<Webinar />} />
              <Route path="/webinar/:id" element={<WebinarDetails />} />
              <Route path="/documentaries" element={<Lectures />} />
              <Route path="/documentaries/:id" element={<VideoPlayer />} />
              <Route path="/profile-settings" element={<ProfileSettings />} />
              <Route path="/webinar/:id/user-lobby" element={<StreamPage />} />
              <Route path="/notifications" element={<NotificationsUser />} />
              <Route
                path="/subscription-plans"
                element={<SubscriptionPlans />}
              />
            </Route>

            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <AdminPanelLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminHomepage />} />
              <Route path="webinars" element={<Webinars />} />
              <Route
                path="webinars/create-webinar"
                element={<CreateWebinar />}
              />
              <Route
                path="webinars/:id/manage-webinar"
                element={<ManageWebinar />}
              />
              <Route path="documentaries" element={<VideoLecture />} />
              <Route
                path="documentaries/create-documentary"
                element={<CreateLecture />}
              />
              <Route
                path="documentaries/:id/edit-documentary"
                element={<EditLecture />}
              />
              <Route path="recordings" element={<RecordedWebinars />} />
              <Route path="subscription" element={<Subscription />} />
              <Route
                path="subscription/create-new-plan"
                element={<CreateNewPlan />}
              />
              <Route
                path="subscription/manage-plan"
                element={<ManagePlans />}
              />
              <Route path="users" element={<Users />} />
              <Route path="book-creation" element={<BookCreation />} />
              <Route
                path="book-creation/create-new-book"
                element={<CreateBook />}
              />
              <Route
                path="book-creation/:id/manage-book"
                element={<ManageBook />}
              />
              <Route path="profile" element={<Profile />} />
              <Route path="notifications" element={<Notifications />} />
              <Route
                path="notifications/create-notification"
                element={<CreateNotifications />}
              />
              <Route
                path="webinars/:webinarId/webinar-lobby"
                element={<WebinarStream/>}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
