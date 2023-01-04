
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import database from './components/database';
import Home from './components/home';
import Sheetdefault from './components/sheetdefault';
import projects from './components/projectPage';
import playground from './components/playground';
import urlShortener from './components/urlShortener';
import Stockgame from './components/stockGame.js';
const App = () => {


  const styles = {
    cont: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#31437d",
      color: "white",
      fontFamily: "Helvetica"

    },
    navbar: {
      backgroundColor: "#24324A",
      height: "8vh",
      display: "flex",
      flexDirection: "row",
      justifyContent: "left",
      padding: "0px 30px"



    },

    text: {

      color: "#ffffff",
      padding: "20px 30px",
      textDecoration: 'none',
    },
  }
  function textChanger(e) {
    e.target.style.color = "#33f2ac";
  }
  function textRevert(e) {
    e.target.style.color = "#ffffff";
  }
  return (
    <Router>
      <div style={styles.cont}>
        <div style={styles.navbar}>
          <p></p>
          <Link to={'/'} style={styles.text}
            onMouseEnter={textChanger}
            onMouseLeave={textRevert}
          > Home </Link>

          <Link to={'/database'} style={styles.text}
            onMouseEnter={textChanger}
            onMouseLeave={textRevert}>Database</Link>
            <Link to={'/projects'} style={styles.text} onMouseEnter={textChanger}
            onMouseLeave={textRevert}>More Projects</Link>

<Link to={'/playground'} style={styles.text} onMouseEnter={textChanger}
            onMouseLeave={textRevert}>Playground</Link>
        </div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/database' exact component={database} />
          <Route path='/playground' exact component={playground} />
          <Route path='/database/:sheetname' exact component={Sheetdefault} />
          <Route exact path='/projects' component={projects} />
          <Route exact path='/URLchanger' component={urlShortener} />

          <Route exact path='/stockgame' component={Stockgame} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;
