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

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#d1f4b7',
			}}
		>
			{new Array(rows).fill(true).map((_, i) => {
				return (
					<div style={row}>
						{new Array(columns).fill(true).map((_, j) => {
							const index = i * rows + j;

							const spr = spring({
								fps,
								frame: frame - index,
								config: {
									damping: 200,
								},
							});

							const spr2 = spring({
								fps,
								frame: frame - 30 - index,
								config: {
									damping: 200,
								},
							});
							return (
								<Rect
									style={{
										transform: `rotate(${interpolate(
											spr2,
											[0, 1],
											[0, 45]
										)}deg) scale(${spr})`,
									}}
									width={width / columns}
									height={height / rows}
									fill="#36b000"
									edgeRoundness={0}
								/>
							);
						})}
					</div>
				);
			})}
		</AbsoluteFill>
	);
};
