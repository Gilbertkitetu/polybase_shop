class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $option: 'i'
            }

        } : {}

        console.log(keyword);

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter(){
        const queryCopy = { ...this.queryStr };

        //remove fields fom the query
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);


        //advance filter for price, rating etc
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `g${match}`)

        this.query = this.query.find(JSON.parse(queryStr ));

        return this;
    }
}

module.exports = APIFeatures;