import styles from "../styles/header.module.scss";
import Navigation from "./Navigation";
import { Connector } from "./Connector";

const Header = () => {
  return (
    <div>
      {/* <div className={styles.header}>
        <div className={styles.title}>
          <h1>SIGN AND SEND MESSAGE</h1>
          <h2>using blockchain</h2>
          <div className={styles.block}></div>
        </div>
        <div className={styles.navigate}>
          <Navigation href={"/prizes"} text={"Prizes list"} />
          <Navigation href={"/"} text={"Home"} />
        </div>
      </div> */}
      {/* <Connector /> */}
    </div>
  );
};

export default Header;
