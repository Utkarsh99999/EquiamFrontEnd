"use client"
import styles from "./page.module.scss";
import {useState} from 'react';
import Image from 'next/image';
import Link from "next/link";
const FeedbackDetail = () => {
  const [sortBy, setSortBy] = useState("most-upvotes");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSortChange = (option) => {
    setSortBy(option);
    setIsDropdownOpen(false);
  };
  return (
    <div className={styles.main}>

      <div className={styles.container}>

        <div className={styles.Nav}>
          <span className={styles.back}>
            <Link href={"/"}>{`< Go Back`}</Link>{" "}
          </span>
        </div>
       
        <div className={styles.flatBox}>
         <h2>Create New Feedback</h2>

         <div className={styles.input}>
          <p style={{fontWeight:'bold'}}>Feedback Title</p>
          <p>Add a short, descriptive headline</p>
          <input type="text" />
         </div>

        <div className={styles.select} 
         onMouseEnter={() => setIsDropdownOpen(true)}
         onMouseLeave={() => setIsDropdownOpen(false)}>
         <p>{sortBy}</p>
         {isDropdownOpen?
         (<Image src="/icon-arrow-up.svg" width={15} height={10} alt="arrow-up"/>):
         (<Image src="/icon-arrow-down.svg" width={15} height={10} alt="arrow-down"/>)} 
         </div>

         <div className={isDropdownOpen?styles.scaleIn:styles.scaleOut}>
              {isDropdownOpen && (
                <div
                  className={styles.dropdown}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <div
                    onClick={() => handleSortChange("most-upvotes")}
                    className={styles.dropdownItem}
                  >
                    Most Upvotes
                  </div>
                  <hr />
                  <div
                    onClick={() => handleSortChange("least-upvotes")}
                    className={styles.dropdownItem}
                  >
                    Least Upvotes
                  </div>
                  <hr />
                  <div
                    onClick={() => handleSortChange("most-comments")}
                    className={styles.dropdownItem}
                  >
                    Most Comments
                  </div>
                  <hr />
                  <div
                    onClick={() => handleSortChange("least-comments")}
                    className={styles.dropdownItem}
                  >
                    Least Comments
                  </div>
                </div>
              )}
         </div>

         <div className={styles.input}>
          <p style={{fontWeight:'bold'}}>Feedback Detail</p>
          <p>Include any specific comments on what should be improved, added, etc.</p>
          <input type="text" />
         </div>

         <div className={styles.button}>
          <button className={styles.btn2}>Cancel</button>
          <button className={styles.btn1}>Add Feedback</button>
         </div>
         
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetail;
