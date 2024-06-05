

class CrudRepository {

    constructor(model) {
        this.model = model;
    }

    async create(problemData) {
        const response = await this.model.create(problemData);
        return response;
    }


    async get(id) {
        const response = await this.model.findById(id);
        return response;
    }


    async getAll() {
        const response = await this.model.find({});
        return response;
    }

    async findByIdAndDelete(id) {
        const response = await this.model.findByIdAndDelete(id);
        return response;
    }

    async findByIdAndUpdate(id, problemData) {
        const response = await this.model.findByIdAndUpdate(id, problemData);
        return response;
    }
}

module.exports = CrudRepository;