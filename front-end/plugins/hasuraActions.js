
const checkUserByEmailHandler = async (args) => {
    const email = args.email;
    // Invoke the non-trackable function and return the result
    const result = await check_user_by_email(email);
    return result;
  };
  
  export default checkUserByEmailHandler;