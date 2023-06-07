import bcrypt from 'bcrypt'



export const hashpassword=async(password)=>{
    try {
        const saltround=10;
        const hashpassword=await bcrypt.hash(password,saltround)
        return hashpassword;
    } catch (error) {
        console.log(error)
    }
}
export const comparedpassword=async(password,hashpassword)=>{
    return bcrypt.compare(password,hashpassword)
}