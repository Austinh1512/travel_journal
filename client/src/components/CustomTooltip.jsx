import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function CustomTooltip(props) {
  return (
    <OverlayTrigger
      placement={props.placement}
      overlay={<Tooltip id={props.id}>{props.text}</Tooltip>}
      delay={{ show: 250, hide: 300 }}
    >
      {props.children}
    </OverlayTrigger>
  );
}
