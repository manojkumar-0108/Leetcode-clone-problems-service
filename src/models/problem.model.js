const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const problemSchema = new Schema({
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
        enum: ['easy', 'medium', 'hard'],
        default: 'easy',
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


const Problem = model('Problem', problemSchema);

module.exports = Problem;

/**
 * [{input:'5',output:'10'},{input:'6',output:'12'}]
 */