import {AbsoluteFill} from 'remotion';
import React, {PropsWithChildren} from 'react';

export const BlueLetter: React.FC<
	PropsWithChildren & {
		rotation: number;
	}
> = ({children, rotation}) => {
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				fontSize: 160,
				color: '#20e8c2',
				fontFamily: 'GT Planar',
				fontWeight: '400',
				transform: `rotate(${rotation}rad)`,
			}}
		>
			{children}
		</AbsoluteFill>
	);
};
