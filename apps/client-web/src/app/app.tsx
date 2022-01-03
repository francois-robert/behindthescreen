import styles from './app.module.scss';

import { BrowserRouter, Switch, Route } from "react-router-dom";
import About from "./pages/About";
import Characters from "./pages/Characters";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter> 
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/characters" exact component={Characters} />
        <Route path="/a-propos" exact component={About} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
