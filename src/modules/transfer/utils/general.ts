export const MAX_FILE_SIZE = 1000000000;

export const formatFileSize = (size: number) => {
  if (size > 1024 && size < 1000000) {
    return `${Number(size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
      .toFixed(2)
      .toString()} KB`;
  } else if (size > 1000000 && size < 1000000000) {
    return `${Number(size.toString().replace(/\B(?=(\d{6})+(?!\d))/g, "."))
      .toFixed(2)
      .toString()} MB`;
  } else if (size > 1000000000) {
    return `${Number(size.toString().replace(/\B(?=(\d{9})+(?!\d))/g, "."))
      .toFixed(2)
      .toString()} MB`;
  }

  return `${size} B`;
};

