import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//UI views
import DashBoard from "../pages/DashBoard";
import FormBuilder from "../pages/FormBuilder";
import FormLists from "../pages/FormLists";
import FormView from "../pages/FormView";
import Navbar from "../components/Navbar";
import NotFound from "../components/NotFound";

const pages = [
    {
        exact: true,
        path: "/",
        component: DashBoard,
        key: 1
    },
    {
        exact: true,
        path: "/formbuilder",
        component: FormBuilder,
        key: 2
    },
    {
        exact: true,
        path: "/forms",
        component: FormLists,
        key: 3
    },
    {
        exact: true,
        path: "/forms/:id",
        component: FormView,
        key: 4
    },
    {
        exact: false,
        path: "/*",
        component: NotFound,
        key: 5
    }
];

const Routes = () => {
    return (
        <Router>
            <Navbar />
            <hr/>
            <Switch>
                {pages.map((route) => {
                    return <Route {...route} />
                })}
            </Switch>
        </Router>
    )
};

export default Routes;