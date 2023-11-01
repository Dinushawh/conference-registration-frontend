import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const Layout = lazy(() => import("../layouts/Layout"));
const RegistrationForm = lazy(() => import("../pages/RegistrationScreen"));
const UserDashboard = lazy(() => import("../pages/userDashboard"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/*" element={<Navigate to="/register-now" />} />
          <Route
            path="/register-now"
            element={
              <Suspense
                fallback={
                  <>
                    <p>Loading..</p>
                  </>
                }
              >
                <RegistrationForm />
              </Suspense>
            }
          />
          <Route
            path="/registerd-users"
            element={
              <Suspense
                fallback={
                  <>
                    <p>Loading..</p>
                  </>
                }
              >
                <UserDashboard />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
