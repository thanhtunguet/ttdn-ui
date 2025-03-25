import { Link } from "react-router-dom";
import { Company } from "../models/Company";
import { Tooltip } from "antd";

function AddressLink(props: { company: Company }) {
  const {
    company: { provinceName, address },
  } = props;

  const url = `https://www.google.com/maps/search/${encodeURIComponent(
    address
  )}`;

  return (
    <Tooltip title={address}>
      <Link to={url} target="_blank">
        {provinceName}
      </Link>
    </Tooltip>
  );
}

export default AddressLink;
