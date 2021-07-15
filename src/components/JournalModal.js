import {useState} from 'react';
import JournalEditingModal from './JournalEditingModal';
import JournalViewingModal from './JournalViewingModal';
function JournalModal({journal,handleClose, authorMode}){
  const [editing,setEditing] = useState(false);
  const handleSave = () =>{
    setEditing(false);
  }
  const handleEdit = ()=>{
    setEditing(true);
  }
  return(
    <>
    {editing && <JournalEditingModal 
                journal={journal} 
                handleSave={handleSave}
                handleClose={handleClose}
                authorMode={authorMode}/>}
    {!editing&&<JournalViewingModal
              journal={journal} 
              handleEdit={handleEdit}
              handleClose={handleClose}
              authorMode={authorMode}/>}
    </>
  )
}
export default JournalModal