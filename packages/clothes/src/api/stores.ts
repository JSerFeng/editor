export interface Image {
	src: string;
	name: string;
}

export interface ImageApiData {
	imgData: {
		category: string,
		list: Image[],
		author: string,
	}[]
}

export interface FontsApiData {
	fontsData: {
		fontName: string,
		fontFace: string,
		woffUrl: string,
		author: string,
	}[]
}
