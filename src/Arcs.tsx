import {Pie} from '@remotion/shapes';
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

const MultiArc: React.FC<{
	counterClockwise: boolean;
	progress: number;
	iters: number;
	strokeWidth: number;
	center: number;
	extraRotation: number;
}> = ({
	counterClockwise,
	progress,
	iters,
	strokeWidth,
	center,
	extraRotation,
}) => {
	return (
		<>
			{new Array(iters).fill(0).map((_, i) => {
				if (progress <= 0) {
					return null;
				}
				return (
					<AbsoluteFill
						style={{
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Pie
							counterClockwise={counterClockwise}
							stroke="#EF539E"
							strokeWidth={strokeWidth}
							fill="none"
							closePath={false}
							radius={center + i * strokeWidth * 2}
							progress={progress}
							strokeLinecap="round"
							rotation={extraRotation}
						/>
					</AbsoluteFill>
				);
			})}
		</>
	);
};

const numberOfMultiArcs = 2;

export const Arcs: React.FC = () => {
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
								progress={interpolate(frame - i * 20, [0, 20], [0, 0.75], {
									extrapolateRight: 'clamp',
								})}
								center={center}
								strokeWidth={strokeWidth}
								counterClockwise={i % 2 === 0}
								extraRotation={i === 0 ? -Math.PI * 1.5 : 0}
							/>
						</AbsoluteFill>
					);
				})}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
