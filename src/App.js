import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./components/home/Home.js";
import Vote from './components/vote/Vote.js';
import AddAdmin from "./components/admin/AddAdmin.js";
import AddCandidate from "./components/admin/AddCandidate.js";
import Create from "./components/create/Create.js";
import LeaderBoard from "./components/leaderboard/Leaderboard.js"

function App() {

  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/create', element: <Create /> },
    { path: '/vote/:pollId', element: <Vote /> },
    { path: '/add-candidate/:pollId', element: <AddCandidate /> },
    { path: '/add-admin/:pollId', element: <AddAdmin /> },
    { path: '/leaderboard/:pollId', element: <LeaderBoard /> }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
