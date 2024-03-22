import React from 'react';
import styled, { keyframes } from 'styled-components';

import useRatioBoxValue from '../../hook/useRatioBoxValue';
import MyTooltip from '../../HOC/MyTooltip';
import { getTimerLocal } from '../../utils/date-local';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0 15px;
  align-items: center;
`;
const Title = styled.h5`
  font-weight: 400;
  font-size: 11px;
  letter-spacing: 0.03em;
`;

const Block = styled.div`
  flex: 0 0 160px;
  height: 20px;
  background-color: #ffffff;
  border: 1px solid ${(props) => (props.$myLabel === 'watts' ? '#6d809d' : '#30872e')};
  border-radius: 0.4em;
  overflow: hidden;
`;

const showBar = (width) => keyframes`
from {
  width: 32px;
}
to {
  width: ${width}px;
}
`;

const Bar = styled.div`
  min-width: 32px;
  max-width: 158px;
  height: 100%;
  background-color: ${(props) => (props.$myLabel === 'watts' ? '#6d809d' : '#30872e')};
  text-align: right;
  animation: ${(props) => showBar(props.$myWidth)} 700ms ease-out;
  width: ${(props) => props.$myWidth}px;
  & span {
    font-weight: 500;
    font-size: 11px;
    line-height: 13px;
    color: #ffffff;
    padding: 2px 5px 2px 2px;
    cursor: default;
  }
  &:hover {
    opacity: 0.8;
  }
`;

function CPBox({ value = 0, duration, date, name, label }) {
  const dateCP = date ? `${getTimerLocal(date, 'DDMMYY')}, ${name}` : 'нет данных';
  const title = duration <= 60 ? `${duration} сек` : `${duration / 60} мин`;
  const ratio = useRatioBoxValue(duration, label);
  return (
    <Wrapper>
      <Title>{title}</Title>
      <MyTooltip tooltip={dateCP}>
        <Block $myLabel={label}>
          <Bar $myWidth={160 * value * ratio} $myLabel={label}>
            <span>{value}</span>
          </Bar>
        </Block>
      </MyTooltip>
    </Wrapper>
  );
}

export default CPBox;
