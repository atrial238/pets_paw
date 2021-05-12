import {useState} from 'react';
import { Route } from 'react-router';
import './App.scss';
import {Breeds, Favourites, Gallery, Home, Voting, LikesAndDislikes, Info,} from './pages';

function App() {

	const [imageInfo, setImageInfo] = useState([]);
	const [nameBackButton, setnameBackButton] = useState();

  return (
	<div className='app'>
		<Route exact path={['/', '/home']} component={Home}/>
		<Route exact path='/voting' component={Voting}/>
		<Route exact path='/breeds' render={() => <Breeds setImageInfo={setImageInfo} setnameBackButton={setnameBackButton}/>}/>
		<Route exact path='/breeds/:imageId' render={() => <Info imageInfo={imageInfo} nameBackButton={nameBackButton}/>}/>
		<Route exact path='/gallery' render={() => <Gallery setImageInfo={setImageInfo} setnameBackButton={setnameBackButton}/>}/>
		<Route exact path='/gallery/:imageId' render={() => console.log('soem') || <Info imageInfo={imageInfo} nameBackButton={nameBackButton}/>}/>
		<Route exact path='/favourites' component={Favourites}/>
		<Route exact path='/likes-and-dislikes' component={LikesAndDislikes}/>
		


	</div>
  );
}

export default App;
