/* eslint-disable react/jsx-no-bind */
import './MainMenu.css';

import React, { useState } from 'react';

import { SVG } from '../../utils/svg';

type TrivialFunction = () => void;
type MainMenuProps = {
  flipFlatLayout: TrivialFunction,
  activateEditor: TrivialFunction,
  undoYAMLChange: TrivialFunction | boolean
  layoutIsFlat: boolean;
};

const homeArrow = () =>
  <div id="home-arrow" onClick={() => {
    document.getElementById('root')?.scrollTo(0,0);
  }}>
    {SVG.fatArrowUp}
  </div>;

// eslint-disable-next-line react/no-unused-prop-types
export default function MainMenu(props: MainMenuProps) {
  const {
    flipFlatLayout,
    activateEditor,
    undoYAMLChange,
    layoutIsFlat
  } = props;

  const [ unfolded, setUnfolded ] = useState(false);

  const unfold = () => setUnfolded(true);
  const fold = (action?: TrivialFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const fader: HTMLElement = document.getElementById('main-menu')!;
    fader.classList.remove('slide-in');
    fader.classList.add('slide-out');
    setUnfolded(false);
    if (action) action();
  };

  const flattenDiv = <>
    {SVG.flatten}
    <div>flatten CV layout</div>
  </>;
  const unflattenDiv = <>
    {SVG.unflatten}
    <div>restore rich layout</div>
  </>;
  const undoDiv = undoYAMLChange ? 
    <div onClick={() => fold(() => (undoYAMLChange as TrivialFunction)())}>
      {SVG.arrowCCW}
      <div>undo YAML source change</div>        
    </div> : null;

  const menu = 
    <div className='unfolded slide-in' id='main-menu'>
      <div onClick={() => fold(() => flipFlatLayout())}>
        { layoutIsFlat ? unflattenDiv : flattenDiv }
      </div>
      <div onClick={() => fold(() => activateEditor())}>
        {SVG.vectorPen}
        <div>edit YAML source</div>        
      </div>
      {undoDiv}
    </div>;

  const burger = <div className='pulse-me' id='burger' onClick={unfold}>
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