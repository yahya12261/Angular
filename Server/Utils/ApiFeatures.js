class Apifeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  //   filter() {
  //     const queryObj = { ...this.queryStr };

  //     const excludedFields = ["page", "sort", "limit", "fields"];

  //     // Remove excluded fields from queryObj
  //     excludedFields.forEach((field) => delete queryObj[field]);

  //     // Convert gte, gt, lte, lt to $gte, $gt, $lte, $lt
  //     for (const key in queryObj) {
  //       if (Object.hasOwnProperty.call(queryObj, key)) {
  //         queryObj[key] = { $regex: new RegExp(queryObj[key], "i") };
  //       }
  //     }

  //     this.query = this.query.find(queryObj);

  //     return this;
  //   }

  filter() {
    const queryObj = { ...this.queryStr };

    const excludedFields = ["page", "sort", "limit", "fields"];

    // Remove excluded fields from queryObj
    excludedFields.forEach((field) => delete queryObj[field]);

    // Convert gte, gt, lte, lt to $gte, $gt, $lte, $lt
    for (const key in queryObj) {
      if (Object.hasOwnProperty.call(queryObj, key)) {
        // Check if the key is "visible" and parse the value as a number
        if (key === "visible") {
          queryObj[key] = parseInt(queryObj[key]);
        } else {
          queryObj[key] = { $regex: new RegExp(queryObj[key], "i") };
        }
      }
    }

    this.query = this.query.find(queryObj);

    return this;
  }
  async countDocuments() {
    const count = await this.query.countDocuments();
    // console.log(count);
    return count;
  }
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  //   paginate() {
  //     const page = this.queryStr.page * 1 || 1;
  //     const limit = this.queryStr.limit * 1 || 5;
  //     const skip = (page - 1) * limit;
  //     this.query = this.query.skip(skip).limit(limit);
  //     return this;
  //   }
  paginate() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 10;
    const skip = (page - 1) * limit;

    if (!this.model) {
      throw new Error(
        "Model is not defined. Make sure to set the model property."
      );
    }
    // Clone the query object to count the total documents
    const countQuery = { ...this.query.getQuery() };
    const countPromise = this.model.countDocuments(countQuery);

    this.query = this.query.skip(skip).limit(limit);

    // Return the count promise along with the modified query
    return { query: this.query, countPromise };
  }
}

module.exports = Apifeatures;
