import {Triangle} from '@remotion/shapes';
import {AbsoluteFill} from 'remotion';
import {GREEN, STROKE, YELLOW} from './constants';

export const Triangles: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Triangle
					stroke={STROKE}
					strokeWidth={6}
					fill={GREEN}
					length={100}
					direction="up"
				/>
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Triangle
					stroke={STROKE}
					strokeWidth={6}
					fill={YELLOW}
					length={70}
					style={{
						marginTop: 25,
					}}
					direction="up"
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
