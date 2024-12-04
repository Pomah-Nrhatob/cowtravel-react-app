import React, { useState } from "react";
import styles from "./index.module.css";
import { useDeleteTravelMutation } from "../../../app/services/travelApi";
import { deleteTravelReducer } from "../../../features/travelsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../ui/Modal/Modal";
import moment from "moment";

type Props = {
  id: string | null;
  title: string | null;
  createdAt: Date | null;
};

export const SingleTravel: React.FC<Props> = ({ id, title, createdAt }) => {
  const [deleteTravel] = useDeleteTravelMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dateCreated = moment(createdAt).format("LL");

  const [isModalActive, setModalActive] = useState(false);

  const handleModalOpen = () => {
    setModalActive(true);
  };
  const handleModalClose = () => {
    setModalActive(false);
  };

  const handleDeleteTravel = async () => {
    try {
      deleteTravel({ id });
      dispatch(deleteTravelReducer({ id: id }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.singleTravel_main}>
      <h2>{title}</h2>
      <div className={styles.date}>
        <span>Создано </span> {dateCreated}
      </div>
      <div className={styles.panel_btn}>
        <button
          className={styles.btn_delete}
          type="button"
          onClick={handleModalOpen}
        >
          Удалить
        </button>
        <div>
          {isModalActive && (
            <Modal
              title="Вы точно хотите удалить путешествие?"
              onClose={handleModalClose}
            >
              <div>
                <button onClick={() => handleDeleteTravel()}>
                  Да, удалить
                </button>
                <button onClick={() => setModalActive(false)}>
                  Нет, оставить
                </button>
              </div>
            </Modal>
          )}
        </div>
        <button
          className={styles.btn_change}
          onClick={() => navigate(`/edittravels/${id}`)}
        >
          Редактировать
        </button>
      </div>
    </div>
  );
};
