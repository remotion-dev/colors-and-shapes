import {AbsoluteFill} from 'remotion';
import React from 'react';
import {Star} from '@remotion/shapes';

export const StarBackground: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{new Array(10).fill(true).map(() => {
				return (
					<>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
							}}
						>
							{new Array(10).fill(true).map(() => {
								return (
									<Star
										fill="#f6e58d"
										style={{
											opacity: 0.2,
											margin: 30,
										}}
										points={4}
										innerRadius={8}
										outerRadius={20}
									/>
								);
							})}
						</div>
					</>
				);
			})}
		</AbsoluteFill>
	);
};
