import React, {
  FC,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { upload } from "./upload";
import s from "./index.module.css";
import { BASE_URL } from "../../constants";
import { ProgressBar } from "../../ui/ProgressBar";
import { ClipLoader } from "react-spinners";
import { IoCloudUploadOutline } from "react-icons/io5";
import { ImageCard } from "./imageCard";
import { useDispatch } from "react-redux";
import { addImagesReducer } from "../chaptersSlice";

export type UploadProps = {
  onUpload?: (data: unknown) => void;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  disabled?: boolean;
  chapterId?: string | null;
};

export type UploadRef = {
  upload: () => void;

  abort: () => void;
};

export const Upload: FC<UploadProps> = ({ chapterId, disabled }) => {
  const [progress, setProgress] = useState(0);
  const [drop, setDrop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const reset = () => {
    setLoading(false);
    setProgress(0);
  };
  const dispatch = useDispatch();

  const deleteImageFromUploadList = (deletedId) => {
    setUploadingImage(uploadingImage.filter((image) => image.id !== deletedId));
  };

  const onUpload = (e) => {
    dispatch(addImagesReducer(e));
    setUploadingImage(e);
  };

  const abortUploading = useRef<() => void>();

  const abort = () => {
    abortUploading.current?.();
    reset();
  };

  const handleFile = (files: File[]) => {
    if (loading || !files) return;

    setLoading(true);

    const uploading = upload(
      files,
      BASE_URL + `/api/uploadimage/${chapterId}`,
      {
        onProgress: setProgress,
      }
    );
    abortUploading.current = uploading.abort;
    uploading
      .then(onUpload)
      .catch((e) => {
        console.log(e);
      })
      .finally(reset);
  };

  const onDragLeave = (e: React.DragEvent<HTMLElement>) => {
    if (disabled) return;
    e.preventDefault();
    setDrop(false);
  };

  const onDragOver = (e: React.DragEvent<HTMLElement>) => {
    if (disabled) return;
    e.preventDefault();
    setDrop(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    if (disabled) return;
    e.preventDefault();
    const droppedFile = e.dataTransfer.files;
    setDrop(false);

    handleFile(Array.from(droppedFile));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    handleFile(files);
  };

  return (
    <div className={s.dragAndDrop_container}>
      <div
        className={drop || loading ? s.upload_main_drop_active : s.upload_main}
        onDrop={handleDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        {loading ? (
          <div className={s.uploadingInfo}>
            <ClipLoader size={45} color={"rgba(42, 121, 212, 0.774)"} />
            <ProgressBar progress={progress * 2} />
            <button onClick={abort}>Отмена загрузки</button>
          </div>
        ) : (
          <div
            onClick={() => inputRef.current?.click()}
            className={s.upload_dragAndDrop}
          >
            <input
              ref={inputRef}
              disabled={disabled}
              multiple
              type="file"
              onChange={handleFileChange}
            />
            <IoCloudUploadOutline size={100} />
            {drop ? (
              <p>Отпусти файлы, чтобы загрузить</p>
            ) : (
              <p>Перетащи файлы сюда или нажми, чтобы загрузить</p>
            )}
          </div>
        )}
        <div className={s.selectedImage_main}>
          {uploadingImage.length > 0 ? (
            <div className={s.imageCard_list}>
              {uploadingImage.map((el) => {
                return (
                  <ImageCard
                    key={el.id}
                    deleteImageFromUploadList={deleteImageFromUploadList}
                    id={el.id}
                    src={BASE_URL + "/" + el.filepath}
                  />
                );
              })}
            </div>
          ) : (
            <span>Выбранные фото</span>
          )}
        </div>
      </div>
    </div>
  );
};
