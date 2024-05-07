const mongoose = require('mongoose');

const { Enums } = require('../utils/common');
const { EASY, MEDIUM, HARD } = Enums.PROBLEMS_DIFFICULTY;

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title of the problem cannot be empty.']
    },
    description: {
        type: String,
        required: [true, 'Description of the problem cannot be empty.']
    },
    difficulty: {
        type: String,
        enum: [EASY, MEDIUM, HARD],
        default: EASY,
        required: [true, 'Difficulty of the problem cannot be empty.']
    },
    testCases: [
        {
            input: {
                type: String,
                required: [true, 'test case input cannot be empty.']
            },
            output: {
                type: String,
                required: [true, 'test case input cannot be empty.']
            }
        }
    ],
    editorial: {
        type: String
    }
});


const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;

/**
 * [{input:'5',output:'10'},{input:'6',output:'12'}]
 */