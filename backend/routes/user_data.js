const db_ops = require('./../helpers/db_ops.js')
async function profile (req,res){
	if (req.session.authed !== undefined) {
        const user_id=req.session.user_id;
        const users = await db_ops.activated_user.find_user_by_id(user_id);
        if(users.length!==0){
            const data={
                urls:users[0].urls,
            }
            console.log(users[0])
            res.json({data:data})
        }
    } else {
        res.json({data:null})
    }
}

module.exports = profile;