const logout = async (req, res) => {
    try {
        req.session.user_id = false;
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    logout
}