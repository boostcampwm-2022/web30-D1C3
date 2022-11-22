import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import CustomButton from '@components/common/CustomButton';
import styled from 'styled-components';
import CustomInput from '../components/common/CustomInput';
import StyledHeader1 from '../components/common/StyledHeader1';

const SignupPageLayout = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 358px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  gap: 6px;

  input {
    flex: 1;
  }
`;

export default function SignupPage() {
  const idInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const [idIsUnique, setIdIsUnique] = useState(true);
  const [nicknameIsUnique, setNicknameIsUnique] = useState(true);

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = Object.fromEntries(new FormData(form));
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/signup` || '',
        formData,
      );
      alert('회원가입 성공');
      // 로그인 페이지로 이동
    } catch (error: any) {
      alert('예상치 못한 에러가 발생하였습니다.');
    }
  };

  const checkUniqueId = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!idInputRef.current) return;
    const { value: id } = idInputRef.current;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/checkID/${id}` || '',
      );
      setIdIsUnique(response.data.isUnique);
      if (response.data.isUnique) {
        alert('아이디를 사용할 수 있습니다.');
      }
    } catch (error: any) {
      alert('예상치 못한 에러가 발생하였습니다.');
    }
  };

  const checkUniqueNickname = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (!nicknameInputRef.current) return;
    const { value: nickname } = nicknameInputRef.current;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/checkNickname/${nickname}` || '',
      );
      setNicknameIsUnique(response.data.isUnique);
      if (response.data.isUnique) {
        alert('닉네임을 사용할 수 있습니다.');
      }
    } catch (error: any) {
      alert('예상치 못한 에러가 발생하였습니다.');
    }
  };

  return (
    <SignupPageLayout>
      <Wrapper>
        <StyledHeader1>회원가입</StyledHeader1>
        <form onSubmit={onsubmit}>
          <InputWrapper>
            <CustomInput
              inputRef={idInputRef}
              name="id"
              placeholder="아이디"
              warningText={idIsUnique ? '' : 'id가 중복입니다'}
            />
            <CustomButton onClick={checkUniqueId} width="68px">
              확인
            </CustomButton>
          </InputWrapper>
          <InputWrapper>
            <CustomInput
              inputRef={nicknameInputRef}
              name="nickname"
              placeholder="닉네임"
              warningText={nicknameIsUnique ? '' : 'nickname이 중복입니다'}
            />
            <CustomButton onClick={checkUniqueNickname} width="68px">
              확인
            </CustomButton>
          </InputWrapper>
          <CustomInput
            name="password"
            placeholder="비밀번호"
            guideText="숫자, 문자 혼합 최소 8자리로 설정해주세요."
          />
          <CustomInput placeholder="비밀번호 확인" />
          <CustomButton margin="20px 0 0 ">회원가입</CustomButton>
        </form>
      </Wrapper>
    </SignupPageLayout>
  );
}
