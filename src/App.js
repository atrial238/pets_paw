import { Route } from 'react-router';
import './App.scss';
import {Home, Voting} from './pages';



function App() {
	
	

  return (
	<div className='app'>
		<Route exact path={['/', '/home']} component={Home}/>
		<Route exact path='/voting' component={Voting}/>
	</div>
  );
}

export default App;
