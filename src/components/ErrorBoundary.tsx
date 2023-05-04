import { FC, Fragment, ReactNode } from "react";
import { useAppSelector } from "../utils/hooks/redux";
import { getStatus } from "../redux/slices/statusSlice";

interface IProps {
  children: ReactNode;
  temp?: ReactNode;
}

const ErrorBoundary: FC<IProps> = ({ children, temp = null }) => {
  const { isError } = useAppSelector(getStatus);

  if (isError) {
    return <>{temp}</>;
  }

  return <>{children}</>;
};

export default ErrorBoundary;
