import React, { FC, useCallback, useEffect, useState } from "react";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";
import {
  useDeleteImageForMainPageMutation,
  useUploadImageForMainPageMutation,
} from "../../../app/services/imageApi";
import { BASE_URL } from "../../../constants";

type Image = {
  imageId: string;
  imagePath: string;
};

type Props = {
  travelId: string | null;
  image: Image | null;
};

export const EditImageForMainPage: FC<Props> = ({ travelId, image }) => {
  const [uploadImageForMainPage] = useUploadImageForMainPageMutation();
  const [deleteImageForMainPage] = useDeleteImageForMainPageMutation();
  const [imageState, setImageState] = useState<Image | null>(null);

  useEffect(() => {
    if (image) {
      setImageState(image);
    }
  }, [image]);

  const uploadImage = async (file) => {
    let formData = new FormData();
    if (file !== null) {
      formData.append("file", file);
    }

    try {
      const image = await uploadImageForMainPage({
        travelId,
        file: formData,
      }).unwrap();
      setImageState({ imageId: image.id, imagePath: image.filepath });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImage = async () => {
    try {
      await deleteImageForMainPage(travelId).unwrap();
      setImageState(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let file;
    if (event.target.files !== null) {
      file = event.target.files[0] || null;
    }
    uploadImage(file);
  };

  return (
    <div className={styles.editImage_main}>
      <h1>Выберете главное фото статьи</h1>
      <input
        disabled={imageState ? true : false}
        onChange={handleFileChange}
        type="file"
      />
      {imageState ? <button onClick={deleteImage}>Удалить фото</button> : ""}
      {imageState ? <img src={BASE_URL + "/" + imageState.imagePath} /> : ""}
    </div>
  );
};
``;
