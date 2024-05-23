import React from 'react';
import { useState } from 'react';

import FileContext from './Context';

const FileProvider: React.FC<{ children: React.ReactNode }> = (props) => {
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);

	return (
		<FileContext.Provider
			value={{ uploadedFile: uploadedFile, setUploadedFile: setUploadedFile }}
		>
			{props.children}
		</FileContext.Provider>
	);
};

export default FileProvider;
