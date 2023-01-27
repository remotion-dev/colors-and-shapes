import {Composition} from 'remotion';
import {Blue} from './Blue';
import {Camera} from './Camera';
import {MyComposition} from './Composition';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="Green"
				component={MyComposition}
				durationInFrames={200}
				fps={30}
				width={1080}
				height={1080}
			/>
			<Composition
				id="Blue"
				component={Blue}
				durationInFrames={400}
				fps={30}
				width={1080}
				height={1080}
			/>
			<Composition
				id="Camera"
				component={Camera}
				durationInFrames={400}
				fps={30}
				width={1080}
				height={1080}
				defaultProps={{
					trace: false,
				}}
			/>
			<Composition
				id="CameraTrace"
				component={Camera}
				durationInFrames={400}
				fps={30}
				width={1080}
				height={1080}
				defaultProps={{
					trace: true,
				}}
			/>
		</>
	);
};
