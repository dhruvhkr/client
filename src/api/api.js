import axios from "./axios";
const getPolicyById = async (url, callback) => {
  axios
    .get(url)
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      callback(err);
    });
};

export default getPolicyById;
