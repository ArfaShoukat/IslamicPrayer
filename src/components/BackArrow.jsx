
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import  './BackArrow.css'

const BackArrow = ({ to = "/", label = "Back" }) => {
  const navigate = useNavigate();

  return (
    <button className="back-arrow" onClick={() => navigate(to)}>
      <FaArrowLeft /> {label}
    </button>
  );
};

export default BackArrow;