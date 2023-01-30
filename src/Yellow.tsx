import {useVideoConfig} from 'remotion';
import {noise2D} from '@remotion/noise';
import {Ell, Ellipse, Ellipseipse, Rect, Triangle} from '@remotion/shapes';
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
				<AbsoluteFill
					style={{
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Ellipse
						strokeWidth={6}
						stroke="#0e0201"
						fill="#e64236"
						rx={230}
						ry={230}
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
						fill="#fabd40"
						ry={100}
						rx={100}
					/>
				</AbsoluteFill>
				<RotatingCircle />
			</AbsoluteFill>{' '}
		</AbsoluteFill>
	);
};

const RotatingCircle: React.FC = () => {
	const frame = useCurrentFrame();

	const x = Math.sin(-frame / 30) * 165;
	const y = Math.cos(-frame / 30) * 165;

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
				rx={65}
				ry={65}
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
	const {width, height} = useVideoConfig();
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
