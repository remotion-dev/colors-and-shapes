import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Camera} from './Camera';

export const BothShapes: React.FC = () => {
	return (
		<AbsoluteFill>
			<AbsoluteFill
				style={{
					width: '50%',
					overflow: 'hidden',
				}}
			>
				<Camera trace={false} />
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					width: '50%',
					left: '50%',
					overflow: 'hidden',
				}}
			>
				<Camera trace />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
