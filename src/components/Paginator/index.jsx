import { Select } from ".."
import {wrapper, previous, next} from './Paginator.module.scss';

const Paginator = (props) => {
	const items = ['Limit: 5', 'Limit: 10', 'Limit: 15', 'Limit: 20'];

	return (
		<div className={wrapper}>
			<button className={previous}>Previous</button>
			<Select background='dark' items={items} {...props}/>
			<button className={next}>Next</button>
		</div>

	)
}
export default Paginator;

