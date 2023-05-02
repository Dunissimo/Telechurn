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
    return <Fragment key={Math.ceil(Math.random() * 1000000)}>{temp}</Fragment>;
  }

  return (
    <Fragment key={Math.ceil(Math.random() * 1000000)}>{children}</Fragment>
  );
};

export default ErrorBoundary;
