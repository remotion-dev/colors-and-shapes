import {Ellipse} from '@remotion/shapes';
import {AbsoluteFill} from 'remotion';
import {useVideoConfig} from 'remotion';
import {useCurrentFrame} from 'remotion';
import {STROKE, YELLOW} from './constants';

export const RotatingCircle: React.FC<{
	innerRx: number;
	innerRy: number;
	outerRx: number;
	outerRy: number;
}> = ({innerRx, innerRy, outerRx, outerRy}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	const loopedFrame = (frame / durationInFrames) * Math.PI * 2;

	const x = (Math.sin(loopedFrame) * (innerRx + outerRx)) / 2;
	const y = (Math.cos(loopedFrame + Math.PI) * (innerRy + outerRy)) / 2;

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
