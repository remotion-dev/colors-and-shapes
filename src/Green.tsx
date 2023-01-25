import {noise2D} from '@remotion/noise';
import {Rect} from '@remotion/shapes';
import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

const row: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
};

const rows = 6;
const columns = 6;

export const Green: React.FC = () => {
	const {width, height, fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const weights: number[] = new Array(rows).fill(0).map((_, i) => {
		return i + frame / 10;
	});

	const spr1 = spring({
		fps,
		frame: frame - 50,
		config: {
			mass: 1.2,
		},
	});
	const spr2 = spring({
		fps,
		frame: frame - 70,
		config: {
			damping: 200,
		},
	});

	const totalWeight = weights.reduce((a, b) => a + b, 0);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#d1f4b7',
			}}
		>
			<AbsoluteFill
				style={{
					transform: 'scale(0.8)',
				}}
			>
				{new Array(rows).fill(true).map((_, i) => {
					return (
						<div style={row}>
							{new Array(columns).fill(true).map((_, j) => {
								const spr = 1;

								const weightFactor = weights[i] / totalWeight;
								const factor = interpolate(
									spr1,
									[0, 1],
									[weightFactor, 1 / rows]
								);

								const edgeRoundness = interpolate(
									spr1 + spr2,
									[0, 1, 2],
									[0.1, 0.6, 0.1]
								);

								const rotation = interpolate(
									spr1 + spr2,
									[0, 1, 2],
									[0, 45, 90 + 45]
								);

								const scale = interpolate(spr1 + spr2, [0, 1, 2], [1, 0.3, 1]);

								return (
									<Rect
										style={{
											transform: `rotate(${rotation}deg) scale(${scale})`,
										}}
										width={width / columns}
										height={factor * height}
										fill="#36b000"
										edgeRoundness={edgeRoundness}
									/>
								);
							})}
						</div>
					);
				})}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
