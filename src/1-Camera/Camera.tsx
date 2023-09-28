import React from 'react';
import {interpolate} from 'remotion';
import {useCurrentFrame} from 'remotion';
import {useVideoConfig} from 'remotion';
import {Circle} from '@remotion/shapes';
import {AbsoluteFill, spring} from 'remotion';
import {Rect} from './scaffold-lines/rect';

export const Camera: React.FC<{
	trace: boolean;
}> = ({trace}) => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const spr =
		spring({
			fps,
			frame,
			config: {
				damping: 200,
			},
			delay: 20,
		}) -
		spring({
			fps,
			frame,
			config: {
				damping: 200,
			},
			delay: 50,
		});

	const edgeRoundness = interpolate(
		spr,
		[0, 1],
		[(4 * (Math.sqrt(2) - 1)) / 3, 1]
	);

	const scale = interpolate(spr, [0, 1], [1, 0.5]);
	const totalScale = interpolate(spr, [0, 1], [1.2, 1]);

	return (
		<AbsoluteFill
			style={{
				background: trace ? '#fff' : `#333`,
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
