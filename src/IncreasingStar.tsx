import {Star} from '@remotion/shapes';
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

export const IncreasingStar: React.FC<{
	width: number;
}> = ({width}) => {
	const frame = useCurrentFrame();
	const points = interpolate(frame, [0, 100], [10, 20]);

	return (
		<Star
			fill="transparent"
			stroke="#061d3c"
			strokeWidth={10}
			points={Math.round(points)}
			innerRadius={width / 6}
			outerRadius={width / 3}
			style={{
				position: 'absolute',
			}}
		/>
	);
};
