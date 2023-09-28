import {Pie} from '@remotion/shapes';
import {random, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const BlueArc: React.FC<{radius: number}> = ({radius}) => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const spins = new Array(10)
		.fill(true)
		.map((_, i) => {
			return (
				spring({
					fps,
					frame,
					config: {
						damping: 200,
					},
					delay: i * 10,
				}) *
				(random(i) * 2 - 1)
			);
		})
		.reduce((a, b) => a + b, 0);

	return (
		<Pie
			rotation={spins * Math.PI}
			progress={0.5}
			fill="#20e8c2"
			radius={radius}
		/>
	);
};
