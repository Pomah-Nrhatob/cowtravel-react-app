import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { selectTravelInfo } from "../../features/oneTravelInfoSlice";
import { selectChapters } from "../../features/chaptersSlice";
import { useLazyGetOneTravelQuery } from "../../app/services/travelApi";
import { useLazyGetChaptersQuery } from "../../app/services/chapterApi";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { ArticleContainer } from "../articleContainer";
import { TiArrowBack } from "react-icons/ti";
import { IoReturnUpBackSharp } from "react-icons/io5";
import {
  useDeletePublishTravelMutation,
  usePostPublishTravelMutation,
  useUpdatePublishMutation,
} from "../../app/services/publishApi";
import { Modal } from "../../ui/Modal/Modal";

export const PublishPageContainter = () => {
  {
    const navigate = useNavigate();
    const id = useLocation().pathname.split("/")[3];
    const travelInfo = useSelector(selectTravelInfo);
    const [publishTravel] = usePostPublishTravelMutation();
    const [deletePublishTravel] = useDeletePublishTravelMutation();
    const [updatePublish] = useUpdatePublishMutation();
    const [isModalPublish, setModalPublish] = useState(false);
    const [isModalDelete, setModalDelete] = useState(false);
    const [isModalUpdate, setModalUpdate] = useState(false);

    const chapters = useSelector(selectChapters).map((chapter) => {
      return {
        title: chapter.title,
        content: chapter.content,
        chapterId: chapter.id,
        images: chapter.images,
      };
    });

    const [getTravel] = useLazyGetOneTravelQuery();
    const [getChapters, { isLoading }] = useLazyGetChaptersQuery();

    useEffect(() => {
      getTravel(id).unwrap();
      getChapters(id).unwrap();
    }, []);

    const handleModalPublishOpen = () => {
      setModalPublish(true);
    };
    const handleModalPublishClose = () => {
      setModalPublish(false);
    };

    const handleModalDeleteOpen = () => {
      setModalDelete(true);
    };
    const handleModalDeleteClose = () => {
      setModalDelete(false);
    };

    const handleModalUpdateOpen = () => {
      setModalUpdate(true);
    };
    const handleModalUpdateClose = () => {
      setModalUpdate(false);
    };

    const handlePublishTravel = async () => {
      try {
        await publishTravel({ travelId: travelInfo.id }).unwrap();
        handleModalPublishClose();
        navigate(`/edittravels/${travelInfo.id}`);
      } catch (error) {
        console.log(error);
        handleModalPublishClose();
      }
    };

    const handleDeletePublishTravel = async () => {
      try {
        await deletePublishTravel(travelInfo.id).unwrap();
        handleModalDeleteClose();
        navigate(`/edittravels/${travelInfo.id}`);
      } catch (error) {
        console.log(error);
        handleModalDeleteClose();
      }
    };

    const handleUpdatePublishTravel = async () => {
      try {
        await updatePublish(travelInfo.id).unwrap();
        handleModalUpdateClose();
      } catch (error) {
        console.log(error);
        handleModalUpdateClose();
      }
    };

    return (
      <div className={styles.publishPage_main}>
        {isLoading ? (
          <BarLoader />
        ) : (
          <div className={styles.articleContainer_main}>
            <div className={styles.pannelBtn}>
              <IoReturnUpBackSharp
                className={styles.btnBack}
                onClick={() => navigate(`/edittravels/${id}`)}
                size="2rem"
              />
              {travelInfo.isPublished ? (
                <div className={styles.btn_div}>
                  <button
                    onClick={handleModalUpdateOpen}
                    className={styles.btn_green}
                  >
                    Внести изменения
                  </button>
                  <button
                    onClick={handleModalDeleteOpen}
                    className={styles.btn_red}
                  >
                    Удалить
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleModalPublishOpen}
                  className={styles.btn_green}
                >
                  Опубликовать
                </button>
              )}
              <div>
                {isModalPublish && (
                  <Modal
                    title="Вы точно хотите опубликовать статью?"
                    onClose={handleModalPublishClose}
                  >
                    <div>
                      <button onClick={() => handlePublishTravel()}>
                        Да, опубликовать
                      </button>
                      <button onClick={() => setModalPublish(false)}>
                        Нет, вернуться к проверке
                      </button>
                    </div>
                  </Modal>
                )}
              </div>
              <div>
                {isModalDelete && (
                  <Modal
                    title="Вы точно хотите удалить статью?"
                    onClose={handleModalDeleteClose}
                  >
                    <div>
                      <button onClick={() => handleDeletePublishTravel()}>
                        Да, удалить
                      </button>
                      <button onClick={() => setModalDelete(false)}>
                        Нет, оставить
                      </button>
                    </div>
                  </Modal>
                )}
              </div>
              <div>
                {isModalUpdate && (
                  <Modal
                    title="Вы точно хотите внести изменения в опубликованную статью?"
                    onClose={handleModalUpdateClose}
                  >
                    <div>
                      <button onClick={() => handleUpdatePublishTravel()}>
                        Да, внести изменения
                      </button>
                      <button onClick={() => setModalUpdate(false)}>
                        Нет, оставить без изменений
                      </button>
                    </div>
                  </Modal>
                )}
              </div>
            </div>
            <ArticleContainer
              imagePath={travelInfo.image?.imagePath}
              title={travelInfo.title}
              countries={travelInfo.countries}
              dateTravel={travelInfo.dateTravel}
              userId={travelInfo.userId}
              chapters={chapters}
            />
          </div>
        )}
      </div>
    );
  }
};
