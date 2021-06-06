
// Singleton
// fake database for now
// TODO: implement the function to interact with the real database
export class DatabaseHandler {
    static #journals = null;

    constructor() {
        if(!DatabaseHandler.#journals){
            // TODO: pull from the real database instead
            DatabaseHandler.#journals = [
                {
                    uniqueID: '111',
                    Title: 'The First Journal',
                    Date: '2021.06.03',
                    EditDate: '',
                    CoverImage: 'https://media.sproutsocial.com/uploads/2018/04/Facebook-Cover-Photo-Size.png',
                    Content: 'This is the first Journal with an image',
                },
                {
                    uniqueID: '222',
                    Title: 'The Second Journal without an image',
                    Date: '2021.06.03',
                    EditDate: '',
                    CoverImage: '',
                    Content: 'This is the Second Journal without a cover image. There should NOT be a img tag',
                },
                {
                    uniqueID: '333',
                    Title: 'The Third Journal',
                    Date: '',
                    EditDate: '',
                    CoverImage: 'https://media.sproutsocial.com/uploads/2018/04/Facebook-Cover-Photo-Size.png',
                    Content: 'This is the Third Journal with an image',
                },
                {
                    uniqueID: '444',
                    Title: 'The Forth Journal with a broken image',
                    Date: '',
                    EditDate: '',
                    CoverImage: 'https://media.sproutsocia8/04/Facebook-Cover-Photo-Size.png',
                    Content: 'This is the Forth Journal with a broken, the standard broken image replacement should be displayed',
                },
                {
                    uniqueID: '555',
                    Title: 'The Fifth Journal',
                    Date: '',
                    EditDate: '',
                    CoverImage: 'https://media.sproutsocial.com/uploads/2018/04/Facebook-Cover-Photo-Size.png',
                    Content: 'This is the Fifth Journal with an image',
                },
            ];
        }
    }

    // pull all journals from the database
    pullFromDatabase(databaseFlag) {
        // TODO: pull from the real database instead
        return DatabaseHandler.#journals;
    };

    // delete a journal from the database
    deleteJournal(uniqueID) {
        // TODO: delete from the real database instead
        let newJournals = Object.assign([], DatabaseHandler.#journals);
        newJournals.splice(uniqueID, 1);
        DatabaseHandler.#journals = newJournals;
    }
}

export default DatabaseHandler;