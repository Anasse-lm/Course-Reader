import Path from './Path';
import Slider from './Slider';
import { FilesContext } from '../context/FilesContext';
import { useEffect, useContext, useState } from 'react';

function SlidesPage() {
  let {files, setFiles} = useContext(FilesContext);
  
  return (
    <div className='slides-page'>
      <Path />
      <Slider />
    </div>
  );
}

export default SlidesPage;
