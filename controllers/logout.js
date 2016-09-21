'use strict';



module.exports.index = (req, res) => {
    res.redirect('/logout', {page: 'Logout'})
  }


module.exports.destroy = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err
    res.redirect('/login')
  })
}