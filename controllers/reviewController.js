const { validationResult } = require('express-validator');
const ReviewModel = require('../models/reviewModel');

exports.submitReview = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { product_id, title, rating, comment } = req.body;
    const user_id = req.user.id;

    try {
        await ReviewModel.create({ user_id, product_id, title, rating, comment });
        res.status(201).json({ message: 'Review submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getReviewsByProduct = async (req, res) => {
    const { product_id } = req.params;

    try {
        const [reviews] = await ReviewModel.getByProductId(product_id);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};