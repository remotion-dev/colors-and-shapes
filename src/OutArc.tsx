import React from 'react';
import {useVideoConfig} from 'remotion';

export const STROKE_WIDTH = 20;

export const OutArc: React.FC = () => {
	const {width, height} = useVideoConfig();

	const centerX = width / 2;
	const centerY = height / 2;

	const x = -1;
	const y = 1;

	return (
		<svg
			viewBox={`0 0 ${width} ${height}`}
			style={{
				overflow: 'visible',
			}}
		>
			<path
				d={`M ${centerX} ${centerY} L ${centerX + x * 1000} ${
					centerY + y * 1000
				}`}
				stroke="#20e8c2"
				strokeWidth={STROKE_WIDTH}
			/>
		</svg>
	);
};
