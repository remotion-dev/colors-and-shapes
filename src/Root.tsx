import {Composition, Folder} from 'remotion';
import {Arcs} from './Arcs';
import {Blue} from './Blue';
import {BothShapes} from './BothShapes';
import {Camera} from './Camera';
import {MyComposition} from './Composition';
import {Feathers} from './Feathers';
import {OrangeBlack} from './OrangeBlack';
import {Yellow} from './Yellow';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="2-Green"
				component={MyComposition}
				durationInFrames={200}
				fps={30}
				width={1080}
				height={1080}
			/>
			<Composition
				id="3-Blue"
				component={Blue}
				durationInFrames={400}
				fps={30}
				width={1080}
				height={1080}
			/>
			<Folder name="1-Camera">
				<Composition
					id="Camera"
					component={BothShapes}
					durationInFrames={400}
					fps={30}
					width={1080}
					height={1080}
				/>
				<Composition
					id="OnlyReal"
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
					id="OnlyTrace"
					component={Camera}
					durationInFrames={400}
					fps={30}
					width={1080}
					height={1080}
					defaultProps={{
						trace: true,
					}}
				/>
			</Folder>
			<Composition
				id="4-Arcs"
				component={Arcs}
				durationInFrames={120}
				fps={30}
				width={1080}
				height={1080}
			/>
			<Composition
				id="5-Yellow"
				component={Yellow}
				durationInFrames={200}
				fps={30}
				width={1080}
				height={1080}
			/>
			<Composition
				id="6-Feathers"
				component={Feathers}
				durationInFrames={6 * 30}
				fps={30}
				width={1080}
				height={1080}
			/>
			<Composition
				id="OrangeBlack"
				component={OrangeBlack}
				durationInFrames={6 * 30}
				fps={30}
				width={1080}
				height={1080}
			/>
		</>
	);
};
