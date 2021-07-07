
// fake database for now
// TODO: implement the function to interact with the real database
export class DatabaseHandler {

    static initialize() {

    }

    // pull all journals from the database
    static pullFromDatabase(databaseFlag) {
        // TODO: pull from the real database instead
        return [
            {
                uniqueID: '000',
                title: 'My Journal',
                date: '2021.06.03',
                coverImage: 'https://perfectdailygrind.com/wp-content/uploads/2019/02/coffee-bar.jpg',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                privacy_setting:'private'
            },
            {
                uniqueID: '111',
                title: 'The First Journal',
                date: '2021.06.03',
                EditDate: '',
                coverImage: 'https://media.sproutsocial.com/uploads/2018/04/Facebook-Cover-Photo-Size.png',
                content: 'This is the first Journal with an image',
                privacy_setting:'private'
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
    };

    // delete a journal from the database
    static deleteJournal(databaseFlag, uniqueID) {
        // TODO: delete from the real database instead
        return true;
    }
}

export default DatabaseHandler;