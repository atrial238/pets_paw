import { Select } from ".."
import {wrapper, previous, next} from './Paginator.module.scss';

const Paginator = () => {
	const items = ['Limit: 10', 'Limit: 15', 'Limit: 20']
	return (
		<div className={wrapper}>
			<button className={previous}>Previous</button>
			<Select name='Limit: 5' background='dark' items={items}/>
			<button className={next}>Next</button>
		</div>

	)
}
export default Paginator;

