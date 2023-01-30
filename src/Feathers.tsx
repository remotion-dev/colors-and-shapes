import {useVideoConfig} from 'remotion';
import {noise2D} from '@remotion/noise';
import {Rect} from '@remotion/shapes';
import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	interpolateColors,
	spring,
	useCurrentFrame,
} from 'remotion';

const columns = 100;
const colors = [
	'#f4a367',
	'#ec6a66',
	'#e8a2bb',
	'#da93c3',
	'#10b2cb',
	'#50b068',
	'#fde957',
	'#b88a27',
] as const;

export const Feathers: React.FC = () => {
	const frame = useCurrentFrame();
	const wave = Math.sin(frame / 20);
	const {fps} = useVideoConfig();

	const progress =
		spring({
			fps,
			frame: frame - 30,
			config: {
				damping: 200,
			},
		}) -
		spring({
			fps,
			frame: frame - 150,
			config: {
				damping: 200,
			},
		});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#f9dbcd',
					transform: 'scale(0.8)',
					overflow: 'hidden',
				}}
			>
				<AbsoluteFill
					style={{transform: `translateY(${wave * 10 * progress}px`}}
				>
					{new Array(columns).fill(true).map((_, i) => {
						const color = interpolateColors(
							i + noise2D('seed', i, 0) * 20 * progress,
							new Array(colors.length).fill(true).map((_, i) => {
								return (columns - 1) * (i / (colors.length - 1));
							}),
							colors
						);
						const column = Math.floor(i / 10) * 10;

						return (
							<AbsoluteFill
								style={{
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Rect
									style={{
										transform: `translateX(${interpolate(
											column,
											[0, 90],
											[
												-interpolate(progress, [0, 1], [450, 400]),
												interpolate(progress, [0, 1], [450, 400]),
											]
										)}px) translateY(${interpolate(
											i % 10,
											[0, 9],
											[
												-interpolate(progress, [0, 1], [450, 350]),
												interpolate(progress, [0, 1], [450, 350]),
											]
										)}px) rotate(${
											noise2D('rotate', i, frame / 20) * 10 * progress
										}deg)`,
										transformOrigin: '0 100%',
									}}
									fill={color}
									width={75}
									height={interpolate(progress, [0, 1], [75, 200])}
									edgeRoundness={interpolate(progress, [0, 1], [0.5, 1])}
									stroke="rgba(0, 0, 0, 0.1)"
								/>
							</AbsoluteFill>
						);
					})}
				</AbsoluteFill>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
