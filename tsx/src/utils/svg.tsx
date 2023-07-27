import React from 'react';

const arrowCCW = () =>
  <svg className="bi bi-arrow-counterclockwise" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" fillRule="evenodd"/>
    <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
  </svg>;

const arrowBarDown = () =>
  <svg className="bi bi-arrow-bar-down" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" fillRule="evenodd"/>
  </svg>;

const doubleChevronDown = () =>
  <svg className="jam jam-chevrons-circle-down-f" fill="#currentColor" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg">
    <g id="SVG_dChevDn_bgCarrier" strokeWidth="0" />
    <g id="SVG_dChevDn_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
    <g id="SVG_dChevDn_iconCarrier">
      <path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm.009-7.377l-2.122-2.12a1 1 0 0 0-1.414 1.413l2.828 2.829a1 1 0 0 0 1.415 0l2.828-2.829a1 1 0 1 0-1.414-1.414l-2.121 2.121zm0-5l-2.122-2.12a1 1 0 0 0-1.414 1.413l2.828 2.829a1 1 0 0 0 1.415 0l2.828-2.829a1 1 0 1 0-1.414-1.414l-2.121 2.121z" />
    </g>
  </svg>;

const fatArrowUp = () =>
  <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <g id="SVG_farrUp_bgCarrier" strokeWidth="0" />
    <g id="SVG_farrUp_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
    <g id="SVG_farrUp_iconCarrier">
      <path d="M7 10v8h6v-8h5l-8-8-8 8h5z" />
    </g>
  </svg>;

const burgerMenu = () =>
  <svg fill='currentColor' height="64px" viewBox="0 0 72 72" width="64px" xmlns="http://www.w3.org/2000/svg">
    <path d="M56 48c2.209 0 4 1.791 4 4 0 2.209-1.791 4-4 4-1.202 0-38.798 0-40 0-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4C17.202 48 54.798 48 56 48zM56 32c2.209 0 4 1.791 4 4 0 2.209-1.791 4-4 4-1.202 0-38.798 0-40 0-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4C17.202 32 54.798 32 56 32zM56 16c2.209 0 4 1.791 4 4 0 2.209-1.791 4-4 4-1.202 0-38.798 0-40 0-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4C17.202 16 54.798 16 56 16z"/>
  </svg>;

const flatten = () =>
  <svg className="bi bi-app" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h6zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5z"/>
  </svg>;

const unflatten = () =>
  <svg className="bi bi-back" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/>
  </svg>;

const vectorPen = () =>
  <svg className="bi bi-pencil-square" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
    <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" fillRule="evenodd"/>
  </svg>;

const envelope = () =>
  <svg fill="currentColor" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
    <g id="SVG_envelope_bgCarrier" strokeWidth="0" />
    <g id="SVG_envelope_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
    <g id="SVG_envelope_iconCarrier">
      <path d="M 9.4843 48.1914 L 47.2184 48.1914 C 51.4376 48.1914 53.8751 45.7539 53.8751 40.9258 L 53.8751 15.0508 C 53.8751 10.2461 51.4141 7.8086 46.5157 7.8086 L 8.7812 7.8086 C 4.5858 7.8086 2.1249 10.2227 2.1249 15.0508 L 2.1249 40.9258 C 2.1249 45.7773 4.6093 48.1914 9.4843 48.1914 Z M 25.2109 29.1836 L 7.5155 11.7227 C 8.0312 11.5117 8.6405 11.3945 9.3671 11.3945 L 46.6564 11.3945 C 47.3826 11.3945 48.0157 11.5117 48.5548 11.7696 L 30.8827 29.1836 C 29.8749 30.1914 28.9843 30.6367 28.0468 30.6367 C 27.1093 30.6367 26.2187 30.1914 25.2109 29.1836 Z M 5.7109 40.9258 L 5.7109 15.0508 C 5.7109 14.8867 5.7109 14.9570 5.7109 14.8164 L 19.1874 28.0352 L 5.7343 41.3242 C 5.7109 41.2070 5.7109 41.0664 5.7109 40.9258 Z M 50.2890 15.0742 L 50.2890 40.9492 C 50.2890 41.0430 50.2890 41.1602 50.2890 41.2539 L 36.9062 28.0352 L 50.2890 14.8867 C 50.2890 15.0742 50.2890 15.0742 50.2890 15.0742 Z M 9.3671 44.6055 C 8.6874 44.6055 8.1249 44.5117 7.6327 44.3008 L 21.6484 30.4492 L 23.1718 31.9492 C 24.8124 33.5664 26.3827 34.2461 28.0468 34.2461 C 29.6874 34.2461 31.2812 33.5664 32.9218 31.9492 L 34.4452 30.4492 L 48.4376 44.2773 C 47.9452 44.5117 47.3360 44.6055 46.6564 44.6055 Z" />
    </g>
  </svg>;

export const SVG = {
  get arrowCCW()          { return arrowCCW();          },
  get arrowBarDown()      { return arrowBarDown();      },
  get doubleChevronDown() { return doubleChevronDown(); },
  get fatArrowUp()        { return fatArrowUp();        },
  get burgerMenu()        { return burgerMenu();        },
  get flatten()           { return flatten();           },
  get unflatten()         { return unflatten();         },
  get vectorPen()         { return vectorPen();         },
  get envelope()          { return envelope();          }
};
