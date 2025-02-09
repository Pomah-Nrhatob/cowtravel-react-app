import React, { useEffect, useRef, useState } from "react";
import { useLazyLogoutQuery } from "../../../../app/services/usersApi";
import { HeaderLink } from "../headerLink";
import styles from "./index.module.css";
import { BsThreeDots } from "react-icons/bs";
import { UserInfoModal } from "./UserInfoModal";
import useOutsideAlerter from "../../../../utils/useOutsideAlertet";
import { TiPencil } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

type Props = {
  userInfo: { name: string; id: number } | null;
};

export const UserProfile: React.FC<Props> = ({ userInfo }) => {
  const [triggerLogoutQuery] = useLazyLogoutQuery();
  const [userInfoModalState, setUserInfoModalState] = useState<boolean>(false);
  const [orientationState, setOrientationState] = useState<number>(
    document.documentElement.clientWidth
  );
  const navigate = useNavigate();

  window.addEventListener("resize", function (e) {
    setOrientationState(document.documentElement.clientWidth);
  });

  const wrapperRef = useRef(null);

  const onClickLogout = async () => {
    try {
      await triggerLogoutQuery("").unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    if (userInfoModalState) {
      setUserInfoModalState(false);
    } else {
      setUserInfoModalState(true);
    }
  };

  const onClose = () => {
    setUserInfoModalState(false);
  };

  useOutsideAlerter(wrapperRef, onClose);

  return (
    <div className={styles.userProfile_main}>
      {orientationState > 450 ? (
        <HeaderLink name="Мои путешествия" link="edittravels" />
      ) : (
        <TiPencil
          onClick={() => {
            navigate("/edittravels");
          }}
          size={"1.5rem"}
        />
      )}
      <BsThreeDots
        onClick={handleOpenModal}
        size={"1.5rem"}
        className={styles.profile_btn}
      />
      {userInfoModalState ? (
        <div className={styles.userInfoModal_container} ref={wrapperRef}>
          <UserInfoModal
            onClickLogout={onClickLogout}
            id={userInfo?.id}
            name={userInfo?.name}
          />
        </div>
      ) : null}
      {/* <div className={styles.userinfo}>
        <div>{userInfo ? userInfo.name : ""}</div>
        <button onClick={onClickLogout}>Выйти</button>
      </div> */}
    </div>
  );
};
