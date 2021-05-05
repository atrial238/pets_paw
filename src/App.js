import './App.css';
import {NavItem} from './components';

import petBreeds from './assets/images/Navigation/pet-breeds.png';
import voteTable from './assets/images/Navigation/vote-table.png';
import imagesSearch from './assets/images/Navigation/images-search.png';

function App() {
	const imgSize1 = {width: '117px', height: '163px'}
	const imgSize2 = {width: '100px', height: '124px'}
	const imgSize3 = {width: '112px', height: '190px'}

	const propsNav1 = {imgSrc: petBreeds, name: 'breeds', pageLink: '/breeds', isActive: false, backgroundColor: 'green', imgSize: imgSize1}
	const propsNav2 = {imgSrc: voteTable, name: 'voting', pageLink: '/voting', isActive: false, backgroundColor: 'purple', imgSize: imgSize2}
	const propsNav3 = {imgSrc: imagesSearch, name: 'gallery', pageLink: '/gallery', isActive: false, backgroundColor: 'yellow', imgSize: imgSize3}

  return (
	<div className="App">
		<NavItem {...propsNav1} />
		<NavItem {...propsNav2} />
		<NavItem {...propsNav3} />
	</div>
  );
}

export default App;
