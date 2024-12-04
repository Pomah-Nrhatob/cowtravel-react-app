import React, { useEffect } from "react";
import styles from "./index.module.css";

export const ErrorMessage = ({ error }: { error: string }) => {
  return error && <p className={styles.p_error}>* {error}</p>;
};
