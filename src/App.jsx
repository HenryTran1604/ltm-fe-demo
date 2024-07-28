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
import PracticeExercisesPage from './pages/PracticeExercisesPage';
import PracticeScoreBoardPage from './pages/PracticeScoreBoardPage';
import TestPage from './pages/TestPage';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path='/test' element={<TestPage/>}/>
            <Route path='/' element={<PrivateRoute />}>
              <Route path='practice/exercises' element={<PracticeExercisesPage />} />
              <Route path='practice/scoreboard' element={<PracticeScoreBoardPage />} />
              <Route path='contest/:contestId/exercises' element={<ExercisesPage />} />
              <Route path='contest/:contestId/scoreboard' element={<ScoreBoardPage />} />
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
            </Route>

            <Route path='/' element={<PublicRoute />} >
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/login' element={<LoginPage />} />
            </Route>
            <Route path='/*' element={<NotFoundPage />} />


          </Routes>

        </AppProvider>
        <ToastContainer />
      </AuthProvider>

    </BrowserRouter >
  );
}

export default App;
