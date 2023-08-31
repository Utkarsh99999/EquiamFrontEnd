import styles from "./page.module.scss";
const Tab = ({ data }) => {
  console.log(data);
  return (
    <>
      {data.map((val, index) => (
        <div key={index} className={styles.tab}>
          <p>{val.status}</p>
          <h3>{val.title}</h3>
          <p>
            {val.description}
          </p>
          <span className={styles.advice}>{val.category}</span>
        </div>
      ))}
    </>
  );
};

export default Tab;
