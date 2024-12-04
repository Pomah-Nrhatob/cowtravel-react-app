import React, { useEffect } from "react";
import {
  useCurrentQuery,
  useLazyRefreshQuery,
} from "../../app/services/usersApi";
import { BarLoader } from "react-spinners";

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isError, isLoading } = useCurrentQuery();
  const [triggerRefreshQuery] = useLazyRefreshQuery();

  useEffect(() => {
    if (isError) {
      triggerRefreshQuery();
    }
  }, [isError]);

  if (isLoading) {
    return <BarLoader color="#A2A2FF" />;
  }

  return children;
};
