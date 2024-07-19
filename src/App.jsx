import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import UserListPage from './pages/UserListPage';
import AuthProvider from './context/AuthProvider';
import ExercisesPage from './pages/ExercisesPage';
import ScoreBoardPage from './pages/ScoreBoardPage';
import LogPage from './pages/LogPage';
import LoginPage from './pages/LoginPage';
import AdminContestListPage from './pages/admin/AdminContestListPage';
import AdminManageContestPage from './pages/admin/AdminManageContestPage';
import AdminUserListPage from './pages/admin/AdminUserListPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import AppProvider from './context/AppProvider';
import PublicRoute from './routes/PublicRoute';
import AdminRankingPage from './pages/admin/AdminRankingPage';
import AdminEditContestPage from './pages/admin/AdminEditContestPage';
import AdminExerciseListPage from './pages/admin/AdminExerciseListPage';
import AdminEditExercisePage from './pages/admin/AdminEditExercisePage';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path='/app/' element={<PrivateRoute />}>
              <Route path='/app/exercises' element={<ExercisesPage />} />
              <Route path='/app/scoreboard' element={<ScoreBoardPage />} />
              <Route path='/app/log' element={<LogPage />} />
              <Route path='/app/list' element={<UserListPage />} />
            </Route>
            <Route path='/app/' element={<AdminRoute />}>
              <Route path='/app/admin/contests' element={<AdminContestListPage />} />
              <Route path='/app/admin/contests/add' element={<AdminEditContestPage />} />
              <Route path='/app/admin/contests/detail/:id' element={<AdminEditContestPage />} />
              <Route path='/app/admin/users' element={<AdminUserListPage />} />
              <Route path='/app/admin/exercises' element={<AdminExerciseListPage />} />
              <Route path='/app/admin/exercises/add' element={<AdminEditExercisePage />} />
              <Route path='/app/admin/exercises/detail/:id' element={<AdminEditExercisePage />} />
              <Route path='/app/admin/ranking' element={<AdminRankingPage />} />
              <Route path='/app/admin/contests/manage' element={<AdminManageContestPage />} />
            </Route>
            <Route path='/' element={<PublicRoute/>} >
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/login' element={<LoginPage />} />
            </Route>
            
            <Route path='/*' element={<NotFoundPage />} />
          </Routes>

        </AppProvider>



        {/* {
            user !== null ? (
              <>
                {
                  user.role === 'ROLE_USER' ? (
                    <>
                      {
                        isContestOpen ? (
                          <>
                            <Route path='/exercises' element={<ExercisesPage />} />
                            <Route path='/scoreboard' element={<ScoreBoardPage />} />
                            <Route path='/log' element={<LogPage />} />
                            <Route path='/list' element={<UserListPage />} />

                          </>) : (
                          <>
                            <Route path='/*' element={<WaitingPage startTime={startTime} isContestOpen={isContestOpen} isLoggedIn={isLoggedIn} />} />
                          </>)
                      }
                    </>) :
                    (<>
                      <Route path='/admin/contests' element={<AdminContestListPage />} />
                      <Route path='/admin/user-list' element={<AdminUserListPage />} />
                      <Route path='/admin/*' element={<AdminManageContestPage />} />
                    </>)
                }
              </>) : (
              <>
                <Route path='/*' element={<LoginPage />} />
                <Route exact path='/register' element={<RegisterPage />} />
              </>)
          } */}
        <ToastContainer />
      </AuthProvider>

    </BrowserRouter >
  );
}

export default App;
