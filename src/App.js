import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentHomePage from './pages/StudentHomePage';
import StudentCalendarPage from './pages/StudentCalendarPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CounselorHomePage from './pages/CounselorHomePage';
import EventPage from './pages/EventPage';
import CreateEvent from './pages/CreateEvent';
import ForgotPassword from './pages/ForgotPassword';
import { IDContextProvider } from './context/IDContext';

function App() {
  return (
    <IDContextProvider>
      <BrowserRouter >
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/home' element={<StudentHomePage />} />
          <Route path='/calendar' element={<StudentCalendarPage />} />
          <Route path='/counselorHome' element={<CounselorHomePage />} />
          <Route path='/counselorEvent' element={<EventPage />} />
          <Route path='/createEvent' element={<CreateEvent />} />
          <Route path='/forgotPassword/:id' element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter >
    </IDContextProvider>
  );
}

export default App;
