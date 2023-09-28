import {Composition, Folder} from 'remotion';
import {Arcs} from './4-Arcs/Arcs';
import {Blue} from './3-Blue/Blue';
import {BothShapes} from './1-Camera/BothShapes';
import {Camera} from './1-Camera/Camera';
import {Feathers} from './Feathers';
import {Green} from './2-Green/Green';
import {OrangeBlack} from './OrangeBlack';
import {Yellow} from './Yellow';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Folder name="1-Camera">
				<Composition
					id="Camera"
					component={BothShapes}
					durationInFrames={90}
					fps={30}
					width={1080}
					height={1080}
				/>
				<Composition
					id="OnlyReal"
					component={Camera}
					durationInFrames={90}
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
					durationInFrames={90}
					fps={30}
					width={1080}
					height={1080}
					defaultProps={{
						trace: true,
					}}
				/>
			</Folder>
			<Composition
				id="2-Green"
				component={Green}
				durationInFrames={150}
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
				id="7-TriangleCircleSquare"
				component={OrangeBlack}
				durationInFrames={100}
				fps={30}
				width={1080}
				height={1080}
			/>
		</>
	);
};
