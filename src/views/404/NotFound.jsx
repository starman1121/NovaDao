import HectorIcon from "../../assets/icons/NOVA-nav-header.svg";
import "./notfound.scss";

export default function NotFound() {
  return (
    <div id="not-found">
      <div className="not-found-header">
        <a href="https://NOVAdao.co" target="_blank">
          <img className="branding-header-icon" src={HectorIcon} alt="NOVADAO" />
        </a>

        <h2 style={{ textAlign: "center" }}>Page not found</h2>
      </div>
    </div>
  );
}
