import {
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CategoriesPage from "./pages/categories/CategoriesPage";
import TourPackagesPage
from "./pages/tour-packages/TourPackagesPage";

import ProtectedRoute
from "./routes/ProtectedRoute";
import TourPackageFormPage from "./pages/tour-packages/TourPackageFormPage";
import PromotionsPage from "./pages/promotions/PromotionsPage";
import ReservationsPage
from "./pages/reservations/ReservationsPage";
import InquiriesPage from "./pages/inquiries/InquiriesPage";
import CustomersPage
from "./pages/customers/CustomersPage";
import InvoicesPage
from "./pages/invoices/InvoicesPage";
import InvoiceFormPage
from "./pages/invoices/InvoiceFormPage";
import SocialMediaPage
from "./pages/social-media/SocialMediaPage";
import HomeContentPage from "./pages/content/HomeContentPage";
import BookingPage
from "./pages/booking/BookingsPage";
import BookingDetailPage
from "./pages/booking/BookingDetailPage";
import BookingFormPage
from "./pages/booking/BookingFormPage";
import ProductContentPage
from "./pages/content/ProductContentPage";
import AboutContentPage
from "./pages/content/AboutContentPage";
import ContactMessages from "./pages/contact-messages/ContactMessages";
import UsersPage from "./pages/users/UsersPage";
import SubCategoriesPage from "./pages/subCategories/SubCategoriesPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<LoginPage />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <CategoriesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sub-categories"
        element={
          <ProtectedRoute>
            <SubCategoriesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tour-packages"
        element={
          <ProtectedRoute>
            <TourPackagesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tour-packages/create"
        element={
          <ProtectedRoute>
            <TourPackageFormPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tour-packages/edit/:id"
        element={
          <ProtectedRoute>
            <TourPackageFormPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/promos"
        element={
          <ProtectedRoute>
            <PromotionsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reservations"
        element={
          <ProtectedRoute>
            <ReservationsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/inquiries"
        element={
          <ProtectedRoute>
            <InquiriesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <CustomersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/invoices"
        element={
          <ProtectedRoute>
            <InvoicesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/invoices/create"
        element={
          <ProtectedRoute>
            <InvoiceFormPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/invoices/:id/edit"
        element={
          <ProtectedRoute>
            <InvoiceFormPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/social-media"
        element={
          <ProtectedRoute>
            <SocialMediaPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/content/home"
        element={<HomeContentPage />}
      />

      <Route
        path="/bookings"
        element={
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bookings/:id"
        element={
          <ProtectedRoute>
            <BookingDetailPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bookings/create"
        element={
          <ProtectedRoute>
            <BookingFormPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bookings/create"
        element={
          <ProtectedRoute>
            <BookingFormPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/content/product"
        element={
          <ProtectedRoute>
            <ProductContentPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/content/about"
        element={
          <ProtectedRoute>
            <AboutContentPage />
          </ProtectedRoute>  
        }
      />

      <Route
        path="/contact-messages"
        element={
          <ProtectedRoute>
            <ContactMessages />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;