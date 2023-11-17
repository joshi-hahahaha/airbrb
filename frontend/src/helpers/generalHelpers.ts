/**
 * Given a js file object representing a jpg or png image, such as one taken
 * from a html file input element, return a promise which resolves to the file
 * data as a data url.
 *
 * @param {File} file The file to be read.
 * @return {Promise<string>} Promise which resolves to the file as a data url.
 */
export const fileToDataUrl = (file: File): Promise<string> => {
  const validFileTypes: string[] = ['image/jpeg', 'image/png', 'image/jpg'];
  const valid: boolean = validFileTypes.some((type) => type === file.type);

  // Bad data, let's walk away.
  if (!valid) {
    return Promise.reject(
      new Error('Provided file is not a png, jpg, or jpeg image.')
    );
  }

  const reader = new FileReader();

  const dataUrlPromise: Promise<string> = new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };

    reader.onload = () => {
      resolve(reader.result as string);
    };
  });

  reader.readAsDataURL(file);
  return dataUrlPromise;
};

export const isImgFile = (url: string): boolean => {
  return url.includes('data:image');
};

export const formatYoutubeVid = (url: string) => {
  const vId = extractVidID(url);

  return `https://www.youtube.com/embed/${vId}`;
};

const extractVidID = (url: string) => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
};
