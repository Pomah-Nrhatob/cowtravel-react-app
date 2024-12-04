import React, { FC, useEffect, useState } from "react";
import styles from "../index.module.css";
import moment from "moment";
import "moment/dist/locale/ru";
import { setTimeToPost } from "../../../../../utils/setTimePost";
import { Link } from "react-router-dom";

type Props = {
  id?: string;
  authorId: string | null;
  userName: string | null | undefined;
  createdAt: Date | null | undefined;
};

export const Header: FC<Props> = ({ id, authorId, userName, createdAt }) => {
  const [dateState, setDateState] = useState<string>("");

  useEffect(() => {
    if (createdAt) {
      setDateState(setTimeToPost(createdAt));
    }
  }, [createdAt]);

  return (
    <div className={styles.headr_main}>
      <Link to={`/user/${authorId}`} className={styles.link_userName}>
        {userName}
      </Link>
      {id ? (
        <Link className={styles.link_date} to={"/article/" + id}>
          {dateState}
        </Link>
      ) : (
        <p className={styles.link_date}>{dateState}</p>
      )}
    </div>
  );
};
