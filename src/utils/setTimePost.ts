import moment from "moment";
import "moment/dist/locale/ru";

export const setTimeToPost = (date: Date): string => {
  moment.locale("ru");
  const datePost = moment(new Date(date));
  const dateNow = moment(new Date());
  if (dateNow.diff(datePost, "year") > 0) {
    return (
      moment(datePost).format("LL") + " в " + moment(datePost).format("HH:mm")
    );
  } else if (dateNow.diff(datePost, "day") > 1) {
    return datePost.format("DD MMMM") + " в " + datePost.format("HH:mm");
  } else if (
    dateNow.diff(datePost, "hour") > 23 &&
    dateNow.diff(datePost, "day") < 2
  ) {
    return "вчера в " + datePost.format("HH:mm");
  }
  return datePost.fromNow();
};
