exports.error=(err,req,res,next)=>{
    const errorStatus = err.status||400;
    const errorMessage = err.message||"Something went wrong";
    return res.status(errorStatus).send({
      success:false,
      status:errorStatus,
      message:errorMessage,
      stack:err.stack
    })
  }