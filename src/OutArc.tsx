import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const STROKE_WIDTH = 20;

export const OutArc: React.FC = () => {
	const {width, height, fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const prog1 = spring({
		fps,
		frame: frame - 30,
		config: {
			damping: 100,
		},
	});
	const prog2 = spring({
		fps,
		frame: frame - 60,
		config: {
			damping: 100,
		},
	});

	const centerX = width / 2;
	const centerY = height / 2;

	const x = interpolate(prog1 + prog2, [0, 1, 2], [1, -1, -1]);
	const y = interpolate(prog1 + prog2, [0, 1, 2], [-1, -1, 1]);

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
