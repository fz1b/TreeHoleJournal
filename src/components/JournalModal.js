import {useState} from 'react';
import JournalEditingModal from './JournalEditingModal';
import JournalViewingModal from './JournalViewingModal';
import {editJournal} from "../services/JournalServices";
function JournalModal(props){
    const [editing,setEditing] = useState(false);

    const handleSave = (title, date, image, weather, content, privacy) =>{
        // editJournal(props.journal.author_id, props.journal.journal_id,
        //     title,
        //     date,
        //     image,
        //     weather,
        //     content,
        //     privacy
        // ).then( res =>{
        //     props.updateJournal(props.journal.journal_id, res);
        // });

        setEditing(false);
    }
    const handleEdit = ()=>{
        setEditing(true);
    }

    return(
        <>
            {editing && <JournalEditingModal
                journal={props.journal}
                handleSave={handleSave}
                handleClose={props.handleClose}
                authorMode={props.authorMode}/>}
            {!editing&&<JournalViewingModal
                journal={props.journal}
                handleEdit={handleEdit}
                handleClose={props.handleClose}
                authorMode={props.authorMode}/>}
        </>
    )
}
export default JournalModal