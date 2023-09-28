import {useVideoConfig} from 'remotion';
import {Rect} from '@remotion/shapes';
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {RotatingItems} from './RotatingItems';
import {PINK, STROKE, YELLOW} from './constants';
import {TriangleStorm} from './TriangleStorm';

export const Stormy: React.FC = () => {
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
