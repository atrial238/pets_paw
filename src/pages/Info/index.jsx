import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { imageAPI } from "../../API/api";
import { BodyContainter, Placeholder, SearchPanel } from "../../components";
import {  Header, InfoBody } from "../../modules";
import {error, Info_contant} from './Info.module.scss';

const Info = props => { 

	const templateImageInfo = {
			breeds:[
				{
					bred_for: '',
					height: {metric: ''},
					id: '',
					life_span: '',
					name: '',
					temperament: '',
					weight: {metric: ''},
				}
			],
			id: '',
			url: ''
	}

	const {imageId} = useParams();
	const defaultImageInfo = Array.isArray(props.imageInfo) ? templateImageInfo : props.imageInfo ;

	const [imageInfo, setImageInfo] = useState(defaultImageInfo);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
	
		if(Array.isArray(props.imageInfo)){
			setIsLoading(true);
			setIsError(false);

			imageAPI.getSpecificImage(imageId)
				.then(res => {
					if(res === 'error'){
						setIsLoading(false);
						setIsError(true);
					}else{
						setImageInfo(res);
						setIsLoading(false);
						setIsError(false);
					}
				}
			)
		}
	}, [imageId]);

	return (
		<div className='wrapper_page'>
			<Header/>
			<div>
				<SearchPanel/>
				<BodyContainter>
					<div className={Info_contant}>
					{isError 
						? <div className={error}>Oops! Something went wrong.</div>
						: (isLoading && <Placeholder/>) || <InfoBody imageInfo={imageInfo}/>
					}
					</div>
				</BodyContainter>
			</div>
		</div>
	)
}
export default Info;