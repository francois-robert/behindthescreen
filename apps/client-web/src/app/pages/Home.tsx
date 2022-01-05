import { NavLink } from "react-router-dom";
import TopBar from "../components/topbar/TopBar";

const Home = () => {
    return (
        <div data-cy="home-page">
            <TopBar/>
            <NavLink to="/a-propos">A propos</NavLink>
        </div>
    );
};

export default Home;