/* eslint-disable react/jsx-no-bind */
import './MainMenu.css';

import React, { useContext, useState } from 'react';

import { ResumeHistory } from '../../data/History';
import { DispatchContext, PresenterContext } from '../../utils/contexts';
import { FlagSwitchType } from '../../utils/reducers';
import { SVG } from '../../utils/svg';


type TrivialFunction = () => void;
type MainMenuProps = {
  openEditor: TrivialFunction,
  burgerWasClicked: boolean,
  setBurgerWasClicked: React.Dispatch<React.SetStateAction<boolean>>
};

const homeArrow = () =>
  <a href="#summary" id="home-arrow">
    {SVG.fatArrowUp}
  </a>;

// eslint-disable-next-line react/no-unused-prop-types
export function MainMenu(props: MainMenuProps) {
  const {
    openEditor,
    burgerWasClicked,
    setBurgerWasClicked
  } = props;

  const present = useContext(PresenterContext);
  const dispatch = useContext(DispatchContext);
  if (!(present && dispatch)) throw 'Trying to render MainMenu without context';
  const { history, flags: { flatView } } = present;

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

  const foldispatch = (type: FlagSwitchType) =>
    fold(() => dispatch({type: type }));

  const flattenDiv = <div onClick={() => foldispatch('flatten')}>
    {SVG.flatten}
    <div>flatten CV layout</div>
  </div>;

  const unflattenDiv = <div onClick={() => foldispatch('unflatten')}>
    {SVG.unflatten}
    <div>restore rich layout</div>
  </div>;

  const undoDiv = ResumeHistory.canUndo(history) ?
    <div onClick={() => fold(() => dispatch({type: 'undo'}))}>
      {SVG.arrowCCW}
      <div>undo YAML source change</div>
    </div> : null;

  const redoDiv = ResumeHistory.canRedo(history) ?
    <div onClick={() => fold(() => dispatch({type: 'redo'}))}>
      {SVG.arrowCW}
      <div>redo YAML source change</div>
    </div> : null;

  const menu =
    <div className='unfolded slide-in' id='main-menu'>
      { flatView ? unflattenDiv : flattenDiv }
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
