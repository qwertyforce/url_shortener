const db_ops = require('./../helpers/db_ops.js')
async function shorten_link (req,res){
    const link=req.body.link
    if(typeof link === "string"){
        const user_id=req.session.user_id
        const link_id=db_ops.link_ops.remove_link(user_id,link)
        res.json({link_id:link_id})
    }
}

module.exports = shorten_link;