import {noise2D} from '@remotion/noise';
import {AbsoluteFill} from 'remotion';
import {useVideoConfig} from 'remotion';
import {useCurrentFrame} from 'remotion';
import {Triangles} from './Triangles';

export const TriangleStorm: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	const loopedFrame = (frame / durationInFrames) * Math.PI * 2;

	return (
		<>
			{new Array(30).fill(true).map((_, t) => {
				const noiseX = noise2D('my-noise', t, 0.1 * Math.sin(loopedFrame));
				const noiseY = noise2D('my-noise-y', t, 0.1 * Math.sin(loopedFrame));
				const noiseRotation = noise2D(
					'my-noise-rot',
					t,
					0.1 * Math.sin(loopedFrame)
				);

				return (
					<AbsoluteFill
						style={{
							transform: `translateX(${noiseX * 1000}px) translateY(${
								noiseY * 1000
							}px) rotate(${noiseRotation * 360}deg)`,
						}}
					>
						<Triangles key={t} />
					</AbsoluteFill>
				);
			})}
		</>
	);
};
