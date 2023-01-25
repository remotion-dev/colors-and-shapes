import {Composition} from 'remotion';
import {Blue} from './Blue';
import {MyComposition} from './Composition';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="MyComp"
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
		</>
	);
};
