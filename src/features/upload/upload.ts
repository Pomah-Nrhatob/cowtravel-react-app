import { useDispatch } from "react-redux";
import { addImagesReducer } from "../chaptersSlice";
import { RootState } from "../../app/store";

export type UploadPromise<T> = Promise<T> & { abort: () => void };

export const upload = <T>(
  files: File[],
  url: string,
  options?: { onProgress?: (progress: number) => void }
): UploadPromise<T> => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";

  const onProgress = options?.onProgress;

  const promise = new Promise((resolve, reject) => {
    xhr.open("POST", url);

    xhr.upload.onprogress = (event) => {
      onProgress?.(Math.round((event.loaded / event.total) * 100));
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(xhr.response);
      }
    };

    const token = localStorage.getItem("token");

    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }

    const myData = new FormData();
    files.forEach((el) => {
      myData.append("file", el);
    });

    xhr.send(myData);
  }) as UploadPromise<T>;

  promise.abort = () => xhr.abort();

  return promise;
};
