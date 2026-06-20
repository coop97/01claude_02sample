import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
import ProtectedRoute from './routes/ProtectedRoute'
import AdminRoute from './routes/AdminRoute'

import Home from './pages/Home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import LoginSuccess from './pages/auth/LoginSuccess'
import SignupSuccess from './pages/auth/SignupSuccess'
import MyPage from './pages/mypage/MyPage'
import NotFound from './pages/NotFound'

import CompanyLayout from './pages/company/CompanyLayout'
import About from './pages/company/About'
import Ceo from './pages/company/Ceo'
import Vision from './pages/company/Vision'
import History from './pages/company/History'
import Location from './pages/company/Location'

import ProductList from './pages/products/ProductList'
import ProductDetail from './pages/products/ProductDetail'

import PostList from './pages/community/PostList'
import PostDetail from './pages/community/PostDetail'
import PostWrite from './pages/community/PostWrite'

import InquiryWrite from './pages/inquiry/InquiryWrite'
import InquiryList from './pages/inquiry/InquiryList'

import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminProducts from './pages/admin/AdminProducts'
import AdminPosts from './pages/admin/AdminPosts'
import AdminInquiries from './pages/admin/AdminInquiries'
import AdminSettings from './pages/admin/AdminSettings'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="login-success" element={<LoginSuccess />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signup-success" element={<SignupSuccess />} />

            <Route path="company" element={<CompanyLayout />}>
              <Route index element={<About />} />
              <Route path="ceo" element={<Ceo />} />
              <Route path="vision" element={<Vision />} />
              <Route path="history" element={<History />} />
              <Route path="location" element={<Location />} />
            </Route>

            <Route path="products">
              <Route index element={<ProductList />} />
              <Route path=":id" element={<ProductDetail />} />
            </Route>

            <Route path="community">
              <Route index element={<PostList />} />
              <Route path=":id" element={<PostDetail />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="mypage" element={<MyPage />} />
              <Route path="community/new" element={<PostWrite />} />
              <Route path="community/:id/edit" element={<PostWrite />} />
              <Route path="inquiries" element={<InquiryList />} />
              <Route path="inquiries/new" element={<InquiryWrite />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="posts" element={<AdminPosts />} />
                <Route path="inquiries" element={<AdminInquiries />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
