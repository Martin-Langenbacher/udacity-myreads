import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";
import SearchPage from "./SearchPage";
import HomePage from "./HomePage";
import BookDetailPage from "./BookDetailPage";
import RootPage from "./components/Root";

const SHELFS = [
  { shelfname: "currentlyReading", title: "Currently Reading" },
  { shelfname: "wantToRead", title: "Want to Read" },
  { shelfname: "read", title: "Read" },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      { index: true, element: <HomePage shelfs={SHELFS} /> },
      { path: "search", element: <SearchPage /> },
      { path: "book/:id", element: <BookDetailPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
