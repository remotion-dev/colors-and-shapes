import {Ellipse} from '@remotion/shapes';
import {interpolate, useCurrentFrame} from 'remotion';

export const WeirdEye: React.FC<{
	width: number;
}> = ({width}) => {
	const frame = useCurrentFrame();

	return (
		<>
			{new Array(1).fill(true).map((r, i) => {
				const ry = interpolate(Math.sin(frame / 10), [-1, 1], [0.1, 0.9]);
				return (
					<Ellipse
						rx={(width / 2) * 0.6}
						ry={(width / 2) * ry}
						fill="transparent"
						strokeWidth={20}
						stroke="#061d3c"
						style={{
							position: 'absolute',
						}}
					/>
				);
			})}
		</>
	);
};
