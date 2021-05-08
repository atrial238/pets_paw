import { Route } from 'react-router';
import { votingAPI } from './API/api';
import './App.scss';
import {Breeds, Gallery, Home, Voting} from './pages';



function App() {
	

  return (
	<div className='app'>
		<Route exact path={['/', '/home']} component={Home}/>
		<Route exact path='/voting' component={Voting}/>
		<Route exact path='/breeds' component={Breeds}/>
		<Route exact path='/gallery' component={Gallery}/>


	</div>
  );
}

export default App;
