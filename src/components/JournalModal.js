import { useState } from 'react';
import JournalEditingModal from './JournalEditingModal';
import JournalViewingModal from './JournalViewingModal';

function JournalModal(props) {
    const [editing, setEditing] = useState(props.editing);
    const handleEdit = (edit) => {
        setEditing(edit);
    };

    return (
        <>
            {editing && (
                <JournalEditingModal
                    journal={props.journal}
                    handleClose={props.handleClose}
                    handleEdit={handleEdit}
                    authorMode={props.authorMode}
                    updateJournals={props.updateJournals}
                />
            )}
            {!editing && (
                <JournalViewingModal
                    journal={props.journal}
                    handleEdit={handleEdit}
                    handleClose={props.handleClose}
                    authorMode={props.authorMode}
                    updateJournals={props.updateJournals}
                />
            )}
        </>
    );
}
export default JournalModal;
