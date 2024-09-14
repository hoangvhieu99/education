import 'bootstrap/dist/css/bootstrap.css';
import Header from '../../Layout/User/Header';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { GetQuestionByTopicId } from '../../services/questionService';
import '../../assets/Study.css';
import '../../assets/Style.css';
import { GetQuestionByCourseChaptersInUser } from '../../services/chapterService';
const study1 = '../Image/Exam/icon-study.png';
const study2 = '../Image/Exam/learning.jpg';
const study3 = '../Image/Exam/anhdapan.jpg';

export default function Study() {
    //#region take chapterId
    const location = useLocation();
    let chapterId = location.state.chapterId;
    //#endregion

    //#region get question
    const [questions, setQuestions] = useState([]);

    const handleGetData = async () => {
        try {
            const result = await GetQuestionByCourseChaptersInUser(chapterId);
            if (result && result.data
            ) {
                console.log(result.status);
                setQuestions(result.data);
            }
        } catch (error) {
            console.error('Error fetching mod service:', error);
        }
    };

    useEffect(() => {
        handleGetData();
    }, []);
    //#endregion

    //#region handle next and back question

    const [current, setCurrent] = useState(0);
    const length = questions.length;
    function nextQuestion() {
        if (current === length - 1) {
            document.addEventListener('mousedown', nextQuestion);
        }
        else {
            setResetQuestion(true);
            setDisableChoose(false);
            setSolution(false);
            setRight1Answer();
            setRight2Answer();
            setRight3Answer();
            setRight4Answer();
            setWrong1Answer();
            setWrong2Answer();
            setWrong3Answer();
            setWrong4Answer();
            setCurrent(current + 1);
        }
    }

    function prevQuestion() {
        if (current == 0) {
            document.addEventListener('mousedown', prevQuestion);
        } else {
            setCurrent(current - 1);
            setResetQuestion(true);
            setDisableChoose(false);
            setSolution(false);
            setRight1Answer();
            setRight2Answer();
            setRight3Answer();
            setRight4Answer();
            setWrong1Answer();
            setWrong2Answer();
            setWrong3Answer();
            setWrong4Answer();
        }
    }
    //#endregion

    //#region handle question result
    const [disableChoose, setDisableChoose] = useState();
    const [resetQuestion, setResetQuestion] = useState(true);
    const [solution, setSolution] = useState();

    const [right1Answer, setRight1Answer] = useState();
    const [right2Answer, setRight2Answer] = useState();
    const [right3Answer, setRight3Answer] = useState();
    const [right4Answer, setRight4Answer] = useState();
    const [wrong1Answer, setWrong1Answer] = useState();
    const [wrong2Answer, setWrong2Answer] = useState();
    const [wrong3Answer, setWrong3Answer] = useState();
    const [wrong4Answer, setWrong4Answer] = useState();

    const [countRight, setCountRight] = useState(0);
    const [countWrong, setCountWrong] = useState(0);

    function chooseAnswer(choose, answer) {
        setDisableChoose(true);
        setResetQuestion(false);
        setSolution(true);
        if (choose == answer && choose == 1) {
            setRight1Answer(answer);
            setCountRight(countRight + 1);
        } else if (choose == answer && choose == 2) {
            setRight2Answer(answer);
            setCountRight(countRight + 1);
        } else if (choose == answer && choose == 3) {
            setRight3Answer(answer);
            setCountRight(countRight + 1);
        } else if (choose == answer && choose == 4) {
            setRight4Answer(answer);
            setCountRight(countRight + 1);
        }

        if (choose != answer && choose == 1) {
            if (answer == 2) {
                setRight2Answer(answer);
            } else if (answer == 3) {
                setRight3Answer(answer);
            } else if (answer == 4) {
                setRight4Answer(answer);
            }
            setWrong1Answer(choose);
            setCountWrong(countWrong + 1);
        } else if (choose != answer && choose == 2) {
            if (answer == 1) {
                setRight1Answer(answer);
            } else if (answer == 3) {
                setRight3Answer(answer);
            } else if (answer == 4) {
                setRight4Answer(answer);
            }
            setWrong2Answer(choose);
            setCountWrong(countWrong + 1);
        } else if (choose != answer && choose == 3) {
            if (answer == 2) {
                setRight2Answer(answer);
            } else if (answer == 1) {
                setRight1Answer(answer);
            } else if (answer == 4) {
                setRight4Answer(answer);
            }
            setWrong3Answer(choose);
            setCountWrong(countWrong + 1);
        } else if (choose != answer && choose == 4) {
            if (answer == 2) {
                setRight2Answer(answer);
            } else if (answer == 3) {
                setRight3Answer(answer);
            } else if (answer == 1) {
                setRight1Answer(answer);
            }
            setWrong4Answer(choose);
            setCountWrong(countWrong + 1);
        }
    }
    //#endregion

    return (
        <>
            <Header />
            <div className='study'>
                <div className='study-left'>
                    {questions?.map(
                        (item, index) =>
                            index === current && (
                                <>
                                    <div className='study-left-question'>
                                        <div style={{ display: 'flex' }}>
                                            <div className='study-left-question-img'>
                                                <img src={study1}></img>
                                                <p style={{ fontWeight: 'bold' }}>Câu {index + 1}:</p>
                                            </div>
                                            {/* <div className='questionContent' dangerouslySetInnerHTML={{ __html: item.questionContext }}>
                                            </div> */}
                                            <p dangerouslySetInnerHTML={{ __html: item.questionContext }}></p>
                                        </div>
                                        <img src={item.image}></img>
                                    </div>
                                    <div
                                        className='study-left-answer'
                                        onClick={!disableChoose ? () => chooseAnswer(1, item.answerId) : null}
                                        style={{
                                            border:
                                                resetQuestion && !disableChoose
                                                    ? '3px solid white'
                                                    : right1Answer == item.answerId
                                                        ? '3px solid #00CC33'
                                                        : wrong1Answer == 1
                                                            ? '3px solid red'
                                                            : '3px solid white',
                                        }}
                                    >
                                        <div
                                            className='study-left-answer-left'
                                            style={{
                                                backgroundColor:
                                                    resetQuestion && !disableChoose
                                                        ? ''
                                                        : right1Answer == item.answerId
                                                            ? '#00cc33'
                                                            : wrong1Answer == 1
                                                                ? '#ff0000'
                                                                : '',
                                            }}
                                        >
                                            <p>A</p>
                                        </div>
                                        <div className='study-left-answer-right'>
                                            <p style={{ marginBottom: 0, marginTop: 7 }} dangerouslySetInnerHTML={{ __html: item.optionA }}></p>
                                        </div>
                                    </div>
                                    <div
                                        className='study-left-answer'
                                        onClick={!disableChoose ? () => chooseAnswer(2, item.answerId) : null}
                                        style={{
                                            border:
                                                resetQuestion && !disableChoose
                                                    ? '3px solid white'
                                                    : right2Answer == item.answerId
                                                        ? '3px solid #00CC33'
                                                        : wrong2Answer == 2
                                                            ? '3px solid red'
                                                            : '3px solid white',
                                        }}
                                    >
                                        <div
                                            className='study-left-answer-left'
                                            style={{
                                                backgroundColor:
                                                    resetQuestion && !disableChoose
                                                        ? ''
                                                        : right2Answer == item.answerId
                                                            ? '#00cc33'
                                                            : wrong2Answer == 2
                                                                ? '#ff0000'
                                                                : '',
                                            }}
                                        >
                                            <p>B</p>
                                        </div>
                                        <div className='study-left-answer-right'>
                                            <p style={{ marginBottom: 0, marginTop: 7 }} dangerouslySetInnerHTML={{ __html: item.optionB }}></p>
                                        </div>
                                    </div>
                                    <div
                                        className='study-left-answer'
                                        onClick={!disableChoose ? () => chooseAnswer(3, item.answerId) : null}
                                        style={{
                                            border:
                                                resetQuestion && !disableChoose
                                                    ? '3px solid white'
                                                    : right3Answer == item.answerId
                                                        ? '3px solid #00CC33'
                                                        : wrong3Answer == 3
                                                            ? '3px solid red'
                                                            : '3px solid white',
                                        }}
                                    >
                                        <div
                                            className='study-left-answer-left'
                                            style={{
                                                backgroundColor:
                                                    resetQuestion && !disableChoose
                                                        ? ''
                                                        : right3Answer == item.answerId
                                                            ? '#00cc33'
                                                            : wrong3Answer == 3
                                                                ? '#ff0000'
                                                                : '',
                                            }}
                                        >
                                            <p>C</p>
                                        </div>
                                        <div className='study-left-answer-right'>
                                            <p style={{ marginBottom: 0, marginTop: 7 }} dangerouslySetInnerHTML={{ __html: item.optionC }}></p>
                                        </div>
                                    </div>
                                    <div
                                        className='study-left-answer'
                                        onClick={!disableChoose ? () => chooseAnswer(4, item.answerId) : null}
                                        style={{
                                            border:
                                                resetQuestion && !disableChoose
                                                    ? '3px solid white'
                                                    : right4Answer == item.answerId
                                                        ? '3px solid #00CC33'
                                                        : wrong4Answer == 4
                                                            ? '3px solid red'
                                                            : '3px solid white',
                                        }}
                                    >
                                        <div
                                            className='study-left-answer-left'
                                            style={{
                                                backgroundColor:
                                                    resetQuestion && !disableChoose
                                                        ? ''
                                                        : right4Answer == item.answerId
                                                            ? '#00cc33'
                                                            : wrong4Answer == 4
                                                                ? '#ff0000'
                                                                : '',
                                            }}
                                        >
                                            <p>D</p>
                                        </div>
                                        <div className='study-left-answer-right'>
                                            <p style={{ marginBottom: 0, marginTop: 7 }} dangerouslySetInnerHTML={{ __html: item.optionD }}></p>
                                        </div>
                                    </div>
                                    {solution && (
                                        <div className='study-left-solution'>
                                            <h6 style={{ color: 'green', marginLeft: 30, marginTop: 15 }}>
                                                Đáp án:{' '}
                                                <span style={{ color: 'black', fontWeight: 400 }}>
                                                    {item.answerName}
                                                </span>
                                            </h6>
                                            <h6 style={{ color: 'green', marginLeft: 30, marginTop: 15 }}>
                                                Mức độ:{' '}
                                                <span style={{ color: 'black', fontWeight: 400 }}>
                                                    {item.levelName}
                                                </span>
                                            </h6>
                                            <h6 style={{ color: 'green', marginLeft: 30, marginTop: 15 }}>Lời giải</h6>
                                            <div
                                                className='study-left-solution-detail'
                                                style={{ fontWeight: 400 }}
                                                dangerouslySetInnerHTML={{ __html: item.solution }}
                                            >
                                                {/* {item.solution} */}
                                            </div>
                                        </div>
                                    )}
                                    <div className='study-left-button'>
                                        <div
                                            className='study-left-button-back'
                                            onClick={prevQuestion}
                                        >
                                            Câu trước
                                        </div>
                                        <div
                                            className='study-left-button-next'
                                            onClick={nextQuestion}
                                        >
                                            Câu tiếp theo
                                        </div>
                                    </div>
                                </>
                            )
                    )}
                </div>
                <div className='study-right'>
                    <img src={study2}></img>
                    <div className='study-right-button'>
                        <div className='study-right-button-right'>
                            <p>Số câu đúng</p>
                            <div className='study-right-button-icon'>
                                <span>{countRight}</span>
                            </div>
                        </div>
                        <div className='study-right-button-wrong'>
                            <p>Số câu sai</p>
                            <div className='study-right-button-icon'>
                                <span>{countWrong}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
