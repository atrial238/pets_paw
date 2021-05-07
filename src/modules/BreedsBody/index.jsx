import {  BackButton, Select} from "../../components";
import {SortAZ, SortZA} from '../../components/Svg'
import { wrapper, back_button, header_breeds, sort_wrapper, sort_az, sort_za, breeds_select} from './Breeds.module.scss';

const BreedsBody = () => {
	const breeds = ['Dog', 'Cat', 'Hamster', 'Parrot', 'Spider', 'Goldfish', 'Dog', 'Cat', 'Hamster', 'Parrot', 'Spider', 'Goldfish', 
				'Dog', 'Cat', 'Hamster', 'Parrot', 'Spider', 'Goldfish', 'Dog', 'Cat', 'Hamster', 'Parrot', 'Spider', 'Goldfish'];
	const limit = ['Limit: 10', 'Limit: 15', 'Limit: 20']
	return (
		<div className={wrapper}>
			<div className={header_breeds}>
				<div className={back_button}><BackButton name='voting'/></div>
				<div className={breeds_select}><Select name='All breeds' background='dark' items={breeds}/></div>
				<div className={sort_wrapper}>
					<Select name='Limit: 5' background='dark' items={limit}/>
					<button className={sort_az}><SortAZ/></button>
					<button className={sort_za}><SortZA/></button>
				</div>
			</div> 
		</div>
	)
}
export default BreedsBody;

