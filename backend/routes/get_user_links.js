const db_ops = require('./../helpers/db_ops.js')
async function get_user_links (req,res){
	if (req.session.authed !== undefined) {
        const user_id=req.session.user_id;
        const links = await db_ops.link_ops.find_all_links_by_user_id(user_id);
        if(links.length!==0){
            for(let i=0;i<links.length;i++){
                delete(links[i]._id)
                delete(links[i].author_id)
            }
           return  res.json({links:links})
        }
        return  res.json({links:[]})
    }
    res.json({links:null})
}

module.exports = get_user_links;