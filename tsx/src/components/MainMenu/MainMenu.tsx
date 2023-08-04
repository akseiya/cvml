/* eslint-disable react/jsx-no-bind */
import './MainMenu.css';

import React, { useState } from 'react';

import { YAMLHistory, YAMLHistoryChange, YAMLHistoryData } from '../../data/YAMLHistory';
import { SVG } from '../../utils/svg';

type TrivialFunction = () => void;
type MainMenuProps = {
  layoutIsFlat: boolean;
  flipFlatLayout: TrivialFunction,
  openEditor: TrivialFunction,
  yamlHistory: YAMLHistoryData,
  yamlDispatch: React.Dispatch<YAMLHistoryChange>,
  burgerWasClicked: boolean,
  setBurgerWasClicked: React.Dispatch<React.SetStateAction<boolean>>
};

const homeArrow = () =>
  <div id="home-arrow" onClick={() => {
    document.getElementById('root')?.scrollTo(0,0);
  }}>
    {SVG.fatArrowUp}
  </div>;

// eslint-disable-next-line react/no-unused-prop-types
export function MainMenu(props: MainMenuProps) {
  const {
    flipFlatLayout,
    openEditor,
    yamlDispatch,
    yamlHistory,
    layoutIsFlat,
    burgerWasClicked,
    setBurgerWasClicked
  } = props;

  const [ unfolded, setUnfolded ] = useState(false);

  const unfold = () => {
    setBurgerWasClicked(false);
    setUnfolded(true);
  };

  const fold = (action?: TrivialFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const fader = document.getElementById('main-menu');
    if(!fader) throw 'Somehow, main menu is gone...';
    fader.classList.remove('slide-in');
    fader.classList.add('slide-out');
    if (action) action();
    fader.addEventListener('animationend', () => {
      setUnfolded(false);
    });
  };

  const flattenDiv = <>
    {SVG.flatten}
    <div>flatten CV layout</div>
  </>;

  const unflattenDiv = <>
    {SVG.unflatten}
    <div>restore rich layout</div>
  </>;

  const undoDiv = yamlHistory.current > 0 ? 
    <div onClick={() => fold(() => yamlDispatch({type: 'undo'}))}>
      {SVG.arrowCCW}
      <div>undo YAML source change</div>        
    </div> : null;

  const redoDiv = YAMLHistory.canRedo(yamlHistory) ?
    <div onClick={() => fold(() => yamlDispatch({type: 'redo'}))}>
      {SVG.arrowCW}
      <div>redo YAML source change</div>
    </div> : null;

  const menu = 
    <div className='unfolded slide-in' id='main-menu'>
      <div onClick={() => fold(() => flipFlatLayout())}>
        { layoutIsFlat ? unflattenDiv : flattenDiv }
      </div>
      <div onClick={() => fold(() => openEditor())}>
        {SVG.vectorPen}
        <div>edit YAML source</div>        
      </div>
      {undoDiv}
      {redoDiv}
    </div>;

  const burger = 
    <div className={burgerWasClicked ? 'pulse-me' : ''} id='burger' onClick={unfold}>
      {SVG.burgerMenu}
    </div>;

  return unfolded ?
    <>
      {burger}
      <div id='main-menu-modal-bg' onClick={() => fold()}/>
      {menu}
    </> :
    <>
      {burger}
      {homeArrow()}
    </>;
}
