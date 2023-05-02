import { FC, ReactNode } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { CaretDown } from "react-bootstrap-icons";

interface IProps {
  children: ReactNode;
  header: string;
  className?: string;
}

const MyTooltip: FC<IProps> = ({ children, header, className }) => {
  return (
    <div className={className}>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip className="my-tooltip">{children}</Tooltip>}
      >
        {({ ref, ...triggerHandler }) => (
          <div className="flex items-center gap-2">
            <h2
              className="tooltip-trigger cursor-help text-2xl inline"
              {...triggerHandler}
            >
              {header}
            </h2>
            <CaretDown
              // @ts-ignore
              ref={ref}
              className="tooltip-img cursor-help transition-all duration-300"
              size="24"
            />
          </div>
        )}
      </OverlayTrigger>
    </div>
  );
};

export default MyTooltip;
