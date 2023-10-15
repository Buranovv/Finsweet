import { useParams } from "react-router-dom";
import SingleCard from "../../../components/card/singleCard";
import Loader from "../../../components/shared/loader";
import useSingleData from "../../../hook/useSingleData";

const SinglePage = () => {
  const { postId } = useParams();

  const {
    data: post,
    photoId,
    ctgrName,
    first_name,
    last_name,
    ownerPhoto,
    loading,
  } = useSingleData("post", postId);

  console.log(post);
  return (
    <section>
      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          <SingleCard
            {...post}
            photoId={photoId}
            ctgrName={ctgrName}
            first_name={first_name}
            last_name={last_name}
            ownerPhoto={ownerPhoto}
          />
        )}
      </div>
    </section>
  );
};

export default SinglePage;
