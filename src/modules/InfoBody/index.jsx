import PropTypes from 'prop-types';
import React from 'react';
import {  BackButton} from "../../components";
import { wrapper, back_button, header_breeds, image_wrapper, info_params, info_contant,
	image_container, info, breed_for, info_body, info_temperament, header_breeds_id} from './InfoBody.module.scss';

const InfoBody = ({imageInfo, nameBackButton}) => {
	const { 
		breeds:[
			{
				bred_for: breedFor,
				height: {metric: height},
				id: breedId,
				life_span: lifeSpan,
				name,
				temperament,
				weight: {metric: weight},
			}
		],
		id: imageId,
		url
	} = imageInfo;
		
	return (
		<div className={wrapper}>
			<div className={header_breeds}>
				<div className={back_button}><BackButton name={nameBackButton}/></div>
				<div className={header_breeds_id}>Breed id {breedId}</div>
			</div> 
			<div className={info_contant}>
				<div className={image_wrapper}>
					<div className={image_container}><img src={url} alt="some pet" /></div>
				</div>
				<div className={info}>
					<h2><span>{name}</span></h2>
					<div className={breed_for}>{breedFor}</div>
					<div className={info_body}>
						<div className={info_temperament}>
							<h3>Temperament:</h3>
							<p>{temperament}</p>
						</div>
						<div className={info_params}>
							<p><span>Height: </span>{height} cm</p>
							<p><span>weight: </span>{weight} kg</p>
							<p><span>Life span: </span>{lifeSpan}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default InfoBody;
