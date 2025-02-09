import React, { FC, useEffect } from "react";
import { MainPageContainer } from "../../components/mainPage";

type Props = {
  title: string;
};

export const MainPage: FC<Props> = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <MainPageContainer />
    </>
  );
};
