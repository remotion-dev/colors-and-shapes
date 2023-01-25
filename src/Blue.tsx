import {Circle, Ellipse, Rect, Triangle} from '@remotion/shapes';
import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {WeirdEye} from './WeirdEye';

const row: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
};

export const Blue: React.FC = () => {
	const {width, height} = useVideoConfig();
	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#061d3c',
			}}
		>
			<AbsoluteFill
				style={{
					scale: '0.7',
				}}
			>
				<Rect
					style={{
						position: 'absolute',
					}}
					fill="transparent"
					width={width}
					height={height}
					strokeWidth={20}
					stroke="#20e8c2"
				/>
				{new Array(3).fill(true).map((r, i) => {
					return (
						<div style={row}>
							{new Array(3).fill(true).map((c, j) => {
								const index = i * 3 + j;
								return (
									<div
										style={{
											position: 'relative',
											width: width / 3,
											height: height / 3,
											justifyContent: 'center',
											alignItems: 'center',
											display: 'flex',
										}}
									>
										<Rect
											fill="transparent"
											stroke="#20e8c2"
											strokeWidth={20}
											width={width / 3}
											height={height / 3}
											style={{
												position: 'absolute',
											}}
										/>
										{index === 2 ? (
											<Triangle
												style={{
													position: 'absolute',
													scale: '0.7',
												}}
												length={width / 3 - 20}
												direction="up"
												fill="#20e8c2"
											/>
										) : null}
										{index === 5 ? (
											<Rect
												fill="#20e8c2"
												width={width / 3}
												height={height / 3}
												style={{
													position: 'absolute',
												}}
											/>
										) : null}
										{index === 5 ? <WeirdEye width={width / 3} /> : null}
									</div>
								);
							})}
						</div>
					);
				})}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
