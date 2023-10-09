import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import MediaList from "./pages/MediaList";
import MediaDetails from "./pages/MediaDetails";
import MediaSingleGenre from "./pages/MediaSingleGenre";
import SearchResults from "./pages/SearchResults";
import NavSearch from "./components/NavSearch";
import PeopleDetails from "./pages/PeopleDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/:mediaType",
          element: <MediaList />,
        },
        {
          path: "/:mediaType/:mediaId",
          element: <MediaDetails />,
        },
        {
          path: "/person/:personId",
          element: <PeopleDetails />,
        },
        {
          path: "/search/",
          element: <NavSearch />,
          children: [
            {
              path: "/search/:mediaType",
              element: <SearchResults />,
            },
          ],
        },
        {
          path: "/genre/:genreId/:mediaType",
          element: <MediaSingleGenre />,
        },
      ],
    },
  ]);

  return (
      <RouterProvider router={router} />
  );
}

export default App;
