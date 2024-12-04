import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Chapter, Image } from "../../../../app/types";
import {
  useCreateChapterMutation,
  useDeleteChapterMutation,
  useUpdateChapterMutation,
} from "../../../../app/services/chapterApi";
import { useDispatch } from "react-redux";
import styles from "./index.module.css";
import { TextEditor } from "../../../../features/textEditor";
import {
  addChapterWithId,
  deleteChapterReducer,
  deleteChapterWithId,
} from "../../../../features/chaptersSlice";
import { Modal } from "../../../../ui/Modal/Modal";
import { Upload } from "../../../../features/upload";
import { ImageSlider } from "../../../../features/imageSlider";

type Props = {
  title: string | null;
  content: string;
  id: string | null;
  travelId: string | null;
  images: Image[] | null | undefined;
  saveNewChapter: boolean;
  setSaveNewChapter: (arg: boolean) => void;
  arrayIndex?: number;
};

export const SingleEditContent: React.FC<Props> = ({
  title,
  content,
  id,
  travelId,
  images,
  saveNewChapter,
  setSaveNewChapter,
  arrayIndex,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
  } = useForm<Chapter>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: { title, content },
  });

  const dispatch = useDispatch();

  const [updateChapter] = useUpdateChapterMutation();
  const [createChapter] = useCreateChapterMutation();
  const [deleteChapter] = useDeleteChapterMutation();

  const handleSave = async (data: Chapter) => {
    if (isDirty) {
      try {
        await updateChapter({ ...data, id: id }).unwrap();
      } catch (error) {
        console.log(error);
      }
      reset(data);
    }
  };

  const contentRef = useRef(null);

  const handleCreateChapter = async (data: Chapter) => {
    if (isDirty) {
      try {
        const res = await createChapter({ ...data, travelId });
        if (res.data) {
          dispatch(addChapterWithId({ ...res.data, images: [] }));
          dispatch(deleteChapterReducer(arrayIndex));
        }
      } catch (error) {
        console.log(error);
      }

      reset(data);
    }
  };

  const handleDeleteChapter = async () => {
    if (id) {
      try {
        await deleteChapter(id).unwrap();
        dispatch(deleteChapterWithId(id));
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(deleteChapterReducer(arrayIndex));
    }
  };

  useEffect(() => {
    reset({ title, content });
  }, []);

  const [isModalActive, setModalActive] = useState(false);

  const handleModalOpen = () => {
    setModalActive(true);
  };
  const handleModalClose = () => {
    setModalActive(false);
  };

  return (
    <div
      className={styles.singleEditContent_main}
      onBlur={id ? handleSubmit(handleSave) : handleSubmit(handleCreateChapter)}
    >
      <form
        onSubmit={
          id ? handleSubmit(handleSave) : handleSubmit(handleCreateChapter)
        }
      >
        <input
          className={styles.input_form}
          {...register("title")}
          placeholder="Название"
        ></input>
        <Controller
          render={({ field }) => (
            <TextEditor
              content={content}
              value={field.value}
              onChange={field.onChange}
            />
          )}
          name="content"
          control={control}
          defaultValue=""
        />
        {id ? (
          <div className={styles.upload_file_main}>
            <Upload chapterId={id} />
            <div className={styles.image_slider_containter}>
              <ImageSlider showPanelBtn={true} images={images} chapterId={id} />
            </div>
          </div>
        ) : (
          ""
        )}
      </form>
      <div className={styles.panel_btnForm}>
        <button
          className={styles.form_btnDelete}
          type="button"
          onClick={handleModalOpen}
        >
          Удалить главу
        </button>
        <div>
          {isModalActive && (
            <Modal
              title="Вы точно хотите удалить главу?"
              onClose={handleModalClose}
            >
              <div>
                <button onClick={() => handleDeleteChapter()}>
                  Да, удалить
                </button>
                <button onClick={() => setModalActive(false)}>
                  Нет, оставить
                </button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};
