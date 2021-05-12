import { BodyContainter, SearchPanel } from "../../components";
import {  Header, InfoBody } from "../../modules";

const Info = ({imageInfo}) => { 

	return (
		<div className='wrapper_page'>
			<Header/>
			<div>
				<SearchPanel/>
				<BodyContainter>
					<InfoBody imageInfo={imageInfo}/>
				</BodyContainter>
			</div>
		</div>
	)
}
export default Info;