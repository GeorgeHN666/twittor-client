import Home from '../pages/Home';
import Error404 from '../pages/Error404';
import User from '../pages/user/User';
import Users from '../pages/users';


const Data = [
    {
      page: Users,
      path: "/users",
      exact: true,
    },
    {
      page: User,
      path: "/:i",
      exact: true,
    },
    {
      page: Home,
        path: "/",
        exact: true,
      },
      {
        path: "*",
        page: Error404,
      },
];

export default Data;