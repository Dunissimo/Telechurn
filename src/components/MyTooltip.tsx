import { FC, ReactNode, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { InfoCircle } from "react-bootstrap-icons";

interface IProps {
  children: ReactNode;
  header: string;
  className?: string;
}

const MyTooltip: FC<IProps> = ({ children, header, className }) => {
  return (
    <div className={`${className}`}>
      <OverlayTrigger
        placement={document.body.clientWidth < 768 ? "bottom" : "right"}
        overlay={<Tooltip className="my-tooltip">{children}</Tooltip>}
      >
        {({ ref, ...triggerHandler }) => (
          <div
            className="tooltip-trigger cursor-help py-4 inline-flex items-center gap-2"
            {...triggerHandler}
          >
            <h2 className="text-2xl inline">{header}</h2>
            <InfoCircle
              // @ts-ignore
              ref={ref}
              className="tooltip-img transition-all duration-300"
              size="24"
            />
          </div>
        )}
      </OverlayTrigger>
    </div>
  );
};

export default MyTooltip;
