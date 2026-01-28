import { useToast } from "@chakra-ui/react";
import { useEffect, useRef, type ReactNode } from "react";
import { BsWifiOff } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { networkMode } from "../app/features/networkSlice";

const InternetConnectionProvider = ({ children }: { children: ReactNode }) => {
  /*-----STATES-----*/
  const dispatch = useDispatch();
  const toast = useToast();
  const toastRef = useRef<ReturnType<typeof toast> | null>(null);

  /*-----HANDLERS-----*/
  function close() {
    toast.closeAll();
  }
  function showToast() {
    toastRef.current = toast({
      title: "You're offline.",
      description: "Please make sure you have internet connection",
      status: "warning",
      duration: null,
      isClosable: true,
      icon: <BsWifiOff size={20} />,
    });
  }
  const setOnlineEvent = () => {
    dispatch(networkMode(true));
    close();
  };
  const setOfflineEvent = () => {
    dispatch(networkMode(false));
    showToast();
  };

  useEffect(() => {
    window.addEventListener("online", setOnlineEvent);
    window.addEventListener("offline", setOfflineEvent);
    return () => {
      window.removeEventListener("online", setOnlineEvent);
      window.removeEventListener("offline", setOfflineEvent);
    };
  }, []);
  return children;
};
export default InternetConnectionProvider;
