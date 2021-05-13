import { BodyContainter, SearchPanel } from "../../components";
import { useBusinessLayerMyDogs } from "../../hooks/useBusinessLayerMyDogs";
import { Header, MyDogsBody } from "../../modules";

const MyDogs = () => {
	
	const propsMyDogsBody = useBusinessLayerMyDogs();
	
	return (
		<div className='wrapper_page'>
			<Header/>
			<div>
				<SearchPanel/>
				<BodyContainter>
					<MyDogsBody {...propsMyDogsBody}/>
				</BodyContainter>
			</div>
		</div>
	)
}
export default MyDogs;