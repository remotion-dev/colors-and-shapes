import {interpolate, useVideoConfig} from 'remotion';
import {noise2D} from '@remotion/noise';
import {Ellipse, Rect, Triangle} from '@remotion/shapes';
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

export const Yellow: React.FC = () => {
	const {width, height} = useVideoConfig();

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#d777a2',
			}}
		>
			<AbsoluteFill
				style={{
					backgroundColor: '#fabd40',
					justifyContent: 'center',
					alignItems: 'center',
					scale: '0.8',
				}}
			>
				<AbsoluteFill>
					<Rect
						width={width}
						height={height}
						fill="transparent"
						stroke="#000"
						strokeWidth={6}
					/>
				</AbsoluteFill>
				<TriangleStorm />
				<RotatingItems />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

const RotatingItems: React.FC = () => {
	const frame = useCurrentFrame();
	const rotation = interpolate(frame, [0, 100], [0, Math.PI]);

	const initX = 80;
	const initY = 80;

	const outerInitX = 200;
	const outerInitY = 200;

	const addX = 150;
	const addY = 200;

	const innerRx = initX + addX;
	const innerRy = initY + addY;

	const outerRx = outerInitX + addX;
	const outerRy = outerInitY + addY;
	return (
		<AbsoluteFill
			style={{
				transform: `rotate(${rotation}rad)`,
			}}
		>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Ellipse
					strokeWidth={outerRx - innerRx}
					stroke="#e64236"
					fill="transparent"
					rx={outerRx - (outerRx - innerRx) / 2}
					ry={outerRy - (outerRx - innerRx) / 2}
				/>
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Ellipse
					strokeWidth={6}
					stroke="#000 "
					fill="transparent"
					rx={outerRx}
					ry={outerRy}
				/>
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Ellipse
					strokeWidth={6}
					stroke="#0e0201"
					fill="transparent"
					ry={innerRy}
					rx={innerRx}
				/>
			</AbsoluteFill>
			<RotatingCircle
				innerRx={innerRx}
				outerRx={outerRx}
				innerRy={innerRy}
				outerRy={outerRy}
			/>
		</AbsoluteFill>
	);
};

const RotatingCircle: React.FC<{
	innerRx: number;
	innerRy: number;
	outerRx: number;
	outerRy: number;
}> = ({innerRx, innerRy, outerRx, outerRy}) => {
	const frame = useCurrentFrame();

	const x = (Math.sin(-frame / 30) * (innerRx + outerRx)) / 2;
	const y = (Math.cos(-frame / 30 + Math.PI) * (innerRy + outerRy)) / 2;

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				transform: `translate(${x}px, ${y}px)`,
			}}
		>
			<Ellipse
				strokeWidth={6}
				stroke="#0e0201"
				fill="#fabd40"
				rx={(outerRx - innerRx) / 2}
				ry={(outerRy - innerRy) / 2}
			/>
		</AbsoluteFill>
	);
};

const TriangleStorm: React.FC = () => {
	const frame = useCurrentFrame();
	return (
		<>
			{new Array(30).fill(true).map((_, t) => {
				const noiseX = noise2D('my-noise', t, frame / 1000);
				const noiseY = noise2D('my-noise-y', t, frame / 1000);
				const noiseRotation = noise2D('my-noise-rot', t, frame / 1000);

				return (
					<AbsoluteFill
						style={{
							transform: `translateX(${noiseX * 1000}px) translateY(${
								noiseY * 1000
							}px) rotate(${noiseRotation * 360}deg)`,
						}}
					>
						<TriangleComp key={t} />
					</AbsoluteFill>
				);
			})}
		</>
	);
};

export const TriangleComp: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Triangle
					stroke="#000"
					strokeWidth={6}
					fill="#426e5f"
					length={100}
					direction="up"
				/>
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Triangle
					stroke="#000"
					strokeWidth={6}
					fill="#fabd40"
					length={70}
					style={{
						marginTop: 25,
					}}
					direction="up"
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
