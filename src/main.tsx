import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout";
import { Auth } from "./pages/auth";
import { MainPage } from "./pages/mainPage";
import { EditTravelsPage } from "./pages/editTravelsPage";
import { AuthGuard } from "./features/login/authGuard";
import { Registration } from "./pages/registration";
import { NewTravel } from "./pages/newTravel";
import { Editor } from "./pages/editor";
import { PublishPage } from "./pages/publishPage";
import { ArticlePage } from "./pages/articlePage";
import { UserProfilePage } from "./pages/userProfilePage";
import { AfterActivatePage } from "./features/login/AfterActivatePage";
import { AuthActivate } from "./pages/AuthActivate.tsx";
import { ForgotPasswordPage } from "./pages/forgotPassword";
import { ResetPasswordPage } from "./pages/resetPassword";
import { MyFavoriteArticlePage } from "./pages/myFavoriteArticlePage/index.tsx";

const container = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/authactivate",
    element: <AuthActivate />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPasswordPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MainPage title="Cowtravel.ru - журнал ваших путешествий" />,
      },
      {
        path: "/:pageNumber/",
        element: <MainPage title="Cowtravel.ru - журнал ваших путешествий" />,
      },
      {
        path: "/edittravels",
        element: <EditTravelsPage />,
      },
      {
        path: "/edittravels/new",
        element: <NewTravel />,
      },
      {
        path: "/edittravels/:id",
        element: <Editor />,
      },
      {
        path: "/edittravels/publish/:id",
        element: <PublishPage />,
      },
      {
        path: "/article/:id",
        element: <ArticlePage />,
      },
      {
        path: "/user/:id",
        element: <UserProfilePage />,
      },
      {
        path: "/user/favoriteArticle",
        element: <MyFavoriteArticlePage />,
      },
    ],
  },
]);

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <AuthGuard>
        <RouterProvider router={router} />
      </AuthGuard>
    </Provider>
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
