import React, { useEffect, useState, useMemo } from "react";
import { ReCharts } from "../../components";
import { getUserScore } from '../../api';
import moment from "moment";

import './style.scss';

const StatisticScreen = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if(localStorage.getItem('accessToken') !== null) {
      getUserScore(setUserData);
    }
  }, []);

  const firstGameData = useMemo(() =>{
     let data =  userData.filter(item => item.game === 'game number 1').map(item =>[item.result, item.elo, item.createdAt] )
     let gameData = [];
     data.forEach((elem, index) => {
       gameData = [
           ...gameData,
         {
           name: `№${index +1}`,
           score: elem[0] / 10,
           elo: elem[1],
           description: `Попытка №${index +1} ${moment(elem[2]).format("HH:mm:ss DD.MM.YYYY")}`,
           isScore: true
         }]
     })
    return gameData;
  }, [userData]);

  const secondGameData = useMemo(() =>{
    let data =  userData.filter(item => item.game === 'game number 2').map(item =>[item.result, item.elo, item.createdAt] )
    let gameData = [];
    data.forEach((elem, index) => {
      gameData = [
        ...gameData,
        {
          name: `№${index +1}`,
          score: elem[0] /10,
          elo: elem[1],
          description: `Попытка №${index +1} ${moment(elem[2]).format("HH:mm:ss DD.MM.YYYY")}`,
          isScore: true
        }]
    })
    return gameData;
  }, [userData]);

  const thirdGameData = useMemo(() =>{
    let data =  userData.filter(item => item.game === 'game number 3').map(item =>[item.result, item.elo, item.createdAt] )
    let gameData = [];
    data.forEach((elem, index) => {
      gameData = [
        ...gameData,
        {
          name: `№${index +1}`,
          score: elem[0] /10,
          elo: elem[1],
          description: `Попытка №${index +1} ${moment(elem[2]).format("HH:mm:ss DD.MM.YYYY")}`,
          isScore: true
        }]
    })
    return gameData;
  }, [userData]);

  const fourthGameData = useMemo(() =>{
    let data =  userData.filter(item => item.game === 'game number 4').map(item =>[item.result, item.createdAt] )
    let gameData = [];
    data.forEach((elem, index) => {
      gameData = [
        ...gameData,
        {
          name: `№${index +1}`,
          score: elem[0],
          description: `Попытка №${index +1} ${moment(elem[1]).format("HH:mm:ss DD.MM.YYYY")}`,
          isScore: false
        }]
    })
    return gameData;
  }, [userData]);

  const fifthGameData = useMemo(() =>{
    let data =  userData.filter(item => item.game === 'game number 5').map(item =>[item.result, item.createdAt] )
    let gameData = [];
    data.forEach((elem, index) => {
      gameData = [
        ...gameData,
        {
          name: `№${index +1}`,
          score: elem[0],
          description: `Попытка №${index +1} ${moment(elem[1]).format("HH:mm:ss DD.MM.YYYY")}`,
          isScore: false
        }]
    })
    return gameData;
  }, [userData]);

  const sixthGameData = useMemo(() =>{
    let data =  userData.filter(item => item.game === 'game number 6').map(item =>[item.result, item.createdAt] )
    let gameData = [];
    data.forEach((elem, index) => {
      gameData = [
        ...gameData,
        {
          name: `№${index +1}`,
          score: elem[0],
          description: `Попытка №${index +1} ${moment(elem[1]).format("HH:mm:ss DD.MM.YYYY")}`,
          isScore: false
        }]
    })
    return gameData;
  }, [userData]);

  const sevenGameData = useMemo(() => {
    let data =  userData.filter(item => item.game === 'game number 7').map(item =>[item.result, item.elo, item.createdAt] )
    let gameData = [];
    data.forEach((elem, index) => {
      gameData = [
        ...gameData,
        {
          name: `№${index +1}`,
          score: elem[0] /10,
          elo: elem[1],
          description: `Попытка №${index +1} ${moment(elem[2]).format("HH:mm:ss DD.MM.YYYY")}`,
          isScore: true
        }]
    })
    return gameData;
  }, [userData]);

  const eighthGameData = useMemo(() =>{
    let data =  userData.filter(item => item.game === 'game number 8').map(item =>[item.result, item.createdAt] )
    let gameData = [];
    data.forEach((elem, index) => {
      gameData = [
        ...gameData,
        {
          name: `№${index +1}`,
          score: elem[0] /10,
          description: `Попытка №${index +1} ${moment(elem[1]).format("HH:mm:ss DD.MM.YYYY")}`,
          isScore: true
        }]
    })
    return gameData;
  }, [userData]);


  return (
    <div className='statisticScreen'>
      <div className='statisticScreen__sectionTitle'>
        Графики проверки точности
      </div>
      <div className='statisticScreen__section'>
        <ReCharts gameData={firstGameData} title='График первой игры' />
        <ReCharts gameData={secondGameData} title='График второй игры'/>
        <ReCharts gameData={thirdGameData} title='График трерьей игры'/>
      </div>
      <div className='statisticScreen__sectionTitle'>
        Графики проверки реакции
      </div>
      <div className='statisticScreen__section'>
        <ReCharts gameData={fourthGameData} title='График четвертой игры'/>
        <ReCharts gameData={fifthGameData} title='График пятой игры'/>
        <ReCharts gameData={sixthGameData} title='График шестой игры'/>
      </div>
      <div className='statisticScreen__sectionTitle'>
        Графики проверки скорости
      </div>
      <div className='statisticScreen__section'>
        <ReCharts gameData={sevenGameData} title='График седьмой игры'/>
        <ReCharts gameData={eighthGameData} title='График восьмой игры'/>
      </div>
    </div>
  )
};

export default StatisticScreen;
