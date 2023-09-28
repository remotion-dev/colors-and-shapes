import {Rect, Triangle} from '@remotion/shapes';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {StarBackground} from './StarBackground';

export const Branded = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const explosion = spring({
		fps,
		frame,
		delay: 60,
	});

	const spr = (f: number) =>
		spring({
			fps,
			frame,
			config: {
				damping: 15,
			},
			delay: f,
		});

	const exit = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
		delay: 95,
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#f6e58d',
			}}
		>
			<AbsoluteFill
				style={{
					transform: `scale(0.8)`,
					backgroundColor: '#fff',
					justifyContent: 'center',
					alignItems: 'center',
					overflow: 'hidden',
					border: '5.5px solid black',
				}}
			>
				<StarBackground />
				<AbsoluteFill
					style={{
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Triangle
						length={110}
						stroke="black"
						fill="#f6e58d"
						direction="up"
						strokeWidth={5.5}
						style={{
							transform: `translateY(${interpolate(
								spr(20),
								[0, 1],
								[1080, 0]
							)}px) rotate(${interpolate(spr(0), [0, 1], [0, 360])}deg)`,
							marginLeft: -500 - explosion * 750,
						}}
					/>
				</AbsoluteFill>
				<AbsoluteFill
					style={{
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Rect
						width={110}
						height={110}
						stroke="black"
						fill="#f6e58d"
						strokeWidth={5.5}
						style={{
							transform: `translateY(${interpolate(
								spr(10),
								[0, 1],
								[1080, 0]
							)}px) rotate(${interpolate(spr(1), [0, 1], [0, 360])}deg)`,
							marginLeft: 400 + explosion * 850,
						}}
					/>
				</AbsoluteFill>
				{new Array(3).fill(true).map((_, i) => {
					const reverseIndex = 2 - i;
					return (
						<AbsoluteFill
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								transform: `translateY(${
									interpolate(spr(30), [0, 1], [1080, 0]) +
									interpolate(exit, [0, 1], [0, -1080])
								}px)`,
							}}
						>
							<Triangle
								direction="right"
								length={200 + explosion * reverseIndex * 100}
								stroke="black"
								fill="#f6e58d"
								strokeWidth={5.5}
								edgeRoundness={interpolate(
									explosion,
									[0, 1],
									[Math.sqrt(2) - 1, 0.7]
								)}
								style={{
									marginLeft: reverseIndex * 25 * explosion,
								}}
							/>
						</AbsoluteFill>
					);
				})}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
