import { Route } from 'react-router';
import './App.scss';
import {Breeds, Favourites, Gallery, Home, Voting} from './pages';



function App() {
	

  return (
	<div className='app'>
		<Route exact path={['/', '/home']} component={Home}/>
		<Route exact path='/voting' component={Voting}/>
		<Route exact path='/breeds' component={Breeds}/>
		<Route exact path='/gallery' component={Gallery}/>
		<Route exact path='/favourites' component={Favourites}/>

	</div>
  );
}

export default App;
