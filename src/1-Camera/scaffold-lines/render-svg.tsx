import React, {useMemo} from 'react';
import type {Instruction} from './instructions';

export type AllShapesProps = Omit<
	React.SVGProps<SVGPathElement>,
	'width' | 'height' | 'd'
> & {
	debug?: boolean;
	pathStyle?: React.CSSProperties;
};

export const RenderSvg = ({
	width,
	height,
	path,
	style,
	pathStyle,
	transformOrigin,
	debug,
	instructions,
	...props
}: {
	width: number;
	height: number;
	path: string;
	instructions: Instruction[];
	transformOrigin: string;
} & AllShapesProps) => {
	const actualStyle = useMemo((): React.CSSProperties => {
		return {
			overflow: 'visible',
			...(style ?? {}),
		};
	}, [style]);

	const actualPathStyle = useMemo((): React.CSSProperties => {
		return {
			transformBox: 'fill-box',
			...(pathStyle ?? {}),
		};
	}, [pathStyle]);

	return (
		<svg
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			xmlns="http://www.w3.org/2000/svg"
			style={actualStyle}
		>
			{debug
				? instructions.map((i, index) => {
						if (i.type === 'C') {
							const prevInstruction =
								index === 0
									? instructions[instructions.length - 1]
									: instructions[index - 1];
							if (prevInstruction.type === 'z') {
								return null;
							}
							const prevX = prevInstruction.x;
							const prevY = prevInstruction.y;
							return (
								<React.Fragment key={index}>
									<path
										d={`M ${prevX} ${prevY} ${i.cp1x} ${i.cp1y}`}
										strokeWidth={2}
										stroke="#666"
									/>
									<path
										d={`M ${i.x} ${i.y} ${i.cp2x} ${i.cp2y}`}
										strokeWidth={2}
										stroke="#666"
									/>
									<circle
										cx={i.cp1x}
										cy={i.cp1y}
										r={4}
										fill="#fff"
										strokeWidth={2}
										stroke="#666"
									/>
									<circle
										cx={i.cp2x}
										cy={i.cp2y}
										r={4}
										strokeWidth={2}
										fill="#fff"
										stroke="#666"
									/>
								</React.Fragment>
							);
						}

						return null;
				  })
				: null}{' '}
			<path
				transform-origin={transformOrigin}
				d={path}
				style={actualPathStyle}
				{...props}
			/>
		</svg>
	);
};
