import { FileContext } from '../context';
import { useContext } from 'react';

interface IContextValue {
	uploadedFile: File | null;
	setUploadedFile:
		| React.Dispatch<React.SetStateAction<File | null>>
		| undefined;
}

const useFileContext = () => {
	const fileCt = useContext(FileContext);

	return {
		uploadedFile: fileCt.uploadedFile,
		setUploadedFile: fileCt.setUploadedFile,
	} as IContextValue;
};

export default useFileContext;
