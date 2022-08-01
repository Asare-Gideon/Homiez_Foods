import axios from "../../app/axios";

export const getFoodsApi = async (
  page: number,
  lastUpdate: number,
  lastDoc: any,
  category: string,
  isUpdated?: boolean
) => {
  try {
    const res = await axios.get(
      `/users/foods?page=${page}&lastDocId=${
        (!isUpdated && lastDoc && lastDoc.id) || ""
      }&category=${category}`
    );
    if (res.data.error) return res.data.error;
    const data = res.data.items;
    return { data, lastUpdate, category, isNewSet: res.data.isNewSet };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
