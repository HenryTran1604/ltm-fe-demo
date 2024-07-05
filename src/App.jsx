import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import UserListPage from './pages/UserListPage';
import AuthProvider from './context/AuthProvider';
import AppProvider from './context/AppProvider';
import ExercisesPage from './pages/ExercisesPage';
import ScoreBoardPage from './pages/ScoreBoardPage';
import LogPage from './pages/LogPage';
import TestPage from './pages/TestPage';


function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AppProvider>

          <Routes>
            <Route path='/' element=<UserListPage /> />
            <Route path='/register' element=<RegisterPage /> />
            <Route path='/exercises' element=<ExercisesPage /> />
            <Route path='/scoreboard' element=<ScoreBoardPage /> />
            <Route path='/log' element=<LogPage/>  />
            <Route path='/test' element=<TestPage/>  />

          </Routes>
          <ToastContainer />
        </AppProvider>
      </AuthProvider>

    </HashRouter>
  );
}

export default App;
