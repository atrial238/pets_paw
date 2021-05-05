import { Header } from "../../modules";
import { wrapper, right_hand_side} from './Home.module.scss';
import girlAndPet from '../../assets/images/Home/girl-and-pet.png';

const Home = () => {
	return (
		<div className={wrapper}>
			<Header/>
			<div className={right_hand_side}>
				<img src={girlAndPet} alt="girl and pet"/>
			</div>
		</div>
	)
}
export default Home;