import React from 'react';
import styled from 'styled-components';
import { ImCalendar } from 'react-icons/im';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Wrapper = styled.div`
  position: relative;
  svg {
    margin-right: 5px;
  }
  .btn {
    cursor: pointer;
    &:hover {
      color: #656a70;
      cursor: pointer;
    }
  }
  .react-datepicker {
    position: absolute;
    top: 0;
    left: -10px;
    .react-datepicker__triangle {
      left: 15px !important;
    }
  }
`;

const PickerWrapper = styled.div`
  position: absolute;
  top: -3px;
  left: 0px;
  z-index: 1;
  display: flex;
  width: 170px;
  .react-datepicker-wrapper {
    &:last-of-type {
      margin-left: 3px;
    }
    input {
      width: inherit;
      padding: 3px 2px;
      color: $gray-dark;
      font-size: 0.7rem;
    }
    .react-datepicker__input-container .react-datepicker__close-icon {
      padding: 0;
      margin-right: 5px;
    }
    .react-datepicker__close-icon::after {
      height: 12px;
      width: 12px;
      font-size: 10px;
      vertical-align: initial;
    }
  }
`;

const Calendar = ({
  onToggle,
  activeDate,
  startDt,
  endDt,
  setStartDate,
  setEndDate,
}) => {
  return (
    <Wrapper>
      <ImCalendar className="btn" onClick={() => onToggle('date')} />
      {activeDate && (
        <PickerWrapper>
          <DatePicker
            selected={startDt}
            onChange={date => setStartDate(date)}
            isClearable
            placeholderText="시작일"
            dateFormat="yyyy-MM-dd"
          />
          <DatePicker
            selected={endDt}
            onChange={date => setEndDate(date)}
            isClearable
            placeholderText="마감일"
            dateFormat="yyyy/MM/dd"
          />
        </PickerWrapper>
      )}
    </Wrapper>
  );
};

export default Calendar;
