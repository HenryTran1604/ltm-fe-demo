import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from './context/AuthProvider';
import ExercisesPage from './pages/ExercisesPage';
import ScoreBoardPage from './pages/ScoreBoardPage';
import LogPage from './pages/LogPage';
import LoginPage from './pages/LoginPage';
import AdminContestListPage from './pages/admin/AdminContestListPage';
import AdminContestDetailPage from './pages/admin/AdminContestDetailPage';
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
import ContestListPage from './pages/ContestListPage';
import AdminManageContestPage from './pages/admin/AdminManageContestPage';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path='/' element={<PrivateRoute />}>
              <Route path='contest/:contestId/exercises' element={<ExercisesPage />} />
              <Route path='scoreboard/:contestId' element={<ScoreBoardPage />} />
              <Route path='log' element={<LogPage />} />
              <Route path='contests' element={<ContestListPage />} />
              <Route path='/admin/' element={<AdminRoute />}>
                <Route path='contests' element={<AdminContestListPage />} />
                <Route path='contests/add' element={<AdminEditContestPage />} />
                <Route path='contests/:contestId/edit' element={<AdminEditContestPage />} />
                <Route path='contests/:contestId/detail' element={<AdminContestDetailPage />} />
                <Route path='contests/:contestId/manage' element={<AdminManageContestPage />} />
                <Route path='contests/:contestId/ranking' element={<AdminRankingPage />} />
                <Route path='users' element={<AdminUserListPage />} />
                <Route path='exercises' element={<AdminExerciseListPage />} />
                <Route path='exercises/add' element={<AdminEditExercisePage />} />
                <Route path='exercises/:exerciseId/detail' element={<AdminEditExercisePage />} />
              </Route>
              <Route path='/*' element={<NotFoundPage />} />

            </Route>

            <Route path='/' element={<PublicRoute />} >
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/login' element={<LoginPage />} />
            </Route>

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
                      <Route path='/admin/*' element={<AdminContestDetailPage />} />
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
