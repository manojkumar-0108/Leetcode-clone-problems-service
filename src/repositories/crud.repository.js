

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

    async destory(id) {
        const response = await Problem.findByIdAndDelete(id);
        return response;
    }

    async update(id, problemData) {
        const response = await this.model.findByIdAndUpdate(id, problemData);
        return response;
    }
}

module.exports = CrudRepository;