import {  BackButton, GridItems, Paginator} from "../../components";
import { wrapper, back_button, header_breeds, } from './Breeds.module.scss';

const BreedsBody = () => {
	return (
		<div className={wrapper}>
			<div className={header_breeds}>
				<div className={back_button}><BackButton name='breeds'/></div>
				<div><Paginator/></div>
			</div> 
			<GridItems/>
		</div>
	)
}
export default BreedsBody;

