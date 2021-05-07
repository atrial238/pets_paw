import { BodyContainter, SearchPanel } from "../../components";
import { GalleryBody, Header } from "../../modules";
import {wrapper} from './Gallery.module.scss';

const Gallery = () => {
	return (
		<div className='wrapper_page'>
			<Header/>
			<div className={wrapper}>
				<SearchPanel/>
				<BodyContainter>
					<GalleryBody/>
				</BodyContainter>
			</div>
		</div>
	)
}
export default Gallery;