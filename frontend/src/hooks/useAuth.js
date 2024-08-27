import { useSelector } from "react-redux";

export default function useAuth() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (isLoggedIn) {
    return true;
  } else {
    return false;
  }
}
