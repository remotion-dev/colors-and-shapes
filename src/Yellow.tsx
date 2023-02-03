import {interpolate, useVideoConfig} from 'remotion';
import {noise2D} from '@remotion/noise';
import {Ellipse, Rect, Triangle} from '@remotion/shapes';
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

const PINK = '#d777a2';
const YELLOW = '#fabd40';
const STROKE = '#000000';
const GREEN = '#426e5f';
const RED = '#e64236';

export const Yellow: React.FC = () => {
	const {width, height} = useVideoConfig();

	return (
		<AbsoluteFill
			style={{
				backgroundColor: PINK,
			}}
		>
			<AbsoluteFill
				style={{
					backgroundColor: YELLOW,
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
						stroke={STROKE}
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
	const rotation = interpolate(frame, [0, 199], [0, Math.PI * 2]);

	const initX = 80;
	const initY = 80;

	const outerInitX = 200;
	const outerInitY = 200;

	const addX = 100;
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
					stroke={RED}
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
					stroke={STROKE}
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
					stroke={STROKE}
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

	const x = (Math.sin(-frame / 25) * (innerRx + outerRx)) / 2;
	const y = (Math.cos(-frame / 25 + Math.PI) * (innerRy + outerRy)) / 2;

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
				stroke={STROKE}
				fill={YELLOW}
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
					stroke={STROKE}
					strokeWidth={6}
					fill={GREEN}
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
					stroke={STROKE}
					strokeWidth={6}
					fill={YELLOW}
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
