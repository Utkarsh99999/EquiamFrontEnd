"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";
import { ProductRequest } from "./types"; // Adjust the path to match your project structure

export default function Home() {
  const [show, setShow] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("all");
  const [product, setProduct] = useState<ProductRequest[]>([]);
  const [filteredProduct, setFilteredProduct] = useState<ProductRequest[]>([]);
  const [sortBy, setSortBy] = useState("most-upvotes");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [planned, setPlanned] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [live, setLive] = useState([]);

  const handleSortChange = (option: string) => {
    setSortBy(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    fetch("http://localhost:3001/userdata")
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].productRequests);
        const result1 = data[0].productRequests.filter(
          (val: ProductRequest) => val.status === "planned"
        );
        const result2 = data[0].productRequests.filter(
          (val: ProductRequest) => val.status === "in-progress"
        );
        const result3 = data[0].productRequests.filter(
          (val: ProductRequest) => val.status === "live"
        );
        setPlanned(result1);
        setInProgress(result2);
        setLive(result3);
        setProduct(data[0].productRequests);
        setFilteredProduct(data[0].productRequests);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/userdata")
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].productRequests);
        setProduct(data[0].productRequests);
        setFilteredProduct(data[0].productRequests);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <div className={show?styles.drawerOpen:styles.drawerClose}>
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

      <main className={styles.main} onClick={() => setIsDropdownOpen(false)}>
        <div className={styles.Box1}>
          <div className={styles.radialGrad}>
            <span>
              <p>Eqaim</p>
              <p>Feedback Board</p>
            </span>
            <span>
            {show ? (
              <Image
                src="/cancelIcon.png"
                onClick={() => setShow(!show)}
                height={30}
                style={{filter:'invert(100%)'}}
                width={35}
                alt="hamburger-icon"
              />
            ) : (
              <Image
                src="/icon-hamburger.svg"
                onClick={() => setShow(!show)}
                height={20}
                width={35}
                alt="hamburger-icon"
              />
            )}
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
              <p style={{ fontWeight: "100", fontSize: "small" }}>Planned</p>
              <p>{planned.length}</p>
            </span>
            <span>
              <p style={{ fontWeight: "100", fontSize: "small" }}>
                In-Progress
              </p>
              <p>{inProgress.length}</p>
            </span>
            <span>
              <p style={{ fontWeight: "100", fontSize: "small" }}>Live</p>
              <p>{live.length}</p>
            </span>
          </div>
        </div>

        <div className={styles.Box2}>
          <div className={styles.topNav}>
            <div className={styles.navOptions1}>
              <Image
                src="/icon-suggestions.svg"
                height={30}
                width={30}
                alt="icon-suggestions"
              />
              <p className={styles.Sugest}>
                {filteredProduct.length} Suggestions
              </p>
              <div
                onMouseEnter={() => setIsDropdownOpen(true)}
                style={{ cursor: "pointer" }}
              >
                Sort by : {sortBy}
                {isDropdownOpen && (
                  <div
                    className={
                      isDropdownOpen ? styles.scaleIn : styles.scaleOut
                    }
                  >
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

          {filteredProduct.length > 0 ? (
            <>
              {filteredProduct.map((val: ProductRequest) => (
                <div key={val._id} className={styles.flatBox}>
                  <div className={styles.upvoteContainer}>
                    <span className={styles.upvote}>
                      <Image
                        src="/icon-arrow-up.svg"
                        height={10}
                        width={15}
                        alt="icon-arrow-up"
                      />
                      <p>{val.upvotes}</p>
                    </span>
                    <span className={styles.comment}>
                      <Image
                        src="/icon-comments.svg"
                        height={20}
                        width={20}
                        alt="icon-comments"
                      />
                      <p>{val.comments.length}</p>
                    </span>
                  </div>
                  <div className={styles.contentContainer}>
                    <div className={styles.content}>
                      <Link href={`/detail/${val._id}`}>
                        <h3>{val.title}</h3>
                      </Link>
                      <p>{val.description}</p>
                      <div className={styles.advice}>{val.category}</div>
                    </div>
                    <span className={styles.commentsDesktop}>
                      <Image
                        src="/icon-comments.svg"
                        height={20}
                        width={20}
                        alt="icon-comments"
                      />
                      <p>{val.comments.length}</p>
                    </span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className={styles.flatBoxEmpty}>
                <Image
                  src="/illustration-empty.svg"
                  height={200}
                  width={200}
                  alt="illustration-empty"
                />

                <div className={styles.EmptyText}>
                  <h3>There is no feedback yet.</h3>
                  <p>
                    Got a suggestion? Found a bug that needs to be squashed? We
                    love hearing about new ideas to improve our app.
                  </p>
                </div>

                <Link href="/addfeedback">
                  <button className={styles.btn1}> + Add Feedback</button>
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
