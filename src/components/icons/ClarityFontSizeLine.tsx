import { type SVGProps } from 'react';

const ClarityFontSizeLine = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}>
			<path
				fill="currentColor"
				d="M21 9.08A1.13 1.13 0 0 0 19.86 8H4.62a1.1 1.1 0 1 0 0 2.19H11V27a1.09 1.09 0 0 0 2.17 0V10.19h6.69A1.14 1.14 0 0 0 21 9.08"
				className="clr-i-outline clr-i-outline-path-1"
			/>
			<path
				fill="currentColor"
				d="M30.67 15h-9.52a1.1 1.1 0 1 0 0 2.19H25v9.31a1.09 1.09 0 0 0 2.17 0v-9.27h3.54a1.1 1.1 0 1 0 0-2.19Z"
				className="clr-i-outline clr-i-outline-path-2"
			/>
			<path fill="none" d="M0 0h36v36H0z" />
		</svg>
	);
};

export default ClarityFontSizeLine;
