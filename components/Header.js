import styles from "../styles/header.module.scss";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>SIGN AND SEND MESSAGE</h1>
          <h2>using blockchain</h2>
          <div className={styles.block}></div>
        </div>
        <div className={styles.navigate}>
          <Navigation href={"/"} text={"Home"} />
          <Navigation href={"/prizes"} text={"Prizes list"} />
        </div>
      </div>
    </header>
  );
};

export default Header;
