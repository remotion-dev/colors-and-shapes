import {Ellipse} from '@remotion/shapes';
import {AbsoluteFill} from 'remotion';
import {interpolate} from 'remotion';
import {useVideoConfig} from 'remotion';
import {useCurrentFrame} from 'remotion';
import {RED, STROKE} from './constants';
import {RotatingCircle} from './RotatingCircle';

export const RotatingItems: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const rotation = interpolate(
		frame,
		[0, durationInFrames - 1],
		[0, Math.PI * 2]
	);

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
