import "bootstrap/dist/css/bootstrap.css";
import Header from "../../Layout/User/Header";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GetQuestionByTopicId } from "../../services/questionService";
import { AddQuestionTest } from "../../services/questionTestService.jsx";
import { UpdateTestDetailService } from "../../services/testDetailService";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import "../../assets/Exam.css";
import "../../assets/Style.css";
const dongho = "../Image/Exam/clock.png";
export default function Exam() {
  //#region take subjectId
  const location = useLocation();
  let topicId = location.state.topicId;
  let topicName = location.state.topicName;
  let testDetailId = location.state.testDetailId;
  let duration = location.state.duration;
  //#endregion

  //#region get question
  const [questions, setQuestions] = useState([]);
  const [questionDone, setQuestionDone] = useState([]);
  const handleGetData = async () => {
    try {
      const result = await GetQuestionByTopicId(topicId);
      if (result.status === 200) {
        setQuestions(result.data);
        setQuestionDone(
          result.data.map((item) => ({
            questionId: item.questionId,
            answerId: "",
            isChoose: false,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching mod service:", error);
    }
  };
  useEffect(() => {
    handleGetData();
  }, []);
  //#endregion

  //#region choose question
  const handleQuestion = (e) => {
    const optionId = e.target.value;
    const questionId = e.target.name;
    console.log(optionId);
    console.log(questionId);
    setQuestionDone(
      questionDone.map((item, index) => {
        if (optionId != "" && questionId == item.questionId) {
          return {
            ...item,
            answerId: optionId,
            isChoose: true,
          };
        } else {
          return {
            ...item,
          };
        }
      })
    );
  };

  function handleClickScroll(questionId) {
    const element = document.getElementById(questionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
  //#endregion

  //#region countdown timer
  const initialMinute = duration - 1;
  const initialSeconds = 59;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
      if (minutes === 0 && seconds === 0) {
        handleSubmit();
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  //#endregion

  const navigate = useNavigate();
  const handleSubmit = async () => {
    questionDone.map((item) =>
      item.answerId != null
        ? AddQuestionTest(item.questionId, testDetailId, item.answerId)
        : AddQuestionTest(item.questionId, testDetailId, "")
    );
    await UpdateTestDetailService(testDetailId);
    navigate("/examFinish", {
      state: {
        testDetailId: testDetailId,
      },
    });
  };

  const { confirm } = Modal;
  const showConfirm = () => {
    confirm({
      title: "Vui lòng kiểm tra thật kĩ trước khi nộp bài",
      width: 600,
      icon: <ExclamationCircleFilled />,
      onOk() {
        handleSubmit();
      },
      okText: "Nộp bài",
      cancelText: "Hủy",
    });
  };

  return (
    <>
      <Header />
      <div className="exam-top">
        <div className="exam-timer">
          <img src={dongho}></img>
          <h4>
            {minutes}:{seconds}
          </h4>
        </div>
      </div>
      <div className="exam">
        <div className="exam-right">
          <div className="exam-right-title">
            <h6>{topicName}</h6>
          </div>
          <div className="exam-right-question">
            <p>Câu hỏi</p>
            <div className="exam-right-question-num">
              {questionDone.map((item, index) =>
                item.isChoose ? (
                  <div
                    className="exam-right-question-item"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClickScroll(item.questionId)}
                  >
                    <p style={{ backgroundColor: "green", color: "white" }}>
                      {index + 1}
                    </p>
                  </div>
                ) : (
                  <div
                    className="exam-right-question-item"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClickScroll(item.questionId)}
                  >
                    <p>{index + 1}</p>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="exam-right-button">
            <button className="btn btn-primary" onClick={showConfirm}>
              Nộp bài
            </button>
          </div>
        </div>
        <div className="exam-left">
          {questions.map((item, index) => (
            <div className="exam-left-quesion" id={item.questionId}>
              <div className="exam-left-quesion-top">
                <p
                  style={{
                    fontWeight: "bold",
                    paddingLeft: 10,
                    whiteSpace: "nowrap",
                  }}
                >
                  Câu {index + 1}:
                </p>{" "}
                &nbsp;
                <div className="exam-left-quesion-text">
                  <p
                    style={{ paddingTop: 0, marginRight: 0 }}
                    dangerouslySetInnerHTML={{ __html: item.questionContext }}
                  ></p>
                  {item.image != "" && <img src={item.image}></img>}
                </div>
              </div>
              <div className="exam-left-quesion-bottom">
                <div
                  className="exam-left-quesion-answer dl-flex"
                  style={{ display: "flex" }}
                >
                  <input
                    onClick={handleQuestion}
                    type="radio"
                    value="1"
                    name={item.questionId}
                    id={item.optionA}
                  ></input>
                  <label
                    for={item.optionA}
                    className="label-style"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "8px",
                    }}
                  >
                    A.{" "}
                    <span
                      className="stypeExam"
                      style={{
                        marginTop: "1px",
                        marginRight: 0,
                        marginLeft: "5px",
                      }}
                      dangerouslySetInnerHTML={{ __html: item.optionA }}
                    ></span>
                  </label>
                </div>

                <div
                  className="exam-left-quesion-answer dl-flex"
                  style={{ display: "flex" }}
                >
                  <input
                    onClick={handleQuestion}
                    type="radio"
                    value="2"
                    name={item.questionId}
                    id={item.optionB}
                  ></input>
                  <label
                    for={item.optionB}
                    className="label-style"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "8px",
                    }}
                  >
                    B.{" "}
                    <span
                      className="stypeExam"
                      style={{
                        marginTop: "1px",
                        marginRight: 0,
                        marginLeft: "5px",
                      }}
                      dangerouslySetInnerHTML={{ __html: item.optionB }}
                    ></span>
                  </label>
                </div>
                <div
                  className="exam-left-quesion-answer dl-flex"
                  style={{ display: "flex" }}
                >
                  <input
                    onClick={handleQuestion}
                    type="radio"
                    value="3"
                    name={item.questionId}
                    id={item.optionC}
                  ></input>
                  <label
                    for={item.optionC}
                    className="label-style"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "8px",
                    }}
                  >
                    C.{" "}
                    <span
                      className="stypeExam"
                      style={{
                        marginTop: "1px",
                        marginRight: 0,
                        marginLeft: "5px",
                      }}
                      dangerouslySetInnerHTML={{ __html: item.optionC }}
                    ></span>
                  </label>
                </div>
                <div
                  className="exam-left-quesion-answer dl-flex"
                  style={{ display: "flex" }}
                >
                  <input
                    onClick={handleQuestion}
                    type="radio"
                    value="4"
                    name={item.questionId}
                    id={item.optionD}
                  ></input>
                  <label
                    for={item.optionD}
                    className="label-style"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "8px",
                    }}
                  >
                    D.{" "}
                    <span
                      className="stypeExam"
                      style={{
                        marginTop: "1px",
                        marginRight: 0,
                        marginLeft: "5px",
                      }}
                      dangerouslySetInnerHTML={{ __html: item.optionD }}
                    ></span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
