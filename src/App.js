import { Route } from 'react-router';
import './App.scss';
import {Breeds, Home, Voting} from './pages';



function App() {
	
	

  return (
	<div className='app'>
		<Route exact path={['/', '/home']} component={Home}/>
		<Route exact path='/voting' component={Voting}/>
		<Route exact path='/breeds' component={Breeds}/>

	</div>
  );
}

export default App;
