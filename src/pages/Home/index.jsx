import { Header } from "../../modules";
import {right_hand_side, wrapper_page} from './Home.module.scss';
import girlAndPet from '../../assets/images/Home/girl-and-pet.png';

const Home = () => {
	return (
		<div className={wrapper_page}>
			<Header isHome={true}/>
			<div className={right_hand_side}>
				<img src={girlAndPet} alt="girl and pet"/>
			</div>
		</div>
	)
}
export default Home;