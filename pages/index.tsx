import { useSession, signIn, signOut } from "next-auth/client";
import Head from "next/head";

const Home = () => {
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Home</h1>

        {session ? (
          <>
            Signed in as {session.user.name} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
