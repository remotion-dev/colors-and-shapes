import {Pie} from '@remotion/shapes';
import {AbsoluteFill} from 'remotion';

export const MultiArc: React.FC<{
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
							stroke="#fff"
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
