const checkMillionDollarIdea = (req, res, next) => {
    const value = Number(req.body.numWeeks) * Number(req.body.weeklyRevenue);
    if ( value >= 1000000) {
        next();
    } else {
        res.status(400).send('Not value enought');
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
