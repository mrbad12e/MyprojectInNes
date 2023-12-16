class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }
    search() {
        const keyword = this.queryStr.keyword
            ? { $or: [
                { title: { $regex: this.queryStr.keyword, $options: 'i' }},
                { username: {$regex: this.queryStr.keyword, $options: 'i' }},
                { description: { $regex: this.queryStr.keyword, $options: 'i' }},
                { categories: { $regex: this.queryStr.keyword, $options: 'i' }}
            ]} : {}
        this.query = this.query.find({ ...keyword })
        return this
    }

    filter() {
        const queryCopy = { ...this.queryStr }
        // removing some field for category
        const removeFields = ['keyword', 'page', 'limit']

        removeFields.forEach((key) => delete queryCopy[key])

        // filter for pricing and rating
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)

        this.query = this.query.find(JSON.parse(queryStr))
        return this
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1
        const skip = resultPerPage * (currentPage - 1)
        if (!Number.isInteger(currentPage) || currentPage < 1) {
            currentPage = 1; 
        }
        this.query = this.query.limit(resultPerPage).skip(skip)

        return this
    }
}

module.exports = ApiFeatures
