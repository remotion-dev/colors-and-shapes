import {Rect, Triangle} from '@remotion/shapes';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export const OrangeBlack = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const progress = spring({
		fps,
		frame: frame - 50,
	});

	const spr = (f: number) =>
		spring({
			fps,
			frame: frame - f,
			config: {
				damping: 15,
			},
		});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#f6e58d',
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
					length={110}
					stroke="black"
					fill="white"
					direction="up"
					strokeWidth={5.5}
					style={{
						transform: `translateY(${interpolate(
							spr(20),
							[0, 1],
							[1080, 0]
						)}px) rotate(${interpolate(spr(0), [0, 1], [0, 360])}deg)`,
						marginLeft: -500 - progress * 750,
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
					fill="white"
					strokeWidth={5.5}
					style={{
						transform: `translateY(${interpolate(
							spr(10),
							[0, 1],
							[1080, 0]
						)}px) rotate(${interpolate(spr(1), [0, 1], [0, 360])}deg)`,
						marginLeft: 400 + progress * 850,
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
							transform: `translateY(${interpolate(
								spr(30),
								[0, 1],
								[1080, 0]
							)}px)`,
						}}
					>
						<Triangle
							direction="right"
							length={200 + progress * reverseIndex * 100}
							stroke="black"
							fill="white"
							strokeWidth={5.5}
							edgeRoundness={interpolate(
								progress,
								[0, 1],
								[Math.sqrt(2) - 1, 0.7]
							)}
							style={{
								marginLeft: reverseIndex * 25 * progress,
							}}
						/>
					</AbsoluteFill>
				);
			})}
		</AbsoluteFill>
	);
};
