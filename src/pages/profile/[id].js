import axios from 'axios';
import {useRouter} from 'next/router'
function Profile ({user = {}}){
  const router = useRouter();

  if(router.isFallback)
  return <h1>carregando...</h1>

   return( <div>
      <p>{user.id}</p>
      <p>{user.name}</p>
      <p>{user.username}</p>
      <p></p>
   </div>
   );
}

export async function getStaticProps(context) {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
        {params:{id:context.params.id}}
    );
    const user = await response.data[0];

    await new Promise((res) => setTimeout(res, 4000))
    return {
      props: {user, revalidate: 1 }, 
    }
  }


export async function getStaticPaths() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users',

  );
  const user = await response.data.slice(0,5);
  const paths = user.map((user) => {
    return { params: { id:String(user.id) } };
  })
    return {
      paths,
      fallback: true // false or 'blocking'
    };
  }

export default Profile;
