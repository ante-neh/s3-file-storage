const responseWithJson = (status:number, payload:any)=>{
    const body = JSON.stringify(payload)
    return new Response(body, {
        status,
        headers:{
            "Content-Type":"application/json"
        }
    })

}

module.exports = { responseWithJson}