import {Pie} from '@remotion/shapes';
import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	interpolateColors,
	useCurrentFrame,
} from 'remotion';

const MultiArc: React.FC<{
	counterClockwise: boolean;
	progress: (i: number) => number;
	iters: number;
	strokeWidth: number;
	center: number;
}> = ({counterClockwise, progress, iters, strokeWidth, center}) => {
	return (
		<>
			{new Array(iters).fill(0).map((_, i) => {
				const fromOuter = counterClockwise ? i : iters - i - 1;
				if (progress(i) <= 0) {
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
							strokeWidth={strokeWidth}
							stroke={interpolateColors(
								fromOuter,
								[0, iters - 1],
								['#fff', '#EF539E']
							)}
							fill="none"
							closePath={false}
							radius={center + i * strokeWidth * 2}
							progress={progress(i)}
							strokeLinecap="round"
						/>
					</AbsoluteFill>
				);
			})}
		</>
	);
};

const numberOfMultiArcs = 4;

export const Arcs: React.FC = () => {
	const frame = useCurrentFrame();
	const move = interpolate(frame, [0, 100], [0, 0]);
	const center = interpolate(frame, [0, 200], [100, 200], {
		extrapolateRight: 'clamp',
	});
	const strokeWidth = interpolate(frame, [0, 200], [20, 40], {
		extrapolateRight: 'clamp',
	});
	const iters = 10;
	const radius = center * 2 + strokeWidth * 2 * (iters - 1);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#00AEEF',
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
							progress={(j) => {
								const jIndex = i % 2 === 0 ? j : iters - j - 1;
								return interpolate(
									frame - jIndex * 10 - i * 20,
									[0, 20],
									[0, 0.5],
									{
										extrapolateRight: 'clamp',
									}
								);
							}}
							center={center}
							strokeWidth={strokeWidth}
							counterClockwise={i % 2 === 0}
						/>
					</AbsoluteFill>
				);
			})}
		</AbsoluteFill>
	);
};
