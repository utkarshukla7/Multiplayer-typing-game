import Layout from "../layout/layout";

export const Multiplayer = () => {
    const currUrl = window.location.href.split('/').at(-1);


    console.log(currUrl);
    return (
        <Layout>
        <h1>Multiplayer</h1>
        <p>{currUrl}</p>
        </Layout>
    );
};
export default Multiplayer;