import Layout from '../components/Layout';
import Characters from '../components/Characters';
import axios from 'axios';

const Home = ({ characters }) => {
	return <Characters characters={characters} />;
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;

export async function getServerSideProps() {
	const url = `${process.env.NEXT_PUBLIC_API_URL}`;
	const apiKey = `${process.env.NEXT_PUBLIC_API_KEY}`;
	const hash = `${process.env.NEXT_PUBLIC_API_HASH}`;

	const { data } = await axios.get(`${url}/characters?ts=1&apikey=${apiKey}&hash=${hash}`);
	const characters = data.data.results;

	return {
		props: {
			characters,
		},
	};
}
