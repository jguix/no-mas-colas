import Head from "next/head";

const SignUp = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Sign Up</h1>
        <form method="post" action="/api/auth/signup">
          <fieldset>
            <label>
              Email address: 
              <input type="email" id="email" name="email" />
            </label>
          </fieldset>
          <fieldset>
            <label>
              Password: <input type="password" id="password" name="password" />
            </label>
          </fieldset>

          <button type="submit">Sign up</button>
        </form>
      </main>
    </>
  );
};

export default SignUp;
