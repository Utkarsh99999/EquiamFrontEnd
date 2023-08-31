"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("all");
  const [product, setProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [sortBy, setSortBy] = useState("most-upvotes");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [planned,setPlanned] = useState([]);
  const [inProgress,setInProgress] = useState([]);
  const [live,setLive] = useState([]);

  const handleSortChange = (option) => {
    setSortBy(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    fetch("http://localhost:3001/userdata")
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].productRequests);
        const result1 = data[0].productRequests.filter(
          (val) => val.status === "planned"
        );
        const result2 = data[0].productRequests.filter(
          (val) => val.status === "in-progress"
        );
        const result3 = data[0].productRequests.filter(
          (val) => val.status === "live"
        );
        setPlanned(result1);
        setInProgress(result2);
        setLive(result3);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/userdata")
      .then((response) => response.json())
      .then((data) => {
        setProduct(data[0].productRequests);
        setFilteredProduct(data[0].productRequests);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <main className={styles.main}>

      <div
        className={`${styles.drawer} ${
          show ? styles.scaleIn : styles.scaleOut
        }`}
        style={show ? { display: "contents" } : { display: "none" }}
      >
        <div className={styles.filter}>
          <span
            className={styles.advice}
            style={
              selected === "All"
                ? {
                    backgroundColor: "rgba(70, 97, 230, 1)",
                    color: "rgba(255, 255, 255, 1)",
                  }
                : {}
            }
            onClick={() => {
              setSelected("ALL");
            }}
          >
            ALL
          </span>
          <span
            className={styles.advice}
            style={
              selected === "UI"
                ? { backgroundColor: "rgba(70, 97, 230, 1)", color: "white" }
                : {}
            }
            onClick={() => {
              setSelected("UI");
            }}
          >
            UI
          </span>
          <span
            className={styles.advice}
            style={
              selected === "UX"
                ? { backgroundColor: "rgba(70, 97, 230, 1)", color: "white" }
                : {}
            }
            onClick={() => {
              setSelected("UX");
            }}
          >
            UX
          </span>
          <span
            className={styles.advice}
            style={
              selected === "Enhancement"
                ? { backgroundColor: "rgba(70, 97, 230, 1)", color: "white" }
                : {}
            }
            onClick={() => {
              setSelected("Enhancement");
            }}
          >
            Enhancement
          </span>
          <span
            className={styles.advice}
            style={
              selected === "Bug"
                ? { backgroundColor: "rgba(70, 97, 230, 1)", color: "white" }
                : {}
            }
            onClick={() => {
              setSelected("Bug");
            }}
          >
            Bug
          </span>
          <span
            className={styles.advice}
            style={
              selected === "Feature"
                ? { backgroundColor: "rgba(70, 97, 230, 1)", color: "white" }
                : {}
            }
            onClick={() => {
              setSelected("Feature");
            }}
          >
            Feature
          </span>
        </div>

        <div className={styles.roadmap}>
          <span>
            <h4>Roadmap</h4>
            <Link href="/roadmap">View</Link>
          </span>
          <span>
            <p>Planned</p>
            <p>4</p>
          </span>
          <span>
            <p>In-Progress</p>
            <p>4</p>
          </span>
          <span>
            <p>Live</p>
            <p>4</p>
          </span>
        </div>
      </div>

      <div className={`${styles.Box1}`}>
        <div className={styles.radialGrad}>
          <span>
            <p>Eqaim</p>
            <p>Feedback Board</p>
          </span>
          <span
            onClick={() => {
              setShow(!show);
            }}
          >
            <Image
              src="/burger.png"
              height={20}
              width={35}
              style={{ filter: "invert(100%)" }}
            />
          </span>
        </div>

        <div className={styles.filter}>
          <span
            className={styles.advice}
            style={
              selected === "all"
                ? {
                    backgroundColor: "rgba(70, 97, 230, 1)",
                    color: "rgba(255, 255, 255, 1)",
                  }
                : {}
            }
            onClick={() => {
              setSelected("all");
              setFilteredProduct(product); // Reset to all products
            }}
          >
            ALL
          </span>
          <span
            className={styles.advice}
            style={
              selected === "ui"
                ? { backgroundColor: "rgba(70, 97, 230, 1)", color: "white" }
                : {}
            }
            onClick={() => {
              setSelected("ui");
              setFilteredProduct(
                product.filter((val) => val.category === "ui")
              );
            }}
          >
            UI
          </span>
          <span
            className={styles.advice}
            style={
              selected === "ux"
                ? { backgroundColor: "rgba(70, 97, 230, 1)", color: "white" }
                : {}
            }
            onClick={() => {
              setSelected("ux");
              setFilteredProduct(
                product.filter((val) => val.category === "ux")
              );
            }}
          >
            UX
          </span>
          <span
            className={styles.advice}
            style={
              selected === "enhancement"
                ? { backgroundColor: "rgba(70, 97, 230, 1)", color: "white" }
                : {}
            }
            onClick={() => {
              setSelected("enhancement");
              setFilteredProduct(
                product.filter((val) => val.category === "enhancement")
              );
            }}
          >
            Enhancement
          </span>
          <span
            className={styles.advice}
            style={
              selected === "bug"
                ? { backgroundColor: "rgba(70, 97, 230, 1)", color: "white" }
                : {}
            }
            onClick={() => {
              setSelected("bug");
              setFilteredProduct(
                product.filter((val) => val.category === "bug")
              );
            }}
          >
            Bug
          </span>
          <span
            className={styles.advice}
            style={
              selected === "feature"
                ? { backgroundColor: "rgba(70, 97, 230, 1)", color: "white" }
                : {}
            }
            onClick={() => {
              setSelected("feature");
              setFilteredProduct(
                product.filter((val) => val.category === "feature")
              );
            }}
          >
            Feature
          </span>
        </div>

        <div className={styles.roadmap}>
          <span>
            <h4>Roadmap</h4>
            <Link href="/roadmap">View</Link>
          </span>
          <span>
            <p style={{fontWeight:'100',fontSize:'small'}}>Planned</p>
            <p>{planned.length}</p>
          </span>
          <span>
            <p style={{fontWeight:'100',fontSize:'small'}}>In-Progress</p>
            <p>{inProgress.length}</p>
          </span>
          <span>
            <p style={{fontWeight:'100',fontSize:'small'}}>Live</p>
            <p>{live.length}</p>
          </span>
        </div>
      </div>

      <div className={styles.Box2}>

        <div className={styles.topNav}>
          <div className={styles.navOptions1}>
            <Image src="/icon-suggestions.svg" height={30} width={30} />
            <p>{filteredProduct.length} Suggestions</p>
            <div onMouseEnter={() => setIsDropdownOpen(true)} style={{cursor:'pointer'}}>
             Sort by : {sortBy}
              {isDropdownOpen && (
                <div  className={isDropdownOpen?styles.scaleIn:styles.scaleOut}>
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
                </div>
              )}
            </div>
          </div>

          <div className={styles.navOptions2}>
            <Link href="/addfeedback">
              <button className={styles.btn1}> + Add Feedback</button>
            </Link>
          </div>
        </div>

        {filteredProduct ? (
          <>
            {filteredProduct.map((val, index) => (
              <div key={val._id} id={index} className={styles.flatBox}>
                <div className={styles.upvoteContainer}>
                  <span className={styles.upvote}>
                    <Image src="/Path 2.png" height={10} width={15} />
                    <p>{val.upvotes}</p>
                  </span>
                  <span className={styles.comment}>
                    <Image src="/Path.png" height={20} width={20} />
                    <p>{val.comments.length}</p>
                  </span>
                </div>
                <div className={styles.contentContainer}>
                  <div className={styles.content}>
                    <Link href={`/detail/${val._id}`}>
                      <h3>{val.title}</h3>
                    </Link>
                    <p>{val.desc}</p>
                    <div className={styles.advice}>{val.category}</div>
                  </div>
                  <span className={styles.commentsDesktop}>
                    <Image src="/Path.png" height={20} width={20} />
                    <p>{val.comments.length}</p>
                  </span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className={styles.flatBoxEmpty}>
              <Image src="/Group 16.png" height={150} width={150} />

              <div className={styles.EmptyText}>
                <h3>There is no feedback yet.</h3>
                <p>
                  Got a suggestion? Found a bug that needs to be squashed? We
                  love hearing about new ideas to improve our app.
                </p>
              </div>

              <button className={styles.btn1}>+ Add Feedback</button>
            </div>
          </>
        )}
      </div>

    </main>
  );
}
