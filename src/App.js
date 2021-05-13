import {useState} from 'react';
import { Route } from 'react-router';
import './App.scss';
import {Breeds, Favourites, Gallery, Home, Voting, LikesAndDislikes, Info,} from './pages';

function App() {

	

  return (
	<div className='app'>
		<Route exact path={['/', '/home']} component={Home}/>
		<Route exact path='/voting' component={Voting}/>
		<Route exact path='/breeds' render={() => <Breeds />}/>
		<Route exact path='/gallery' render={() => <Gallery />}/>
		<Route exact path='/info/:imageId' render={() => <Info />}/>
		<Route exact path='/favourites' component={Favourites}/>
		<Route exact path='/likes-and-dislikes' component={LikesAndDislikes}/>
	</div>
  );
}

export default App;
