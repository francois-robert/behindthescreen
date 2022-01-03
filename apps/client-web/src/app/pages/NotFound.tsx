import TopBar from "../components/topbar/TopBar";

const NotFound = () => {
    return (
        <div data-cy="not-found">
            <TopBar/>
            <h1>Erreur 404</h1>
        </div>
    );
};

export default NotFound;