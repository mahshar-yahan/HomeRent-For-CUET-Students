import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchLoggedInUser } from "../features/auth/authSlice";

export default function useCheckAuth() {
  const [authChecked, setAuthChecked] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const localAuth = localStorage.getItem("auth");

    if (localAuth) {
      const { email, password } = JSON.parse(localAuth);
      dispatch(fetchLoggedInUser({ email, password }));
    }

    setAuthChecked(true);
  }, [dispatch]);

  return authChecked;
}
