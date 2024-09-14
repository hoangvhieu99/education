import "../../../assets/HomePageStyle.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GetSubjectByTopicType } from "../../../services/subjectService";
export default function ChooseSubject() {
  const navigate = useNavigate();
  const handleSubject = async (item) => {
    navigate("/contest", {
      state: {
        topicType: item.topicType,
        subjectId: item.subjectId,
        subjectName: item.subjectName,
      },
    });
  };

  const [subjects, setSubjects] = useState([]);

  const handleGetData = async () => {
    try {
      const result = await GetSubjectByTopicType(6);
      if (result.status === 200) {
        setSubjects(result.data);
      }
    } catch (error) {
      console.error("Error fetching mod service:", error);
    }
  };
  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <>
      <div className="sc-eJMQSu eMtKRF">
        <div className="sc-gsTCUz">
          <div className="sc-dlfnbm sc-eCssSg oDHHe">
            <div className="heading-style">
              <h3 class="sc-AzgDb jgHMvr tde mb-0" style={{ color: "#57412B" }}>
                <span>Cuộc thi đang diễn ra</span>
              </h3>
            </div>
            <div className="sc-nFpLZ jXWXLS">
              <div className="sc-gsTCUz gQRQLT">
                {subjects.map((item, index) => (
                  <div
                    className="sc-dlfnbm sc-eCssSg bpiLsA drBkXF"
                    onClick={() => handleSubject(item)}
                  >
                    <div class="sc-laRPJI CxaAG">
                      <span class="sc-jeGSBP heALfe icon">
                        <img src={item.imgLink} alt="" />
                      </span>
                      {/* <span class="sc-jeGSBP heALfe icon">
                                                <img src="../Image/technology-svgrepo-com.svg" alt="" />
                                            </span> */}
                      <p>{item.subjectName}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
