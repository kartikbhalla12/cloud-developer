import fs from 'fs';
import Jimp = require('jimp');

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
	return new Promise(async (resolve, reject) => {
		try {
			const photo = await Jimp.read(inputURL);
			const outPath =
				'/tmp/filtered.' + Math.floor(Math.random() * 2000) + '.jpg';
			await photo
				// .resize(256, 256) // resize
				.quality(100) // set JPEG quality
				.scaleToFit(512, 512) //maintain aspect ratio
				// .grayscale() // do not set grayscale
				.write(__dirname + outPath, img => {
					resolve(__dirname + outPath);
				});
		} catch (ex) {
			reject('Invalid URL or Can not fetch image!');
		}
	});
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
	for (let file of files) {
		fs.unlinkSync(file);
	}
}
