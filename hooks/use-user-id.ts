import { useParams } from "next/navigation";

const useUserId = () => {
  const params = useParams();
  return params.userId as string;
};

export default useUserId;