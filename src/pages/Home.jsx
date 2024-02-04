import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import 레드벨벳 from "assets/images/레드벨벳.jpg";
import wendy from "assets/images/wendy.png";
import styled from "styled-components";
import uuid from "react-uuid";
import { FanLetterContext } from "context/FanLetterContext";

const redVelvet = [
  { id: 1, value: "Wendy", name: "웬디" },
  { id: 2, value: "Seulgi", name: "슬기" },
  { id: 3, value: "Joy", name: "조이" },
  { id: 4, value: "Yeri", name: "예리" },
  { id: 5, value: "Irene", name: "아이린" },
];

const BackGroundImg = styled.div`
  background-image: url(${레드벨벳});
  text-align: center;
  width: 100%;
  height: 478px;
`;

const Title = styled.div`
  color: yellow;
  font-size: 3rem;
  font-weight: bold;
  margin: 200px auto 90px;
  display: inline-block;
`;

const ButtonBox = styled.div`
  border-radius: 6px;
  padding: 10px;
  background-color: rgb(79, 85, 81);
  margin: auto;
  width: 700px;
  height: 70px;
`;

const Main = styled.div`
  text-align: center;
  margin: 0 auto;
`;

const MainBody = styled.form`
  background-color: gray;
  width: 700px;
  height: 200px;
  padding: 20px;
  margin: 50px auto 50px auto;
`;
const NickNameDiv = styled.div``;
const NickNameInput = styled.input`
  margin-bottom: 10px;
  width: 500px;
`;
const ContentDiv = styled.div``;

const SelectMember = styled.option``;

const ContentInput = styled.textarea`
  margin-bottom: 10px;
  width: 500px;
  height: 140px;
`;

const UploadBtn = styled.button`
  text-align: right;
`;

const AvatarImg = styled.img`
  float: left;
  border-radius: 50%;
  max-width: 80px;
  max-height: 80px;
`;
const CommentP = styled.p`
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const RedVelvetBtn = styled.button`
  width: 90px;
  height: 35px;
  margin: 20px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 10px;
  color: ${(props) => (props.active ? "black" : "white")};
  background-color: ${(props) => (props.active ? "yellow" : "black")};
`;
const CommentDiv = styled.div`
  background-color: black;
  width: 700px;
  height: 130px;
  margin: 5px auto;
  padding: 30px;
  border-radius: 7px;
  border-style: solid;
  border-width: 3px;
  border-color: red;
  display: "block";
`;

function Home() {
  const navigate = useNavigate();
  const data = useContext(FanLetterContext);
  const [selectedMember, setSelectedMember] = useState("Wendy");
  const [getLetterMember, setGetLetterMeber] = useState("Wendy");
  const {
    entireComment,
    setEntireComment,
    nickName,
    setNickName,
    content,
    setContent,
  } = data;

  //날짜추가
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);
  let dateString = year + "-" + month + "-" + day;
  //모달을 위한 버튼들

  const handleButtonClick = (memberValue) => {
    setSelectedMember(memberValue);
  };

  //새로 추가할 이름과 내용
  const writeTitle = (e) => setNickName(e.target.value);
  const writeContent = (e) => setContent(e.target.value);

  const handleContent = (e) => {
    e.preventDefault();

    setEntireComment([
      { nickName, content, id: uuid(), value: getLetterMember },
      ...entireComment,
    ]);
    setNickName("");
    setContent("");
  };

  const handleSelectedMeber = (member) => {
    setGetLetterMeber(member.target.value);
  };

  //페이지 이동 및 정보 전달
  const handleCommentClick = (id) => navigate(`/detail/${id}`);

  const filterdComments = entireComment.filter(
    (comment) =>
      comment.writedTo === selectedMember || comment.value === selectedMember
  );

  return (
    <>
      <BackGroundImg alt="img">
        <Title>레드벨벳</Title>
        <ButtonBox>
          {redVelvet.map((member) => {
            return (
              <RedVelvetBtn
                active={selectedMember === member.value}
                onClick={() => {
                  handleButtonClick(member.value);
                }}
                key={member.name}
              >
                {member.name}
              </RedVelvetBtn>
            );
          })}
        </ButtonBox>
      </BackGroundImg>

      <Main>
        <MainBody>
          <NickNameDiv>
            닉네임:{" "}
            <NickNameInput
              type="text"
              value={nickName}
              onChange={writeTitle}
              maxLength="20"
              placeholder="최대 20글자까지 작성할 수 있습니다."
            />
          </NickNameDiv>
          <ContentDiv>
            내용:{" "}
            <ContentInput
              value={content}
              onChange={writeContent}
              maxLength="100"
              placeholder="최대 100자 까지만 작성할 수 있습니다."
            />
          </ContentDiv>
          누구에게 보내실건가요?{" "}
          <select onChange={handleSelectedMeber} value={getLetterMember}>
            {redVelvet.map((member) => {
              return (
                <SelectMember value={member.value} key={member.id}>
                  {member.name}
                </SelectMember>
              );
            })}
          </select>
          <UploadBtn onClick={handleContent}>팬레터 등록</UploadBtn>
        </MainBody>

        {filterdComments.map((e) => {
          return (
            <CommentDiv key={e.id} onClick={() => handleCommentClick(e.id)}>
              <AvatarImg src={e.avatar ? e.avatar : wendy} />
              <CommentP>{e.nickName}</CommentP>
              <CommentP>{e.content}</CommentP>
              <CommentP>{dateString}</CommentP>
              <CommentP>{e.writedTo ? e.writedTo : e.value}</CommentP>
            </CommentDiv>
          );
        })}
      </Main>
    </>
  );
}

export default Home;
