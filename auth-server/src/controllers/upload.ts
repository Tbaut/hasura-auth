// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import * as cloudinary from 'cloudinary';
import { Response } from 'express';
import * as multer from 'multer';
import * as tmp from 'tmp';

import errorHandler from '../model/errors';
import { FileRequestType } from '../types';

const uploadProfilePic = (filePath) => {
	return new Promise((resolve, reject) => {
		cloudinary.v2.uploader.upload(filePath, (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
};

export const upload = multer({
	dest: tmp.dirSync({ unsafeCleanup: true }).name
});

export const uploadController = async (req: FileRequestType, res: Response) => {
	try {
		res.json(await uploadProfilePic(req.file.path));
	} catch (err) {
		errorHandler(err, res);
	}
};
