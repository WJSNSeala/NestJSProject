import React from 'react';
import {Route} from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import { Routes } from '../node_modules/react-router/index';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/@:username' element={<PostListPage />} />
        <Route path='/' element={<PostListPage />} />
        <Route element={<LoginPage />} path='/login' />
        <Route element={<RegisterPage />} path='/register' />
        <Route element={<WritePage />} path='/write' />
        <Route element={<PostPage />} path='/@:username/:postId' />
      </Routes>
    </div>
  );
};

export default App;