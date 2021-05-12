import {useState} from 'react';
import { Route } from 'react-router';
import './App.scss';
import {Breeds, Favourites, Gallery, Home, Voting, LikesAndDislikes, Info,} from './pages';

function App() {

	const [imageInfo, setImageInfo] = useState([]);
console.log(imageInfo)
  return (
	<div className='app'>
		<Route exact path={['/', '/home']} component={Home}/>
		<Route exact path='/voting' component={Voting}/>
		<Route exact path='/breeds' render={() => <Breeds setImageInfo={setImageInfo}/>}/>
		<Route exact path='/breeds/:imageId' render={() => <Info imageInfo={imageInfo}/>}/>
		<Route exact path='/gallery' component={Gallery}/>
		<Route exact path='/favourites' component={Favourites}/>
		<Route exact path='/likes-and-dislikes' component={LikesAndDislikes}/>
		


	</div>
  );
}

export default App;
console.log(' d' % 1)