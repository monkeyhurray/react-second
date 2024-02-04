import { React, useState, useContext } from "react";
import styled from "styled-components";

import { useParams, useNavigate } from "react-router-dom";
import wendy from "assets/images/wendy.png";
import { FanLetterContext } from "context/FanLetterContext";

const ToHomeBtn = styled.button`
  width: 100px;
  height: 60px;
  margin: 90px auto 0px 100px;
  font-size: 1.5em;
  background-color: black;
  color: white;
`;
const FanLetter = styled.div`
  background-color: grey;
  width: 900px;
  height: 500px;
  margin: 80px auto 0px auto;
`;
const AvatarImg = styled.img`
  float: left;
  max-width: 80px;
  max-height: 80px;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 50%;
`;
const SpanNameInfo = styled.span`
  color: white;
  font-size: 1.5em;
`;
const SpanTimeInfo = styled.span`
  float: right;
  color: white;
  font-size: 1em;
`;
const UpperDiv = styled.div`
  margin: 10px auto;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ContentDiv = styled.div`
  margin: 20px 15px 0px 15px;
  padding: 10px;
  color: white;
  font-size: 2em;
  background-color: black;
  border-radius: 8px;
`;

const ContentTextArea = styled.textarea`
  margin: 20px 15px 0px 15px;
  padding: 10px;
  color: white;
  font-size: 2em;
  background-color: black;
  border-radius: 8px;
`;

const ToDiv = styled.div`
  margin-top: 10px;
  margin-left: 17px;
  color: white;
`;
const Confirmdiv = styled.div`
  float: right;
  width: 250px;
`;
const Confirmbtn = styled.button`
  width: 100px;
  height: 60px;
  margin-top: 20px;
  margin-right: 20px;
  float: right;
  font-size: 1.5em;
  background-color: black;
  color: white;
`;
function Detail() {
  const { id } = useParams();
  const data = useContext(FanLetterContext);
  const { entireComment, setEntireComment } = data;
  const navigate = useNavigate();
  const [edited, setEdited] = useState(false);
  
  const selectedData = entireComment.find((e) => e.id === id);
  const [updateComment, setUpdateComment] = useState(selectedData.content);

  const removeHandler = (id) => {
    const removeListArr = entireComment.filter((e) => e.id !== id);
    setEntireComment(removeListArr);
    navigate("/");
  };

  const editButton = () => {
    setEdited(true);
  };

  const updateBtn = () => {
    const nextCommentList = entireComment.map((comment) => {
      if (comment.id === id) {
        return { ...comment, content: updateComment };
      }

      return comment;
    });

    setEntireComment(nextCommentList);
    setEdited(false);
  };

  return (
    <>
      <ToHomeBtn onClick={() => navigate("/")}>{"홈으로"}</ToHomeBtn>
      <FanLetter>
        <div key={selectedData.id}>
          <UpperDiv>
            <AvatarImg
              src={selectedData.avatar ? selectedData.avatar : wendy}
            />
            <SpanNameInfo> &nbsp;{selectedData.nickName}&nbsp;</SpanNameInfo>
            <SpanTimeInfo>Date: {selectedData.createdAt}</SpanTimeInfo>
          </UpperDiv>
          <ToDiv>
            To&nbsp;:&nbsp;
            {selectedData.writedTo || "wendy"}
          </ToDiv>

          {edited ? (
            <ContentTextArea
              value={updateComment}
              onChange={(e) => setUpdateComment(e.target.value)}
            ></ContentTextArea>
          ) : (
            <ContentDiv>{updateComment}</ContentDiv>
          )}

          <Confirmdiv>
            {edited ? (
              <Confirmbtn onClick={updateBtn}>수정</Confirmbtn>
            ) : (
              <Confirmbtn onClick={editButton}>수정</Confirmbtn>
            )}

            <Confirmbtn onClick={() => removeHandler(selectedData.id)}>
              삭제
            </Confirmbtn>
          </Confirmdiv>
        </div>
      </FanLetter>
    </>
  );
}

export default Detail;
