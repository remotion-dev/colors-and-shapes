import {interpolate, interpolateColors} from 'remotion';
import {useCurrentFrame} from 'remotion';
import {useVideoConfig} from 'remotion';
import {Circle, Rect} from '@remotion/shapes';
import React from 'react';
import {AbsoluteFill, spring} from 'remotion';

export const Camera: React.FC = () => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const spr = spring({
		fps,
		frame: frame - 20,
		config: {
			damping: 200,
		},
	});

	const edgeRoundness = interpolate(
		spr,
		[0, 1],
		[(4 * (Math.sqrt(2) - 1)) / 3, 1]
	);

	const scale = interpolate(spr, [0, 1], [1, 0.5]);
	const totalScale = interpolate(spr, [0, 1], [1.2, 1]);
	const color = interpolateColors(spr, [0, 1], ['#000', '#555']);

	return (
		<AbsoluteFill
			style={{
				backgroundImage: `radial-gradient(${color}, #000)`,
				scale: String(totalScale),
			}}
		>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Circle
					style={{
						position: 'absolute',
					}}
					fill="transparent"
					stroke="white"
					radius={85}
					strokeWidth={10}
				/>
				<Rect
					style={{
						scale: String(scale),
						position: 'absolute',
					}}
					fill="#ff4700"
					edgeRoundness={edgeRoundness}
					width={150}
					height={150}
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
