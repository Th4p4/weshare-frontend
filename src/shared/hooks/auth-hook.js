import { useCallback, useEffect, useState } from "react";



export const AuthHook = ()=>{
    const [token, setToken] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setuserId] = useState();
let loginTime;
  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setuserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000*60*60)
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, token: token,expiration:tokenExpirationDate.toISOString() })
    );
    // console.log(uid);
    // console.log(userId, "login ko");
  }, []);


  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setuserId(null);
    localStorage.removeItem('userData')
  }, []);

  useEffect(()=>{
    if(token && tokenExpirationDate){
      const remainigTime = tokenExpirationDate.getTime()-new Date().getTime()
      // console.log(remainigTime,'heo')
      loginTime=setTimeout(logout,remainigTime)
    }
    else{
      clearTimeout(loginTime)
    }
  },[token,logout,tokenExpirationDate])


useEffect(()=>{
  const storedData = JSON.parse(localStorage.getItem('userData'))
  if (storedData && storedData.token && new Date(storedData.expiration)> new Date() ){
    login(storedData.userId, storedData.token)
  }
},[login])

return {login,logout,token,userId}
}
