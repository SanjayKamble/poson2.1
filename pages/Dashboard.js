import { useSession,signOut} from "next-auth/react";
import axios from'axios';
const Dashboard = () => {

  const { data: session, loading} = useSession();

  if (loading) {
    return <div>Loading...</div>
}

  if (session) {
    // console.log(session);
    
    let token;
    let platform;

        if(session.user.id){
            token = session.user.id;
            platform = "github";
        }else if(session.id_token){
            token = session.id_token;
            platform = "google";
        }

        const data = {
          name:session.user.name,
          email:session.user.email,
          token:token,
          platform:platform,
      }

      console.log(data);

      // const timezone = new Date().toLocaleString({timeZone:'asia/kolkata' });

      // console.log(timezone);

        axios.post('https://dummy.io/'
        ,data
        ,{
          headers: {
            "X-timezone":"asia/kolkata"
          }
        }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
  
    return (
        <>
            Signed in as {session.user.email} <br />
           
            <button onClick={() => signOut()}>Sign out</button>
        </>
    )
}
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard