import { Route } from 'react-router';
import {app} from './App.module.scss';
import {Home} from './pages';



function App() {
	
	

  return (
	<div className={app}>
		<Route exact path={['/', '/home']} component={Home}/>
	</div>
  );
}

export default App;
