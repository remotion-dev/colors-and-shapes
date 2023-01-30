import {Rect, Triangle} from '@remotion/shapes';
import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {BlueArc} from './BlueArc';
import {BlueLetter} from './BlueLetter';
import {IncreasingStar} from './IncreasingStar';
import {OutArc, STROKE_WIDTH} from './OutArc';
import {WeirdEye} from './WeirdEye';

const row: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
};

const grid = 4;

export const Blue: React.FC = () => {
	const {width, height, fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const spr = spring({
		fps,
		frame,
		config: {
			damping: 15,
		},
	});

	const spr2 = spring({
		fps,
		frame: frame - 40,
		config: {
			damping: 100,
		},
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#061d3c',
			}}
		>
			<AbsoluteFill
				style={{
					scale: '0.7',
					rotate: interpolate(spr2, [0, 1], [0, 90]) + 'deg',
				}}
			>
				<AbsoluteFill
					style={{
						transform: `translateX(${interpolate(
							spr,
							[0, 1],
							[-width, 0]
						)}px) translateY(${interpolate(spr, [0, 1], [height, 0])}px)`,
					}}
				>
					<AbsoluteFill
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: -height / 2 - 3,
							marginLeft: -width / 2 - 3,
						}}
					>
						<OutArc />
					</AbsoluteFill>
					<AbsoluteFill
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: height / 2 + 3,
							marginLeft: width / 2 + 3,
						}}
					>
						<OutArc />
					</AbsoluteFill>
					<AbsoluteFill
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: height / 2 + 3,
							marginLeft: -width / 2 + 3,
						}}
					>
						<OutArc />
					</AbsoluteFill>
					<Rect
						style={{
							position: 'absolute',
						}}
						fill="#061d3c"
						width={width}
						height={height}
						strokeWidth={20}
						stroke="#20e8c2"
					/>
					{new Array(grid).fill(true).map((r, i) => {
						return (
							<div style={row}>
								{new Array(grid).fill(true).map((c, j) => {
									const index = i * grid + j;
									return (
										<div
											style={{
												position: 'relative',
												width: width / grid,
												height: height / grid,
												justifyContent: 'center',
												alignItems: 'center',
												display: 'flex',
											}}
										>
											<Rect
												fill="transparent"
												stroke="#20e8c2"
												strokeWidth={STROKE_WIDTH}
												width={width / grid}
												height={height / grid}
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
													length={width / grid - 20}
													direction="up"
													fill="#20e8c2"
												/>
											) : null}
											{index === 5 || index === 10 ? (
												<Rect
													fill="#20e8c2"
													width={width / grid}
													height={height / grid}
													style={{
														position: 'absolute',
													}}
												/>
											) : null}
											{index === 5 ? <WeirdEye width={width / grid} /> : null}
											{index === 10 ? (
												<IncreasingStar width={width / grid} />
											) : null}
											{index === 0 ? (
												<BlueLetter rotation={-spr2 * Math.PI * 0.5}>
													H
												</BlueLetter>
											) : null}
											{index === 3 ? (
												<BlueLetter rotation={-spr2 * Math.PI * 0.5}>
													S
												</BlueLetter>
											) : null}
											{index === 4 ? (
												<BlueLetter rotation={-spr2 * Math.PI * 0.5}>
													S
												</BlueLetter>
											) : null}
											{index === 9 ? (
												<BlueLetter rotation={-spr2 * Math.PI * 0.5}>
													A
												</BlueLetter>
											) : null}
											{index === 11 ? (
												<BlueLetter rotation={-spr2 * Math.PI * 0.5}>
													E
												</BlueLetter>
											) : null}
											{index === 12 ? (
												<BlueArc radius={(width / grid / 2) * 0.7} />
											) : null}
											{index === 14 ? (
												<BlueLetter rotation={-spr2 * Math.PI * 0.5}>
													P
												</BlueLetter>
											) : null}
										</div>
									);
								})}
							</div>
						);
					})}
				</AbsoluteFill>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
