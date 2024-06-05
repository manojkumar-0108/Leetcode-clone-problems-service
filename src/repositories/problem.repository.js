
const CrudRepository = require('./crud.repository');

class ProblemRepository extends CrudRepository {

    constructor(model) {
        super(model);
    }

}


module.exports = ProblemRepository;