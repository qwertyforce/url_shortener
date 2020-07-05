const db_ops = require('./../helpers/db_ops.js')
async function process_shortened_link (req,res){
    if(typeof req.params.link_id === "string"){
        let link= await db_ops.link_ops.find_link_by_id(req.params.link_id)
        console.log(link)
        if(link.length===1){
            link=link[0]
            if(link.author_id){
                db_ops.link_ops.increase_view_count(req.params.link_id)
            }
            res.redirect(link.original_link)
        }else{
            res.redirect("http://localhost:3000/not_found")
        }
       
    }
}

module.exports = process_shortened_link;