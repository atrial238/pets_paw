import { Select } from ".."
import {wrapper, previous, next, disabled_style} from './Paginator.module.scss';

const Paginator = (props) => {
	const items = ['Limit: 5', 'Limit: 10', 'Limit: 15', 'Limit: 20'];
	const {setNextPage, setPreviousPage, page, isLastPage, ...rest} = props;

	return (
		<div className={wrapper}>
			<button className={previous + ' ' + (page ===0 ? disabled_style : '')} onClick={setPreviousPage} disabled={page === 0 ? ' ' : ''}>Previous</button>
			<Select background='dark' items={items} {...rest}/>
			<button className={next + ' ' + (isLastPage ? disabled_style : '')} onClick={setNextPage} disabled={isLastPage ? ' ' : ''}>Next</button>
		</div>

	)
}
export default Paginator;

