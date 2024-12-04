import React, { FC, useState } from "react";
import styles from "./index.module.css";
import { Image } from "../../../app/types";
import { BASE_URL } from "../../../constants";
import { MdDelete } from "react-icons/md";
import {
  useDeleteImageMutation,
  useUpdateImageInfoMutation,
} from "../../../app/services/imageApi";
import { Modal } from "../../../ui/Modal/Modal";
import { useDispatch } from "react-redux";
import { deleteImageReducer } from "../../chaptersSlice";
import { useForm } from "react-hook-form";
import { InputForm } from "./InputForm";

type Props = {
  sildeInfo: Image | null;
  changeSlide: (direction: number) => void;
  showPanelBtn: boolean;
};

type ImageInfoFrom = {
  id: string | null;
  title: string | null;
};

export const Slide: FC<Props> = ({ sildeInfo, changeSlide, showPanelBtn }) => {
  const dispatch = useDispatch();
  const [deleteImage, { isLoading }] = useDeleteImageMutation();
  const [updateImage] = useUpdateImageInfoMutation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<ImageInfoFrom>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: { id: sildeInfo?.id, title: sildeInfo?.title },
  });

  const handleUpdateImageInfo = async (data: ImageInfoFrom) => {
    if (isDirty) {
      try {
        await updateImage(data).unwrap();
      } catch (error) {}
      reset(data);
    }
  };

  const handleDeleteImage = async () => {
    try {
      const res = await deleteImage(sildeInfo?.id).unwrap();
      dispatch(deleteImageReducer(res));
      changeSlide(-1);
      setModalActive(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [isModalActive, setModalActive] = useState(false);

  const handleModalOpen = () => {
    setModalActive(true);
  };
  const handleModalClose = () => {
    setModalActive(false);
  };

  return (
    <div className={styles.singleSlide}>
      {showPanelBtn ? (
        <div className={styles.panelBtn}>
          <div
            className={styles.inputForm}
            onBlur={handleSubmit(handleUpdateImageInfo)}
          >
            <InputForm name="title" control={control} />
          </div>
          <div>
            {isModalActive && (
              <Modal
                title="Вы точно хотите удалить фото?"
                onClose={handleModalClose}
              >
                <div>
                  <button onClick={handleDeleteImage}>Да, удалить</button>
                  <button onClick={() => setModalActive(false)}>
                    Нет, оставить
                  </button>
                </div>
              </Modal>
            )}
          </div>
          <MdDelete onClick={handleModalOpen} size={30} />
        </div>
      ) : null}
      <img src={BASE_URL + "/" + sildeInfo?.filepath} />
      <i>{sildeInfo?.title}</i>
    </div>
  );
};
