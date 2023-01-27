import {interpolate, interpolateColors} from 'remotion';
import {useCurrentFrame} from 'remotion';
import {useVideoConfig} from 'remotion';
import {Circle} from '@remotion/shapes';
import React from 'react';
import {AbsoluteFill, spring} from 'remotion';
import {Rect} from './inline-debug/rect';

export const Camera: React.FC<{
	trace: boolean;
}> = ({trace}) => {
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
				backgroundImage: trace
					? 'linear-gradient(#eee, #eee)'
					: `radial-gradient(${color}, #000)`,
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
					stroke={trace ? 'rgba(0, 0, 0, 0.1)' : 'white'}
					radius={85}
					strokeWidth={10}
				/>
				<Rect
					debug={trace}
					style={{
						position: 'absolute',
					}}
					fill={trace ? 'rgba(0, 0, 0, 0.1)' : '#ff4700'}
					stroke={trace ? '#666' : 'transparent'}
					strokeWidth={trace ? 2 : 0}
					edgeRoundness={edgeRoundness}
					width={150 * scale}
					height={150 * scale}
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
