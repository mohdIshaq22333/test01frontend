import styles from "../styles/Home.module.css";
import UploadFile from "../components/uploadFile";

export default function Home() {
  return <div className={styles.container}>
<UploadFile/>
  </div>;
}
