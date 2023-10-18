import { useEffect, useState } from "react";
import request from "../server";
import { toast } from "react-toastify";

const useSingleData = (param, id) => {
  const [data, setData] = useState({});
  const [photoId, setPhotoId] = useState(null);
  const [ctgrName, setCtgrName] = useState(null);
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLatName] = useState(null);
  const [ownerPhoto, setOwnerPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        let { data } = await request.get(`${param}/${id}`);

        setFirstName(data.user.first_name);
        setLatName(data.user.last_name);
        setOwnerPhoto(data.user.photo);
        setCtgrName(data.category?.name);
        setPhotoId(data.photo._id);
        setData(data);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [param, id]);

  return {
    data,
    photoId,
    ctgrName,
    first_name,
    last_name,
    ownerPhoto,
    loading,
  };
};

export default useSingleData;
