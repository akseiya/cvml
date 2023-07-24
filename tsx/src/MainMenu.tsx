import './MainMenu.css';

import React, { useState } from 'react';
// import ReactMarkdown from 'react-markdown';

// import { resume, YAMLResume } from './utils/Resume';

type MainMenuProps = {
  flipFlatLayout: () => void
};

// eslint-disable-next-line react/no-unused-prop-types
export default function MainMenu(props: MainMenuProps) {
  const { flipFlatLayout } = props;
  const [ unfolded, setUnfolded ] = useState(false);

  return (
    <div className='main-menu folded'>
      ≡
    </div>
  );
}
