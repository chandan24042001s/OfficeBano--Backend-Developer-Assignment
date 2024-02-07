

const Todo=require("../models/Todo");

exports.getTodosPaginated = async (req, res) => {
    try {
        const page = parseInt(req.body.page) ||  1;
        const limit = parseInt(req.body.limit) ||  10;

        // Set default values if not provided
        const skipIndex = (page -  1) * limit;
        const results = {};

        if (limit >  0) {
            results.results = await Todo.find().sort({ _id: -1 }).skip(skipIndex).limit(limit);
            results.totalPages = await Todo.countDocuments();
            results.currentPage = page;
            results.perPage = limit;
        } else {
            results.results = await Todo.find().sort({ _id: -1 });
            results.totalPages = await Todo.countDocuments();
            results.currentPage =  1;
            results.perPage = results.totalPages;
        }

        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message,
            message: 'Server Error',
        });
    }
};