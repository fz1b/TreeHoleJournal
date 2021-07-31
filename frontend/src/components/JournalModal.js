import { useState, useContext } from 'react';
import JournalEditingModal from './JournalEditingModal';
import JournalViewingModal from './JournalViewingModal';
import { getJournalLikeStatus } from '../services/JournalServices';
import AuthContext from '../authAPI/auth-context';

function JournalModal(props) {
    const [editing, setEditing] = useState(props.editing);
    const handleEdit = (edit) => {
        setEditing(edit);
    };
    // const auth = useContext(AuthContext);
    // let initLikeStatus = false;
    // console.log(props.journal);
    // if (auth.token) {
    //     initLikeStatus = await getJournalLikeStatus(auth.token, props.journal._id);
    // }
    // console.log(initLikeStatus);


    return (
        <>
            {editing && (
                <JournalEditingModal
                    journal={props.journal}
                    handleClose={props.handleClose}
                    handleEdit={handleEdit}
                    authorMode={props.authorMode}
                    updateJournals={props.updateJournals}
                    initLike={false}
                />
            )}
            {!editing && (
                <JournalViewingModal
                    journal={props.journal}
                    handleEdit={handleEdit}
                    handleClose={props.handleClose}
                    authorMode={props.authorMode}
                    updateJournals={props.updateJournals}
                    initLike={false}
                />
            )}
        </>
    );
}
export default JournalModal;
