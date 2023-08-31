"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";

const CommentComponent = ({ params }) => {

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/userdata")
      .then((response) => response.json())
      .then((data) => {
        const result = data[0].productRequests.filter(
          (val) => val._id === params.id
        );
        setDetail(result);
        console.log(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (loading) {
    return <h1>Loading .....</h1>;
  }

  return (
    <div className={styles.main}>

      <div className={styles.container}>

        <div className={styles.Nav}>
          <span className={styles.back}>
            <Link href={"/"}>{`< Go Back`}</Link>{" "}
          </span>

          <span>
            <Link href="/editfeedback">
              <button className={styles.btn}>Edit Feedback</button>
            </Link>
          </span>
        </div>

        <div className={styles.flatBox}>
          <div className={styles.upvote}>
            <Image src="/Path 2.png" height={10} width={15} />
            <p>{detail[0].upvotes}</p>
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.content}>
                <h3>{detail[0].title}</h3>
              <p>{detail[0].description}</p>
              <div className={styles.advice}>{detail[0].category}</div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <Image src="/Path.png" height={20} width={20} />
              <p>{detail[0].comments.length}</p>
            </div>
          </div>
        </div>

        <div className={styles.comments}>
          <h2>{`${detail[0].comments.length} Comments`}</h2>
          <CommentList comments={detail[0].comments} />
        </div>

        <div className={styles.addComments}>
          <h1>Add Comments</h1>
          <input type="text" name="comment" id="comment" placeholder="Add Comment" />
          <div className={styles.limitBtn}>
            <p>250 Words Required</p>
            <button className={styles.btn1}>Post Comment</button>
          </div>
        </div>

      </div>
    </div>
  );
};

function CommentList({ comments }) {

  const initialShowStates = comments.map(() => false);
  const [showStates, setShowStates] = useState(initialShowStates);
  const [showReply,setShowReply] = useState(false);
  // console.log(comments,showReply);

  return (
    <>
      {comments?.map((val, index) => (
        <div
          key={val._id}
          onClick={()=>setShowReply(!showReply)}
          style={{
            width: "100%",
            padding: "1rem 0rem",
            borderBottom: "1px solid grey",
            textAlign:'left'
          }}
        >
          <div className={styles.upperBox}>
            <span className={styles.info}>
              <Image
                // src={val.user.image}
                src={"/"}
                height={30}
                width={30}
                alt="image"
                style={{ borderRadius: "50%", border: "none" }}
              />
              <span>
                <p style={{ fontWeight: "bold" }}>{val.user.name}</p>
                <p>{val.user.username}</p>
              </span>
            </span>
            <span>
              <p
                className={styles.reply}
                onClick={() => {
                  const newShowStates = [...showStates];
                  newShowStates[index] = !newShowStates[index];
                  setShowStates(newShowStates);
                }}
              >
                Reply
              </p>
            </span>
          </div>

          <div className={styles.lowerBox}>
            <span style={{ width: "91%" }}>{val.content}</span>
          </div>

          <div className={styles.lowerBox}>
          <ReplyList comments={val.replies} show={showReply}/> 
          </div>

          {showStates[index] && (
            <div className={styles.lowerBox} key={val._id}>
              <input 
                type="text" 
                name="addcomment"
                id="addcomment"
                placeholder="Reply"
              />
              <button
                onClick={() => handleReply(index)}
                id={val._id}
                className={styles.btn1}
              >
                Post Reply
              </button>
            </div>
          )}

        </div>
      ))}
    </>
  );
}

function ReplyList({ comments ,show }) {

  const initialShowStates = comments.map(() => false);
  const [showStates, setShowStates] = useState(initialShowStates);

  if(comments.length===0 && show){
    return(
      <h4>No replies</h4>
    )
  }

  if(show && comments.length){
    return (
      <>
       {comments?.map((val, index) => (
          <div
            key={val._id}
            style={{
              width: "91%",
              padding: "1rem 0rem",
            }}
          >
            
            <div className={styles.upperBox}>
              <span className={styles.info}>
                <Image
                  // src={val.user.image}
                  src={"/"}
                  height={30}
                  width={30}
                  alt="image"
                  style={{ borderRadius: "50%", border: "none" }}
                />
                <span>
                  <p style={{ fontWeight: "bold" }}>{val.user.name}</p>
                  <p>{val.user.username}</p>
                </span>
              </span>
              <span>
                <p
                  className={styles.reply}
                  onClick={() => {
                    const newShowStates = [...showStates];
                    newShowStates[index] = !newShowStates[index];
                    setShowStates(newShowStates);
                  }}
                >
                  Reply
                </p>
              </span>
            </div>
  
            <div className={styles.lowerBox}>
              <span style={{ width: "91%" }}>{val.content}</span>
            </div>
  
            {showStates[index] && (
              <div className={styles.lowerBox} key={val._id}>
                <input 
                  type="text" 
                  name="addcomment"
                  id="addcomment"
                  placeholder="Reply"
                />
                <button
                  onClick={() => handleReply(index)}
                  id={val._id}
                  className={styles.btn1}
                >
                  Post Reply
                </button>
              </div>
            )}
            
          </div>
        ))}
      </>
    )
  }

}

export default CommentComponent;