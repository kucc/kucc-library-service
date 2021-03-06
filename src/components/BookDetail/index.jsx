import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { getAuth } from 'firebase/auth';
import { PropTypes } from 'prop-types';

import { borrowState } from '@components';

import { StyledBookDetail, StyledBookDetailContainer } from './style';

export const BookDetail = ({ bookData, info }) => {
  const [userName, setUserName] = useState('');
  const [borrower, setBorrower] = useState('');
  const [dueDate, setDueDate] = useState('');
  const isBorrowed = useRecoilValue(borrowState);

  const auth = getAuth();
  const user = auth.currentUser;

  const bookTerm = () => {
    if (isBorrowed) {
      const date = bookData.borrowDate.toDate();
      const term = new Date(date.setDate(date.getDate() + 14));
      setDueDate(
        term.getFullYear() + '/' + (term.getMonth() + 1) + '/' + term.getDate(),
      );
    } else {
      const date = new Date();
      const term = new Date(date.setDate(date.getDate() + 14));
      setDueDate(
        term.getFullYear() + '/' + (term.getMonth() + 1) + '/' + term.getDate(),
      );
    }
  };

  const bookBorrower = () => {
    isBorrowed ? setBorrower(userName) : setBorrower(null);
  };

  useEffect(() => {
    if (user) {
      setUserName(user.displayName);
    }
  }, [user]);

  useEffect(() => {
    bookTerm();
    bookBorrower();
  }, [isBorrowed]);

  return (
    <StyledBookDetailContainer>
      <StyledBookDetail>대출 기한: {dueDate}</StyledBookDetail>
      <StyledBookDetail>
        책 소개 :
        {info ? (
          <a href={info} target='_blank' rel='no-referrer noreferrer'>
            {info}
          </a>
        ) : (
          <div>제공된 책 정보가 없습니다.</div>
        )}
      </StyledBookDetail>
      <StyledBookDetail>대출자: {borrower || '없음'}</StyledBookDetail>
    </StyledBookDetailContainer>
  );
};

BookDetail.propTypes = {
  bookData: PropTypes.object,
  info: PropTypes.string,
};
