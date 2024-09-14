import Request from "../utils/request";

export const GetAllChapterService = async () => {
  try {
    const respone = await Request({
      method: "get",
      url: `Coursechapter/GetAllListCouseCharter`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return respone;
  } catch (e) {
    return e;
  }
};
export const GetQuestionByCourseChaptersInUser = async (chapterId) => {
  try {
    const respone = await Request({
      method: "get",
      url: `Coursechapter/GetQuestionByCourseChaptersInUser?IdCourseChapter=${chapterId}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(respone);
    return respone;
  } catch (e) {
    return e;
  }
};
export const GetCouseCharterByGrade = async (gradeId,subjectId) => {
  try {
      const respone = await Request({
          method: 'get',
          url: `Coursechapter/GetCouseCharterByGrade?GradeId=${gradeId}&SubjectId=${subjectId}`,
          headers: {
              'Content-Type': 'application/json',
          },
      });
      return respone;
  } catch (e) {
      return e;
  }
};

export const AddChapterService = async (data) => {
  try {
    const respone = await Request({
      method: "post",
      url: `Coursechapter/AddCourceCharter`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    return respone;
  } catch (e) {
    return e;
  }
};
export const UpdateChapterService = async (id, data) => {
  try {
      const respone = await Request({
          method: 'post',
          url: `Coursechapter/UpdateCourceCharter?IdCourceChapter=${id}`,
          headers: {
              'Content-Type': 'application/json',
          },
          data: JSON.stringify(data),
      });
      return respone;
  } catch (e) {
      return e;
  }
};
export const AddExcelQuestionInCourseChapterID = async (
  accountId,
  chapterId,
  file
) => {
  try {
    const respone = await Request({
      method: "post",
      url: `Coursechapter/AddExcelQuestionInCourseChapterID?AccountId=${accountId}&CourseChapterID=${chapterId}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: file,
    });
    return respone;
  } catch (error) {
    console.log(error);
  }
};

export const GetChapterByIdService = async (chapterId) => {
  try {
    const respone = await Request({
      method: "get",
      url: `Coursechapter/GetAllListQuestionInCouseCharter?IdCouseChapter=${chapterId}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return respone;
  } catch (e) {
    return e;
  }
};

export const UpdateQuestionInCourseChapterID = async (data) => {
  try {
    const respone = await Request({
      method: "post",
      url: `Coursechapter/UpdateQuestionInCourseChapterID`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    return respone;
  } catch (e) {
    return e;
  }
};
export const DeleteQuestionInCourseChapterID = async (
  questionId,
  userDelete
) => {
  try {
    const respone = await Request({
      method: "post",
      url: `Coursechapter/DeleteQuestionInCourseChapterID?QuestionId=${questionId}&AccountId=${userDelete}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return respone;
  } catch (e) {
    return e;
  }
};
export const AddChapterQuestionService = async (data) => {
  try {
    const respone = await Request({
      method: "post",
      url: `Coursechapter/AddQuestionInCourseChapterID`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    return respone;
  } catch (e) {
    return e;
  }
};
export const AddQuestionInCourseChapterByTopic = async (data) => {
  try {
    const respone = await Request({
      method: "post",
      url: `Coursechapter/AddQuestionInCourseChapterByTopic`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    return respone;
  } catch (e) {
    return e;
  }
};