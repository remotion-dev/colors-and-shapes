import {makeTriangle} from '@remotion/shapes';
import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const MysteriousTriangle: React.FC<{
	length: number;
}> = ({length}) => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const rotation = new Array(10)
		.fill(true)
		.map((_, i) => {
			return spring({
				fps,
				frame,
				config: {
					damping: 200,
				},
				delay: i * 30,
			});
		})
		.reduce((acc, curr) => acc + curr / 3, 0);

	const {height, path, transformOrigin, width} = makeTriangle({
		length,
		direction: 'right',
		edgeRoundness: 1,
	});

	return (
		<svg
			viewBox={`0 0 ${width} ${height}`}
			style={{
				width,
				height,
				overflow: 'visible',
				marginLeft: 30,
			}}
		>
			<path
				style={{
					transform: `rotate(${rotation * 360}deg) `,
					transformOrigin: transformOrigin
						.split(' ')
						.map((s) => s + 'px')
						.join(' '),
				}}
				d={path}
				stroke="#20e8c2"
				strokeWidth={10}
				fill="none"
			/>
		</svg>
	);
};
