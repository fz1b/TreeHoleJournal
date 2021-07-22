import {useState} from 'react';
import JournalEditingModal from './JournalEditingModal';
import JournalViewingModal from './JournalViewingModal';

function JournalModal(props){
    const [editing,setEditing] = useState(false);
    const handleEdit = (edit)=>{
        setEditing(edit);
    }

    return(
        <>
            {editing && <JournalEditingModal
                journal={props.journal}
                handleClose={props.handleClose}
                handleEdit={handleEdit}
                authorMode={props.authorMode}
                updateJournal={props.updateJournal}
            />}
            {!editing&&<JournalViewingModal
                journal={props.journal}
                handleEdit={handleEdit}
                handleClose={props.handleClose}
                authorMode={props.authorMode}
                updateJournal={props.updateJournal}
            />}
        </>
    )
}
export default JournalModal