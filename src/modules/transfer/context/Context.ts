import { createContext } from 'react';

export interface IDefaulContextValue {
	uploadedFile: File | null;
	setUploadedFile:
		| React.Dispatch<React.SetStateAction<File | null>>
		| undefined;
}

const FileContext = createContext<IDefaulContextValue>({
	uploadedFile: null,
	setUploadedFile: undefined,
});

export default FileContext;
