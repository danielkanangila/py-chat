import moment from "moment";

export const formatHour = date => {
  date = moment(date);
  return `${date.hour()} h ${date.minutes()}`
};

export const formatDate = date => {
  const now = moment(new Date());

  switch(now.diff(date, "day")) {
    case 0:
      return "Today";
    case 1:
      return "Yesterday";
    default:
      return moment(date).format("MMMM Do YYYY")
  }

};

export const groupByDate = data => {
  return data.reduce((r, a) => {
    const key = moment(a.created_at).format("YYYY-MM-DD");
    r[key] = r[key] || [];
    r[key].push(a);

    return r
  }, Object.create({}));
};