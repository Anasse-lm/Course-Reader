import { createContext, useState } from "react";
export const FilesContext = createContext();

export const FilesProvider = ( {children} ) => {
  let [files, setFiles] = useState([]);
  
  return (
    <FilesContext.Provider value={ {files, setFiles} }>
        {children}
    </FilesContext.Provider>
  )
}