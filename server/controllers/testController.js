const testController = (req, res) => {
    res.status(200).send({
        message: 'test controller, welcome user',
        success: true,
    })
}

module.exports = {testController}