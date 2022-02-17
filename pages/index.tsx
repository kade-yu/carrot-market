import type { NextPage } from "next";
import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import Head from "next/head";

const Home: NextPage = () => {
  const { user, isLoading } = useUser();

  console.log(user);
  return (
    <Layout title="홈" hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-col space-y-5 divide-y">
        <Item
          id={1}
          key={1}
          title="중 1과학 강의"
          price="39,000"
          comments={1}
          hearts={5}
        />
        <Item
          id={1}
          key={2}
          title="중 2과학 강의"
          price="59,000"
          comments={1}
          hearts={5}
        />
        <Item
          id={1}
          key={3}
          title="중 3과학 강의"
          price="79,000"
          comments={1}
          hearts={5}
        />
        <FloatingButton href="/items/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Home;
