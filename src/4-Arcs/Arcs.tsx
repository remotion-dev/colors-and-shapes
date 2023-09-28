import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {MultiArc} from './MultiArc';

const numberOfMultiArcs = 2;

export const Arcs: React.FC = () => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const move = interpolate(frame, [0, 100], [0, 0]);
	const center = interpolate(frame, [0, 200], [100, 200], {
		extrapolateRight: 'clamp',
	});
	const strokeWidth = interpolate(frame, [0, 200], [20, 20], {
		extrapolateRight: 'clamp',
	});
	const iters = 4;
	const radius = center * 2 + strokeWidth * 2 * (iters - 1);
	const progress = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
		durationInFrames: 90,
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#EF539E',
			}}
		>
			<AbsoluteFill
				style={{
					backgroundColor: '#00AEEF',
					scale: '0.85',
				}}
			>
				<AbsoluteFill
					style={{
						transform: `rotate(${progress * 180}deg)`,
					}}
				>
					{new Array(numberOfMultiArcs).fill(0).map((_, i) => {
						const offset = interpolate(
							i,
							[
								numberOfMultiArcs / 2 - 1.5,
								numberOfMultiArcs / 2 - 0.5,
								numberOfMultiArcs / 2 + 0.5,
							],
							[-radius, 0, radius]
						);
						return (
							<AbsoluteFill
								style={{
									marginTop: offset + move,
								}}
							>
								<MultiArc
									iters={iters}
									progress={interpolate(
										progress,
										[
											i * (1 / numberOfMultiArcs),
											(i + 1) * (1 / numberOfMultiArcs),
										],
										[0, 0.75],
										{
											extrapolateRight: 'clamp',
										}
									)}
									center={center}
									strokeWidth={strokeWidth}
									counterClockwise={i % 2 === 0}
									extraRotation={i === 0 ? -Math.PI * 1.5 : 0}
								/>
							</AbsoluteFill>
						);
					})}
				</AbsoluteFill>
			</AbsoluteFill>{' '}
		</AbsoluteFill>
	);
};
