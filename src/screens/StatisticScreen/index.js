import React, { useEffect, useState, useMemo } from "react";
import { ScoreGraph } from "../../components";
import { getUserScore } from '../../api';

import './style.scss';

const StatisticScreen = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUserScore(setUserData);
  }, []);

  const firstGameData = useMemo(() =>{
    return (
      userData.filter(item => item.game === 'game number 1').map(item => item.result)
    )
  }, [userData]);
  const secondGameData = useMemo(() =>{
    return (
      userData.filter(item => item.game === 'game number 2').map(item => item.result)
    )
  }, [userData])
  const thirdGameData = useMemo(() =>{
    return (
      userData.filter(item => item.game === 'game number 3').map(item => item.result)
    )
  }, [userData])
  const fourthGameData = useMemo(() =>{
    return (
      userData.filter(item => item.game === 'game number 4').map(item => item.result)
    )
  }, [userData])
  const fifthGameData = useMemo(() =>{
    return (
      userData.filter(item => item.game === 'game number 5').map(item => item.result)
    )
  }, [userData])
  const sixthGameData = useMemo(() =>{
    return (
      userData.filter(item => item.game === 'game number 6').map(item => item.result)
    )
  }, [userData])
  const sevenGameData = useMemo(() =>{
    return (
      userData.filter(item => item.game === 'game number 7').map(item => item.result)
    )
  }, [userData])
  const eighthGameData = useMemo(() =>{
    return (
      userData.filter(item => item.game === 'game number 8').map(item => item.result)
    )
  }, [userData])
  const ninthGameData = useMemo(() =>{
    return (
      userData.filter(item => item.game === 'game number 9').map(item => item.result)
    )
  }, [userData])

  return (
    <div className='statisticScreen'>
      <div className='statisticScreen__sectionTitle'>
        Графики проверки точности
      </div>
      <div className='statisticScreen__section'>
        <ScoreGraph gameScore={firstGameData} title='График первой игры' />
        <ScoreGraph gameScore={secondGameData} title='График второй игры'/>
        <ScoreGraph gameScore={thirdGameData} title='График трерьей игры'/>
        <ScoreGraph gameScore={fourthGameData} title='График четвертой игры'/>
      </div>
      <div className='statisticScreen__sectionTitle'>
        Графики проверки реакции
      </div>
      <div className='statisticScreen__section'>
        <ScoreGraph gameScore={fifthGameData} title='График пятой игры'/>
        <ScoreGraph gameScore={sixthGameData} title='График шестой игры'/>
        <ScoreGraph gameScore={sevenGameData} title='График седьмой игры'/>
      </div>
      <div className='statisticScreen__sectionTitle'>
        Графики проверки скорости
      </div>
      <div className='statisticScreen__section'>
        <ScoreGraph gameScore={eighthGameData} title='График восьмой игры'/>
        <ScoreGraph gameScore={ninthGameData} title='График девятой игры'/>
      </div>
    </div>
  )
};

export default StatisticScreen;
