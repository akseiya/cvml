import './MainMenu.css';

import React, { useCallback, useContext, useState } from 'react';

import { ResumeHistory } from '../../data/History';
import { DispatchContext, PresenterContext } from '../../utils/contexts';
import { ActionType } from '../../utils/reducers';
import { SVG } from '../../utils/svg';


type TrivialFunction = () => void;
type MainMenuProps = {
  openEditor: TrivialFunction,
  burgerWasClicked: boolean,
  setBurgerWasClicked: React.Dispatch<React.SetStateAction<boolean>>
};

export function MainMenu(props: MainMenuProps) {
  const {
    openEditor,
    burgerWasClicked,
    setBurgerWasClicked
  } = props;

  const presenterData = useContext(PresenterContext);
  const dispatch = useContext(DispatchContext);
  if (!(presenterData && dispatch))
    throw 'Trying to render MainMenu without context';
  const { history, flags: { flatView } } = presenterData;

  const [ unfolded, setUnfolded ] = useState(false);

  const unfold = useCallback(
    () => {
      setBurgerWasClicked(true);
      setUnfolded(true);
    },
    [setBurgerWasClicked, setUnfolded]
  );

  const fold = (action?: TrivialFunction) => {
    const fader = document.getElementById('main-menu');
    if(!fader) throw 'Somehow, main menu is gone...';
    fader.classList.remove('slide-in');
    fader.classList.add('slide-out');
    if (action) action();
    fader.addEventListener('animationend', () => {
      setUnfolded(false);
    });
  };

  const foldAndDispatch = (type: ActionType) =>
    useCallback(
      () => fold(() => dispatch({ type })),
      [setUnfolded, dispatch]
    );

  const foldAndOpenEditor = useCallback(
    () => fold(() => openEditor()),
    [setUnfolded, openEditor]
  );

  const justFold = useCallback(() => fold(), [setUnfolded]);

  const flattenDiv = <div onClick={foldAndDispatch('flatten')}>
    {SVG.flatten}
    <div>flatten CV layout</div>
  </div>;

  const unflattenDiv = <div onClick={foldAndDispatch('unflatten')}>
    {SVG.unflatten}
    <div>restore rich layout</div>
  </div>;

  const undoDiv = ResumeHistory.canUndo(history) ?
    <div onClick={foldAndDispatch('undo')}>
      {SVG.arrowCCW}
      <div>undo YAML source change</div>
    </div> : null;

  const redoDiv = ResumeHistory.canRedo(history) ?
    <div onClick={foldAndDispatch('redo')}>
      {SVG.arrowCW}
      <div>redo YAML source change</div>
    </div> : null;

  const menu =
    <div className='unfolded slide-in' id='main-menu'>
      { flatView ? unflattenDiv : flattenDiv }
      <div onClick={foldAndOpenEditor}>
        {SVG.vectorPen}
        <div>edit YAML source</div>
      </div>
      {undoDiv}
      {redoDiv}
    </div>;

  const pulseOnLoad = burgerWasClicked ? '' : 'pulse-me';
  const burger =
    <div className={pulseOnLoad} id='burger' onClick={unfold}>
      {SVG.burgerMenu}
    </div>;

  return unfolded ?
    <>
      {burger}
      <div id='main-menu-modal-bg' onClick={justFold}/>
      {menu}
    </> :
    <>
      {burger}
      <a href="#summary" id="home-arrow">
        {SVG.fatArrowUp}
      </a>
    </>;
}
