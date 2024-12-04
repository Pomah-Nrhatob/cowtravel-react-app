import React, { FC } from "react";
import styles from "./index.module.css";
import { useDeleteImageMutation } from "../../../app/services/imageApi";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteImageReducer } from "../../chaptersSlice";

type Props = {
  src: string;
  id: string;
  deleteImageFromUploadList: (id: string) => void;
};

export const ImageCard: FC<Props> = ({
  src,
  id,
  deleteImageFromUploadList,
}) => {
  const [deleteImage] = useDeleteImageMutation();
  const dispatch = useDispatch();

  const handleDeleteImage = async () => {
    try {
      const deletedImage = await deleteImage(id).unwrap();
      deleteImageFromUploadList(id);
      dispatch(deleteImageReducer(deletedImage));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.imageCard_container}>
      <MdDeleteOutline
        className={styles.btn}
        size={20}
        onClick={handleDeleteImage}
      />
      <img src={src} alt="" />
    </div>
  );
};
