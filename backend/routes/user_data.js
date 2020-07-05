const db_ops = require('./../helpers/db_ops.js')
async function profile (req,res){
	if (req.session.authed !== undefined) {
        const user_id=req.session.user_id;
        const links = await db_ops.link_ops.find_all_links_by_user_id(user_id);
        if(links.length!==0){
            for(let i=0;i<links.length;i++){
                delete(links[i]._id)
                delete(links[i].author_id)
            }
            const data={
                links:links
            }
            res.json({data:data})
        }
    } else {
        res.json({data:null})
    }
}

module.exports = profile;