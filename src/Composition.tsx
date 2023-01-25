import {AbsoluteFill, Sequence} from 'remotion';
import {Green} from './Green';

export const MyComposition = () => {
	return (
		<Sequence>
			<AbsoluteFill>
				<Green />
			</AbsoluteFill>
		</Sequence>
	);
};
